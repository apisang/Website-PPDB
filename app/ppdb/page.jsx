import Link from "next/link";
import MainNavbar from "@/components/layout/MainNavbar";

const steps = [
  {
    title: "Siapkan Dokumen",
    description:
      "Pastikan Anda memiliki data pribadi, NISN, ijazah/rapor, dan dokumen pendukung lain dalam format PDF/JPG.",
  },
  {
    title: "Buat Akun Calon Siswa",
    description:
      "Jika belum memiliki akun, lakukan registrasi untuk dapat mengisi formulir PPDB secara daring.",
  },
  {
    title: "Isi Formulir PPDB",
    description:
      "Lengkapi seluruh data pada formulir, unggah dokumen, dan pastikan informasi sudah benar sebelum dikirimkan.",
  },
  {
    title: "Pantau Status",
    description:
      "Setelah mengirim formulir, masuk ke Dashboard Calon Siswa untuk melihat status pendaftaran dan informasi terbaru.",
  },
];

export default function PpdbPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <MainNavbar activePath="/ppdb" />

      {/* Back Button */}
      <div className="mx-auto max-w-5xl px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#46658f] hover:text-[#1b3c69] transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8">
        <section className="rounded-2xl bg-white/90 p-6 lg:p-8 shadow-xl">
          <h1 className="text-center text-xl lg:text-2xl font-bold text-[#0f305c]">
            Pendaftaran Peserta Didik Baru (PPDB)
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-[#345580]">
            Mulai perjalanan Anda bersama SMK Taruna Bhakti Depok dengan
            mengikuti alur pendaftaran berikut. Pilih aksi yang sesuai untuk
            melanjutkan proses PPDB secara daring.
          </p>
          <div className="mt-6 grid gap-4 rounded-2xl bg-[#f1f6ff] p-5 lg:p-6 md:grid-cols-[1.3fr,1fr]">
            <div className="space-y-3">
              <h2 className="text-base lg:text-lg font-semibold text-[#0f305c]">Isi Formulir</h2>
              <p className="text-xs lg:text-sm text-[#45628a]">
                Silakan pilih opsi di bawah ini sesuai dengan status akun Anda.
                Formulir PPDB dapat diakses setelah Anda masuk sebagai calon
                siswa.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/register"
                  className="rounded-full bg-[#1b3c69] px-4 py-1.5 text-xs lg:text-sm font-semibold text-white shadow-md transition hover:bg-[#142c4f]"
                >
                  Saya Belum Punya Akun
                </Link>
                <Link
                  href="/login/calon-siswa"
                  className="rounded-full border border-[#1b3c69] px-4 py-1.5 text-xs lg:text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
                >
                  Saya Sudah Punya Akun
                </Link>
              </div>

            </div>
            <div className="flex flex-col justify-center gap-3 rounded-xl border border-[#d7e5ff] bg-white p-4 text-xs lg:text-sm text-[#345580] shadow-sm">
              <p className="text-sm lg:text-base font-semibold text-[#0f305c]">
                Dokumentasi Pendaftaran
              </p>
              <ul className="space-y-1.5">
                <li>• Formulir dapat diisi 24 jam setelah akun dibuat.</li>
                <li>• Pastikan email aktif untuk menerima notifikasi.</li>
                <li>• Hubungi panitia PPDB apabila mengalami kendala.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 p-6 lg:p-8 shadow-xl">
          <h2 className="text-center text-lg lg:text-xl font-semibold text-[#0f305c]">
            Alur Pendaftaran PPDB Online
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs lg:text-sm text-[#45628a]">
            Ikuti tahapan berikut untuk memastikan proses pendaftaran berjalan
            lancar. Setiap langkah dapat dipantau melalui Dashboard Calon Siswa.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-xl border border-[#dfeaff] bg-[#f7faff] p-5 lg:p-6 shadow-sm"
              >
                <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#1b3c69] text-xs font-semibold text-white shadow-md">
                  {index + 1}
                </span>
                <h3 className="text-base lg:text-lg font-semibold text-[#0f305c]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs lg:text-sm text-[#45628a]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[#102747] p-6 lg:p-8 text-[#d2e3ff] shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-lg lg:text-xl font-semibold text-white">
                Pusat Informasi PPDB
              </h2>
              <p className="text-xs lg:text-sm text-[#c5d7ff]">
                Panitia PPDB siap membantu Anda selama proses pendaftaran.
                Silakan hubungi kontak berikut apabila membutuhkan bantuan lebih
                lanjut.
              </p>
            </div>
            <div className="space-y-3 text-xs lg:text-sm">
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>ppdb@smktarunabhakti.sch.id</p>
              </div>
              <div>
                <p className="font-semibold text-white">Nomor Hotline</p>
                <p>+62 812-3456-7890 (WhatsApp)</p>
              </div>
              <div>
                <p className="font-semibold text-white">Alamat Sekolah</p>
                <p>Jl. Raya Pekapuran, Depok, Jawa Barat</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
