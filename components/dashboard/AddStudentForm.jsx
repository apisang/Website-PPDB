"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const jurusanOptions = [
  { value: "", label: "Pilih jurusan" },
  { value: "Teknik Elektro", label: "Teknik Elektro (TE)" },
  { value: "Teknik Jaringan Komputer", label: "Teknik Jaringan Komputer (TKJ)" },
  { value: "Animasi", label: "Animasi (ANM)" },
  { value: "Rekayasa Perangkat Lunak", label: "Rekayasa Perangkat Lunak (RPL)" },
  { value: "Broadcasting & Perfilman", label: "Broadcasting & Perfilman (BRF)" },
  { value: "Desain Komunikasi Visual", label: "Desain Komunikasi Visual (DKV)" },
];

const genderOptions = [
  { value: "", label: "Pilih jenis kelamin" },
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
];

export default function AddStudentForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    namaLengkap: "",
    nik: "",
    nisn: "",
    email: "",
    password: "",
    asalSekolah: "",
    jurusanPilihan: "",
    noHp: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalizeDate = (value) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value; // already ISO
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [d, m, y] = value.split("/");
      return `${y}-${m}-${d}`;
    }
    return value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const payload = {
        ...form,
        tanggalLahir: normalizeDate(form.tanggalLahir),
        nik: form.nik || null,
      };

      const response = await fetch("/api/admin/siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal menambahkan siswa.");
      }

      setMessage({
        type: "success",
        text: "Siswa berhasil ditambahkan.",
      });
      setForm({
        namaLengkap: "",
        nik: "",
        nisn: "",
        email: "",
        password: "",
        asalSekolah: "",
        jurusanPilihan: "",
        noHp: "",
        tempatLahir: "",
        tanggalLahir: "",
        jenisKelamin: "",
        alamat: "",
      });
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menambah siswa.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-[#1b3c69] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#142c4f] transition"
      >
        {isOpen ? "Batalkan" : "+ Tambah Siswa"}
      </button>

      {message && (
        <p
          className={`mt-2 text-xs ${
            message.type === "error" ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {message.text}
        </p>
      )}

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-[#dfeaff] bg-white/95 p-6 shadow-lg"
        >
          <h3 className="mb-4 text-lg font-semibold text-[#0f305c]">Tambah Siswa Baru</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={form.namaLengkap}
                onChange={handleChange}
                className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                required
              />
            </div>

          <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">NIK</label>
              <input
                type="text"
                name="nik"
                value={form.nik}
                onChange={handleChange}
                className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">NISN</label>
                <input
                  type="text"
                  name="nisn"
                  value={form.nisn}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                required
                minLength={6}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={form.tempatLahir}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={form.tanggalLahir}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  value={form.jenisKelamin}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Nomor Telepon</label>
                <input
                  type="tel"
                  name="noHp"
                  value={form.noHp}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#1a3763]">Alamat</label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                className="min-h-[80px] rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Asal Sekolah</label>
                <input
                  type="text"
                  name="asalSekolah"
                  value={form.asalSekolah}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#1a3763]">Jurusan Pilihan</label>
                <select
                  name="jurusanPilihan"
                  value={form.jurusanPilihan}
                  onChange={handleChange}
                  className="rounded-xl border border-[#d7e5ff] px-4 py-2 text-sm outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
                >
                  {jurusanOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 border-t border-[#dfeaff] pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setMessage(null);
                }}
                className="flex-1 rounded-full border border-[#1b3c69] px-4 py-2 text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-[#1b3c69] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

