'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({
  title,
  description,
  role,
  redirectTo,
  alternative,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal masuk.");
      }

      router.replace(redirectTo);
      router.refresh();
      if (typeof window !== "undefined") {
        window.location.assign(redirectTo);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Terjadi kesalahan saat masuk.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white/95 p-8 shadow-xl backdrop-blur hover-lift">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-[#0f305c]">{title}</h2>
        <p className="mt-2 text-sm text-[#45628a]">{description}</p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#1a3763] flex items-center gap-2">
            <svg className="h-4 w-4 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            {role === "guru" || role === "superadmin" ? "Username" : "Email"}
          </label>
          <input
            type={role === "guru" || role === "superadmin" ? "text" : "email"}
            name="email"
            placeholder={
              role === "guru" || role === "superadmin"
                ? "Masukkan username"
                : "nama@email.com"
            }
            className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus-ring focus:border-[#1b3c69] focus:ring-[#c0d8ff]"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#1a3763] flex items-center gap-2">
            <svg className="h-4 w-4 text-[#1b3c69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus-ring focus:border-[#1b3c69] focus:ring-[#c0d8ff]"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-full bg-gradient-to-r from-[#1b3c69] to-[#0f305c] py-3 text-sm font-semibold text-white shadow-lg transition hover-lift hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#46658f] disabled:hover:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Memproses...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Masuk ke Dashboard
          </div>
        )}
      </button>

      {status && (
        <div className={`mt-4 rounded-2xl p-4 text-center text-sm ${
          status.type === 'error'
            ? 'bg-red-50 text-red-600 border border-red-200'
            : 'bg-green-50 text-green-600 border border-green-200'
        }`}>
          <div className="flex items-center justify-center gap-2">
            {status.type === 'error' ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status.message}
          </div>
        </div>
      )}

      {alternative && (
        <p className="mt-6 text-center text-sm text-[#45628a]">
          {alternative}
        </p>
      )}
    </form>
  );
}

