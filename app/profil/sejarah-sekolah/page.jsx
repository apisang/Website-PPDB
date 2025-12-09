import Link from "next/link";
import MainNavbar from "@/components/layout/MainNavbar";

export const metadata = {
  title: "Sejarah Sekolah - SMK Taruna Bhakti Depok",
  description: "Sejarah berdirinya dan perkembangan SMK Taruna Bhakti Depok",
};

export default function SejarahSekolahPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      <MainNavbar activePath="/profil/sejarah-sekolah" />
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
            <h1 className="text-4xl font-bold gradient-text animate-slide-in-left">Sejarah Sekolah</h1>
            <p className="mt-4 text-lg text-[#46658f] animate-slide-in-right">
              Perjalanan panjang SMK Taruna Bhakti Depok dari masa ke masa
            </p>
          </div>

          <div className="space-y-12">
            <section className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-[#1a3763] mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white">
                  <span className="text-sm font-bold">1</span>
                </div>
                Pendirian Sekolah (2005)
              </h2>
              <div className="ml-13 space-y-4">
                <p className="text-base text-[#45628a] leading-relaxed">
                  SMK Taruna Bhakti Depok didirikan pada tahun 2005 oleh Yayasan Setya Bhakti dengan visi
                  untuk mencetak lulusan yang unggul dalam bidang teknologi dan kreativitas. Sekolah ini
                  lahir dari kebutuhan masyarakat akan tenaga terampil di era digital yang semakin berkembang.
                </p>
                <div className="rounded-2xl bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] p-6 border border-[#e2e8f0]">
                  <p className="text-sm text-[#4b6a90] italic">
                    "Dengan semangat kebersamaan dan dedikasi, kami membangun fondasi pendidikan yang kuat
                    untuk generasi muda Indonesia."
                  </p>
                  <p className="text-sm font-semibold text-[#1a3763] mt-2">- Pendiri Yayasan Setya Bhakti</p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-[#1a3763] mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white">
                  <span className="text-sm font-bold">2</span>
                </div>
                Pengembangan Kurikulum (2008-2012)
              </h2>
              <div className="ml-13 space-y-4">
                <p className="text-base text-[#45628a] leading-relaxed">
                  Pada periode ini, sekolah mulai mengembangkan kurikulum yang berbasis kompetensi dengan
                  fokus pada teknologi informasi dan komunikasi. Beberapa jurusan unggulan seperti Teknik
                  Jaringan Komputer dan Rekayasa Perangkat Lunak mulai diperkenalkan.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-[#e0ecff]">
                    <h4 className="font-semibold text-[#1a3763] mb-2">Pencapaian Utama:</h4>
                    <ul className="text-sm text-[#45628a] space-y-1">
                      <li>• Akreditasi A dari BAN-SM</li>
                      <li>• Kerjasama dengan industri teknologi</li>
                      <li>• Pengembangan lab komputer modern</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-[#e0ecff]">
                    <h4 className="font-semibold text-[#1a3763] mb-2">Program Unggulan:</h4>
                    <ul className="text-sm text-[#45628a] space-y-1">
                      <li>• Magang industri</li>
                      <li>• Sertifikasi kompetensi</li>
                      <li>• Kompetisi teknologi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold text-[#1a3763] mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white">
                  <span className="text-sm font-bold">3</span>
                </div>
                Era Digital (2013-Sekarang)
              </h2>
              <div className="ml-13 space-y-4">
                <p className="text-base text-[#45628a] leading-relaxed">
                  Memasuki era digital, SMK Taruna Bhakti terus berinovasi dengan menambahkan jurusan
                  Animasi dan memperkuat program kewirausahaan. Sekolah ini menjadi pionir dalam
                  pendidikan vokasi berbasis industri 4.0.
                </p>
                <div className="rounded-2xl bg-gradient-to-br from-[#1b3c69] to-[#0f305c] p-8 text-white">
                  <h4 className="text-xl font-bold mb-4">Visi Masa Depan</h4>
                  <p className="text-base leading-relaxed opacity-90">
                    Menjadi sekolah vokasi terdepan di Indonesia yang menghasilkan lulusan siap kerja
                    dan mampu berkompetisi di tingkat global melalui pendidikan berbasis teknologi
                    dan kewirausahaan.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-2xl font-bold text-[#1a3763] mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white">
                  <span className="text-sm font-bold">4</span>
                </div>
                Prestasi dan Pengakuan
              </h2>
              <div className="ml-13">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift">
                    <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                    <p className="text-sm text-[#45628a]">Alumni Sukses</p>
                  </div>
                  <div className="text-center rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift">
                    <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                    <p className="text-sm text-[#45628a]">Kerjasama Industri</p>
                  </div>
                  <div className="text-center rounded-2xl bg-white p-6 shadow-lg border border-[#e0ecff] hover-lift">
                    <div className="text-3xl font-bold gradient-text mb-2">A</div>
                    <p className="text-sm text-[#45628a]">Akreditasi BAN-SM</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/profil/struktur-organisasi"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] px-8 py-3 text-white font-semibold hover-lift transition"
            >
              Lihat Struktur Organisasi
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
