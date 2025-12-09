import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";

function unauthorized() {
  return NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 });
}

async function ensureAdmin() {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    return { error: unauthorized() };
  }

  return { payload };
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  }

  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Payload tidak valid." }, { status: 400 });
  }

  const tableSource = body?.tableSource || "guru"; // Default ke guru jika tidak ada

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
    const tableName = tableSource === "admin" ? "admin" : "guru";
    
    // Jika update admin, pastikan role tetap 'admin'
    if (tableSource === "admin") {
      await db.execute(`UPDATE admin SET ${updates.join(", ")}, role = 'admin' WHERE id = ?`, [
        ...values,
        id,
      ]);
    } else {
      await db.execute(`UPDATE guru SET ${updates.join(", ")} WHERE id = ?`, [
        ...values,
        id,
      ]);
    }
    
    return NextResponse.json({ message: "Data berhasil diperbarui." });
  } catch (error) {
    console.error("Update error:", error);
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Username telah digunakan." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui data." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  }

  const auth = await ensureAdmin();
  if (auth.error) return auth.error;

  try {
    // Get table source from query parameter
    const { searchParams } = new URL(request.url);
    const tableSource = searchParams.get("tableSource") || "guru";

    const db = getDb();
    const tableName = tableSource === "admin" ? "admin" : "guru";
    
    await db.execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    
    return NextResponse.json({ message: "Data berhasil dihapus." });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus data." },
      { status: 500 }
    );
  }
}
