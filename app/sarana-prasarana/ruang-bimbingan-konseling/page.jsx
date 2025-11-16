import Link from "next/link";

export const metadata = {
  title: "Ruang Bimbingan Konseling - SMK Taruna Bhakti Depok",
  description: "Fasilitas ruang bimbingan konseling untuk pembinaan siswa SMK Taruna Bhakti Depok",
};

export default function RuangBimbinganKonselingPage() {
  const layanan = [
    {
      icon: "🧠",
      title: "Konseling Akademik",
      description: "Bimbingan belajar, pemilihan jurusan, dan pengembangan potensi akademik"
    },
    {
      icon: "💭",
      title: "Konseling Pribadi",
      description: "Pendampingan masalah pribadi, emosi, dan psikologis siswa"
    },
    {
      icon: "🤝",
      title: "Konseling Sosial",
      description: "Bimbingan hubungan sosial, persahabatan, dan interaksi sosial"
    },
    {
      icon: "🎯",
      title: "Konseling Karier",
      description: "Pembinaan minat bakat dan persiapan karir masa depan"
    }
  ];

  const jadwalKonseling = [
    { hari: "Senin", waktu: "08:00 - 12:00", jenis: "Konseling Akademik" },
    { hari: "Selasa", waktu: "08:00 - 12:00", jenis: "Konseling Pribadi" },
    { hari: "Rabu", waktu: "08:00 - 12:00", jenis: "Konseling Sosial" },
    { hari: "Kamis", waktu: "08:00 - 12:00", jenis: "Konseling Karier" },
    { hari: "Jumat", waktu: "08:00 - 11:00", jenis: "Konseling Umum" }
  ];

  const prestasi = [
    { tahun: "2023", pencapaian: "100% Siswa mendapat bimbingan rutin" },
    { tahun: "2023", pencapaian: "95% Tingkat kepuasan siswa" },
    { tahun: "2022", pencapaian: "50+ Kasus berhasil ditangani" },
    { tahun: "2022", pencapaian: "15 Siswa berhasil mengatasi masalah akademik" }
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Ruang Bimbingan Konseling</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Pusat pembinaan dan pendampingan psikologis siswa SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b3c69] to-[#0f305c] animate-fade-in-up">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">💬</div>
                  <h2 className="text-2xl font-bold mb-2">BK Center</h2>
                  <p className="text-lg opacity-90">Mendengarkan, Memahami, Membantu</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deskripsi */}
          <section className="mb-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-[#1a3763] mb-6">Tentang Ruang BK</h2>
                <div className="space-y-4 text-base text-[#45628a] leading-relaxed">
                  <p>
                    Ruang Bimbingan Konseling (BK) SMK Taruna Bhakti Depok merupakan pusat
                    layanan pembinaan dan pendampingan psikologis yang profesional untuk
                    membantu siswa mengembangkan potensi diri secara optimal.
                  </p>
                  <p>
                    Dengan didukung oleh konselor yang berpengalaman dan fasilitas yang
                    nyaman, ruang BK ini menyediakan berbagai layanan konseling untuk
                    mendukung perkembangan akademik, pribadi, sosial, dan karier siswa.
                  </p>
                  <p>
                    Prinsip kerja ruang BK adalah "Mendengarkan tanpa menghakimi,
                    Memahami dengan empati, dan Membantu dengan solusi tepat" untuk
                    menciptakan lingkungan belajar yang kondusif.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Visi Ruang BK</h3>
                  <p className="text-base leading-relaxed opacity-90 mb-6">
                    Menjadi pusat bimbingan konseling terdepan yang mampu mencetak siswa
                    yang mandiri, berakhlak mulia, dan siap menghadapi tantangan masa depan.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Layanan konseling profesional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Pembinaan karakter siswa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Pengembangan potensi diri</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Pendampingan karir</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Layanan BK */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Layanan Bimbingan Konseling</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {layanan.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#1a3763] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#45628a] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Jadwal Konseling */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Jadwal Konseling</h2>
            <div className="overflow-hidden rounded-2xl border border-[#e0ecff] bg-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="grid grid-cols-1 md:grid-cols-5">
                {jadwalKonseling.map((jadwal, index) => (
                  <div
                    key={jadwal.hari}
                    className="p-6 text-center border-r border-[#e0ecff] last:border-r-0"
                  >
                    <div className="font-bold text-[#0f305c] mb-2">{jadwal.hari}</div>
                    <div className="text-sm text-[#45628a] mb-1">{jadwal.waktu}</div>
                    <div className="text-xs font-semibold text-[#1a3763]">{jadwal.jenis}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prestasi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Prestasi & Pencapaian</h2>
            <div className="grid gap-4 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {prestasi.map((item, index) => (
                <div
                  key={`${item.tahun}-${index}`}
                  className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-white to-[#f8fafc] p-6 shadow-lg border border-[#e0ecff]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white font-bold">
                    {item.tahun.slice(-2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a3763]">{item.pencapaian}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kontak BK */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Butuh Bantuan?</h3>
              <p className="text-base text-blue-700 leading-relaxed mb-6">
                Ruang Bimbingan Konseling SMK Taruna Bhakti Depok siap membantu Anda.
                Konsultasikan masalah Anda dengan konselor profesional kami.
              </p>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">📞 Telepon</div>
                  <p className="text-blue-700">(021) 123-4567 ext. 108</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">📧 Email</div>
                  <p className="text-blue-700">bk@smktarunabhakti.sch.id</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">🏢 Lokasi</div>
                  <p className="text-blue-700">Ruang BK Lt. 2 Gedung Utama</p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Link
              href="/sarana-prasarana/masjid-al-kautsar"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b3c69] text-[#1b3c69] px-6 py-3 font-semibold hover:bg-[#1b3c69] hover:text-white transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Masjid Al-Kautsar
            </Link>
            <Link
              href="/sarana-prasarana/pos-keamanan"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] px-6 py-3 text-white font-semibold hover-lift transition"
            >
              Pos Keamanan
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
