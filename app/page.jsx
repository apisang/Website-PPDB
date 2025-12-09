  "use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MainNavbar from "@/components/layout/MainNavbar";

const majors = [
  {
    title: "Teknik Elektro",
    code: "TE",
    image: "TE.png",
    description: "Mengembangkan keahlian di bidang kelistrikan dan elektronika modern"
  },
  {
    title: "Teknik Jaringan Komputer",
    code: "TKJ",
    image: "tkj.png",
    description: "Membangun dan mengelola infrastruktur jaringan komputer profesional"
  },
  {
    title: "Animasi",
    code: "ANM",
    image: "anim.png",
    description: "Menciptakan karya animasi 2D dan 3D yang kreatif dan inovatif"
  },
  {
    title: "Rekayasa Perangkat Lunak",
    code: "RPL",
    image: "rpl.png",
    description: "Mengembangkan aplikasi dan sistem perangkat lunak berkualitas tinggi"
  },
  {
    title: "Broadcasting & Perfilman",
    code: "BRF",
    image: "/brf.png",
    description: "Menguasai produksi siaran, film, dan konten multimedia profesional"
  },
  {
    title: "Desain Komunikasi Visual",
    code: "DKV",
    image: "dkv.png",
    description: "Mendesain visual komunikasi yang efektif dan menarik perhatian"
  },
];

const achievements = [
  {
    title: "Juara 1 LKS Nasional 2024",
    description: "Tim RPL membawa pulang medali emas pada ajang kompetisi teknologi tingkat nasional.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "Sertifikasi Kompetensi BNSP",
    description: "Lebih dari 120 siswa lulus uji kompetensi dan memperoleh lisensi resmi bidang teknologi.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Juara 2 Kompetisi Robotik Nasional",
    description: "Tim sekolah berhasil meraih prestasi membanggakan di ajang robotik tingkat nasional.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Akhlaqul Karimah Award",
    description: "Sekolah terpilih sebagai sekolah berkarakter terbaik di tingkat kota Depok.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    color: "from-pink-500 to-pink-600",
  },
];

