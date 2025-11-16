import AdminRegisterForm from "@/components/auth/AdminRegisterForm";

export const metadata = {
  title: "Register Super Admin - SMK Taruna Bhakti",
};

export default function RegisterSuperAdminPage() {
  return (
    <AdminRegisterForm
      role="superadmin"
      title="Registrasi Super Admin"
      description="Buat akun super admin untuk mengelola data guru dan keseluruhan proses PPDB."
      redirectTo="/login/super-admin"
      loginLink={{ href: "/login/super-admin", label: "Masuk sebagai Super Admin" }}
    />
  );
}

