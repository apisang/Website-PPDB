"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminEditStudentForm from "./AdminEditStudentForm";

export default function StudentRowActions({ student, onDelete }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus siswa ${student.nama_lengkap}?`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/siswa/${student.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Gagal menghapus siswa.");
      }

      if (onDelete) {
        onDelete();
      } else {
        router.refresh();
      }
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
    <div className="space-y-2">
      <div className="flex gap-2">
        <AdminEditStudentForm
          student={student}
          onSuccess={() => {
            router.refresh();
          }}
        />
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="rounded-full border border-red-300 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Menghapus..." : "Hapus"}
        </button>
      </div>
      {message && (
        <p
          className={`text-xs ${
            message.type === "error" ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

