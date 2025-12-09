import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { ensureJurusanColumn } from "@/lib/schema";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const namaLengkap = formData.get("namaLengkap");
    const email = formData.get("email");
    const password = formData.get("password");
    const nisn = formData.get("nisn");
    const nik = formData.get("nik");
    const tempatLahir = formData.get("tempatLahir") || null;
    const tanggalLahir = formData.get("tanggalLahir") || null;
    const jenisKelamin = formData.get("jenisKelamin") || null;
    const alamat = formData.get("alamat") || null;
    const asalSekolah = formData.get("asalSekolah") || null;
    const noHp = formData.get("noHp") || null;
    const jurusanPilihan = formData.get("jurusanPilihan") || null;

    if (!namaLengkap || !email || !password || !nisn || !nik || !jurusanPilihan) {
      return NextResponse.json(
        { message: "Data wajib masih ada yang kosong." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = getDb();
    await ensureJurusanColumn(db);

    const [result] = await db.execute(
      `INSERT INTO siswa 
        (nama_lengkap, email, password, nisn, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, asal_sekolah, jurusan_pilihan, no_hp) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        namaLengkap,
        email,
        hashedPassword,
        nisn,
        nik,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        alamat,
        asalSekolah,
        jurusanPilihan,
        noHp,
      ]
    );

    const siswaId =
      typeof result?.insertId === "number" ? result.insertId : null;

    if (siswaId !== null) {
      await db.execute("INSERT INTO verifikasi (siswa_id) VALUES (?)", [siswaId]);
    }

    return NextResponse.json({ message: "Registrasi berhasil." });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Akun dengan email/NISN/NIK tersebut sudah terdaftar." },
        { status: 409 }
      );
    }

    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat registrasi." },
      { status: 500 }
    );
  }
}

