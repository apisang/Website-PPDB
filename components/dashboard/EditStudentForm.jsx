"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const jurusanOptions = [
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

export default function EditStudentForm({ initialData }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

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
      const response = await fetch("/api/student/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal menyimpan perubahan.");
      }

      setMessage({
        type: "success",
        text: "Data berhasil diperbarui.",
      });
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full rounded-full bg-[#1b3c69] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#142c4f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b3c69] md:w-auto"
        disabled={loading}
      >
        {isOpen ? "Batalkan" : loading ? "Memproses..." : "Edit Data"}
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
          className="mt-4 grid gap-4 rounded-3xl border border-[#dfeaff] bg-white/80 p-5 text-sm text-[#1a3763]"
        >
          <div className="grid gap-2">
            <label className="font-semibold">Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkap"
              value={form.namaLengkap}
              onChange={handleChange}
              className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div className="grid gap-2">
              <label className="font-semibold">Tempat Lahir</label>
              <input
                type="text"
                name="tempatLahir"
                value={form.tempatLahir}
                onChange={handleChange}
                className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              />
            </div>
            <div className="grid gap-2">
              <label className="font-semibold">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggalLahir"
                value={form.tanggalLahir || ""}
                onChange={handleChange}
                className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              />
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div className="grid gap-2">
              <label className="font-semibold">Jenis Kelamin</label>
              <select
                name="jenisKelamin"
                value={form.jenisKelamin}
                onChange={handleChange}
                className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="font-semibold">Nomor Telepon</label>
              <input
                type="tel"
                name="noHp"
                value={form.noHp}
                onChange={handleChange}
                className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Alamat Lengkap</label>
            <textarea
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="min-h-[80px] rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Asal Sekolah</label>
            <input
              type="text"
              name="asalSekolah"
              value={form.asalSekolah}
              onChange={handleChange}
              className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Jurusan Pilihan</label>
            <select
              name="jurusanPilihan"
              value={form.jurusanPilihan}
              onChange={handleChange}
              className="rounded-2xl border border-[#d7e5ff] px-4 py-2 outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            >
              <option value="">Pilih jurusan utama</option>
              {jurusanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 border-t border-dashed border-[#d7e5ff] pt-4 text-xs text-[#45628a] md:flex-row md:items-center md:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[#1b3c69] px-4 py-2 font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#1b3c69] px-4 py-2 font-semibold text-white shadow transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#46658f]"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

