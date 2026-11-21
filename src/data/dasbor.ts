import type { SeoData } from "./materi";

export const dasborSeo: SeoData = {
  title: "Dasbor Belajar · Jejak Baik",
  description:
    "Ringkasan progres belajarmu: hasil kuis, hasil simulasi kasus, dan refleksi yang tersimpan di perangkat ini.",
  ogTitle: "Dasbor Belajar · Jejak Baik",
  ogDescription: "Ringkasan hasil kuis, simulasi, dan refleksi yang tersimpan di perangkatmu.",
  twitterDescription: "Ringkasan hasil kuis, simulasi, dan refleksi yang tersimpan di perangkatmu.",
  ogType: "website",
  author: "Jejak Baik",
};

export const dasborHero = {
  label: "Dasbor",
  judul: "Jejak belajarmu sejauh ini.",
  sub: "Semua angka di halaman ini berasal dari latihan yang kamu kerjakan di perangkat ini, bukan dari perbandingan dengan orang lain.",
};

export const dasborKosong = {
  judul: "Belum ada progres tersimpan",
  isi: "Dasbor akan terisi setelah kamu mengerjakan kuis atau simulasi. Profil hanya dipakai untuk menyapa, jadi kamu bisa langsung mulai tanpa mengisinya.",
  aksi: [
    { label: "Kerjakan kuis", href: "/kuis" },
    { label: "Coba simulasi", href: "/simulasi" },
  ],
};

export const dasborKartu = {
  kuis: {
    judul: "Kuis & refleksi",
    belum: "Belum dikerjakan",
    aksi: "Kerjakan kuis",
    ulangi: "Kerjakan ulang",
  },
  simulasi: {
    judul: "Simulasi kasus",
    belum: "Belum dicoba",
    aksi: "Coba simulasi",
    ulangi: "Coba ulang",
  },
  profil: {
    judul: "Profil belajar",
    belum: "Belum diisi",
    aksi: "Isi profil",
  },
};

export const dasborAdmin = {
  judul: "Akun ini terdaftar sebagai admin sekolah.",
  isi: "Panel admin berisi seluruh pengaduan dan permintaan akses Guru BK.",
  aksi: "Buka panel admin",
};

export const dasborHapus = {
  judul: "Hapus data di perangkat ini",
  isi: "Menghapus profil, daftar akun, hasil kuis, hasil simulasi, seluruh refleksi, dan salinan laporan di peramban ini. Nomor tiket dan kunci akses laporan juga ikut terhapus, jadi salin nomornya dulu kalau masih perlu membukanya. Laporan yang sudah terkirim ke Google Sheets sekolah tetap tersimpan di sana dan hanya bisa dihapus admin. Tindakan ini tidak bisa dibatalkan.",
  tombol: "Hapus semua data",
  konfirmasi: "Yakin hapus semua data?",
  batal: "Batal",
  sukses: "Data di perangkat ini sudah dihapus.",
};
