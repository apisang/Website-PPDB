import Link from "next/link";

export const metadata = {
  title: "Guru & Tenaga Pendidikan - SMK Taruna Bhakti Depok",
  description: "Profil guru dan tenaga pendidikan SMK Taruna Bhakti Depok",
};

export default function GuruTenagaPendidikanPage() {
  const guruData = [
    {
      nama: "Dr. Ahmad Santoso, M.Pd.",
      jabatan: "Kepala Sekolah",
      bidang: "Administrasi & Manajemen",
      pengalaman: "20 tahun",
      pendidikan: "S3 Pendidikan Teknologi",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=KS"
    },
    {
      nama: "Dra. Siti Aminah, M.Pd.",
      jabatan: "Wakil Kepala Sekolah",
      bidang: "Kurikulum & Pembelajaran",
      pengalaman: "18 tahun",
      pendidikan: "S2 Pendidikan Matematika",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=WKS"
    },
    {
      nama: "Ahmad Rahman, S.Kom.",
      jabatan: "Guru Produktif TKJ",
      bidang: "Teknik Jaringan Komputer",
      pengalaman: "12 tahun",
      pendidikan: "S1 Teknik Informatika",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=TKJ"
    },
    {
      nama: "Siti Nurhaliza, S.Kom.",
      jabatan: "Guru Produktif RPL",
      bidang: "Rekayasa Perangkat Lunak",
      pengalaman: "10 tahun",
      pendidikan: "S1 Teknik Informatika",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=RPL"
    },
    {
      nama: "Budi Santoso, S.Sn.",
      jabatan: "Guru Produktif Animasi",
      bidang: "Desain & Animasi Digital",
      pengalaman: "8 tahun",
      pendidikan: "S1 Desain Komunikasi Visual",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=ANM"
    },
    {
      nama: "Dewi Lestari, S.T.",
      jabatan: "Guru Produktif Elektro",
      bidang: "Teknik Elektro",
      pengalaman: "15 tahun",
      pendidikan: "S1 Teknik Elektro",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=TE"
    }
  ];

  const tenagaPendidikan = [
    {
      nama: "Maya Sari, S.E.",
      jabatan: "Kepala Tata Usaha",
      bidang: "Administrasi & Keuangan",
      pengalaman: "14 tahun",
      pendidikan: "S1 Ekonomi",
      foto: "https://dummyimage.com/120x120/eff6ff/1b3c69.png&text=TU"
    },
    {
      nama: "Rizki Pratama, A.Md.",
      jabatan: "Laboran Komputer",
      bidang: "Teknis & Laboratorium",
      pengalaman: "6 tahun",
      pendidikan: "D3 Teknik Informatika",
      foto: "https://dummyimage.com/120x120/eff6ff/1b3c69.png&text=LAB"
    },
    {
      nama: "Nina Kurnia, S.Pd.",
      jabatan: "Pustakawan",
      bidang: "Perpustakaan & Informasi",
      pengalaman: "9 tahun",
      pendidikan: "S1 Ilmu Perpustakaan",
      foto: "https://dummyimage.com/120x120/eff6ff/1b3c69.png&text=PUS"
    },
    {
      nama: "Fajar Nugroho",
      jabatan: "Petugas Keamanan",
      bidang: "Keamanan & Ketertiban",
      pengalaman: "11 tahun",
      pendidikan: "SMA",
      foto: "https://dummyimage.com/120x120/eff6ff/1b3c69.png&text=SECURITY"
    }
  ];

  const statistik = [
    { label: "Total Guru", value: "24", icon: "👨‍🏫" },
    { label: "Guru Sertifikasi", value: "20", icon: "📜" },
    { label: "Tenaga Pendidikan", value: "12", icon: "👥" },
    { label: "Rata-rata Pengalaman", value: "12 tahun", icon: "⏰" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      {/* Back Button */}
      <div className="mx-auto max-w-6xl px-6 py-4">
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

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-3xl bg-white/90 p-12 shadow-xl backdrop-blur animate-fade-in-up">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Guru & Tenaga Pendidikan</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Profil tenaga pengajar dan pendidik profesional SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Statistik */}
          <section className="mb-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statistik.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center rounded-2xl bg-gradient-to-br from-white to-[#f8fafc] p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                  <p className="text-sm text-[#45628a]">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Guru Pengajar */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center flex items-center justify-center gap-3">
              <svg className="h-8 w-8 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              Guru Pengajar
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {guruData.map((guru, index) => (
                <div
                  key={guru.nama}
                  className="rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1b3c69] shadow-md">
                      <img
                        src={guru.foto}
                        alt={guru.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a3763] text-sm">{guru.nama}</h3>
                      <p className="text-xs text-[#0f305c] font-semibold">{guru.jabatan}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#45628a]">Bidang:</span>
                      <span className="font-semibold text-[#1a3763]">{guru.bidang}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#45628a]">Pengalaman:</span>
                      <span className="font-semibold text-[#1a3763]">{guru.pengalaman}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#45628a]">Pendidikan:</span>
                      <span className="font-semibold text-[#1a3763]">{guru.pendidikan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tenaga Pendidikan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center flex items-center justify-center gap-3">
              <svg className="h-8 w-8 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Tenaga Pendidikan
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {tenagaPendidikan.map((tenaga, index) => (
                <div
                  key={tenaga.nama}
                  className="flex items-center gap-6 rounded-2xl bg-gradient-to-r from-white to-[#f8fafc] p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1b3c69] shadow-md">
                    <img
                      src={tenaga.foto}
                      alt={tenaga.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a3763] mb-1">{tenaga.nama}</h3>
                    <p className="text-sm font-semibold text-[#0f305c] mb-2">{tenaga.jabatan}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#45628a]">Bidang:</span>
                        <p className="font-semibold text-[#1a3763]">{tenaga.bidang}</p>
                      </div>
                      <div>
                        <span className="text-[#45628a]">Pengalaman:</span>
                        <p className="font-semibold text-[#1a3763]">{tenaga.pengalaman}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Komitmen */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Komitmen Kami</h3>
              <p className="text-base leading-relaxed opacity-90 mb-6">
                Tim pengajar dan tenaga pendidikan SMK Taruna Bhakti Depok berkomitmen untuk
                memberikan pendidikan berkualitas tinggi dan membimbing siswa menuju kesuksesan
                di era digital.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur">
                  ✓ Profesional & Berkompeten
                </div>
                <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur">
                  ✓ Inovatif & Kreatif
                </div>
                <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur">
                  ✓ Dedikasi Tinggi
                </div>
                <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur">
                  ✓ Berintegritas
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Link
              href="/profil/struktur-organisasi"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b3c69] text-[#1b3c69] px-6 py-3 font-semibold hover:bg-[#1b3c69] hover:text-white transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
