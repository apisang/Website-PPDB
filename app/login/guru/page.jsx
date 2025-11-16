import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login Guru - SMK Taruna Bhakti",
};

export default function GuruLoginPage() {
  return (
    <LoginForm
      title="Masuk Guru"
      description="Gunakan username dan password yang diberikan oleh admin untuk mengakses Dashboard Guru."
      role="guru"
      redirectTo="/dashboard/guru"
      alternative={
        <>
          Butuh akses lain?{" "}
          <Link href="/login/super-admin" className="font-semibold text-[#1b3c69] underline">
            Masuk sebagai Super Admin
          </Link>
        </>
      }
    />
  );
}
