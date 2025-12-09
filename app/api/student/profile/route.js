import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { ensureJurusanColumn } from "@/lib/schema";
import { getCookieValue } from "@/lib/serverCookies";

const ALLOWED_FIELDS = {
  namaLengkap: "nama_lengkap",
  tempatLahir: "tempat_lahir",
  tanggalLahir: "tanggal_lahir",
  jenisKelamin: "jenis_kelamin",
  alamat: "alamat",
  asalSekolah: "asal_sekolah",
  noHp: "no_hp",
  jurusanPilihan: "jurusan_pilihan",
};

export async function PATCH(request) {
  try {
    const token = await getCookieValue("ppdb_token");
    const payload = verifyToken(token);

    if (!payload || payload.role !== "siswa") {
      return NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 });
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      // ignore invalid body
    }

    const db = getDb();
    await ensureJurusanColumn(db);

    const [[student]] = await db.execute(
      `SELECT 
        s.id,
        COALESCE(status_data.status, 'pending') AS status
      FROM siswa s
      LEFT JOIN (
        SELECT v1.siswa_id,
               v1.status
        FROM verifikasi v1
        WHERE v1.id = (
          SELECT v2.id
          FROM verifikasi v2
          WHERE v2.siswa_id = v1.siswa_id
          ORDER BY v2.id DESC
          LIMIT 1
        )
      ) AS status_data ON status_data.siswa_id = s.id
      WHERE s.id = ?
      LIMIT 1`,
      [payload.id]
    );

    if (!student) {
      return NextResponse.json({ message: "Data siswa tidak ditemukan." }, { status: 404 });
    }

    if ((student.status || "pending").toLowerCase() !== "pending") {
      return NextResponse.json(
        { message: "Data sudah tidak dapat diubah karena status pendaftaran telah ditetapkan." },
        { status: 403 }
      );
    }

    const updates = [];
    const values = [];

    Object.entries(ALLOWED_FIELDS).forEach(([bodyKey, column]) => {
      if (Object.prototype.hasOwnProperty.call(body, bodyKey)) {
        const rawValue = body[bodyKey];
        const value =
          typeof rawValue === "string"
            ? rawValue.trim()
            : rawValue === null
            ? null
            : rawValue;

        if (value !== undefined) {
          updates.push(`${column} = ?`);
          values.push(value || null);
        }
      }
    });

    if (updates.length === 0) {
      return NextResponse.json(
        { message: "Tidak ada perubahan yang dikirimkan." },
        { status: 400 }
      );
    }

    values.push(payload.id);

    await db.execute(`UPDATE siswa SET ${updates.join(", ")} WHERE id = ?`, values);

    return NextResponse.json({ message: "Data berhasil diperbarui." });
  } catch (error) {
    console.error("Student profile update error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui data." },
      { status: 500 }
    );
  }
}

