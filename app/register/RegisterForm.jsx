'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  namaLengkap: "",
  email: "",
  password: "",
  nisn: "",
  nik: "",
  tempatLahir: "",
  tanggalLahir: "",
  jenisKelamin: "",
  alamat: "",
  asalSekolah: "",
  noHp: "",
  dokumen: null,
};

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error?.message || "Registrasi gagal.");
      }

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: "siswa",
        }),
        credentials: "include",
      });

      if (!loginResponse.ok) {
        setStatus({
          type: "success",
          message:
            "Registrasi berhasil, silakan masuk menggunakan akun yang baru dibuat.",
        });
        router.push("/login");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
      if (typeof window !== "undefined") {
        window.location.assign("/dashboard");
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9eeff] via-white to-[#caddff] text-[#16365f]">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-14">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-[#0f305c]">
            Registrasi Calon Siswa
          </h1>
          <p className="mt-3 text-sm text-[#45628a]">
            Lengkapi data di bawah ini untuk membuat akun calon siswa dan mulai
            proses PPDB. Pastikan seluruh informasi yang dimasukkan adalah data
            terbaru dan valid.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white/95 p-10 shadow-xl"
        >
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Masukkan nama lengkap"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.namaLengkap}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Email Aktif
              </label>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.email}
                onChange={handleChange}
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
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">NISN</label>
              <input
                type="text"
                name="nisn"
                placeholder="Masukkan NISN"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.nisn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">NIK</label>
              <input
                type="text"
                name="nik"
                placeholder="Masukkan NIK"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.nik}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  name="tempatLahir"
                  placeholder="Contoh: Depok"
                  className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                  value={form.tempatLahir}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggalLahir"
                  className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                  value={form.tanggalLahir}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.jenisKelamin}
                onChange={handleChange}
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Alamat Lengkap
              </label>
              <textarea
                name="alamat"
                placeholder="Tuliskan alamat sesuai KK"
                className="min-h-[100px] rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.alamat}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Asal Sekolah
              </label>
              <input
                type="text"
                name="asalSekolah"
                placeholder="Masukkan asal sekolah"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.asalSekolah}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="noHp"
                placeholder="Contoh: 081234567890"
                className="rounded-2xl border border-[#d7e5ff] px-4 py-3 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                value={form.noHp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Unggah Dokumen (PDF/JPG)
              </label>
              <input
                type="file"
                name="dokumen"
                accept=".pdf,.jpg,.jpeg,.png"
                className="rounded-2xl border border-dashed border-[#adc6f4] bg-[#f7faff] px-4 py-6 text-sm text-[#45628a] file:mr-4 file:rounded-full file:border-0 file:bg-[#1b3c69] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                onChange={handleChange}
              />
              <p className="text-xs text-[#7993bb]">
                Opsional: unggah rapor/ijazah atau dokumen pendukung lainnya.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#1b3c69] py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
          >
            {loading ? "Memproses..." : "Buat Akun Calon Siswa"}
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

          <p className="mt-4 text-center text-sm text-[#45628a]">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1b3c69] underline"
            >
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

