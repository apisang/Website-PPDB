import Link from "next/link";

export const metadata = {
  title: "Kantin - SMK Taruna Bhakti Depok",
  description: "Fasilitas kantin sebagai tempat istirahat dan konsumsi siswa SMK Taruna Bhakti Depok",
};

export default function KantinPage() {
  const menuPopuler = [
    {
      nama: "Nasi Gudeg",
      harga: "Rp 15.000",
      deskripsi: "Nasi gudeg khas Yogyakarta dengan lauk ayam dan telur",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      nama: "Ayam Bakar Madu",
      harga: "Rp 18.000",
      deskripsi: "Ayam bakar dengan saus madu dan bumbu rempah",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      nama: "Sate Ayam",
      harga: "Rp 12.000",
      deskripsi: "Sate ayam dengan bumbu kacang dan lontong",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      nama: "Bakso Special",
      harga: "Rp 10.000",
      deskripsi: "Bakso urat dengan mie, tahu, dan pangsit",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  const fasilitas = [
    {
      icon: "🍽️",
      title: "Area Makan Indoor",
      description: "Ruang makan tertutup dengan AC dan musik"
    },
    {
      icon: "🌳",
      title: "Taman Outdoor",
      description: "Area makan terbuka dengan pemandangan taman"
    },
    {
      icon: "☕",
      title: "Kafe Siswa",
      description: "Area santai dengan berbagai minuman dan camilan"
    },
    {
      icon: "🛒",
      title: "Toko Sembako",
      description: "Toko kecil untuk kebutuhan sehari-hari siswa"
    }
  ];

  const jamOperasional = [
    { hari: "Senin - Jumat", buka: "06:30", tutup: "16:00" },
    { hari: "Sabtu", buka: "07:00", tutup: "14:00" },
    { hari: "Minggu", buka: "Tutup", tutup: "" }
  ];

  const testimoni = [
    {
      nama: "Ahmad Rahman",
      kelas: "XII RPL",
      komentar: "Makanannya enak dan harganya terjangkau. Pelayanannya juga ramah!",
      rating: 5
    },
    {
      nama: "Siti Nurhaliza",
      kelas: "XI TKJ",
      komentar: "Suasananya nyaman untuk istirahat. Menu variatif dan selalu fresh.",
      rating: 5
    },
    {
      nama: "Budi Santoso",
      kelas: "X ANIM",
      komentar: "Kantin favorit saya! Harganya murah tapi kualitasnya bagus.",
      rating: 4
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Kantin Sekolah</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Tempat istirahat dan kuliner favorit siswa SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b3c69] to-[#0f305c] animate-fade-in-up">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h2 className="text-2xl font-bold mb-2">Food Court</h2>
                  <p className="text-lg opacity-90">Enak, Murah, Berkualitas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deskripsi */}
          <section className="mb-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-[#1a3763] mb-6">Tentang Kantin Kami</h2>
                <div className="space-y-4 text-base text-[#45628a] leading-relaxed">
                  <p>
                    Kantin SMK Taruna Bhakti Depok merupakan pusat kuliner yang menyediakan
                    berbagai makanan dan minuman berkualitas untuk memenuhi kebutuhan nutrisi
                    siswa selama kegiatan belajar mengajar.
                  </p>
                  <p>
                    Dengan konsep food court modern, kantin ini menawarkan berbagai pilihan
                    menu dari makanan tradisional hingga western food, semua dengan harga
                    terjangkau dan kualitas terjamin.
                  </p>
                  <p>
                    Kantin juga dilengkapi dengan area istirahat yang nyaman, sehingga siswa
                    dapat bersantai dan mengisi energi sebelum melanjutkan kegiatan belajar.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Keunggulan Kantin</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Harga Terjangkau</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Kualitas Terjamin</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Menu Bervariasi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Area Nyaman</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Pelayanan Ramah</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-300">✓</span>
                      <span>Kebersihan Terjaga</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Menu Populer */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Menu Populer</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {menuPopuler.map((menu, index) => (
                <div
                  key={menu.nama}
                  className="flex items-center gap-6 rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a3763] mb-1">{menu.nama}</h3>
                    <p className="text-sm text-[#45628a] mb-2">{menu.deskripsi}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0f305c]">{menu.harga}</span>
                      <span className="text-sm">{menu.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fasilitas */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Fasilitas Kantin</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {fasilitas.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-white to-[#f8fafc] p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
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

          {/* Jam Operasional */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Jam Operasional</h2>
            <div className="overflow-hidden rounded-2xl border border-[#e0ecff] bg-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {jamOperasional.map((jadwal, index) => (
                  <div
                    key={jadwal.hari}
                    className="p-6 text-center border-r border-[#e0ecff] last:border-r-0"
                  >
                    <div className="font-bold text-[#0f305c] mb-2">{jadwal.hari}</div>
                    <div className="text-lg font-bold text-[#1a3763]">
                      {jadwal.buka} - {jadwal.tutup || "Tutup"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimoni */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Apa Kata Siswa?</h2>
            <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {testimoni.map((testi, index) => (
                <div
                  key={testi.nama}
                  className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-6 border border-green-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {"⭐".repeat(testi.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-green-800 mb-4 italic">"{testi.komentar}"</p>
                  <div className="text-xs text-green-700">
                    <div className="font-semibold">{testi.nama}</div>
                    <div>{testi.kelas}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Informasi Tambahan */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-100 p-8 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Informasi Penting</h3>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-purple-800 mb-2">💳 Pembayaran</div>
                  <p className="text-purple-700">Cash, QRIS, dan kartu siswa</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-purple-800 mb-2">🍽️ Hygiene</div>
                  <p className="text-purple-700">Standar kebersihan HACCP</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-purple-800 mb-2">📞 Kontak</div>
                  <p className="text-purple-700">(021) 123-4567 ext. 205</p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <Link
              href="/sarana-prasarana/pos-keamanan"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b3c69] text-[#1b3c69] px-6 py-3 font-semibold hover:bg-[#1b3c69] hover:text-white transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Pos Keamanan
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
