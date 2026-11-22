import type { SeoData } from "./materi";

export const adminSeo: SeoData = {
  title: "Panel Admin · Jejak Baik",
  description:
    "Halaman admin sekolah untuk membaca pengaduan siswa, menyetujui pendaftaran Guru BK, dan memeriksa permintaan admin.",
  ogTitle: "Panel Admin · Jejak Baik",
  ogDescription: "Baca pengaduan siswa, setujui pendaftaran Guru BK, dan permintaan admin.",
  twitterDescription: "Baca pengaduan siswa, setujui pendaftaran Guru BK, dan permintaan admin.",
  ogType: "website",
  author: "Jejak Baik",
};

export const adminHero = {
  label: "Panel admin",
  judul: "Kelola laporan dan akses Guru BK.",
  sub: "Hanya akun Google yang sudah disetujui sebagai admin yang bisa membuka halaman ini. Pemilik situs yang menyetujui permintaan admin dan pendaftaran Guru BK.",
};

export const panelAdmin = {
  tabPengaduan: "Pengaduan masuk",
  tabPendaftaran: "Permintaan Guru BK",
  tabAdmin: "Permintaan Admin",
  memuat: "Memeriksa akses admin...",
  tanpaJaringan:
    "Panel admin belum aktif di build ini karena NEXT_PUBLIC_SHEET_API_URL belum diisi. Sambungkan Google Sheets lebih dulu.",
  tolak:
    "Halaman ini hanya untuk admin sekolah. Masuk dengan akun Google yang sudah disetujui admin, lalu buka lagi halaman ini.",
  galat: "Data admin tidak bisa dimuat.",
  coba: "Coba lagi",
  kosong: "Belum ada pendaftar Guru BK.",
  memuatDaftar: "Memuat pendaftar dari Google Sheets sekolah...",
  kosongAdmin: "Belum ada permintaan admin.",
  memuatDaftarAdmin: "Memuat permintaan admin...",
  adminCatatan: "Hanya pemilik situs yang bisa menyetujui permintaan admin.",
  galatAdmin:
    "Permintaan admin tidak bisa dimuat. Pastikan Apps Script sudah memakai versi terbaru, lalu coba lagi.",
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
  suksesAdmin: "Putusan admin tersimpan.",
  gagal: "Putusan gagal disimpan. Coba lagi.",
};
