'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "pending", label: "Menunggu" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

export default function VerificationActions({
  siswaId,
  currentStatus = "pending",
  currentNote = "",
  onSaved,
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus.toLowerCase());
  const [note, setNote] = useState(currentNote);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!siswaId) {
      setMessage({
        type: "error",
        text: "ID siswa tidak ditemukan.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/verification/${siswaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status, catatan: note, siswaId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal memperbarui verifikasi.");
      }

      const result = await response.json();
      setMessage({ type: "success", text: result.message || "Verifikasi tersimpan." });
      router.refresh();
      if (typeof onSaved === "function") {
        onSaved({ status, catatan: note });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menyimpan verifikasi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-2">
        <label className="text-xs font-semibold text-[#1a3763]">
          Status Verifikasi
        </label>
        <select
          className="rounded-xl border border-[#d7e5ff] px-3 py-2 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-[#1a3763]">
          Catatan / Hasil Wawancara
        </label>
        <textarea
          className="min-h-[80px] rounded-xl border border-[#d7e5ff] px-3 py-2 text-sm text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
          placeholder="Tambahkan catatan untuk panitia atau calon siswa"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#1b3c69] py-2 text-xs font-semibold text-white shadow transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#7887a6]"
      >
        {loading ? "Menyimpan..." : "Simpan Verifikasi"}
      </button>

      {message && (
        <p
          className={`text-xs ${
            message.type === "success" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}


