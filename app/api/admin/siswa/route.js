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

// GET - List semua siswa
export async function GET() {
  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  try {
    const db = getDb();
    await ensureJurusanColumn(db);

    const [students] = await db.execute(
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
      ORDER BY s.created_at DESC`
    );

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Get students error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

// POST - Tambah siswa baru
export async function POST(request) {
  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const {
      namaLengkap,
      nik,
      nisn,
      email,
      password,
      asalSekolah,
      jurusanPilihan,
      noHp,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
    } = body;

    if (!namaLengkap || !email || !password) {
      return NextResponse.json(
        { message: "Nama lengkap, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    const db = getDb();
    await ensureJurusanColumn(db);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert siswa
    const [result] = await db.execute(
      `INSERT INTO siswa (
        nama_lengkap, nik, nisn, email, password, asal_sekolah, 
        jurusan_pilihan, no_hp, tempat_lahir, tanggal_lahir, 
        jenis_kelamin, alamat
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        namaLengkap,
        nik || null,
        nisn || null,
        email,
        hashedPassword,
        asalSekolah || null,
        jurusanPilihan || null,
        noHp || null,
        tempatLahir || null,
        tanggalLahir || null,
        jenisKelamin || null,
        alamat || null,
      ]
    );

    return NextResponse.json({
      message: "Siswa berhasil ditambahkan.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Add student error:", error);
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email atau NISN sudah digunakan." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menambah siswa." },
      { status: 500 }
    );
  }
}

