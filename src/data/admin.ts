import type { SeoData } from "./materi";

export const adminSeo: SeoData = {
  title: "Panel Admin · Jejak Baik",
  description:
    "Halaman admin sekolah untuk membaca pengaduan siswa dan menyetujui pendaftaran Guru BK.",
  ogTitle: "Panel Admin · Jejak Baik",
  ogDescription: "Baca pengaduan siswa dan setujui pendaftaran Guru BK.",
  twitterDescription: "Baca pengaduan siswa dan setujui pendaftaran Guru BK.",
  ogType: "website",
  author: "Jejak Baik",
};

export const adminHero = {
  label: "Panel admin",
  judul: "Kelola laporan dan akses Guru BK.",
  sub: "Hanya akun Google yang terdaftar sebagai admin di Apps Script yang bisa membuka halaman ini. Admin tidak mendaftar sebagai Guru BK.",
};

export const panelAdmin = {
  tabPengaduan: "Pengaduan masuk",
  tabPendaftaran: "Permintaan Guru BK",
  memuat: "Memeriksa akses admin...",
  tanpaJaringan:
    "Panel admin belum aktif di build ini karena NEXT_PUBLIC_SHEET_API_URL belum diisi. Sambungkan Google Sheets lebih dulu.",
  tolak:
    "Halaman ini hanya untuk admin sekolah. Masuk dengan akun Google yang terdaftar sebagai admin, lalu buka lagi halaman ini.",
  galat: "Data admin tidak bisa dimuat.",
  coba: "Coba lagi",
  kosong: "Belum ada pendaftar Guru BK.",
  memuatDaftar: "Memuat pendaftar dari Google Sheets sekolah...",
  sekolah: "Sekolah",
  jabatan: "Jabatan",
  mendaftar: "Mendaftar",
  diputuskan: "Diputuskan",
  setujui: "Setujui",
  tolakAksi: "Tolak",
  statusMenunggu: "Menunggu",
  statusDisetujui: "Disetujui",
  statusDitolak: "Ditolak",
  sukses: "Putusan tersimpan.",
  gagal: "Putusan gagal disimpan. Coba lagi.",
};
