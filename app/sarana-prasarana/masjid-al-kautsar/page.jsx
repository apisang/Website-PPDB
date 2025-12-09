import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/layout/MainNavbar";

export const metadata = {
  title: "Masjid Al-Kautsar - SMK Taruna Bhakti Depok",
  description: "Fasilitas masjid Al-Kautsar sebagai sarana ibadah siswa SMK Taruna Bhakti Depok",
};

export default function MasjidAlKautsarPage() {
  const fasilitas = [
    {
      icon: "🕌",
      title: "Ruang Sholat Utama",
      description: "Ruang sholat utama berkapasitas 200 jamaah dengan karpet dan mukena tersedia"
    },
    {
      icon: "📖",
      title: "Ruang Tadarus",
      description: "Ruang khusus untuk tadarus Al-Quran dan kajian keagamaan"
    },
    {
      icon: "🕋",
      title: "Musholla Kecil",
      description: "Musholla kecil di setiap lantai untuk sholat dhuhur dan istirahat"
    },
    {
      icon: "🧼",
      title: "Fasilitas Wudhu",
      description: "Area wudhu yang bersih dan terawat dengan air mengalir"
    }
  ];

  const kegiatan = [
    {
      waktu: "Pagi (06:30-07:00)",
      kegiatan: "Sholat Subuh Berjamaah",
      deskripsi: "Sholat subuh diikuti dengan tadarus Al-Quran"
    },
    {
      waktu: "Siang (12:00-13:00)",
      kegiatan: "Sholat Dhuhur & Istirahat",
      deskripsi: "Sholat dhuhur berjamaah dan waktu istirahat siswa"
    },
    {
      waktu: "Sore (17:30-18:00)",
      kegiatan: "Sholat Ashar & Maghrib",
      deskripsi: "Sholat ashar dan maghrib berjamaah"
    },
    {
      waktu: "Malam (19:00-20:00)",
      kegiatan: "Kajian Rutin",
      deskripsi: "Kajian Islam mingguan dan pengajian siswa"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      <MainNavbar activePath="/sarana-prasarana/masjid-al-kautsar" />
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Masjid Al-Kautsar</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Pusat kegiatan ibadah dan spiritual siswa SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b3c69] to-[#0f305c] animate-fade-in-up">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🕌</div>
                  <h2 className="text-2xl font-bold mb-2">Masjid Al-Kautsar</h2>
                  <p className="text-lg opacity-90">Berkah, Kedamaian, dan Spiritualitas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deskripsi */}
          <section className="mb-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-[#1a3763] mb-6">Tentang Masjid Al-Kautsar</h2>
                <div className="space-y-4 text-base text-[#45628a] leading-relaxed">
                  <p>
                    Masjid Al-Kautsar merupakan fasilitas ibadah utama di SMK Taruna Bhakti Depok
                    yang dirancang khusus untuk mendukung kegiatan spiritual siswa dan seluruh
                    warga sekolah.
                  </p>
                  <p>
                    Dengan arsitektur yang megah dan fasilitas yang lengkap, masjid ini tidak hanya
                    berfungsi sebagai tempat ibadah, tetapi juga sebagai pusat pembinaan akhlak
                    dan karakter siswa.
                  </p>
                  <p>
                    Masjid ini dinamai Al-Kautsar yang berarti "sumber kebaikan yang melimpah"
                    sebagai harapan agar siswa-siswi SMK Taruna Bhakti dapat menjadi sumber
                    kebaikan bagi masyarakat dan bangsa.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Filosofi Nama</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">✦</span>
                      <div>
                        <strong>Al-Kautsar</strong> - Sumber kebaikan yang melimpah
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">✦</span>
                      <div>
                        <strong>Spiritual</strong> - Pembinaan spiritual siswa
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">✦</span>
                      <div>
                        <strong>Karakter</strong> - Pembentukan akhlak mulia
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">✦</span>
                      <div>
                        <strong>Kebersamaan</strong> - Silaturahmi sesama muslim
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fasilitas */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Fasilitas Masjid</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {fasilitas.map((item, index) => (
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

          {/* Jadwal Kegiatan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Jadwal Kegiatan Ibadah</h2>
            <div className="overflow-hidden rounded-2xl border border-[#e0ecff] bg-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {kegiatan.map((item, index) => (
                  <div
                    key={item.kegiatan}
                    className="p-6 border-r border-[#e0ecff] last:border-r-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#0f305c] mb-2">{item.waktu}</div>
                      <h3 className="font-bold text-[#1a3763] mb-3">{item.kegiatan}</h3>
                      <p className="text-xs text-[#45628a] leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visi dan Misi */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Visi Masjid Al-Kautsar</h3>
              <p className="text-base text-green-700 leading-relaxed mb-6">
                Menjadi pusat ibadah dan pembinaan spiritual yang mampu mencetak generasi
                muslim yang beriman, berilmu, dan berakhlak mulia.
              </p>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">Iman & Taqwa</div>
                  <p className="text-green-700">Memperkuat keimanan dan ketakwaan siswa</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">Ilmu & Amal</div>
                  <p className="text-green-700">Mengintegrasikan ilmu dengan amal shaleh</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">Akhlaq Mulia</div>
                  <p className="text-green-700">Membentuk karakter yang mulia dan beradab</p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link
              href="/sarana-prasarana/ruang-bimbingan-konseling"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] px-6 py-3 text-white font-semibold hover-lift transition"
            >
              Ruang Bimbingan Konseling
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
