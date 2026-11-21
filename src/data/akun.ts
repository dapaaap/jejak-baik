import type { SeoData } from "./materi";

export const akunSeo: SeoData = {
  title: "Profil Belajar · Jejak Baik",
  description:
    "Atur nama panggilan dan peranmu. Profil ini tersimpan di perangkatmu sendiri dan dipakai untuk menyapa di Dasbor.",
  ogTitle: "Profil Belajar · Jejak Baik",
  ogDescription: "Atur profil belajar yang tersimpan di perangkatmu sendiri.",
  twitterDescription: "Atur profil belajar yang tersimpan di perangkatmu sendiri.",
  ogType: "website",
  author: "Jejak Baik",
};

export const akunHero = {
  labelDaftar: "Buat profil",
  labelMasuk: "Lanjutkan",
  judulDaftar: "Mulai dari namamu.",
  judulMasuk: "Lanjutkan belajarmu.",
  sub: "Profil ini tersimpan di peramban ini, bukan di server Jejak Baik. Isi manual, atau pakai akun Google supaya nama dan avatarmu langsung terisi.",
  catatan: [
    "Tidak ada kata sandi Jejak Baik. Google hanya dipakai untuk nama, email, dan avatar.",
    "Pendaftaran Guru BK dikirim ke Google Sheets sekolah supaya bisa disetujui admin.",
    "Jangan tulis nama lengkap, nomor telepon, atau alamat di profil manual.",
    "Kalau memakai komputer bersama, keluar dan hapus profil setelah selesai.",
  ],
};

export const pilihanPeran = [
  {
    id: "didik" as const,
    label: "Peserta Didik",
    deskripsi: "Untuk remaja dan siswa yang belajar, berlatih, dan menyimpan refleksi.",
  },
  {
    id: "guru" as const,
    label: "Guru BK / Konselor",
    deskripsi: "Untuk pendamping yang ingin memakai materi ini saat sesi bersama siswa.",
  },
];

export const akunTersimpan = {
  judul: "Profil di perangkat ini",
  ubah: "Ubah profil",
  hapus: "Hapus profil",
  lanjut: "Buka dasbor",
  sukses: "Profil tersimpan di perangkat ini.",
  admin: "Buka panel admin",
};

export const akunGuru = {
  judul: "Pendaftaran Guru BK",
  sub: "Admin sekolah memeriksa setiap pendaftaran. Selama masih menunggu, panel pengaduan belum bisa dibuka.",
  sekolah: "Nama sekolah",
  sekolahBantuan: "Nama sekolah atau instansi tempat kamu mendampingi siswa.",
  jabatan: "Jabatan",
  jabatanBantuan: "Misalnya Guru BK, Konselor, atau Wali Kelas pendamping.",
  kirim: "Kirim pendaftaran",
  mengirim: "Mengirim pendaftaran...",
  menunggu: "Pendaftaran terkirim. Tunggu persetujuan admin sekolah.",
  disetujui: "Sudah disetujui admin sekolah.",
  ditolak: "Pendaftaran ditolak admin sekolah. Hubungi admin untuk meninjau ulang.",
  gagal: "Pendaftaran gagal terkirim. Periksa koneksi lalu coba lagi.",
  perluGoogle: "Peran Guru BK perlu masuk dengan Google supaya bisa diperiksa admin sekolah.",
  memeriksa: "Memeriksa status pendaftaran...",
  lengkapi: "Lengkapi pendaftaran Guru BK",
  tanpaJaringan:
    "Pendaftaran Guru BK belum aktif di build ini karena Google Sheets belum disambungkan. Peran Guru BK hanya tersimpan di perangkat ini.",
};

export const akunGoogle = {
  judul: "Masuk dengan Google",
  sub: "Google hanya memberi nama, email, dan avatar. Tidak ada kata sandi Jejak Baik dan tidak ada data yang dikirim ke server kami.",
  atau: "atau isi profil manual",
  manual: "Isi profil manual",
  kembali: "Kembali ke tombol Google",
  memuat: "Menyiapkan tombol Google...",
  gagal: "Tombol Google tidak bisa dimuat. Periksa koneksi, lalu muat ulang halaman.",
  belumAktif:
    "Login Google belum aktif di build ini karena NEXT_PUBLIC_GOOGLE_CLIENT_ID belum diisi. Sementara itu, profil manual tetap bisa dipakai.",
  peranJudul: "Pilih peranmu",
  peranSub:
    "Peran menentukan isi Dasbor. Akun Guru BK ditandai menunggu verifikasi sampai sekolah memeriksanya.",
  lanjut: "Simpan dan buka dasbor",
  keluar: "Keluar",
  menunggu: "Menunggu verifikasi",
  terverifikasi: "Guru BK",
  akunLain: "Masuk dengan akun Google lain",
};
