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
  sub: "Profil ini bukan akun daring. Isinya hanya nama panggilan dan peran, disimpan di peramban ini supaya Dasbor bisa menyapamu dan menyimpan hasil latihan.",
  catatan: [
    "Tidak perlu kata sandi, karena tidak ada data yang dikirim ke server.",
    "Jangan tulis nama lengkap, nomor telepon, atau alamat.",
    "Kalau memakai komputer bersama, hapus profil setelah selesai.",
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
};
