"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "PPDB", href: "/ppdb" },
  {
    name: "Profile",
    children: [
      { name: "Sejarah Sekolah", href: "/profil/sejarah-sekolah" },
      { name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
      { name: "Guru & Tenaga Kependidikan", href: "/profil/guru-tenaga-pendidikan" },
    ],
  },
  {
    name: "Sarana-Prasarana",
    children: [
      { name: "Masjid Al-Kautsar", href: "/sarana-prasarana/masjid-al-kautsar" },
      { name: "Ruang Bimbingan Konseling", href: "/sarana-prasarana/ruang-bimbingan-konseling" },
      { name: "Pos Keamanan", href: "/sarana-prasarana/pos-keamanan" },
      { name: "Kantin", href: "/sarana-prasarana/kantin" },
    ],
  },
  { name: "Data Alumni", href: "/data-alumni" },
];

const majors = [
  {
    title: "Teknik Elektro",
    code: "TE",
    image: "https://dummyimage.com/140x140/f3f7ff/1b3c69.png&text=TE",
    description: "Mengembangkan keahlian di bidang kelistrikan dan elektronika modern"
  },
  {
    title: "Teknik Jaringan Komputer",
    code: "TKJ",
    image: "https://dummyimage.com/140x140/eff5ff/1b3c69.png&text=TKJ",
    description: "Membangun dan mengelola infrastruktur jaringan komputer profesional"
  },
  {
    title: "Animasi",
    code: "ANM",
    image: "https://dummyimage.com/140x140/f2f8ff/1b3c69.png&text=ANM",
    description: "Menciptakan karya animasi 2D dan 3D yang kreatif dan inovatif"
  },
  {
    title: "Rekayasa Perangkat Lunak",
    code: "RPL",
    image: "https://dummyimage.com/140x140/e8f2ff/1b3c69.png&text=RPL",
    description: "Mengembangkan aplikasi dan sistem perangkat lunak berkualitas tinggi"
  },
  {
    title: "Broadcasting & Perfilman",
    code: "BRF",
    image: "https://dummyimage.com/140x140/f0f7ff/1b3c69.png&text=BRF",
    description: "Menguasai produksi siaran, film, dan konten multimedia profesional"
  },
  {
    title: "Desain Komunikasi Visual",
    code: "DKV",
    image: "https://dummyimage.com/140x140/eef6ff/1b3c69.png&text=DKV",
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
    title: "Pembukaan PPDB 2025",
    description: "Pendaftaran resmi dibuka mulai 10 Januari 2025. Segera daftar untuk mendapatkan jalur beasiswa khusus.",
    date: "10 Jan 2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Open House Kampus",
    description: "Kunjungi kampus kami dan jelajahi fasilitas penunjang pembelajaran pada 24 Februari 2025.",
    date: "24 Feb 2025",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Webinar Karier Digital",
    description: "Ikuti webinar bersama alumni yang sukses di industri teknologi kreatif dan digital.",
    date: "2 Mar 2025",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Workshop Teknologi AI",
    description: "Pelatihan intensif tentang kecerdasan buatan dan implementasinya dalam dunia kerja.",
    date: "15 Mar 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Kompetisi Robotik Nasional",
    description: "Tim RPL meraih juara 2 dalam ajang kompetisi robotik tingkat nasional.",
    date: "20 Mar 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Kunjungan Industri",
    description: "Kunjungan ke perusahaan teknologi terkemuka untuk memperluas wawasan siswa.",
    date: "25 Mar 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop",
  },
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop";
const LOGO_IMAGE = "https://dummyimage.com/220x220/eff6ff/1b3c69.png&text=SMK+Taruna+Bhakti";

export default function Home() {
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [currentMajorSlide, setCurrentMajorSlide] = useState(0);
  const [currentAchievementSlide, setCurrentAchievementSlide] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState({
    day: '',
    date: '',
    month: '',
    year: '',
    time: ''
  });

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsSlide((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(newsTimer);
  }, []);

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

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      
      setCurrentDateTime({
        day: days[now.getDay()],
        date: now.getDate().toString().padStart(2, '0'),
        month: months[now.getMonth()],
        year: now.getFullYear().toString(),
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % news.length);
  };

  const prevNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + news.length) % news.length);
  };

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
    <div id="home" className="min-h-screen bg-gradient-to-b from-[#1b3c69] via-[#2d5a8f] to-[#d9eeff] text-[#16365f] relative">
      {/* Header */}
      <header className="relative sticky top-0 z-50 border-b border-white/50 bg-gradient-to-r from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff] shadow-sm">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-8 left-16 h-24 w-24 rounded-full bg-gradient-to-br from-[#d6e7ff] to-[#adc6f4] blur-2xl opacity-40" />
          <div className="absolute -bottom-10 right-24 h-20 w-20 rounded-full bg-gradient-to-br from-[#4a7bb8]/30 to-[#2d5a8f]/30 blur-xl" />
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="flex items-center gap-4 group relative z-10">
            <div className="flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white shadow-lg transition-transform group-hover:scale-110">
              <svg className="h-7 w-7 lg:h-8 lg:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] shadow" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#adc6f4]" />
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#0f305c] to-[#1b3c69] shadow" />
              <span className="ml-2 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#d6e7ff] to-[#adc6f4]" />
            </div>
          </Link>
          
          {/* Date & Time Display */}
          <div className="hidden lg:flex items-center gap-4 px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#cbd5e1] shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#1b3c69]">{currentDateTime.day}</span>
                <span className="text-sm text-[#46658f]">{currentDateTime.date} {currentDateTime.month} {currentDateTime.year}</span>
              </div>
            </div>
            <div className="h-6 w-px bg-[#cbd5e1]"></div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base font-semibold text-[#1b3c69]">{currentDateTime.time}</span>
            </div>
          </div>
          
          <nav className="hidden items-center gap-8 lg:gap-10 text-lg lg:text-xl font-medium text-[#24497b] lg:flex relative z-10">
            {navigation.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative transition hover:text-[#0f305c] py-2 px-1"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#1b3c69] transition-all duration-300 hover:w-full"></span>
                  </Link>
                );
              }
              return (
                <div key={item.name} className="group relative inline-flex items-center">
                  <button
                    type="button"
                    className="flex items-center gap-1 transition hover:text-[#0f305c] py-2 px-1"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.name}
                    <span className="text-xs transition group-hover:-translate-y-[2px]">▾</span>
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-full z-40 hidden w-64 -translate-x-1/2 pt-4 group-hover:block">
                    <div className="pointer-events-auto relative rounded-2xl bg-gradient-to-b from-[#0e365f] to-[#1b3c69] p-6 text-white shadow-2xl">
                      <span className="absolute left-1/2 top-0 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 rounded-sm bg-[#0e365f]" />
                      <div className="flex flex-col gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="rounded-xl text-lg font-semibold transition hover:text-[#d6e7ff] hover:bg-white/10 px-4 py-2 -mx-2"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="ml-4 flex items-center gap-3">
              <span className="hidden xl:inline-block h-6 w-px bg-[#dbe7ff]" />
              <button className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1b3c69] shadow-sm hover:bg-[#e2ecff] transition" aria-hidden="true">
                <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
              </button>
              <button className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1b3c69] shadow-sm hover:bg-[#e2ecff] transition" aria-hidden="true">
                <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/></svg>
              </button>
            </div>
            <Link
              href="/login/guru"
              className="ml-4 rounded-full bg-[#1b3c69] px-7 py-3 text-lg lg:text-xl font-semibold text-white transition hover:bg-[#0f305c] hover:shadow-lg hover:-translate-y-0.5"
            >
              Login
            </Link>
          </nav>

          <button className="lg:hidden text-[#24497b] hover:text-[#0f305c] p-2 relative z-10">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="space-y-16 lg:space-y-24">
        {/* Hero Section */}
        <section className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-[#1f3f6d] to-[#0e365f] shadow-2xl">
          <Image
            src={HERO_IMAGE}
            alt="Siswa SMK Taruna Bhakti"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e3b]/95 via-[#0f2547]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center text-white max-w-3xl">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 drop-shadow-lg">Selamat Datang di</h1>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-3">SMK Taruna Bhakti Depok</h2>
              <p className="text-lg lg:text-xl opacity-95 mb-8">Unggul, Kreatif, Berdaya Saing</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/ppdb" 
                  className="rounded-full bg-white text-[#1b3c69] px-8 py-4 font-semibold hover:bg-gray-100 transition hover:shadow-xl hover:-translate-y-1"
                >
                  Daftar PPDB
                </Link>
                <Link 
                  href="/profil/sejarah-sekolah" 
                  className="rounded-full border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#1b3c69] transition"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
          </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-8">
          {/* Background biru muda */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff]"></div>
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-3xl bg-white p-8 lg:p-16 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gradient-to-br from-[#e4f1ff] to-[#d9eeff] p-6 shadow-lg">
                <Image
                  src={LOGO_IMAGE}
                  alt="Logo SMK Taruna Bhakti"
                  fill
                  unoptimized
                  className="object-contain p-6"
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1b3c69] mb-4">SMK Taruna Bhakti Depok</h1>
              <p className="text-xl lg:text-2xl font-semibold text-[#24497b] mb-2">YAYASAN SETYA BHAKTI</p>
              <p className="text-base lg:text-lg text-[#46658f] mb-6">Depok • Unggul, Kreatif, Berdaya Saing</p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white p-8 lg:p-10 shadow-md border border-[#e2e8f0]">
              <h3 className="mb-5 text-3xl lg:text-4xl font-bold text-[#1a3763] flex items-center gap-3">
                <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-[#1b3c69]/10">
                  <svg className="h-7 w-7 lg:h-8 lg:w-8 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                Visi
              </h3>
              <p className="text-lg lg:text-xl leading-relaxed text-[#2d4e7a]">
                Menghasilkan lulusan yang kompeten dalam IPTEK DAN IMTAQ, serta mampu bersaing pada tingkat nasional dan global.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 lg:p-10 shadow-md border border-[#e2e8f0]">
              <h3 className="mb-5 text-3xl lg:text-4xl font-bold text-[#1a3763] flex items-center gap-3">
                <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-[#1b3c69]/10">
                  <svg className="h-7 w-7 lg:h-8 lg:w-8 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                Misi
              </h3>
              <ul className="space-y-4 text-lg lg:text-xl text-[#2d4e7a]">
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-sm lg:text-base font-bold mt-0.5">1</span>
                  <span>Menumbuhkan semangat kreatifitas, berdaya saing dan kompetitif kepada seluruh warga sekolah.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-sm lg:text-base font-bold mt-0.5">2</span>
                  <span>Melaksanakan kurikulum melalui pembelajaran dan penilaian berbasis kompetensi, Berbasis wirausaha, berwawasan lingkungan dan berlandaskan kejujuran.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-sm lg:text-base font-bold mt-0.5">3</span>
                  <span>Meningkatkan kualitas sumber daya manusia melalui sertifikasi Kompetensi Tingkat Nasional dan Internasional.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-sm lg:text-base font-bold mt-0.5">4</span>
                  <span>Mengembangkan potensi peserta didik melalui kegiatan Minat dan Bakat dan pembinaan kedisiplinan.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1b3c69] text-white text-sm lg:text-base font-bold mt-0.5">5</span>
                  <span>Menerapkan layanan prima dalam pengelolaan sekolah melalui Sistem Manajemen Mutu.</span>
                </li>
              </ul>
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* Majors Slideshow Section */}
        <section className="relative py-8">
          {/* Background biru muda yang menyatu dengan section di atas */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eaf4ff] via-[#f0f7ff] to-[#e8f3ff]"></div>
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-xl">
              <div className="mb-10 text-center">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1b3c69] mb-5">
              Jurusan yang Tersedia
            </h2>
            <p className="text-xl lg:text-2xl text-[#46658f] max-w-3xl mx-auto">
              Pilih jurusan impianmu dan wujudkan masa depan gemilang dengan 6 program keahlian unggulan
            </p>
              </div>

              <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-3xl bg-white shadow-lg">
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
                    <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
                      <div className="mb-6">
                        <span className="inline-block px-5 py-2.5 rounded-full bg-[#1b3c69]/10 text-[#1b3c69] font-bold text-base lg:text-lg mb-4">
                          {major.code}
                        </span>
                      </div>
                      <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1a3763] mb-5">
                        {major.title}
                      </h3>
                      <p className="text-xl lg:text-2xl xl:text-3xl text-[#4b6a90] leading-relaxed mb-8">
                        {major.description}
                      </p>
                      <Link
                        href="/ppdb"
                        className="inline-flex items-center gap-2 text-xl lg:text-2xl font-semibold text-[#1b3c69] hover:text-[#0f305c] transition group"
                      >
                        <span>Daftar Sekarang</span>
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    <div className="flex-1 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5f9ff] to-[#eaf4ff]">
                        <div className="relative h-64 w-64 lg:h-80 lg:w-80">
                          <Image
                            src={major.image}
                            alt={major.title}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevMajorSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMajorSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="relative py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#f5faff] to-[#f2f8ff]" />
          <div className="mx-auto w-full max-w-[92%] lg:max-w-[90%] px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-xl">
              <div className="mb-10">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1b3c69] mb-5">Prestasi</h2>
                <p className="text-xl lg:text-2xl text-[#2f4f78] max-w-3xl">
                  Berikut pencapaian yang diperoleh siswa dalam bidang akademik maupun nonakademik sebagai bukti usaha, kemampuan, dan dedikasi selama belajar di sekolah.
                </p>
              </div>

              <div className="relative">
                <div className="relative h-[400px] lg:h-[450px] overflow-hidden rounded-3xl bg-white shadow-lg">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentAchievementSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="flex flex-col justify-center h-full p-8 lg:p-12">
                    <div className="max-w-3xl mx-auto text-center">
                      <div className={`inline-flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-gradient-to-br ${achievement.color} text-white mb-6 shadow-lg`}>
                        <div className="scale-125 lg:scale-150">
                          {achievement.icon}
                        </div>
                      </div>
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3763] mb-5">
                        {achievement.title}
                      </h3>
                      <p className="text-xl lg:text-2xl xl:text-3xl text-[#45628a] leading-relaxed">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextAchievementSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="bg-white/90 p-8 lg:p-12 shadow-xl backdrop-blur-sm">
          <div className="mb-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1b3c69] mb-4">
              Berita Terbaru STARBHAK
            </h2>
            <p className="text-lg text-[#46658f]">Informasi terkini dan kegiatan menarik dari SMK Taruna Bhakti</p>
          </div>

          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-white/95 to-[#f8fafc]/95 shadow-lg">
              {news.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentNewsSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wide text-[#1b3c69]">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-[#1a3763] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-lg lg:text-xl text-[#4b6a90] leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-lg font-semibold text-[#1b3c69] hover:text-[#0f305c] transition cursor-pointer group">
                        <span>Selengkapnya</span>
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevNewsSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextNewsSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1b3c69] shadow-lg hover:bg-white transition hover:scale-110 z-10"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentNewsSlide ? 'bg-[#1b3c69] w-8' : 'bg-[#cbd5e1] w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[#1b3c69] py-16 lg:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-xl lg:text-2xl font-bold">SMK Taruna Bhakti</h3>
              <p className="text-base lg:text-lg text-gray-300">Unggul, Kreatif, Berdaya Saing</p>
              <p className="text-base lg:text-lg text-gray-300">Depok • Yayasan Setya Bhakti</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl lg:text-2xl font-semibold">Profile</h4>
              <ul className="space-y-2 text-base lg:text-lg">
                <li><Link href="/profil/sejarah-sekolah" className="text-gray-300 hover:text-white transition">Sejarah Sekolah</Link></li>
                <li><Link href="/profil/struktur-organisasi" className="text-gray-300 hover:text-white transition">Struktur Organisasi</Link></li>
                <li><Link href="/profil/guru-tenaga-pendidikan" className="text-gray-300 hover:text-white transition">Guru & Tenaga Kependidikan</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl lg:text-2xl font-semibold">Sarana-Prasarana</h4>
              <ul className="space-y-2 text-base lg:text-lg">
                <li><Link href="/sarana-prasarana/masjid-al-kautsar" className="text-gray-300 hover:text-white transition">Masjid Al-Kautsar</Link></li>
                <li><Link href="/sarana-prasarana/ruang-bimbingan-konseling" className="text-gray-300 hover:text-white transition">Ruang Bimbingan Konseling</Link></li>
                <li><Link href="/sarana-prasarana/pos-keamanan" className="text-gray-300 hover:text-white transition">Pos Keamanan</Link></li>
                <li><Link href="/sarana-prasarana/kantin" className="text-gray-300 hover:text-white transition">Kantin</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl lg:text-2xl font-semibold">Lainnya</h4>
              <ul className="space-y-2 text-base lg:text-lg">
                <li><Link href="/ppdb" className="text-gray-300 hover:text-white transition">PPDB</Link></li>
                <li><Link href="/data-alumni" className="text-gray-300 hover:text-white transition">Data Alumni</Link></li>
                <li><Link href="/login/guru" className="text-gray-300 hover:text-white transition">Login Guru</Link></li>
                <li><Link href="/login/siswa" className="text-gray-300 hover:text-white transition">Login Siswa</Link></li>
                <li><Link href="/login/super-admin" className="text-gray-300 hover:text-white transition">Login Super Admin</Link></li>
                <li><Link href="/register" className="text-gray-300 hover:text-white transition">Register</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 text-center">
            <p className="text-base lg:text-lg text-gray-300">© 2024 SMK Taruna Bhakti Depok. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
