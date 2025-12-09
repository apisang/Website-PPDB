import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";
import { ensureJurusanColumn } from "@/lib/schema";

async function ensureAdmin() {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    return {
      error: NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 }),
    };
  }

  return { payload };
}

// GET - Get detail siswa
export async function GET(request, { params }) {
  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID siswa tidak valid." }, { status: 400 });
  }

  try {
    const db = getDb();
    await ensureJurusanColumn(db);

    const [[student]] = await db.execute(
      `SELECT 
        s.id,
        s.nama_lengkap,
        s.nisn,
        s.email,
        s.asal_sekolah,
        s.jurusan_pilihan,
        s.no_hp,
        s.tempat_lahir,
        s.tanggal_lahir,
        s.jenis_kelamin,
        s.alamat,
        s.created_at,
        CASE
          WHEN status_data.status IS NULL THEN 'pending'
          ELSE status_data.status
        END AS status,
        status_data.catatan,
        status_data.verified_at
      FROM siswa s
      LEFT JOIN (
        SELECT v1.siswa_id,
               v1.status,
               v1.catatan,
               v1.verified_at
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
      [id]
    );

    if (!student) {
      return NextResponse.json({ message: "Siswa tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("Get student error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

// PATCH - Update siswa
export async function PATCH(request, { params }) {
  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID siswa tidak valid." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const db = getDb();
    await ensureJurusanColumn(db);

    const updates = [];
    const values = [];

    const allowedFields = {
      nik: "nik",
      namaLengkap: "nama_lengkap",
      nisn: "nisn",
      email: "email",
      asalSekolah: "asal_sekolah",
      jurusanPilihan: "jurusan_pilihan",
      noHp: "no_hp",
      tempatLahir: "tempat_lahir",
      tanggalLahir: "tanggal_lahir",
      jenisKelamin: "jenis_kelamin",
      alamat: "alamat",
    };

    Object.entries(allowedFields).forEach(([key, column]) => {
      if (body[key] !== undefined) {
        updates.push(`${column} = ?`);
        values.push(body[key] || null);
      }
    });

    // Handle password update
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { message: "Tidak ada perubahan yang dikirim." },
        { status: 400 }
      );
    }

    values.push(id);

    await db.execute(`UPDATE siswa SET ${updates.join(", ")} WHERE id = ?`, values);

    return NextResponse.json({ message: "Data siswa berhasil diperbarui." });
  } catch (error) {
    console.error("Update student error:", error);
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email atau NISN sudah digunakan." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui data siswa." },
      { status: 500 }
    );
  }
}

// DELETE - Hapus siswa
export async function DELETE(request, { params }) {
  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID siswa tidak valid." }, { status: 400 });
  }

  try {
    const db = getDb();

    // Hapus verifikasi terkait
    await db.execute("DELETE FROM verifikasi WHERE siswa_id = ?", [id]);

    // Hapus berkas terkait (jika ada)
    await db.execute("DELETE FROM berkas WHERE siswa_id = ?", [id]);

    // Hapus siswa
    await db.execute("DELETE FROM siswa WHERE id = ?", [id]);

    return NextResponse.json({ message: "Siswa berhasil dihapus." });
  } catch (error) {
    console.error("Delete student error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus siswa." },
      { status: 500 }
    );
  }
}

