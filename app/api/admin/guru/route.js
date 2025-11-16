import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";

export async function POST(request) {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "superadmin") {
    return NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 });
  }

  try {
    const { nama, username, password, role = "admin" } = await request.json();

    if (!nama || !username || !password || !role) {
      return NextResponse.json(
        { message: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedRole = role === "superadmin" ? "superadmin" : "admin";

    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO admin (nama, username, password, role) VALUES (?, ?, ?, ?)",
      [nama, username, hashedPassword, normalizedRole]
    );

    return NextResponse.json({ message: "Akun berhasil ditambahkan." });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Username sudah digunakan." },
        { status: 409 }
      );
    }

    console.error("Add admin error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menambah akun." },
      { status: 500 }
    );
  }
}

