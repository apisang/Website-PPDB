import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { ensureJurusanColumn } from "@/lib/schema";
import { verifyToken } from "@/lib/auth";
import { getCookieValue } from "@/lib/serverCookies";
import EditStudentForm from "@/components/dashboard/EditStudentForm";

export const metadata = {
  title: "Home Calon Siswa - SMK Taruna Bhakti",
};

const STATUS_META = {
  pending: {
    label: "Menunggu",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    description:
      "Berkas Anda sedang diperiksa oleh panitia. Pastikan data yang diunggah lengkap dan benar.",
  },
  diterima: {
    label: "Diterima",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description:
      "Selamat! Anda dinyatakan lolos seleksi. Ikuti instruksi lanjutan yang dikirim ke email Anda.",
  },
  ditolak: {
    label: "Ditolak",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    description:
      "Maaf, Anda belum lolos seleksi. Silakan hubungi panitia PPDB untuk informasi lebih lanjut.",
  },
};

export default async function SiswaDashboardPage() {
  const token = await getCookieValue("ppdb_token");
  const payload = verifyToken(token);

  if (!payload || payload.role !== "siswa") {
    redirect("/login/siswa");
  }

  const db = getDb();
  await ensureJurusanColumn(db);

  const [[student]] = await db.execute(
    `SELECT 
        s.id,
        s.nama_lengkap,
        s.nisn,
        s.asal_sekolah,
        s.jurusan_pilihan,
        s.no_hp,
        s.email,
        s.created_at,
        s.tempat_lahir,
        s.tanggal_lahir,
        s.jenis_kelamin,
        s.alamat,
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
      WHERE s.id = ?
      LIMIT 1`,
    [payload.id]
  );

  if (!student) {
    redirect("/login/siswa");
  }

  const [documents] = await db.execute(
    `SELECT id, jenis_berkas, file_path, uploaded_at
     FROM berkas
     WHERE siswa_id = ?
     ORDER BY uploaded_at DESC`,
    [student.id]
  );

  const statusKey = (student.status || "pending").toLowerCase();
  const statusInfo = STATUS_META[statusKey] || STATUS_META.pending;

  const editableStudentData = {
    namaLengkap: student.nama_lengkap || "",
    tempatLahir: student.tempat_lahir || "",
    tanggalLahir: student.tanggal_lahir
      ? new Date(student.tanggal_lahir).toISOString().split("T")[0]
      : "",
    jenisKelamin: student.jenis_kelamin || "",
    alamat: student.alamat || "",
    asalSekolah: student.asal_sekolah || "",
    noHp: student.no_hp || "",
    jurusanPilihan: student.jurusan_pilihan || "",
  };

  const tableRows = [
    { label: "Nama Lengkap", value: student.nama_lengkap },
    { label: "NISN", value: student.nisn },
    { label: "Asal Sekolah", value: student.asal_sekolah },
    { label: "Jurusan Pilihan", value: student.jurusan_pilihan },
    { label: "Nomor Handphone", value: student.no_hp },
    { label: "Email", value: student.email },
    {
      label: "Tanggal Pendaftaran",
      value: student.created_at
        ? new Date(student.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "-",
    },
  ];

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
                Home
              </span>
              <span className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[#4b6a90] transition hover:bg-[#eef4ff]">
                Data Pendaftaran
              </span>
              <span className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[#4b6a90] transition hover:bg-[#eef4ff]">
                Upload Dokumen
              </span>
              <span className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[#4b6a90] transition hover:bg-[#eef4ff]">
                Pengumuman
              </span>
              <Link
                href="/"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-[#1b3c69] px-4 py-3 text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Kembali ke Beranda
              </Link>
            </nav>
          </div>
          <div className="rounded-2xl bg-[#102747] p-6 text-[#d2e3ff] shadow-lg">
            <p className="text-sm font-semibold">Panduan Pendaftaran</p>
            <p className="mt-3 text-xs text-[#c5d7ff]">
              Pastikan semua data dan dokumen sudah lengkap. Hubungi panitia PPDB
              melalui email{" "}
              <span className="font-semibold text-white">
                ppdb@smktarunabhakti.sch.id
              </span>{" "}
              untuk bantuan lebih lanjut.
            </p>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#4b6a90]">
                  Status Pendaftaran
                </p>
                <h1 className="mt-2 text-2xl font-bold text-[#0f305c]">
                  Halo, {student.nama_lengkap}
                </h1>
                <p className="mt-2 text-sm text-[#45628a]">
                  Pantau progres pendaftaran Anda dan lengkapi data yang dibutuhkan
                  melalui panel ini.
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${statusInfo.badge}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <p className="mt-6 rounded-2xl border border-[#dfeaff] bg-[#f7faff] p-6 text-sm text-[#45628a]">
              {statusInfo.description}
            </p>
          </section>

          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0f305c]">
                  Data Pendaftaran
                </h2>
                <p className="text-sm text-[#45628a]">
                  Periksa kembali informasi berikut dan pastikan sudah sesuai.
                </p>
              </div>
              {statusKey === "pending" ? (
                <EditStudentForm initialData={editableStudentData} />
              ) : (
                <span className="rounded-full bg-[#bccae3] px-5 py-2 text-sm font-semibold text-[#485a78]">
                  Data terkunci setelah diterima
                </span>
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#dfeaff]">
              <table className="min-w-full divide-y divide-[#e6eefc] text-sm text-[#1a3763]">
                <tbody className="divide-y divide-[#e6eefc] bg-white/80">
                  {tableRows.map((row) => (
                    <tr key={row.label}>
                      <td className="w-48 bg-[#f5f8ff] px-5 py-3 font-semibold">
                        {row.label}
                      </td>
                      <td className="px-5 py-3 text-[#45628a]">{row.value || "-"}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="bg-[#f5f8ff] px-5 py-3 font-semibold">Status</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusInfo.badge}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0f305c]">
                  Upload Dokumen
                </h2>
                <p className="text-sm text-[#45628a]">
                  Unggah KK, rapor, foto, dan berkas pendukung lainnya.
                </p>
              </div>
              {statusKey === "pending" ? (
                <button
                  type="button"
                  className="rounded-full border border-[#1b3c69] px-5 py-2 text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
                >
                  Unggah Berkas
                </button>
              ) : (
                <span className="rounded-full bg-[#eef4ff] px-5 py-2 text-sm font-semibold text-[#45628a]">
                  Upload ditutup setelah diterima
                </span>
              )}
            </div>

            <div
              className={`mt-6 grid gap-6 ${
                statusKey === "pending" ? "lg:grid-cols-2" : "lg:grid-cols-1"
              }`}
            >
              {statusKey === "pending" && (
                <div className="rounded-2xl border border-dashed border-[#adc6f4] bg-[#f5f8ff] p-6 text-center text-sm text-[#45628a]">
                  <p className="font-semibold text-[#1a3763]">
                    Tarik & letakkan berkas
                  </p>
                  <p className="mt-2 text-xs">
                    Format yang diperbolehkan: PDF, JPG, atau PNG. Maksimal 5 MB per
                    berkas.
                  </p>
                  <div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1b3c69] shadow">
                    Pilih Berkas
                  </div>
                </div>
              )}
              <div className="rounded-2xl border border-[#dfeaff] bg-white/80 p-6">
                <p className="text-sm font-semibold text-[#1a3763]">
                  Riwayat Dokumen
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[#45628a]">
                  {documents.length === 0 && (
                    <li className="rounded-xl border border-dashed border-[#adc6f4] bg-[#f5f8ff] px-4 py-3 text-xs text-[#7993bb]">
                      Belum ada dokumen yang diunggah.
                    </li>
                  )}
                  {documents.map((doc) => {
                    const uploadedLabel = doc.uploaded_at
                      ? new Date(doc.uploaded_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-";
                    return (
                      <li
                        key={doc.id}
                        className="flex items-center justify-between rounded-xl border border-[#e2ebff] bg-white px-4 py-3 shadow-sm"
                      >
                        <div>
                          <p className="font-semibold text-[#1a3763]">
                            {doc.jenis_berkas}
                          </p>
                          <p className="text-xs text-[#7993bb]">{uploadedLabel}</p>
                        </div>
                        <Link
                          href={doc.file_path || "#"}
                          className="text-xs font-semibold text-[#1b3c69] underline"
                        >
                          Lihat
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white/95 p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-[#0f305c]">
              Pengumuman Hasil Seleksi
            </h2>
            <p className="mt-2 text-sm text-[#45628a]">
              Status akhir pendaftaran Anda akan ditampilkan di sini. Pantau secara
              berkala untuk mendapatkan informasi terbaru terkait proses seleksi.
            </p>
            {student.catatan ? (
              <div className="mt-4 rounded-2xl border border-[#dfeaff] bg-[#f7faff] p-6 text-sm text-[#45628a]">
                <p className="font-semibold text-[#1a3763]">Catatan Panitia</p>
                <p className="mt-2">{student.catatan}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-[#adc6f4] bg-[#f5f8ff] p-6 text-sm text-[#7993bb]">
                Belum ada pengumuman tambahan dari panitia. Status Anda masih{" "}
                <span className="font-semibold text-[#1a3763]">
                  {statusInfo.label}
                </span>
                .
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

