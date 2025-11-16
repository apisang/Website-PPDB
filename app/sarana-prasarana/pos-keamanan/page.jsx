import Link from "next/link";

export const metadata = {
  title: "Pos Keamanan - SMK Taruna Bhakti Depok",
  description: "Fasilitas pos keamanan untuk menjaga keamanan lingkungan sekolah SMK Taruna Bhakti Depok",
};

export default function PosKeamananPage() {
  const sistemKeamanan = [
    {
      icon: "👮‍♂️",
      title: "Petugas Keamanan 24 Jam",
      description: "Petugas keamanan profesional yang berjaga 24 jam penuh"
    },
    {
      icon: "📹",
      title: "CCTV Monitoring",
      description: "Sistem CCTV terintegrasi dengan 50+ kamera di seluruh area sekolah"
    },
    {
      icon: "🚪",
      title: "Akses Kontrol",
      description: "Sistem kontrol akses dengan kartu identitas untuk siswa dan guru"
    },
    {
      icon: "🚨",
      title: "Sistem Alarm",
      description: "Sistem alarm kebakaran dan keamanan terintegrasi"
    }
  ];

  const layananKeamanan = [
    {
      waktu: "06:00 - 07:00",
      aktivitas: "Patroli Pagi",
      deskripsi: "Memastikan keamanan sebelum siswa masuk"
    },
    {
      waktu: "07:00 - 15:00",
      aktivitas: "Pengawalan Aktivitas",
      deskripsi: "Mengawasi kegiatan belajar mengajar"
    },
    {
      waktu: "15:00 - 18:00",
      aktivitas: "Pengawalan Pulang",
      deskripsi: "Mengamankan proses pulang siswa"
    },
    {
      waktu: "18:00 - 06:00",
      aktivitas: "Penjagaan Malam",
      deskripsi: "Pengamanan gedung dan lingkungan"
    }
  ];

  const prosedurDarurat = [
    {
      situasi: "Kebakaran",
      tindakan: "Tekan tombol alarm, evakuasi melalui jalur darurat, hubungi pemadam kebakaran"
    },
    {
      situasi: "Bencana Alam",
      tindakan: "Ikuti prosedur evakuasi, hindari panik, berkumpul di titik kumpul aman"
    },
    {
      situasi: "Kecelakaan",
      tindakan: "Hubungi petugas keamanan, jangan memindahkan korban, siapkan bantuan medis"
    },
    {
      situasi: "Intrusi/Penyusup",
      tindakan: "Laporkan ke petugas keamanan, jangan konfrontasi langsung, amankan diri"
    }
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Pos Keamanan</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Pusat pengamanan dan pengawalan lingkungan SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b3c69] to-[#0f305c] animate-fade-in-up">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🛡️</div>
                  <h2 className="text-2xl font-bold mb-2">Security Center</h2>
                  <p className="text-lg opacity-90">Aman, Nyaman, Terlindungi</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deskripsi */}
          <section className="mb-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-[#1a3763] mb-6">Tentang Pos Keamanan</h2>
                <div className="space-y-4 text-base text-[#45628a] leading-relaxed">
                  <p>
                    Pos Keamanan SMK Taruna Bhakti Depok merupakan pusat komando pengamanan
                    yang bertugas menjaga keamanan dan ketertiban seluruh lingkungan sekolah
                    24 jam penuh.
                  </p>
                  <p>
                    Dengan sistem keamanan terintegrasi modern dan petugas keamanan yang
                    profesional, pos keamanan ini memastikan seluruh warga sekolah dapat
                    belajar dan beraktivitas dalam lingkungan yang aman dan nyaman.
                  </p>
                  <p>
                    Pos keamanan juga berperan sebagai pusat informasi darurat dan koordinasi
                    dalam menghadapi berbagai situasi emergency yang mungkin terjadi.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Motto Pos Keamanan</h3>
                  <p className="text-base leading-relaxed opacity-90 mb-6">
                    "Melindungi dengan Profesionalitas, Melayani dengan Ketulusan"
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Keamanan 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Respons Cepat</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Pengawalan Profesional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Koordinasi Darurat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sistem Keamanan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Sistem Keamanan Terintegrasi</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {sistemKeamanan.map((item, index) => (
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

          {/* Jadwal Pengamanan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Jadwal Pengamanan</h2>
            <div className="overflow-hidden rounded-2xl border border-[#e0ecff] bg-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {layananKeamanan.map((jadwal, index) => (
                  <div
                    key={jadwal.waktu}
                    className="p-6 text-center border-r border-[#e0ecff] last:border-r-0"
                  >
                    <div className="font-bold text-[#0f305c] mb-2">{jadwal.waktu}</div>
                    <h3 className="font-bold text-[#1a3763] mb-3">{jadwal.aktivitas}</h3>
                    <p className="text-xs text-[#45628a] leading-relaxed">{jadwal.deskripsi}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prosedur Darurat */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Prosedur Darurat</h2>
            <div className="grid gap-6 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {prosedurDarurat.map((prosedur, index) => (
                <div
                  key={prosedur.situasi}
                  className="rounded-2xl bg-gradient-to-br from-red-50 to-pink-100 p-6 border border-red-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white font-bold text-sm">
                      !
                    </div>
                    <h3 className="font-bold text-red-800">{prosedur.situasi}</h3>
                  </div>
                  <p className="text-sm text-red-700 leading-relaxed">{prosedur.tindakan}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Kontak Darurat */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 p-8 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Kontak Darurat</h3>
              <p className="text-base text-orange-700 leading-relaxed mb-6">
                Dalam situasi darurat, segera hubungi pos keamanan atau nomor darurat berikut:
              </p>
              <div className="grid gap-4 md:grid-cols-4 text-sm">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-orange-800 mb-2">📞 Pos Keamanan</div>
                  <p className="text-orange-700">(021) 123-4567 ext. 999</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-orange-800 mb-2">🚑 Ambulans</div>
                  <p className="text-orange-700">118</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-orange-800 mb-2">🚒 Pemadam</div>
                  <p className="text-orange-700">113</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-orange-800 mb-2">👮 Polisi</div>
                  <p className="text-orange-700">110</p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Link
              href="/sarana-prasarana/ruang-bimbingan-konseling"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b3c69] text-[#1b3c69] px-6 py-3 font-semibold hover:bg-[#1b3c69] hover:text-white transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Ruang BK
            </Link>
            <Link
              href="/sarana-prasarana/kantin"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] px-6 py-3 text-white font-semibold hover-lift transition"
            >
              Kantin
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
