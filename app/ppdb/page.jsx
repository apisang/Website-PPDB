import Link from "next/link";

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
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-14">
        <section className="rounded-3xl bg-white/90 p-10 shadow-xl">
          <h1 className="text-center text-3xl font-bold text-[#0f305c]">
            Pendaftaran Peserta Didik Baru (PPDB)
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[#345580]">
            Mulai perjalanan Anda bersama SMK Taruna Bhakti Depok dengan
            mengikuti alur pendaftaran berikut. Pilih aksi yang sesuai untuk
            melanjutkan proses PPDB secara daring.
          </p>
          <div className="mt-10 grid gap-6 rounded-3xl bg-[#f1f6ff] p-8 md:grid-cols-[1.3fr,1fr]">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#0f305c]">Isi Formulir</h2>
              <p className="text-sm text-[#45628a]">
                Silakan pilih opsi di bawah ini sesuai dengan status akun Anda.
                Formulir PPDB dapat diakses setelah Anda masuk sebagai calon
                siswa.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-full bg-[#1b3c69] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#142c4f]"
                >
                  Saya Belum Punya Akun
                </Link>
                <Link
                  href="/login/calon-siswa"
                  className="rounded-full border border-[#1b3c69] px-5 py-2 text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
                >
                  Saya Sudah Punya Akun
                </Link>
              </div>
              <div className="rounded-2xl border border-dashed border-[#b8ccf4] bg-white/80 p-5 text-sm text-[#2f4f78]">
                <p className="font-semibold text-[#0f305c]">
                  Login Guru & Super Admin
                </p>
                <p className="mt-2">
                  Guru dan super admin dapat mengakses dashboard masing-masing
                  menggunakan akun yang telah diberikan.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/login/guru"
                    className="rounded-full bg-[#23508b] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1a3d6a]"
                  >
                    Login Guru
                  </Link>
                  <Link
                    href="/login/super-admin"
                    className="rounded-full border border-[#23508b] px-4 py-2 text-sm font-semibold text-[#23508b] transition hover:bg-[#23508b] hover:text-white"
                  >
                    Login Super Admin
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 rounded-2xl border border-[#d7e5ff] bg-white p-6 text-sm text-[#345580] shadow-sm">
              <p className="text-base font-semibold text-[#0f305c]">
                Dokumentasi Pendaftaran
              </p>
              <ul className="space-y-2">
                <li>• Formulir dapat diisi 24 jam setelah akun dibuat.</li>
                <li>• Pastikan email aktif untuk menerima notifikasi.</li>
                <li>• Hubungi panitia PPDB apabila mengalami kendala.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/90 p-10 shadow-xl">
          <h2 className="text-center text-2xl font-semibold text-[#0f305c]">
            Alur Pendaftaran PPDB Online
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#45628a]">
            Ikuti tahapan berikut untuk memastikan proses pendaftaran berjalan
            lancar. Setiap langkah dapat dipantau melalui Dashboard Calon Siswa.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-[28px] border border-[#dfeaff] bg-[#f7faff] p-8 shadow-sm"
              >
                <span className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#1b3c69] text-sm font-semibold text-white shadow-md">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#0f305c]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[#45628a]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#102747] p-10 text-[#d2e3ff] shadow-xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Pusat Informasi PPDB
              </h2>
              <p className="text-sm text-[#c5d7ff]">
                Panitia PPDB siap membantu Anda selama proses pendaftaran.
                Silakan hubungi kontak berikut apabila membutuhkan bantuan lebih
                lanjut.
              </p>
            </div>
            <div className="space-y-4 text-sm">
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
