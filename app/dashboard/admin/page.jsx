import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { ensureJurusanColumn } from "@/lib/schema";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";
import VerificationActions from "@/components/dashboard/VerificationActions";
import AddStudentForm from "@/components/dashboard/AddStudentForm";
import StudentRowActions from "@/components/dashboard/StudentRowActions";
import AddGuruForm from "@/components/dashboard/AddGuruForm";
import GuruRowActions from "@/components/dashboard/GuruRowActions";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata = {
  title: "Home Super Admin - SMK Taruna Bhakti",
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

export default async function SuperAdminDashboardPage({ searchParams }) {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    redirect("/login/admin");
  }

  const statusFilter = searchParams?.status || "all";
  const db = getDb();
  await ensureJurusanColumn(db);

  const [[admin]] = await db.execute(
    "SELECT nama, username, created_at FROM admin WHERE id = ?",
    [payload.id]
  );

  const [students] = await db.execute(
    `SELECT 
      s.id,
      s.nama_lengkap,
      s.nisn,
      s.email,
      s.asal_sekolah,
      s.jurusan_pilihan,
      s.no_hp,
      s.tempat_lahir,
      s.tanggal_lahir,
      s.jenis_kelamin,
      s.alamat,
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

  // Get teachers from guru table
  const [guruList] = await db.execute(
    `SELECT id, nama, username, 'guru' as role, 'guru' as table_source, created_at
     FROM guru
     ORDER BY created_at DESC`
  );

  // Get admins from admin table (excluding current admin)
  const [admins] = await db.execute(
    `SELECT id, nama, username, role, 'admin' as table_source, created_at
     FROM admin
     WHERE role = 'admin' AND id != ?
     ORDER BY created_at DESC`,
    [payload.id]
  );

  // Combine teachers and admins
  const teachers = [...guruList, ...admins];

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

  // Pisahkan siswa pending dan yang sudah selesai
  const pendingStudents = filteredStudents.filter((student) => {
    const key = (student.status || "pending").toLowerCase();
    return key === "pending";
  });

  const completedStudents = filteredStudents.filter((student) => {
    const key = (student.status || "pending").toLowerCase();
    return key !== "pending";
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
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
                href="/dashboard/super-admin?status=all"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-[#eef4ff] ${
                  statusFilter === "all"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Data Calon Siswa
              </Link>
              <Link
                href="/dashboard/super-admin?status=verified"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-[#eef4ff] ${
                  statusFilter === "verified"
                    ? "bg-[#eef4ff] text-[#1a3763]"
                    : "text-[#4b6a90]"
                }`}
              >
                Hasil Penilaian
              </Link>
              <span className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[#4b6a90] transition hover:bg-[#eef4ff]">
                Kelola Guru & Admin
              </span>
              <LogoutButton className="flex items-center justify-center rounded-xl border border-[#1b3c69] px-3 py-2 text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white" />
            </nav>
          </div>
          <div className="rounded-xl bg-[#102747] p-4 text-[#d2e3ff] shadow-lg">
            <p className="text-xs font-semibold">Panduan Pengelolaan</p>
            <p className="mt-2 text-[10px] text-[#c5d7ff]">
              Koordinasikan tim guru untuk verifikasi dan pastikan seluruh data calon
              siswa dan guru terkelola dengan baik.
            </p>
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
                  Selamat datang, {admin?.nama || payload.name || "Super Admin"}
                </h1>
                <p className="mt-1.5 text-xs text-[#45628a]">
                  Pantau seluruh proses verifikasi calon siswa dan kelola akun guru di
                  lingkungan SMK Taruna Bhakti.
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
                <h2 className="text-base font-semibold text-[#0f305c]">Kelola Data Siswa</h2>
                <p className="mt-1 text-xs text-[#45628a]">
                  Tambah, edit, atau hapus data calon siswa. Verifikasi status pendaftaran.
                </p>
              </div>
              <AddStudentForm />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {FILTERS.map((filter) => {
                const isActive = statusFilter === filter.value;
                const href =
                  filter.value === "all"
                    ? "/dashboard/super-admin"
                    : `/dashboard/super-admin?status=${filter.value}`;
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
                    <th className="px-3 py-2 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-3 py-3 text-center text-[#45628a]">
                        Tidak ada data calon siswa.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const key = (student.status || "pending").toLowerCase();
                      const statusInfo = STATUS_META[key] || STATUS_META.pending;
                      return (
                        <tr key={student.id}>
                          <td className="px-3 py-2 font-medium">{student.nama_lengkap}</td>
                          <td className="px-3 py-2 text-[#45628a]">{student.nisn || "-"}</td>
                          <td className="px-3 py-2 text-[#45628a]">{student.email}</td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.asal_sekolah || "-"}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.jurusan_pilihan || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusInfo.badge}`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <StudentRowActions student={student} />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#0f305c]">Verifikasi Pendaftaran</h2>
                <p className="mt-1 text-xs text-[#45628a]">
                  Verifikasi dan berikan status pendaftaran untuk calon siswa.
                </p>
              </div>
            </div>

            {/* Tabel untuk siswa yang masih pending (bisa diverifikasi) */}
            {pendingStudents.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#dfeaff]">
                <table className="min-w-full divide-y divide-[#e6eefc] text-xs text-[#1a3763]">
                  <thead className="bg-[#f5f8ff]">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Nama Siswa</th>
                      <th className="px-3 py-2 text-left font-semibold">Asal Sekolah</th>
                      <th className="px-3 py-2 text-left font-semibold">Jurusan Pilihan</th>
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
                          <td className="px-3 py-2 font-medium">{student.nama_lengkap}</td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.asal_sekolah || "-"}
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
                            {student.jurusan_pilihan || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusInfo.badge}`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-[#45628a]">
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
                <h3 className="mb-3 text-sm font-semibold text-[#0f305c]">
                  Hasil Verifikasi (Sudah Selesai)
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#dfeaff]">
                  <table className="min-w-full divide-y divide-[#e6eefc] text-xs text-[#1a3763]">
                    <thead className="bg-[#f5f8ff]">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Nama Siswa</th>
                        <th className="px-3 py-2 text-left font-semibold">Asal Sekolah</th>
                        <th className="px-3 py-2 text-left font-semibold">Jurusan Pilihan</th>
                        <th className="px-3 py-2 text-left font-semibold">Status</th>
                        <th className="px-3 py-2 text-left font-semibold">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                      {completedStudents.map((student) => {
                        const key = (student.status || "pending").toLowerCase();
                        const statusInfo = STATUS_META[key] || STATUS_META.pending;
                        return (
                          <tr key={student.id}>
                            <td className="px-3 py-2 font-medium">{student.nama_lengkap}</td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.asal_sekolah || "-"}
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.jurusan_pilihan || "-"}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusInfo.badge}`}
                              >
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-[#45628a]">
                              {student.catatan || "-"}
                            </td>
                          </tr>
                        );
                      })}
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

          <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#0f305c]">
                  Kelola Akun Guru
                </h2>
                <p className="mt-1 text-xs text-[#45628a]">
                  Tambah, edit, atau hapus akun guru yang memiliki akses ke dashboard verifikasi.
                </p>
              </div>
              <AddGuruForm />
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-[#dfeaff]">
              <table className="min-w-full divide-y divide-[#e6eefc] text-xs text-[#1a3763]">
                <thead className="bg-[#f5f8ff]">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Nama</th>
                    <th className="px-3 py-2 text-left font-semibold">Username</th>
                    <th className="px-3 py-2 text-left font-semibold">Role</th>
                    <th className="px-3 py-2 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                  {teachers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-3 py-3 text-center text-[#45628a]">
                        Tidak ada data guru/admin.
                      </td>
                    </tr>
                  ) : (
                    teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="px-3 py-2 font-medium">{teacher.nama}</td>
                        <td className="px-3 py-2 text-[#45628a]">
                          {teacher.username}
                        </td>
                        <td className="px-3 py-2 text-[#45628a]">
                          {teacher.role === "guru" ? "Guru" : "Admin"}
                        </td>
                        <td className="px-3 py-2">
                          <GuruRowActions guru={teacher} />
                        </td>
                      </tr>
                    ))
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
