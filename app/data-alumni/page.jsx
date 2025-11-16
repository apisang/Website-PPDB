import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Profil",
    children: [
      { name: "Sejarah Sekolah", href: "/profil/sejarah-sekolah" },
      { name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
      { name: "Guru & Tenaga Kependidikan", href: "/profil/guru-tenaga-pendidikan" },
    ],
  },
  {
    name: "Sarana & Prasarana",
    children: [
      { name: "Aula", href: "/#facility-aula" },
      { name: "Masjid Al-Kautsar", href: "/#facility-masjid" },
      { name: "Ruang Bimbingan Konseling", href: "/#facility-bk" },
      { name: "Pos Keamanan", href: "/#facility-pos" },
    ],
  },
  { name: "Data Alumni", href: "/data-alumni" },
  { name: "PPDB", href: "/ppdb" },
  {
    name: "Login",
    children: [
      { name: "Calon Siswa", href: "/login/siswa" },
      { name: "Guru", href: "/login/guru" },
      { name: "Super Admin", href: "/login/super-admin" },
    ],
  },
  {
    name: "Register",
    children: [
      { name: "Calon Siswa", href: "/register" },
    ],
  },
];

const alumni = [
  {
    name: "Ahmad Rahman",
    graduationYear: "2020",
    major: "Rekayasa Perangkat Lunak",
    currentJob: "Software Engineer di PT. Teknologi Nusantara",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=AR",
  },
  {
    name: "Siti Nurhaliza",
    graduationYear: "2019",
    major: "Teknik Jaringan Komputer",
    currentJob: "Network Administrator di Bank Central Asia",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=SN",
  },
  {
    name: "Budi Santoso",
    graduationYear: "2021",
    major: "Animasi",
    currentJob: "Motion Graphic Designer di Studio Kreatif Jakarta",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=BS",
  },
  {
    name: "Maya Sari",
    graduationYear: "2018",
    major: "Teknik Elektronika",
    currentJob: "IoT Engineer di PT. Smart Solutions",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=MS",
  },
  {
    name: "Rizki Pratama",
    graduationYear: "2022",
    major: "Rekayasa Perangkat Lunak",
    currentJob: "Full Stack Developer di Startup Tech Indonesia",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=RP",
  },
  {
    name: "Dewi Lestari",
    graduationYear: "2017",
    major: "Animasi",
    currentJob: "3D Artist di Game Development Company",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=DL",
  },
  {
    name: "Fajar Nugroho",
    graduationYear: "2023",
    major: "Teknik Jaringan Komputer",
    currentJob: "Cybersecurity Analyst di PT. Data Security",
    image: "https://dummyimage.com/128x128/eff6ff/1b3c69.png&text=FN",
  },
];

const outstandingAlumni = [
  {
    name: "Dr. Andi Wijaya",
    graduationYear: "2015",
    major: "Rekayasa Perangkat Lunak",
    achievement: "Founder Startup Unicorn Indonesia",
    image: "https://dummyimage.com/96x96/eff6ff/1b3c69.png&text=AW",
  },
  {
    name: "Prof. Sari Indah",
    graduationYear: "2014",
    major: "Teknik Elektronika",
    achievement: "Peneliti Senior di LIPI",
    image: "https://dummyimage.com/96x96/eff6ff/1b3c69.png&text=SI",
  },
  {
    name: "Ir. Budi Setiawan",
    graduationYear: "2016",
    major: "Teknik Jaringan Komputer",
    achievement: "CTO di Perusahaan Telekomunikasi Nasional",
    image: "https://dummyimage.com/96x96/eff6ff/1b3c69.png&text=BS",
  },
  {
    name: "Maya Putri",
    graduationYear: "2013",
    major: "Animasi",
    achievement: "Oscar Winner untuk Film Animasi",
    image: "https://dummyimage.com/96x96/eff6ff/1b3c69.png&text=MP",
  },
];

export const metadata = {
  title: "Data Alumni - SMK Taruna Bhakti Depok",
  description: "Kisah sukses alumni SMK Taruna Bhakti Depok",
};

export default function DataAlumniPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b3c69] text-xs font-semibold text-white">
              PPDB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide">
                SMK Taruna Bhakti
              </span>
              <span className="text-xs text-[#46658f]">
                Depok | Unggul, Kreatif, Berdaya Saing
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#24497b] md:flex">
            {navigation.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition hover:text-[#0f305c] ${
                      item.href === "/data-alumni"
                        ? "font-semibold text-[#0f305c]"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <div
                  key={item.name}
                  className="group relative inline-flex items-center"
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 transition hover:text-[#0f305c] focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.name}
                    <span className="text-[10px] transition group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                      ▾
                    </span>
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-full z-40 hidden w-60 -translate-x-1/2 pt-4 group-hover:block group-focus-within:block">
                    <div className="pointer-events-auto relative rounded-[28px] bg-[#0e365f] p-6 text-white shadow-[0_20px_50px_-20px_rgba(10,32,64,0.55)]">
                      <span className="absolute left-1/2 top-0 h-5 w-5 -translate-y-1/2 -translate-x-1/2 rotate-45 rounded-sm bg-[#0e365f]" />
                      <div className="flex flex-col gap-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-xl text-base font-semibold transition hover:text-[#d6e7ff]"
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
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="rounded-3xl bg-white/80 p-10 shadow-xl backdrop-blur">
          <div className="mb-8 flex flex-col gap-3">
            <h1 className="text-3xl font-semibold text-[#1a3763]">Data Alumni</h1>
            <p className="max-w-2xl text-sm text-[#4b6a90]">
              Kisah sukses alumni SMK Taruna Bhakti Depok yang telah berkontribusi di
              berbagai bidang industri dan profesi.
            </p>
          </div>

          <div className="mb-12 overflow-hidden">
            <div className="flex animate-scroll gap-6">
              {alumni.map((person, index) => (
                <div
                  key={`${person.name}-${index}`}
                  className="flex w-80 shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#e0ecff] bg-white/70 p-6 shadow-sm"
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-[#e4f1ff]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#1a3763]">
                      {person.name}
                    </h3>
                    <p className="text-sm text-[#4b6a90]">
                      Lulus {person.graduationYear} - {person.major}
                    </p>
                    <p className="text-sm text-[#4b6a90]">{person.currentJob}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-semibold text-[#1a3763]">
              Alumni Berprestasi
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {outstandingAlumni.map((person) => (
                <div
                  key={person.name}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e0ecff] bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-[#e4f1ff]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-[#1a3763]">
                      {person.name}
                    </h3>
                    <p className="text-xs text-[#4b6a90]">
                      Lulus {person.graduationYear} - {person.major}
                    </p>
                    <p className="text-xs text-[#4b6a90]">{person.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-[#102747] py-10 text-[#d2e3ff]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-center text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SMK Taruna Bhakti Depok.</p>
          <p>Jalan Raya Pekapuran, Depok | Telp. (021) 123-4567</p>
        </div>
      </footer>
    </div>
  );
}

