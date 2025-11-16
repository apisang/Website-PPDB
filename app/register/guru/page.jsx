import AdminRegisterForm from "@/components/auth/AdminRegisterForm";

export const metadata = {
  title: "Register Guru - SMK Taruna Bhakti",
};

export default function RegisterGuruPage() {
  return (
    <AdminRegisterForm
      role="admin"
      title="Registrasi Guru"
      description="Buat akun guru untuk mengakses dashboard verifikasi dan pengelolaan PPDB. Pastikan username bersifat unik."
      redirectTo="/login/guru"
      loginLink={{ href: "/login/guru", label: "Masuk sebagai Guru" }}
    />
  );
}

