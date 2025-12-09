import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password, role = "siswa" } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const db = getDb();
    let user;

    if (role === "siswa") {
      const [rows] = await db.execute(
        "SELECT id, nama_lengkap AS name, email, password FROM siswa WHERE email = ?",
        [email]
      );
      user = rows?.[0];
    } else if (role === "guru") {
      // Guru login dari table guru
      const [rows] = await db.execute(
        "SELECT id, nama AS name, username AS email, password FROM guru WHERE username = ?",
        [email]
      );
      user = rows?.[0];
    } else if (role === "admin") {
      // Admin login dari table admin
      const [rows] = await db.execute(
        "SELECT id, nama AS name, username AS email, password, role FROM admin WHERE username = ? AND role = 'admin'",
        [email]
      );
      user = rows?.[0];
    } else {
      return NextResponse.json({ message: "Role tidak dikenali." }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json(
        { message: "Akun tidak ditemukan." },
        { status: 404 }
      );
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { message: "Password salah." },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      role,
      name: user.name,
    });

    let redirectUrl = "/dashboard/siswa";
    if (role === "guru") {
      redirectUrl = "/dashboard/guru";
    } else if (role === "admin") {
      redirectUrl = "/dashboard/super-admin";
    }

    const response = NextResponse.json({ message: "Login berhasil.", redirectUrl });
    response.cookies.set({
      name: "ppdb_token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat login." },
      { status: 500 }
    );
  }
}

