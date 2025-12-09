"use client";

import { useState, useEffect } from "react";

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

export default function AdminEditStudentForm({ student, onSuccess }) {
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

  useEffect(() => {
    if (student) {
      setForm({
        namaLengkap: student.nama_lengkap || "",
        nik: student.nik || "",
        nisn: student.nisn || "",
        email: student.email || "",
        password: "",
        asalSekolah: student.asal_sekolah || "",
        jurusanPilihan: student.jurusan_pilihan || "",
        noHp: student.no_hp || "",
        tempatLahir: student.tempat_lahir || "",
        tanggalLahir: student.tanggal_lahir
          ? new Date(student.tanggal_lahir).toISOString().split("T")[0]
          : "",
        jenisKelamin: student.jenis_kelamin || "",
        alamat: student.alamat || "",
      });
    }
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const payload = { ...form };
      if (!payload.password) {
        delete payload.password;
      }

      const response = await fetch(`/api/admin/siswa/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal memperbarui siswa.");
      }

      setMessage({
        type: "success",
        text: "Data siswa berhasil diperbarui.",
      });
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat memperbarui data.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full border border-[#1b3c69] px-4 py-2 text-xs font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
      >
        {isOpen ? "Batalkan" : "Edit"}
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
          className="mt-2 rounded-xl border border-[#dfeaff] bg-white/95 p-4 shadow-lg"
        >
          <h4 className="mb-3 text-sm font-semibold text-[#0f305c]">Edit Data Siswa</h4>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs font-semibold text-[#1a3763]">Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                value={form.namaLengkap}
                onChange={handleChange}
                className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                required
              />
            </div>

            <div className="grid gap-1 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">NIK</label>
                <input
                  type="text"
                  name="nik"
                  value={form.nik}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">NISN</label>
                <input
                  type="text"
                  name="nisn"
                  value={form.nisn}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-semibold text-[#1a3763]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                required
              />
            </div>

            <div className="grid gap-1">
              <label className="text-xs font-semibold text-[#1a3763]">
                Password Baru (kosongkan jika tidak diubah)
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                minLength={6}
              />
            </div>

            <div className="grid gap-1 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={form.tempatLahir}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={form.tanggalLahir}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
            </div>

            <div className="grid gap-1 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  value={form.jenisKelamin}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Nomor Telepon</label>
                <input
                  type="tel"
                  name="noHp"
                  value={form.noHp}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
            </div>

            <div className="grid gap-1">
              <label className="text-xs font-semibold text-[#1a3763]">Alamat</label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                className="min-h-[60px] rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
              />
            </div>

            <div className="grid gap-1 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Asal Sekolah</label>
                <input
                  type="text"
                  name="asalSekolah"
                  value={form.asalSekolah}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-[#1a3763]">Jurusan Pilihan</label>
                <select
                  name="jurusanPilihan"
                  value={form.jurusanPilihan}
                  onChange={handleChange}
                  className="rounded-lg border border-[#d7e5ff] px-3 py-1.5 text-xs outline-none transition focus:border-[#1b3c69] focus:ring-1 focus:ring-[#c0d8ff]"
                >
                  {jurusanOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 border-t border-[#dfeaff] pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setMessage(null);
                }}
                className="flex-1 rounded-full border border-[#1b3c69] px-3 py-1.5 text-xs font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-[#1b3c69] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
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

