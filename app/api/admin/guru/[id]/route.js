import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";

function unauthorized() {
  return NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 });
}

async function ensureSuperadmin() {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "superadmin") {
    return { error: unauthorized() };
  }

  return { payload };
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID guru tidak valid." }, { status: 400 });
  }

  const auth = await ensureSuperadmin();
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Payload tidak valid." }, { status: 400 });
  }

  const updates = [];
  const values = [];

  if (body?.nama) {
    updates.push("nama = ?");
    values.push(body.nama);
  }

  if (body?.username) {
    updates.push("username = ?");
    values.push(body.username);
  }

  if (body?.password) {
    const hashed = await bcrypt.hash(body.password, 10);
    updates.push("password = ?");
    values.push(hashed);
  }

  if (updates.length === 0) {
    return NextResponse.json({ message: "Tidak ada perubahan yang dikirim." }, { status: 400 });
  }

  try {
    const db = getDb();
    await db.execute(`UPDATE admin SET ${updates.join(", ")} WHERE id = ?`, [
      ...values,
      id,
    ]);
    return NextResponse.json({ message: "Data guru berhasil diperbarui." });
  } catch (error) {
    console.error("Update guru error:", error);
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Username telah digunakan." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui data guru." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID guru tidak valid." }, { status: 400 });
  }

  const auth = await ensureSuperadmin();
  if (auth.error) return auth.error;

  try {
    const db = getDb();
    await db.execute("DELETE FROM admin WHERE id = ? AND role = 'admin'", [id]);
    return NextResponse.json({ message: "Guru berhasil dihapus." });
  } catch (error) {
    console.error("Delete guru error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus guru." },
      { status: 500 }
    );
  }
}
