# SMK Taruna Bhakti Website

Website resmi SMK Taruna Bhakti Depok yang dibangun menggunakan Next.js 16 dengan sistem manajemen sekolah terintegrasi.

## 📋 Daftar Isi
- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Database](#struktur-database)
- [Alur Website](#alur-website)
- [Instalasi dan Setup](#instalasi-dan-setup)
- [Penggunaan](#penggunaan)
- [API Reference](#api-reference)
- [Kontribusi](#kontribusi)

## 🎓 Tentang Proyek

Website ini adalah platform digital komprehensif untuk SMK Taruna Bhakti Depok yang menyediakan:
- Sistem Penerimaan Peserta Didik Baru (PPDB)
- Portal dashboard untuk berbagai peran pengguna
- Sistem autentikasi berbasis role
- Manajemen data siswa dan guru
- Informasi profil sekolah dan sarana prasarana

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi
- **Multi-role authentication**: Admin, Guru, Siswa, Calon Siswa
- **JWT-based authentication** dengan secure cookies
- **Role-based access control** untuk berbagai fitur

### 📚 PPDB (Penerimaan Peserta Didik Baru)
- Pendaftaran online calon siswa
- Pemilihan jurusan (RPL, TKJ, TE, ANM, BRF, DKV)
- Verifikasi dan approval oleh admin
- Tracking status pendaftaran

### 👥 Dashboard Management
- **Super Admin**: Manajemen lengkap sistem
- **Admin**: CRUD siswa dan guru
- **Guru**: Akses terbatas untuk data siswa
- **Siswa**: Melihat profil dan informasi pribadi

### 🏫 Informasi Sekolah
- Profil sekolah (sejarah, struktur organisasi, guru & tenaga kependidikan)
- Sarana prasarana (masjid, ruang BK, kantin, pos keamanan)
- Data alumni
- Prestasi dan berita sekolah

## 🏗️ Arsitektur Aplikasi

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── admin/         # Admin-only endpoints
│   │   ├── student/       # Student endpoints
│   │   └── verification/  # Verification system
│   ├── dashboard/         # Dashboard pages by role
│   ├── login/             # Login pages by role
│   ├── register/          # Registration page
│   ├── ppdb/              # PPDB information
│   ├── profil/            # School profile pages
│   └── sarana-prasarana/  # Facilities pages
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   └── layout/            # Layout components
├── lib/                   # Utility libraries
│   ├── auth.js            # Authentication utilities
│   ├── db.js              # Database connection
│   └── schema.js          # Database schema helpers
└── public/                # Static assets
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 16** - React framework dengan App Router
- **React 19** - Library UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MySQL 8** - Relational database
- **mysql2** - MySQL client untuk Node.js

### Authentication & Security
- **JWT (jsonwebtoken)** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **Server-side cookies** - Secure session management

### Development Tools
- **ESLint** - Code linting
- **Tailwind CSS** - Styling
- **TypeScript** - Type checking

## 🗄️ Struktur Database

### Tabel Utama

#### Tabel `siswa`
- `id`: ID unik siswa (primary key)
- `nisn`: Nomor Induk Siswa Nasional
- `nama`: Nama lengkap siswa
- `jenis_kelamin`: Jenis kelamin (L/P)
- `tempat_lahir`: Tempat lahir
- `tanggal_lahir`: Tanggal lahir
- `alamat`: Alamat lengkap
- `no_hp`: Nomor telepon
- `email`: Alamat email
- `jurusan_pilihan`: Jurusan yang dipilih (RPL, TKJ, TE, ANM, BRF, DKV)
- `status_verifikasi`: Status verifikasi (pending/approved/rejected)
- `created_at`: Waktu pendaftaran
- `updated_at`: Waktu terakhir diperbarui

#### Tabel `guru`
- `id`: ID unik guru (primary key)
- `nip`: Nomor Induk Pegawai
- `nama`: Nama lengkap guru
- `jenis_kelamin`: Jenis kelamin (L/P)
- `alamat`: Alamat lengkap
- `no_hp`: Nomor telepon
- `email`: Alamat email
- `jabatan`: Jabatan di sekolah
- `status_kepegawaian`: Status kepegawaian

#### Tabel `users`
- `id`: ID unik user (primary key)
- `username`: Nama pengguna
- `password`: Password terenkripsi
- `role`: Peran (admin/guru/siswa/calon_siswa)
- `user_id`: ID relasi ke tabel terkait (siswa/guru)
- `created_at`: Waktu pembuatan akun
- `last_login`: Waktu login terakhir

## 🔄 Alur PPDB (Pendaftaran Peserta Didik Baru)

### 1. Pendaftaran Calon Siswa
- Calon siswa mengakses halaman pendaftaran PPDB
- Mengisi formulir pendaftaran dengan data pribadi
- Memilih program keahlian/jurusan
- Mengunggah dokumen pendukung (jika diperlukan)
- Sistem akan membuat akun sementara untuk calon siswa

### 2. Verifikasi Admin
- Admin menerima notifikasi pendaftaran baru
- Admin memeriksa kelengkapan dan kebenaran data
- Admin dapat:
  - Menerima pendaftaran (status: approved)
  - Menolak pendaftaran (status: rejected) dengan alasan penolakan
  - Meminta revisi data (status: revision_required)

### 3. Pengumuman Hasil
- Calon siswa dapat mengecek status pendaftaran melalui akun mereka
- Jika diterima, calon siswa akan mendapatkan nomor peserta dan informasi selanjutnya
- Jika ditolak, calon siswa dapat melihat alasan penolakan

### 4. Daftar Ulang
- Calon siswa yang diterima melakukan daftar ulang
- Mengunggah dokumen asli untuk verifikasi
- Melakukan pembayaran biaya pendaftaran
- Menerima kartu peserta dan informasi kelas

## 💻 Penjelasan Kode Penting

### 1. Sistem Autentikasi

#### `lib/auth.js`
```javascript
// Fungsi untuk verifikasi token JWT
export async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
```

### 2. Pendaftaran Siswa Baru

#### `app/register/RegisterForm.jsx`
```jsx
export default function RegisterForm() {
  // State untuk form
  const [formData, setFormData] = useState({
    nisn: '',
    nama: '',
    jenis_kelamin: 'L',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    no_hp: '',
    email: '',
    jurusan_pilihan: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi form
    // Kirim data ke API
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Handle response
  };

  return (
    // Form JSX
  );
}
```

### 3. Verifikasi Admin

#### `components/dashboard/VerificationActions.jsx`
```jsx
export default function VerificationActions({ siswaId, currentStatus, onUpdate }) {
  const handleVerification = async (status) => {
    try {
      const response = await fetch(`/api/verification/${siswaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        onUpdate(status);
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => handleVerification('approved')}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Terima
      </button>
      <button 
        onClick={() => handleVerification('rejected')}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Tolak
      </button>
    </div>
  );
}
```

### 4. API Endpoint untuk Pendaftaran

#### `app/api/auth/register/route.js`
```javascript
export async function POST(request) {
  try {
    const db = getDb();
    const data = await request.json();
    
    // Validasi data
    if (data.password !== data.confirmPassword) {
      return Response.json(
        { error: 'Password tidak cocok' },
        { status: 400 }
      );
    }

    // Cek NISN sudah terdaftar
    const [existing] = await db.execute(
      'SELECT id FROM siswa WHERE nisn = ?',
      [data.nisn]
    );

    if (existing.length > 0) {
      return Response.json(
        { error: 'NISN sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Mulai transaksi
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Simpan data siswa
      const [result] = await connection.execute(
        `INSERT INTO siswa (
          nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir,
          alamat, no_hp, email, jurusan_pilihan, status_verifikasi
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          data.nisn, data.nama, data.jenis_kelamin, data.tempat_lahir,
          data.tanggal_lahir, data.alamat, data.no_hp, data.email,
          data.jurusan_pilihan
        ]
      );

      const siswaId = result.insertId;

      // Buat akun user
      await connection.execute(
        'INSERT INTO users (username, password, role, user_id) VALUES (?, ?, ?, ?)',
        [data.nisn, hashedPassword, 'calon_siswa', siswaId]
      );

      await connection.commit();
      return Response.json({ success: true, siswaId });

    } catch (error) {
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Terjadi kesalahan saat pendaftaran' },
      { status: 500 }
    );
  }
}
```

### Tabel Utama
- **users** - Data pengguna dengan role (admin, guru, siswa, calon_siswa)
- **siswa** - Data siswa aktif
- **guru** - Data guru dan tenaga kependidikan
- **calon_siswa** - Data pendaftar PPDB
- **verification** - Status verifikasi pendaftaran

### Relasi Database
```
users (1) ──── (1) siswa
users (1) ──── (1) guru
users (1) ──── (1) calon_siswa
calon_siswa (1) ──── (1) verification
```

## 🌊 Alur Website

### 1. Landing Page (`/`)
- Hero section dengan informasi sekolah
- Visi & misi sekolah
- Jurusan yang tersedia (slideshow)
- Prestasi sekolah (slideshow)
- Berita terbaru (infinite carousel)
- Footer dengan link navigasi

### 2. PPDB Flow
```
Pengunjung → PPDB Page → Register → Login (Calon Siswa) → Dashboard → Verification
```

### 3. Authentication Flow
```
Login Page → Role Selection → JWT Token → Protected Routes → Dashboard
```

### 4. Admin Management Flow
```
Admin Login → Dashboard → CRUD Operations → Database Updates
```

### 5. Student Journey
```
Calon Siswa Register → Submit Data → Admin Verification → Status Update → Accepted/Rejected
```

## 🚀 Instalasi dan Setup

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Buat file .env.local
cp .env.example .env.local

# Konfigurasi database dan JWT
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=smk_taruna_bhakti
JWT_SECRET=your_jwt_secret
```

4. **Setup database**
```sql
-- Buat database
CREATE DATABASE smk_taruna_bhakti;

-- Import schema (jika ada file SQL)
-- Atau buat tabel sesuai struktur di atas
```

5. **Run development server**
```bash
npm run dev
```

6. **Buka browser**
```
http://localhost:3000
```

## 🎯 Panduan Penggunaan

### Untuk Calon Siswa
1. **Registrasi**
   - Buka halaman pendaftaran
   - Isi formulir dengan data lengkap
   - Pilih program keahlian yang diinginkan
   - Submit formulir dan catat nomor pendaftaran

2. Cek Status Pendaftaran
   - Login ke akun calon siswa
   - Pantau status verifikasi
   - Jika diminta revisi, perbaiki data yang diperlukan

3. Daftar Ulang
   - Jika diterima, lakukan daftar ulang
   - Unggah dokumen yang diperlukan
   - Lakukan pembayaran biaya pendaftaran

### Untuk Admin
1. **Login** ke dashboard admin
2. **Verifikasi Pendaftaran**
   - Akses menu verifikasi pendaftaran
   - Periksa kelengkapan dokumen
   - Setujui atau tolak pendaftaran
3. **Kelola Data**
   - Kelola data siswa dan guru
   - Generate laporan
   - Atur tahun ajaran baru

### Untuk Guru
1. **Login** ke dashboard guru
2. **Akses Data Siswa**
   - Lihat daftar siswa per kelas
   - Input nilai dan absensi
   - Pantau perkembangan siswa

## 📖 Dokumentasi Teknis

### Development
```bash
npm run dev      # Start development server
npm run build    # Build untuk production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### User Roles & Access

#### Super Admin
- Full system access
- User management
- System configuration

#### Admin
- Student CRUD operations
- Teacher management
- PPDB verification

#### Guru (Teacher)
- View student data
- Limited dashboard access

#### Siswa (Student)
- View personal profile
- Access school information

#### Calon Siswa (Prospective Student)
- PPDB registration
- Application status tracking

## 🔌 API Reference

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration

### Admin Endpoints
- `GET /api/admin/siswa` - Get all students
- `POST /api/admin/siswa` - Add new student
- `PUT /api/admin/siswa/[id]` - Update student
- `DELETE /api/admin/siswa/[id]` - Delete student

### Student Endpoints
- `GET /api/student/profile` - Get student profile

### Verification Endpoints
- `GET /api/verification/[siswaId]` - Check verification status
- `PUT /api/verification/[siswaId]` - Update verification status

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Tim Pengembang

- **SMK Taruna Bhakti Development Team**
- **Yayasan Setya Bhakti**

## 📞 Kontak

- Website: [SMK Taruna Bhakti Depok](https://smktarunabhakti.sch.id)
- Email: info@smktarunabhakti.sch.id
- Alamat: Depok, Jawa Barat, Indonesia

---

**Unggul, Kreatif, Berdaya Saing** - SMK Taruna Bhakti Depok
