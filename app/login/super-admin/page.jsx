import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login Super Admin - SMK Taruna Bhakti",
};

export default function SuperAdminLoginPage() {
  return (
    <LoginForm
      title="Masuk Super Admin"
      description="Masukkan kredensial super admin untuk mengelola data guru dan pendaftaran PPDB."
      role="superadmin"
      redirectTo="/dashboard/super-admin"
      alternative={
        <>
          Login sebagai guru?{" "}
          <Link href="/login/guru" className="font-semibold text-[#1b3c69] underline">
            Masuk di sini
          </Link>
        </>
      }
    />
  );
}

