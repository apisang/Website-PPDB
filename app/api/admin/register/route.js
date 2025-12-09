import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

const ALLOWED_ROLES = ["admin", "guru"];

export async function POST(request) {
  try {
    const { nama, username, password, role } = await request.json();

    if (!nama || !username || !password || !role) {
      return NextResponse.json(
        { message: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return NextResponse.json(
        { message: "Role tidak valid." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const db = getDb();

    // Jika role adalah guru, insert ke table guru
    // Jika role adalah admin, insert ke table admin
    if (role === "guru") {
      await db.execute(
        "INSERT INTO guru (nama, username, password) VALUES (?, ?, ?)",
        [nama, username, hashedPassword]
      );
    } else {
      // Selalu set role sebagai 'admin'
      await db.execute(
        "INSERT INTO admin (nama, username, password, role) VALUES (?, ?, ?, 'admin')",
        [nama, username, hashedPassword]
      );
    }

    return NextResponse.json({ message: "Registrasi berhasil." });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Username sudah digunakan." },
        { status: 409 }
      );
    }

    console.error("Admin register error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat registrasi." },
      { status: 500 }
    );
  }
}

