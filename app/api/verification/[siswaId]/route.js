import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";

const ALLOWED_STATUS = ["pending", "diterima", "ditolak"];
const ALLOWED_ROLES = ["guru", "superadmin"];

async function ensureAuthorized() {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || !ALLOWED_ROLES.includes(payload.role)) {
    return {
      error: NextResponse.json({ message: "Tidak diizinkan." }, { status: 403 }),
    };
  }

  return { payload };
}

export async function PATCH(request, { params }) {
  const auth = await ensureAuthorized();
  if (auth.error) return auth.error;

  let body = {};
  try {
    body = await request.json();
  } catch {
    // ignore, body optional
  }

  const siswaIdFromUrl = params?.siswaId;
  const siswaIdFromBody = body?.siswaId;
  const siswaId = siswaIdFromUrl ?? siswaIdFromBody;

  if (!siswaId) {
    return NextResponse.json({ message: "ID siswa wajib ada." }, { status: 400 });
  }

  const status = (body?.status || "").toLowerCase();
  const catatan = body?.catatan ?? "";

  if (!ALLOWED_STATUS.includes(status)) {
    return NextResponse.json(
      { message: "Status verifikasi tidak valid." },
      { status: 400 }
    );
  }

  try {
    const db = getDb();
    await db.execute(
      `INSERT INTO verifikasi (siswa_id, status, catatan, verified_at)
       VALUES (?, ?, ?, NOW())`,
      [siswaId, status, catatan]
    );

    return NextResponse.json({
      message: "Status verifikasi diperbarui.",
      status,
      catatan,
    });
  } catch (error) {
    console.error("Verification update error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan verifikasi." },
      { status: 500 }
    );
  }
}


