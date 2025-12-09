'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGuruForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState("guru");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    // Simpan referensi form lebih awal sebelum async agar tidak null setelah await
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const payload = {
      nama: formData.get("nama"),
      username: formData.get("username"),
      password: formData.get("password"),
      role,
    };

    try {
      const response = await fetch("/api/admin/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal menambahkan guru.");
      }

      formEl.reset();
      setRole("guru");
      setStatus({ type: "success", message: "Akun berhasil ditambahkan." });
      router.refresh();
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
    <div className="rounded-3xl bg-white/95 p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-[#0f305c]">
        Tambah Guru / Admin
      </h2>
      <p className="mt-2 text-sm text-[#45628a]">
        Buat akun baru untuk guru atau admin super dengan mengisi formulir berikut.
        Akun menggunakan username dan password ini untuk mengakses dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#1a3763]">Nama</label>
          <input
            type="text"
            name="nama"
            placeholder="Nama lengkap guru"
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
            placeholder="Username login"
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
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#1a3763]">
            Role
          </label>
          <select
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
          >
            <option value="guru">Guru</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-[#1b3c69] py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
        >
          {loading ? "Memproses..." : "Simpan"}
        </button>
        {status && (
          <p
            className={`text-sm ${
              status.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}

