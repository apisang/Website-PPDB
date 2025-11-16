import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";
import VerificationActions from "@/components/dashboard/VerificationActions";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata = {
  title: "Dashboard Guru - SMK Taruna Bhakti",
};

const STATUS_META = {
  pending: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Menunggu",
  },
  diterima: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Diterima",
  },
  ditolak: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    label: "Ditolak",
  },
};

const FILTERS = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Belum Diverifikasi" },
  { value: "verified", label: "Sudah Diverifikasi" },
];

export default async function GuruDashboardPage({ searchParams }) {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "guru") {
    redirect("/login/guru");
  }

  const statusFilter = searchParams?.status || "all";
  const db = getDb();

  const [[guru]] = await db.execute(
    "SELECT nama, username, created_at FROM admin WHERE id = ?",
    [payload.id]
  );

  const [students] = await db.execute(
    `SELECT 
      s.id,
      s.nama_lengkap,
      s.asal_sekolah,
      s.no_hp,
      s.email,
      s.created_at,
      status_data.status,
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

  const counts = students.reduce(
    (acc, student) => {
      const key = (student.status || "pending").toLowerCase();
      if (key === "pending") acc.pending += 1;
      else acc.verified += 1;
      return acc;
    },
    { pending: 0, verified: 0 }
  );

  const filteredStudents = students.filter((student) => {
    const key = (student.status || "pending").toLowerCase();
    if (statusFilter === "pending") return key === "pending";
    if (statusFilter === "verified") return key !== "pending";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        <aside className="w-full max-w-xs shrink-0 space-y-10 rounded-3xl bg-white/90 p-8 shadow-xl">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#4b6a90]">
              Menu
            </p>
            <nav className="grid gap-3 text-sm font-semibold text-[#1a3763]">
              <span className="flex items-center gap-2 rounded-2xl bg-[#1b3c69] px-4 py-3 text-white shadow">
                Dashboard
              </span>
              <Link
                href="/dashboard/guru?status=all"
                className={`flex items-center gap-2 rounded-2xl px-4 py-3 transition hover:bg-[#eef4ff] ${
                  statusFilter === "all"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Data Calon Siswa
              </Link>
              <Link
                href="/dashboard/guru?status=verified"
                className={`flex items-center gap-2 rounded-2xl px-4 py-3 transition hover:bg-[#eef4ff] ${
                  statusFilter === "verified"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Hasil Penilaian
              </Link>
              <LogoutButton className="flex items-center justify-center rounded-2xl border border-[#1b3c69] px-4 py-3 text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white" />
            </nav>
          </div>
          <div className="rounded-2xl bg-[#102747] p-6 text-[#d2e3ff] shadow-lg">
            <p className="text-sm font-semibold">Panduan Verifikasi</p>
            <p className="mt-3 text-xs text-[#c5d7ff]">
              Periksa kelengkapan dokumen, tambahkan catatan hasil wawancara, kemudian
              setujui atau tolak pendaftar agar proses PPDB berjalan transparan.
            </p>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4b6a90]">
                  Ringkasan
                </p>
                <h1 className="mt-2 text-2xl font-bold text-[#0f305c]">
                  Selamat datang, {guru?.nama || payload.name}
                </h1>
                <p className="mt-2 text-sm text-[#45628a]">
                  Pantau dan proses verifikasi calon siswa pada periode PPDB berjalan.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 rounded-2xl bg-[#f3f7ff] p-6 text-sm text-[#1a3763] md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4a6da0]">
                  Total Calon Siswa
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0f305c]">
                  {students.length}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4a6da0]">
                  Belum Diverifikasi
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0f305c]">
                  {counts.pending}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4a6da0]">
                  Sudah Diverifikasi
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0f305c]">
                  {counts.verified}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0f305c]">
                  Daftar Calon Siswa
                </h2>
                <p className="mt-1 text-sm text-[#45628a]">
                  Lihat status verifikasi dan proses penilaian calon siswa.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => {
                  const isActive = statusFilter === filter.value;
                  const href =
                    filter.value === "all"
                      ? "/dashboard/guru"
                      : `/dashboard/guru?status=${filter.value}`;
                  return (
                    <Link
                      key={filter.value}
                      href={href}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        isActive
                          ? "border-[#1b3c69] bg-[#1b3c69] text-white"
                          : "border-[#d7e5ff] text-[#1b3c69] hover:bg-[#eef4ff]"
                      }`}
                    >
                      {filter.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#dfeaff]">
              <table className="min-w-full divide-y divide-[#e6eefc] text-sm text-[#1a3763]">
                <thead className="bg-[#f5f8ff]">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Nama Siswa</th>
                    <th className="px-5 py-3 text-left font-semibold">Asal Sekolah</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-left font-semibold">Catatan</th>
                    <th className="px-5 py-3 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-4 text-center text-[#45628a]">
                        Tidak ada data calon siswa.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const key = (student.status || "pending").toLowerCase();
                      const statusInfo = STATUS_META[key] || STATUS_META.pending;
                      return (
                        <tr key={student.id}>
                          <td className="px-5 py-3 font-medium">
                            {student.nama_lengkap}
                          </td>
                          <td className="px-5 py-3 text-[#45628a]">
                            {student.asal_sekolah || "-"}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                                statusInfo.badge
                              }`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#45628a]">
                            {student.catatan || "-"}
                          </td>
                          <td className="px-5 py-3">
                            <VerificationActions
                              siswaId={student.id}
                              currentStatus={student.status || "pending"}
                              currentNote={student.catatan || ""}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}


