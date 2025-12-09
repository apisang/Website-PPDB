import Image from "next/image";
import Link from "next/link";
import MainNavbar from "@/components/layout/MainNavbar";

export const metadata = {
  title: "Struktur Organisasi - SMK Taruna Bhakti Depok",
  description: "Struktur organisasi dan kepemimpinan SMK Taruna Bhakti Depok",
};

export default function StrukturOrganisasiPage() {
  const kepemimpinan = [
    {
      jabatan: "Kepala Sekolah",
      nama: "Hafiz Alviansyah",
      nip: "19651215 199003 1 001",
      foto: "https://dummyimage.com/150x150/eff6ff/1b3c69.png&text=KS",
      deskripsi: "Bertanggung jawab atas pengelolaan dan pengembangan sekolah secara keseluruhan."
    },
    {
      jabatan: "Wakil Kepala Sekolah Bidang Kurikulum",
      nama: "Furida Lusi Siagian, M.Si",
      nip: "19700120 199501 2 002",
      foto: "/buida.png",
      deskripsi: "Mengkoordinasikan pengembangan kurikulum dan proses pembelajaran."
    },
    {
      jabatan: "Wakil Kepala Sekolah Bidang Kesiswaan",
      nama: "Ratna Wati, S.E",
      nip: "19720510 199602 1 003",
      foto: "/burat.png",
      deskripsi: "Mengurus kesejahteraan siswa dan kegiatan kesiswaan."
    },
    {
      jabatan: "Wakil Kepala Sekolah Bidang Sarana dan Prasarana",
      nama: "Muchlas Edi Kiswanto, S.Pd",
      nip: "19731025 199703 2 004",
      foto: "/pamuk.png",
      deskripsi: "Mengelola sarana dan prasarana pendidikan sekolah."
    }
  ];

  const kepalaProgram = [
    {
      program: "Teknik Jaringan Komputer",
      kepala: "Agung Setiawan, ST",
      foto: "/pagung.jpg"
    },
    {
      program: "Rekayasa Perangkat Lunak",
      kepala: "Miranda, S.Pd",
      foto: "/bumir.jpg"
    },
    {
      program: "Animasi",
      kepala: "Yulfani Wulan Maulita, S.Ds",
      foto: "/bufan.png"
    },
    {
      program: "Teknik Elektro",
      kepala: "Dharma Wahyu Nurhidayati, A.Md",
      foto: "/buTE.png"
    },
    {
      program: "Broadcasting & Perfilman",
      kepala: "Nur Syafitri S.Ikom",
      foto: "/busya.png"
    }
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      <MainNavbar activePath="/profil/struktur-organisasi" />
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Struktur Organisasi</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Kepemimpinan dan organisasi SMK Taruna Bhakti Depok
            </p>
          </div>

          {/* Kepemimpinan Utama */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Kepemimpinan Utama</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {kepemimpinan.map((leader, index) => (
                <div
                  key={leader.nama}
                  className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-white to-[#f8fafc] p-8 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1b3c69] shadow-lg">
                      <img
                        src={leader.foto}
                        alt={leader.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#1b3c69] to-[#0f305c] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#1a3763] mb-1">{leader.jabatan}</h3>
                    <p className="text-base font-semibold text-[#0f305c] mb-2">{leader.nama}</p>
                    <p className="text-xs text-[#45628a] mb-4">NIP: {leader.nip}</p>
                    <p className="text-sm text-[#45628a] leading-relaxed">{leader.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kepala Program Keahlian */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Kepala Program Keahlian</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {kepalaProgram.map((program, index) => (
                <div
                  key={program.program}
                  className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#1b3c69] shadow-md mb-4">
                    <img
                      src={program.foto}
                      alt={program.kepala}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-[#1a3763] mb-1">{program.program}</h3>
                    <p className="text-xs font-semibold text-[#0f305c]">{program.kepala}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Organigram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3763] mb-8 text-center">Struktur Sekolah</h2>
            <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">YAYASAN SETYA BHAKTI</h3>
                <p className="text-sm opacity-90">Pembina</p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="bg-white text-[#1b3c69] px-6 py-3 rounded-full font-bold shadow-lg">
                  KEPALA SEKOLAH
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <h4 className="font-semibold mb-2">WAKA KURIKULUM</h4>
                  <p className="text-sm opacity-90">Pengembangan Kurikulum & Pembelajaran</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <h4 className="font-semibold mb-2">WAKA KESISWAAN</h4>
                  <p className="text-sm opacity-90">Kesejahteraan Siswa & Kegiatan</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <h4 className="font-semibold mb-2">WAKA SARPRAS</h4>
                  <p className="text-sm opacity-90">Sarana & Prasarana</p>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">KEPALA PROGRAM KEHLIAN</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['TKJ', 'RPL', 'ANM', 'TE'].map((prog) => (
                    <div key={prog} className="bg-white/20 rounded-lg p-3 text-center">
                      <span className="font-bold">{prog}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Navigasi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/profil/sejarah-sekolah"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b3c69] text-[#1b3c69] px-6 py-3 font-semibold hover:bg-[#1b3c69] hover:text-white transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Sejarah Sekolah
            </Link>
            <Link
              href="/profil/guru-tenaga-pendidikan"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] px-6 py-3 text-white font-semibold hover-lift transition"
            >
              Guru & Tenaga Pendidikan
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
