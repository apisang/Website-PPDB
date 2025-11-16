'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminRegisterForm({
  role,
  title,
  description,
  redirectTo,
  loginLink,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nama: formData.get("nama"),
      username: formData.get("username"),
      password: formData.get("password"),
      role,
    };

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Registrasi gagal.");
      }

      setStatus({
        type: "success",
        message: "Registrasi berhasil. Silakan masuk menggunakan akun Anda.",
      });

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-lg flex-col gap-10 px-6 py-20">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-[#0f305c]">{title}</h1>
          <p className="mt-3 text-sm text-[#45628a]">{description}</p>
        </header>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white/95 p-10 shadow-xl">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Masukkan username"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#1b3c69] py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
          >
            {loading ? "Memproses..." : "Daftarkan Akun"}
          </button>

          {status && (
            <p
              className={`mt-4 text-center text-sm ${
                status.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {status.message}
            </p>
          )}

          {loginLink && (
            <p className="mt-4 text-center text-sm text-[#45628a]">
              Sudah memiliki akun?{" "}
              <Link href={loginLink.href} className="font-semibold text-[#1b3c69] underline">
                {loginLink.label}
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

