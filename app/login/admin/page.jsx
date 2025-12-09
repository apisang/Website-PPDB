import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login Admin - SMK Taruna Bhakti",
};

export default function LoginAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d9eeff] via-[#eaf4ff] to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8">
        <div className="w-full max-w-md space-y-6">
          <header className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1b3c69] to-[#0f305c] text-white shadow-lg">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold gradient-text animate-slide-in-left">Login Admin</h1>
            <p className="mt-3 text-sm lg:text-base text-[#46658f] animate-slide-in-right">
              Masuk ke akun Anda untuk mengakses Home Admin SMK Taruna Bhakti Depok
            </p>
          </header>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <LoginForm
              title="Masuk ke Home"
              description="Gunakan username dan password yang telah terdaftar untuk mengakses Home Admin."
              role="admin"
              redirectTo="/dashboard/super-admin"
              alternative={
                <>
                  Lupa password?{" "}
                  <Link
                    href="#"
                    className="font-semibold text-[#1b3c69] underline hover:text-[#0f305c] transition"
                  >
                    Hubungi super admin
                  </Link>
                </>
              }
            />
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="rounded-xl bg-white/90 p-4 lg:p-5 shadow-lg backdrop-blur">
              <h3 className="text-base lg:text-lg font-semibold text-[#1a3763] mb-2">Butuh Bantuan?</h3>
              <p className="text-xs lg:text-sm text-[#45628a] mb-3">
                Hubungi super admin untuk bantuan login atau informasi akun
              </p>
              <div className="flex flex-col gap-1.5 text-xs lg:text-sm">
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-3.5 w-3.5 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[#1b3c69] font-medium">admin@smktarunabhakti.sch.id</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-3.5 w-3.5 text-[#1b3c69]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="text-[#1b3c69] font-medium">(021) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
        </div>
      </div>
    </div>
  );
}