const news = [
  {
    title: "Maulid Nabi Muhammad SAW: Saatnya Meneladani Akhlak Mulia",
    description: "SMK Taruna Bhakti menggelar peringatan Maulid Nabi Muhammad SAW dengan tema meneladani akhlak mulia sebagai bekal kehidupan.",
    date: "Kamis, 9 Oktober 2025",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
    category: "Berita Terbaru"
  },
  {
    title: "Khidmat Peringatan Hari Kesaktian Pancasila di SMK Taruna Bhakti",
    description: "Siswa-siswi SMK Taruna Bhakti mengikuti upacara peringatan Hari Kesaktian Pancasila dengan khidmat dan penuh semangat kebangsaan.",
    date: "Rabu, 1 Oktober 2025",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Kilau Medali Starbhak di POPDA XIV Jabar 2025",
    description: "Siswa SMK Taruna Bhakti berhasil meraih medali emas dalam Pekan Olahraga Pelajar Daerah (POPDA) XIV Jawa Barat 2025.",
    date: "Kamis, 25 September 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "SMK Taruna Bhakti Goes National: Raih 1st Best Speaker NSDC 2025",
    description: "Siswa SMK Taruna Bhakti berhasil meraih juara 1 Best Speaker dalam National Student Debate Championship (NSDC) 2025 Jawa Barat.",
    date: "Rabu, 24 September 2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Workshop Teknologi AI untuk Siswa",
    description: "SMK Taruna Bhakti mengadakan workshop teknologi kecerdasan buatan untuk meningkatkan kompetensi siswa di era digital.",
    date: "Selasa, 15 September 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Pelatihan Kewirausahaan untuk Siswa RPL",
    description: "Program pelatihan kewirausahaan intensif bagi siswa Rekayasa Perangkat Lunak untuk membekali keterampilan bisnis di era digital.",
    date: "Senin, 8 September 2025",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Kunjungan Industri ke PT. Telkom Indonesia",
    description: "Siswa jurusan Teknik Jaringan Komputer melakukan kunjungan industri untuk memahami praktik dunia kerja di perusahaan telekomunikasi.",
    date: "Jumat, 5 September 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Pameran Karya Siswa Teknik Elektro",
    description: "Pameran inovasi dan karya siswa jurusan Teknik Elektro menampilkan berbagai proyek elektronika canggih dan aplikatif.",
    date: "Kamis, 28 Agustus 2025",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Lomba Desain Grafis Tingkat Kota",
    description: "Siswa Desain Komunikasi Visual berhasil meraih juara 2 dalam lomba desain grafis tingkat kota Depok dengan karya yang kreatif.",
    date: "Rabu, 20 Agustus 2025",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Seminar Karir: Persiapan Masuk Dunia Kerja",
    description: "Seminar karir dengan menghadirkan alumni sukses dan praktisi industri untuk membekali siswa persiapan memasuki dunia kerja.",
    date: "Selasa, 12 Agustus 2025",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Workshop Animasi 3D untuk Siswa DKV",
    description: "Pelatihan intensif software animasi 3D menggunakan Blender untuk siswa Desain Komunikasi Visual dalam rangka meningkatkan kompetensi.",
    date: "Senin, 5 Agustus 2025",
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Kompetisi Robotik Tingkat Provinsi",
    description: "Tim robotik SMK Taruna Bhakti berhasil meraih medali perunggu dalam kompetisi robotik tingkat provinsi Jawa Barat.",
    date: "Minggu, 28 Juli 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Pelatihan Broadcasting untuk Siswa BRF",
    description: "Program pelatihan produksi siaran dan perfilman intensif bagi siswa Broadcasting & Perfilman untuk persiapan dunia entertainment.",
    date: "Jumat, 25 Juli 2025",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Juara 3 Lomba Karya Tulis Ilmiah Nasional",
    description: "Siswa SMK Taruna Bhakti meraih juara 3 dalam lomba karya tulis ilmiah nasional dengan tema inovasi teknologi masa depan.",
    date: "Rabu, 22 Juli 2025",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Kunjungan Study Banding ke SMKN 1 Jakarta",
    description: "Kunjungan study banding ke sekolah unggulan untuk belajar praktik terbaik dalam pengelolaan pendidikan vokasi.",
    date: "Selasa, 15 Juli 2025",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Workshop IoT untuk Siswa Teknik Elektro",
    description: "Pelatihan Internet of Things (IoT) dengan hands-on project untuk siswa Teknik Elektro dalam rangka persiapan industri 4.0.",
    date: "Senin, 8 Juli 2025",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Peringatan Hari Kemerdekaan RI ke-80",
    description: "Upacara bendera dan berbagai kegiatan patriotik untuk memperingati hari kemerdekaan Republik Indonesia yang ke-80.",
    date: "Jumat, 17 Agustus 2025",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Lomba Pidato Bahasa Inggris Tingkat Kota",
    description: "Siswa SMK Taruna Bhakti meraih juara harapan dalam lomba pidato bahasa Inggris tingkat kota Depok.",
    date: "Kamis, 10 Juli 2025",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Pelatihan Digital Marketing untuk Siswa RPL",
    description: "Workshop digital marketing dan e-commerce untuk siswa Rekayasa Perangkat Lunak dalam rangka membekali keterampilan bisnis online.",
    date: "Rabu, 2 Juli 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Turnamen Basket Antar Sekolah",
    description: "Tim basket SMK Taruna Bhakti berhasil menjadi juara 2 dalam turnamen basket antar sekolah tingkat kota Depok.",
    date: "Minggu, 29 Juni 2025",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Workshop Cybersecurity untuk Siswa TKJ",
    description: "Pelatihan keamanan siber dan ethical hacking bagi siswa Teknik Jaringan Komputer untuk menghadapi tantangan keamanan digital.",
    date: "Jumat, 27 Juni 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Pameran Inovasi Siswa Animasi",
    description: "Pameran karya animasi siswa yang menampilkan film pendek, motion graphics, dan karakter animasi yang kreatif dan inovatif.",
    date: "Kamis, 19 Juni 2025",
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
  {
    title: "Kunjungan ke Museum Telekomunikasi",
    description: "Kunjungan edukasi ke museum telekomunikasi untuk mempelajari sejarah dan perkembangan teknologi komunikasi di Indonesia.",
    date: "Selasa, 17 Juni 2025",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600&auto=format&fit=crop",
    category: "Kegiatan Sekolah"
  },
  {
    title: "Lomba Fotografi Tingkat Provinsi",
    description: "Siswa Desain Komunikasi Visual meraih juara 1 dalam lomba fotografi tingkat provinsi dengan tema 'Kearifan Lokal Nusantara'.",
    date: "Minggu, 15 Juni 2025",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop",
    category: "Prestasi"
  },
];

const editorial = {
  name: "Dr. Lely Ersastri, M. Pd",
  position: "Kepala Sekolah",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  message: "Selamat datang di SMK Taruna Bhakti, sekolah yang mengedepankan pendidikan karakter dan kompetensi untuk membentuk generasi unggul, kreatif, dan berdaya saing."
};

const articleLinks = [
  "KEMBALI KE RUMAH: Menyongsong Harapan Baru di SMK Taruna Bhakti",
  "CYBER BULLYING: Luka yang tak terlihat, dampak nyata",
  "SEMANGAT BARU, HARAPAN BARU: SMK Taruna Bhakti melangkah maju",
  "ESTAFET KEPEMIMPINAN: Menapaki babak Baru SMK Taruna Bhakti",
  "DEEP LEARNING: Menuju Pendidikan yang Lebih Bermakna"
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop";
const LOGO_IMAGE = "/logo.png";

export default function Home() {
  const [currentMajorSlide, setCurrentMajorSlide] = useState(0);
  const [currentAchievementSlide, setCurrentAchievementSlide] = useState(0);

  useEffect(() => {
    const majorTimer = setInterval(() => {
      setCurrentMajorSlide((prev) => (prev + 1) % majors.length);
    }, 4000);
    return () => clearInterval(majorTimer);
  }, []);

  useEffect(() => {
    const achievementTimer = setInterval(() => {
      setCurrentAchievementSlide((prev) => (prev + 1) % achievements.length);
    }, 4500);
    return () => clearInterval(achievementTimer);
  }, []);

  const nextMajorSlide = () => {
    setCurrentMajorSlide((prev) => (prev + 1) % majors.length);
  };

  const prevMajorSlide = () => {
    setCurrentMajorSlide((prev) => (prev - 1 + majors.length) % majors.length);
  };

  const nextAchievementSlide = () => {
    setCurrentAchievementSlide((prev) => (prev + 1) % achievements.length);
  };

  const prevAchievementSlide = () => {
    setCurrentAchievementSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff] text-[#16365f] relative">
      <MainNavbar activePath="/" />

      <main className="space-y-10 lg:space-y-16">
        {/* Hero Section */}
        <section className="relative h-[350px] lg:h-[450px] overflow-hidden bg-gradient-to-br from-[#1f3f6d] to-[#0e365f] shadow-2xl">
          <Image
            src="/tiba.png"
            alt="Siswa SMK Taruna Bhakti"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e3b]/95 via-[#0f2547]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center text-white max-w-3xl">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 drop-shadow-lg">Selamat Datang di</h1>
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-2">SMK Taruna Bhakti Depok</h2>
              <p className="text-base lg:text-lg opacity-95 mb-6">Unggul, Kreatif, Berdaya Saing</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link 
                  href="/ppdb" 
                  className="rounded-full bg-white text-[#1b3c69] px-6 py-2.5 text-sm font-semibold hover:bg-gray-100 transition hover:shadow-xl hover:-translate-y-1"
                >
                  Daftar PPDB
                </Link>
                <Link 
                  href="/profil/sejarah-sekolah" 
                  className="rounded-full border-2 border-white text-white px-6 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1b3c69] transition"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
          </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-5">
          {/* Background biru muda */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff]"></div>
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-2xl bg-white p-5 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-56 h-auto bg-white shadow-lg rounded-xl border-2 border-[#e4f1ff] flex items-center justify-center p-4">
                <Image
                  src="/tb.png"
                  alt="Logo SMK Taruna Bhakti"
                  width={224}
                  height={224}
                  unoptimized
                  className="object-contain w-full h-auto"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1b3c69] mb-3">SMK Taruna Bhakti Depok</h1>
              <p className="text-lg lg:text-xl font-semibold text-[#24497b] mb-1.5">YAYASAN SETYA BHAKTI</p>
              <p className="text-sm lg:text-base text-[#46658f] mb-4">Depok • Unggul, Kreatif, Berdaya Saing</p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white p-5 lg:p-7 shadow-md border border-[#e2e8f0]">
              <h3 className="mb-4 text-xl lg:text-2xl font-bold text-[#1a3763] flex items-center gap-2">
                <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#1b3c69]/10">
                  <svg className="h-5 w-5 lg:h-6 lg:w-6 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                Visi
              </h3>
              <p className="text-base lg:text-lg leading-relaxed text-[#2d4e7a]">
                Menghasilkan lulusan yang kompeten dalam IPTEK DAN IMTAQ, serta mampu bersaing pada tingkat nasional dan global.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 lg:p-7 shadow-md border border-[#e2e8f0]">
              <h3 className="mb-4 text-xl lg:text-2xl font-bold text-[#1a3763] flex items-center gap-2">
                <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#1b3c69]/10">
                  <svg className="h-5 w-5 lg:h-6 lg:w-6 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                Misi
              </h3>
              <ul className="space-y-3 text-base lg:text-lg text-[#2d4e7a]">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-xs lg:text-sm font-bold mt-0.5">1</span>
                  <span>Menumbuhkan semangat kreatifitas, berdaya saing dan kompetitif kepada seluruh warga sekolah.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-xs lg:text-sm font-bold mt-0.5">2</span>
                  <span>Melaksanakan kurikulum melalui pembelajaran dan penilaian berbasis kompetensi, Berbasis wirausaha, berwawasan lingkungan dan berlandaskan kejujuran.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-xs lg:text-sm font-bold mt-0.5">3</span>
                  <span>Meningkatkan kualitas sumber daya manusia melalui sertifikasi Kompetensi Tingkat Nasional dan Internasional.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-xs lg:text-sm font-bold mt-0.5">4</span>
                  <span>Mengembangkan potensi peserta didik melalui kegiatan Minat dan Bakat dan pembinaan kedisiplinan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-xs lg:text-sm font-bold mt-0.5">5</span>
                  <span>Menerapkan layanan prima dalam pengelolaan sekolah melalui Sistem Manajemen Mutu.</span>
                </li>
              </ul>
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* Majors Slideshow Section */}
        <section className="relative py-3">
          {/* Background biru muda yang menyatu dengan section di atas */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eaf4ff] via-[#f0f7ff] to-[#e8f3ff]"></div>
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-2xl bg-white p-5 lg:p-8 shadow-xl">
              <div className="mb-6 text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1b3c69] mb-3">
              Jurusan yang Tersedia
            </h2>
            <p className="text-base lg:text-lg text-[#46658f] max-w-3xl mx-auto">
              Pilih jurusan impianmu dan wujudkan masa depan gemilang dengan 6 program keahlian unggulan
            </p>
              </div>

              <div className="relative">
            <div className="relative h-[250px] lg:h-[320px] overflow-hidden rounded-2xl bg-white shadow-lg">
              {majors.map((major, index) => (
                <div
                  key={major.code}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentMajorSlide 
                      ? 'opacity-100 translate-x-0' 
                      : index < currentMajorSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="flex-1 flex flex-col justify-center p-4 lg:p-6">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-[#1b3c69]/10 text-[#1b3c69] font-bold text-xs lg:text-sm mb-2">
                          {major.code}
                        </span>
                      </div>
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#1a3763] mb-2">
                        {major.title}
                      </h3>
                      <p className="text-sm lg:text-base xl:text-lg text-[#4b6a90] leading-relaxed mb-4">
                        {major.description}
                      </p>
                      <Link
                        href="/ppdb"
                        className="inline-flex items-center gap-2 text-base lg:text-lg font-semibold text-[#1b3c69] hover:text-[#0f305c] transition group"
                      >
                        <span>Daftar Sekarang</span>
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    <div className="flex-1 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="relative h-36 w-36 lg:h-48 lg:w-48">
                          <Image
                            src={major.image}
                            alt={major.title}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevMajorSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMajorSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {majors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMajorSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentMajorSlide ? 'bg-[#1b3c69] w-8' : 'bg-[#cbd5e1] w-3'
                  }`}
                />
              ))}
            </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Slideshow Section */}
        <section className="relative py-5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#f5faff] to-[#f2f8ff]" />
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-2xl bg-white p-5 lg:p-8 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1b3c69] mb-3">Prestasi</h2>
                <p className="text-base lg:text-lg text-[#2f4f78] max-w-3xl">
                  Berikut pencapaian yang diperoleh siswa dalam bidang akademik maupun nonakademik sebagai bukti usaha, kemampuan, dan dedikasi selama belajar di sekolah.
                </p>
              </div>

              <div className="relative">
                <div className="relative h-[250px] lg:h-[280px] overflow-hidden rounded-2xl bg-white shadow-lg">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentAchievementSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="flex flex-col justify-center h-full p-5 lg:p-8">
                    <div className="max-w-3xl mx-auto text-center">
                      <div className={`inline-flex h-16 w-16 lg:h-18 lg:w-18 items-center justify-center rounded-full bg-gradient-to-br ${achievement.color} text-white mb-4 shadow-lg`}>
                        <div className="scale-110 lg:scale-125">
                          {achievement.icon}
                        </div>
                      </div>
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#1a3763] mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-base lg:text-lg xl:text-xl text-[#45628a] leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
                ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevAchievementSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextAchievementSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {achievements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAchievementSlide(index)}
                      className={`h-3 rounded-full transition-all ${
                        index === currentAchievementSlide ? 'bg-[#1b3c69] w-8' : 'bg-[#cbd5e1] w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white py-5 lg:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6">
              <div className="bg-yellow-400 px-4 py-2 inline-block mb-4">
                <span className="text-sm font-bold text-gray-900 uppercase">Berita Terbaru</span>
              </div>
            </div>

            {/* Infinite Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="flex animate-infinite-scroll gap-4 lg:gap-6" style={{ width: 'max-content' }}>
                {/* Duplicate items for seamless loop - render twice for infinite effect */}
                {[...news, ...news].map((item, index) => (
                  <div
                    key={`news-${index}`}
                    className="flex-shrink-0 w-[280px] lg:w-[320px] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-40 lg:h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-3 lg:p-4">
                      <div className="bg-yellow-400 px-2 py-1 inline-block mb-2">
                        <span className="text-xs font-semibold text-gray-900">{item.date}</span>
                      </div>
                      <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-2 leading-tight line-clamp-2 min-h-[2.5rem]">
                        {item.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                        {item.description}
                      </p>
                      <Link href="#" className="text-xs lg:text-sm text-[#1b3c69] hover:underline font-medium inline-flex items-center gap-1">
                        Baca Selengkapnya
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-r from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff] py-5 lg:py-8 text-[#1b3c69] border-t-2 border-[#cbd5e1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative h-8 w-8 bg-white shadow-lg overflow-hidden border-2 border-[#1b3c69]/20 rounded-lg flex items-center justify-center p-0.5">
                  <Image
                    src="/tb.png"
                    alt="Logo SMK Taruna Bhakti"
                    width={32}
                    height={32}
                    unoptimized
                    className="object-contain w-full h-full"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              <h3 className="text-base lg:text-lg font-bold text-[#1b3c69]">SMK Taruna Bhakti</h3>
              </div>
              <p className="text-sm lg:text-base font-medium text-[#1b3c69]">Unggul, Kreatif, Berdaya Saing</p>
              <p className="text-sm lg:text-base text-[#46658f]">Depok • Yayasan Setya Bhakti</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-base lg:text-lg font-bold text-[#1b3c69] border-b-2 border-[#1b3c69]/20 pb-1.5">Profile</h4>
              <ul className="space-y-2 text-sm lg:text-base">
                <li><Link href="/profil/sejarah-sekolah" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Sejarah Sekolah</Link></li>
                <li><Link href="/profil/struktur-organisasi" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Struktur Organisasi</Link></li>
                <li><Link href="/profil/guru-tenaga-pendidikan" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Guru & Tenaga Kependidikan</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base lg:text-lg font-bold text-[#1b3c69] border-b-2 border-[#1b3c69]/20 pb-1.5">Sarana-Prasarana</h4>
              <ul className="space-y-2 text-sm lg:text-base">
                <li><Link href="/sarana-prasarana/masjid-al-kautsar" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Masjid Al-Kautsar</Link></li>
                <li><Link href="/sarana-prasarana/ruang-bimbingan-konseling" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Ruang Bimbingan Konseling</Link></li>
                <li><Link href="/sarana-prasarana/pos-keamanan" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Pos Keamanan</Link></li>
                <li><Link href="/sarana-prasarana/kantin" className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block">Kantin</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base lg:text-lg font-bold text-[#1b3c69] border-b-2 border-[#1b3c69]/20 pb-1.5">Lainnya</h4>
              <ul className="space-y-2 text-sm lg:text-base">
                <li>
                  <Link
                    href="/ppdb"
                    className="text-[#46658f] hover:text-[#1b3c69] transition hover:translate-x-1 inline-block"
                  >
                    PPDB
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t-2 border-[#cbd5e1]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-sm lg:text-base text-[#46658f] font-medium">© 2025 SMK Taruna Bhakti Depok. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#46658f]">Follow Us:</span>
                <div className="flex gap-2">
                  <a href="#" className="h-8 w-8 rounded-full bg-white border border-[#cbd5e1] flex items-center justify-center text-[#1b3c69] hover:bg-[#1b3c69] hover:text-white transition shadow-sm">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="h-8 w-8 rounded-full bg-white border border-[#cbd5e1] flex items-center justify-center text-[#1b3c69] hover:bg-[#1b3c69] hover:text-white transition shadow-sm">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" className="h-8 w-8 rounded-full bg-white border border-[#cbd5e1] flex items-center justify-center text-[#1b3c69] hover:bg-[#1b3c69] hover:text-white transition shadow-sm">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
