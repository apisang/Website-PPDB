'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ className = "" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`rounded-full border border-[#1b3c69] px-4 py-2 text-sm font-semibold text-[#1b3c69] transition hover:bg-[#1b3c69] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? "Keluar..." : "Keluar"}
    </button>
  );
}

