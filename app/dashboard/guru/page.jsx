import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { ensureJurusanColumn } from "@/lib/schema";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";
import VerificationActions from "@/components/dashboard/VerificationActions";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata = {
  title: "Home Guru - SMK Taruna Bhakti",
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
  const searchQuery =
    typeof searchParams?.search === "string"
      ? searchParams.search.toLowerCase()
      : "";
  const db = getDb();
  await ensureJurusanColumn(db);

  const [[guru]] = await db.execute(
    "SELECT nama, username, created_at FROM guru WHERE id = ?",
    [payload.id]
  );

  const [students] = await db.execute(
    `SELECT 
      s.id,
      s.nama_lengkap,
      s.nisn,
      s.asal_sekolah,
      s.jurusan_pilihan,
      s.no_hp,
      s.email,
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

  const pendingStudents = filteredStudents.filter((student) => {
    const key = (student.status || "pending").toLowerCase();
    return key === "pending";
  });

  const completedStudents = filteredStudents.filter((student) => {
    const key = (student.status || "pending").toLowerCase();
    return key !== "pending";
  });

  const searchedCompletedStudents = completedStudents.filter((student) => {
    if (!searchQuery) return true;
    const name = (student.nama_lengkap || "").toLowerCase();
    return name.includes(searchQuery);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <aside className="w-full max-w-[200px] shrink-0 space-y-6 rounded-2xl bg-white/90 p-5 shadow-xl">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4b6a90]">
              Menu
            </p>
            <nav className="grid gap-2 text-xs font-semibold text-[#1a3763]">
              <span className="flex items-center gap-1.5 rounded-xl bg-[#1b3c69] px-3 py-2 text-white shadow">
                Home
              </span>
              <Link
                href="/dashboard/guru?status=all"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-[#eef4ff] ${
                  statusFilter === "all"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Semua Data
              </Link>
              <Link
                href="/dashboard/guru?status=pending"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-[#eef4ff] ${
                  statusFilter === "pending"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Belum Diverifikasi
              </Link>
              <Link
                href="/dashboard/guru?status=verified"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-[#eef4ff] ${
                  statusFilter === "verified"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Sudah Diverifikasi
              </Link>
              <LogoutButton className="flex items-center justify-center rounded-xl border border-[#1b3c69] px-3 py-2 text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white" />
            </nav>
          </div>
          <div className="rounded-xl bg-[#102747] p-4 text-[#d2e3ff] shadow-lg">
            <p className="text-xs font-semibold">Panduan Verifikasi</p>
            <p className="mt-2 text-[10px] text-[#c5d7ff]">
              Periksa kelengkapan dokumen, tambahkan catatan hasil wawancara, kemudian
              setujui atau tolak pendaftar agar proses PPDB berjalan transparan.
            </p>
            <div className="mt-3 space-y-1.5 text-[10px]">
              <p className="font-semibold text-white">Status Verifikasi:</p>
              <ul className="space-y-1 text-[#c5d7ff]">
                <li>• <span className="text-amber-300">Menunggu</span> - Belum diverifikasi</li>
                <li>• <span className="text-emerald-300">Diterima</span> - Lolos seleksi</li>
                <li>• <span className="text-rose-300">Ditolak</span> - Tidak lolos seleksi</li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#4b6a90]">
                  Ringkasan
                </p>
                <h1 className="mt-1.5 text-lg font-bold text-[#0f305c]">
                  Selamat datang, {guru?.nama || payload.name}
                </h1>
                <p className="mt-1.5 text-xs text-[#45628a]">
                  Pantau dan proses verifikasi calon siswa pada periode PPDB berjalan.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 rounded-xl bg-[#f3f7ff] p-4 text-xs text-[#1a3763] md:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#4a6da0]">
                  Total Calon Siswa
                </p>
                <p className="mt-1 text-base font-semibold text-[#0f305c]">
                  {students.length}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#4a6da0]">
                  Belum Diverifikasi
                </p>
                <p className="mt-1 text-base font-semibold text-[#0f305c]">
                  {counts.pending}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#4a6da0]">
                  Sudah Diverifikasi
                </p>
                <p className="mt-1 text-base font-semibold text-[#0f305c]">
                  {counts.verified}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#0f305c]">
                  Daftar Calon Siswa
                </h2>
                <p className="mt-1 text-xs text-[#45628a]">
                  Lihat status verifikasi dan proses penilaian calon siswa.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
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
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
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

            {/* Tabel untuk siswa yang masih pending (bisa diverifikasi) */}
            {pendingStudents.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#dfeaff]">
                <table className="min-w-full divide-y divide-[#e6eefc] text-xs text-[#1a3763]">
                  <thead className="bg-[#f5f8ff]">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Nama Siswa</th>
                      <th className="px-3 py-2 text-left font-semibold">NISN</th>
                      <th className="px-3 py-2 text-left font-semibold">Email</th>
                      <th className="px-3 py-2 text-left font-semibold">Asal Sekolah</th>
                      <th className="px-3 py-2 text-left font-semibold">Jurusan</th>
                      <th className="px-3 py-2 text-left font-semibold">Status</th>
                      <th className="px-3 py-2 text-left font-semibold">Catatan</th>
                      <th className="px-3 py-2 text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                    {pendingStudents.map((student) => {
                      const key = (student.status || "pending").toLowerCase();
                      const statusInfo = STATUS_META[key] || STATUS_META.pending;
                      return (
                        <tr key={student.id}>
                          <td className="px-3 py-2 font-medium">
                            {student.nama_lengkap}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.nisn || "-"}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.email || "-"}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.asal_sekolah || "-"}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.jurusan_pilihan || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                statusInfo.badge
                              }`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-[#45628a] max-w-xs truncate" title={student.catatan || ""}>
                            {student.catatan || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <VerificationActions
                              siswaId={student.id}
                              currentStatus={student.status || "pending"}
                              currentNote={student.catatan || ""}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabel untuk siswa yang sudah diterima/ditolak (read-only, tanpa form) */}
            {completedStudents.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-[#0f305c]">
                    Hasil Verifikasi (Sudah Selesai)
                  </h3>
                  <form
                    className="flex items-center gap-2"
                    method="GET"
                    action="/dashboard/guru"
                  >
                    <input
                      type="hidden"
                      name="status"
                      value={statusFilter === "verified" ? "verified" : "all"}
                    />
                    <input
                      type="text"
                      name="search"
                      defaultValue={searchParams?.search || ""}
                      placeholder="Cari nama siswa terverifikasi..."
                      className="w-48 rounded-full border border-[#d7e5ff] px-3 py-1.5 text-xs text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                    />
                  </form>
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#dfeaff]">
                  <table className="min-w-full divide-y divide-[#e6eefc] text-xs text-[#1a3763]">
                    <thead className="bg-[#f5f8ff]">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Nama Siswa</th>
                        <th className="px-3 py-2 text-left font-semibold">NISN</th>
                        <th className="px-3 py-2 text-left font-semibold">Email</th>
                        <th className="px-3 py-2 text-left font-semibold">Asal Sekolah</th>
                        <th className="px-3 py-2 text-left font-semibold">Jurusan</th>
                        <th className="px-3 py-2 text-left font-semibold">Status</th>
                        <th className="px-3 py-2 text-left font-semibold">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                      {searchedCompletedStudents.map((student) => {
                        const key = (student.status || "pending").toLowerCase();
                        const statusInfo = STATUS_META[key] || STATUS_META.pending;
                        return (
                          <tr key={student.id}>
                            <td className="px-3 py-2 font-medium">
                              {student.nama_lengkap}
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.nisn || "-"}
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.email || "-"}
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.asal_sekolah || "-"}
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.jurusan_pilihan || "-"}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                  statusInfo.badge
                                }`}
                              >
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-[#45628a] max-w-xs truncate" title={student.catatan || ""}>
                              {student.catatan || "-"}
                            </td>
                          </tr>
                        );
                      })}
                      {searchedCompletedStudents.length === 0 && (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-3 py-3 text-center text-xs text-[#45628a]"
                          >
                            Tidak ada siswa terverifikasi dengan nama tersebut.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {filteredStudents.length === 0 && (
              <div className="mt-4 rounded-xl border border-[#dfeaff] bg-white/80 px-3 py-3 text-center text-xs text-[#45628a]">
                Tidak ada data calon siswa.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}


