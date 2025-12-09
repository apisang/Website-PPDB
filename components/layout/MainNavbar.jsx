"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
];

export default function MainNavbar({ activePath }) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? "";
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    date: "",
    month: "",
    year: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      setCurrentDateTime({
        day: days[now.getDay()],
        date: now.getDate().toString().padStart(2, "0"),
        month: months[now.getMonth()],
        year: now.getFullYear().toString(),
        time: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Tutup dropdown saat berganti halaman
    setOpenDropdown(null);
  }, [currentPath]);

  const isParentActive = (item) => {
    if (item.href && item.href === currentPath) return true;
    if (item.children) {
      return item.children.some((child) => child.href === currentPath);
    }
    return false;
  };

  const isChildActive = (childHref) => childHref === currentPath;

  return (
    <header className="relative sticky top-0 z-50 border-b border-white/50 bg-gradient-to-r from-[#d9eeff] via-[#eaf4ff] to-[#d6e7ff] shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 left-16 h-24 w-24 rounded-full bg-gradient-to-br from-[#d6e7ff] to-[#adc6f4] blur-2xl opacity-40" />
        <div className="absolute -bottom-10 right-24 h-20 w-20 rounded-full bg-gradient-to-br from-[#4a7bb8]/30 to-[#2d5a8f]/30 blur-xl" />
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6 py-1">
        <Link href="/" className="flex items-center gap-1.5 group relative z-10">
          <div className="relative h-7 w-7 lg:h-8 lg:w-8 bg-white shadow-lg transition-transform group-hover:scale-110 overflow-hidden border-2 border-[#1b3c69]/20 rounded-lg flex items-center justify-center p-0.5">
            <Image
              src="/tb.png"
              alt="Logo SMK Taruna Bhakti"
              width={32}
              height={32}
              unoptimized
              className="object-contain w-full h-full"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#cbd5e1] shadow-sm relative z-10">
          <svg className="h-4 w-4 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#1b3c69]">{currentDateTime.day}</span>
            <span className="text-[10px] text-[#46658f]">
              {currentDateTime.date} {currentDateTime.month} {currentDateTime.year}
            </span>
          </div>
          <svg className="h-4 w-4 text-[#1b3c69] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-bold text-[#1b3c69]">{currentDateTime.time}</span>
        </div>

        <nav className="hidden items-center gap-2 lg:gap-3 text-xs lg:text-sm font-medium text-[#24497b] lg:flex relative z-10">
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const active = isParentActive(item);

            if (!hasChildren) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition hover:text-[#0f305c] py-1 px-0.5 ${active ? "text-[#0f305c] font-semibold" : ""}`}
                >
                  {item.name}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#1b3c69] transition-all duration-300 hover:w-full" />
                </Link>
              );
            }

            const isOpen = openDropdown === item.name;
            return (
              <div key={item.name} className="group relative inline-flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === item.name ? null : item.name))
                  }
                  className={`flex items-center gap-1 rounded-md px-2 py-1 transition hover:bg-white/60 hover:text-[#0f305c] ${
                    active ? "text-[#0f305c] font-semibold" : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {item.name}
                  <span className="text-[10px] transition group-hover:-translate-y-[1px]">
                    ▾
                  </span>
                </button>
                <div
                  className={`absolute left-1/2 top-full z-40 w-52 -translate-x-1/2 pt-2 ${
                    isOpen ? "block" : "hidden group-hover:block"
                  }`}
                >
                  <div className="relative rounded-lg bg-gradient-to-b from-[#0e365f] to-[#1b3c69] p-3 text-white shadow-2xl">
                    <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rotate-45 rounded-sm bg-[#0e365f]" />
                    <div className="flex flex-col gap-1.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`rounded-md text-sm font-semibold transition hover:text-[#d6e7ff] hover:bg-white/10 px-3 py-1 ${
                            isChildActive(child.href) ? "text-[#d6e7ff]" : ""
                          }`}
                          onClick={() => setOpenDropdown(null)}
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
          <div className="ml-2 flex items-center gap-1.5">
            <button className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eef4ff] text-[#1b3c69] shadow-sm hover:bg-[#e2ecff] transition" aria-hidden="true">
              <svg className="h-3.5 w-3.5 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
            <button className="flex h-6 w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-[#eef4ff] text-[#1b3c69] shadow-sm hover:bg-[#e2ecff] transition" aria-hidden="true">
              <svg className="h-3.5 w-3.5 lg:h-4 lg:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
              </svg>
            </button>
          </div>
        </nav>

        <button className="lg:hidden text-[#24497b] hover:text-[#0f305c] p-1 relative z-10">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

