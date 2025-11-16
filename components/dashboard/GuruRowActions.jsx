'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuruRowActions({ guru }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nama: guru.nama,
    username: guru.username,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        nama: form.nama,
        username: form.username,
      };

      if (form.password) {
        payload.password = form.password;
      }

      const response = await fetch(`/api/admin/guru/${guru.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal memperbarui guru.");
      }

      setMessage({ type: "success", text: "Data guru diperbarui." });
      setEditing(false);
      setForm((prev) => ({ ...prev, password: "" }));
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menyimpan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Hapus guru ${guru.nama}?`)) return;
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/guru/${guru.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal menghapus guru.");
      }

      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menghapus.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {editing ? (
        <form onSubmit={handleSave} className="grid gap-2 text-sm">
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="rounded-xl border border-[#d7e5ff] px-3 py-2 text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            placeholder="Nama lengkap"
            required
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="rounded-xl border border-[#d7e5ff] px-3 py-2 text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="rounded-xl border border-[#d7e5ff] px-3 py-2 text-[#16365f] outline-none transition focus:border-[#1b3c69] focus:ring-2 focus:ring-[#c0d8ff]"
            placeholder="Password baru (opsional)"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#1b3c69] px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-[#142c4f] disabled:cursor-not-allowed disabled:bg-[#7887a6]"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ nama: guru.nama, username: guru.username, password: "" });
                setMessage(null);
              }}
              className="rounded-full border border-[#1b3c69] px-4 py-2 text-xs font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
            >
              Batal
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full border border-[#1b3c69] px-4 py-2 font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-full border border-red-300 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Hapus
          </button>
        </div>
      )}
      {message && (
        <p
          className={`text-xs ${
            message.type === "success" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}


