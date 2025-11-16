import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

const ALLOWED_ROLES = ["admin", "superadmin"];

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

    await db.execute(
      "INSERT INTO admin (nama, username, password, role) VALUES (?, ?, ?, ?)",
      [nama, username, hashedPassword, role]
    );

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

