import type { SeoData } from "./materi";

export interface Aksi {
  label: string;
  href: string;
}

export const berandaSeo: SeoData = {
  title: "Jejak Baik — Ruang Aman Belajar Anti-Cyberbullying",
  description:
    "Kenali, cegah, dan tangani cyberbullying lewat materi interaktif, simulasi kasus, kuis, dan rujukan ke Guru BK. Data peserta didik dijaga rahasia.",
  ogTitle: "Jejak Baik — Ruang Aman Belajar Anti-Cyberbullying",
  ogDescription: "Materi, simulasi kasus, kuis, refleksi, dan rujukan profesional untuk remaja.",
  twitterDescription:
    "Materi, simulasi kasus, kuis, refleksi, dan rujukan profesional untuk remaja.",
  ogType: "website",
  author: "Jejak Baik",
};

export const heroBeranda = {
  label: "Ruang aman untuk remaja Indonesia",
  judulBaris: ["Setiap ketikan", "meninggalkan jejak.", "Pastikan itu baik."],
  deskripsi:
    "Jejak Baik membantumu mengenali, mencegah, dan menangani cyberbullying — lewat materi interaktif, simulasi kasus, kuis, dan rujukan aman ke Guru BK.",
  aksi: [
    { label: "Daftar gratis", href: "/auth?mode=daftar" },
    { label: "Coba simulasi kasus", href: "/simulasi" },
  ] satisfies Aksi[],
  jaminan: ["Data terenkripsi", "Hanya kamu & Guru BK", "Terbuka untuk semua"],
  gambar: {
    alt: "Sekelompok remaja duduk bersama di bukit sambil melihat ponsel, dengan jejak kaki bercahaya",
    catatan: "Area gambar hero (TODO: aset dibuat pada Prompt 2)",
  },
};

export const pengingatBeranda = {
  label: "Ingat",
  teks: "Candaan sehat = semua tertawa. Kalau ada yang terluka, itu bukan candaan lagi.",
  langkah: ["Jangan balas", "Simpan bukti", "Blokir & laporkan", "Ceritakan ke orang dewasa tepercaya"],
};

export const layananBeranda = {
  label: "Layanan utama",
  judul: "Semua yang kamu butuhkan untuk berselancar dengan aman",
  deskripsi:
    "Belajar dengan caramu sendiri. Sebagian besar materi bisa dibuka tanpa akun; kuis, refleksi, dan pelaporan butuh akun agar tersimpan aman.",
  cta: "Buka",
  items: [
    {
      judul: "Pusat Materi",
      deskripsi: "Definisi, 8 jenis cyberbullying (Willard), dampaknya, dan nilai tabayyun.",
      href: "/materi",
    },
    {
      judul: "Simulasi Kasus",
      deskripsi: "Studi kasus fiktif dengan 5 pertanyaan penuntun: candaan atau perundungan?",
      href: "/simulasi",
    },
    {
      judul: "Panduan Tindakan Aman",
      deskripsi: "Langkah praktis untuk korban, saksi, dan pelaku yang ingin berhenti.",
      href: "/panduan",
    },
    {
      judul: "Bukti & Pelaporan",
      deskripsi: "Cara screenshot yang valid dan alur lapor ke platform atau sekolah.",
      href: "/bukti-pelaporan",
    },
    {
      judul: "Kuis & Refleksi",
      deskripsi: "Uji pemahaman dan tulis refleksi perilaku digital secara pribadi.",
      href: "/dashboard",
    },
    {
      judul: "Desk Bantuan",
      deskripsi: "Kontak Guru BK, SAPA 129, dan dasar hukum Permendikbudristek 46/2023.",
      href: "/bantuan",
    },
  ],
};

export const pembandingBeranda = {
  candaan: {
    judul: "Candaan sehat",
    items: [
      "Semua pihak ikut tertawa dan nyaman",
      "Berhenti saat ada yang keberatan",
      "Tidak menyerang fisik, keluarga, atau SARA",
      "Hubungan pertemanan jadi makin dekat",
    ],
  },
  perundungan: {
    judul: "Perundungan",
    items: [
      "Satu orang jadi sasaran, yang lain menertawakan",
      "Terus diulang walau korban terlihat tidak nyaman",
      "Mempermalukan, mengancam, atau mengucilkan",
      "Korban menarik diri, takut, atau sedih",
    ],
  },
};

export const akunBeranda = {
  label: "Dua jenis akun",
  judul: "Siapa saja boleh bergabung",
  deskripsi:
    "Saat mendaftar, pilih peranmu. Akun Guru BK diverifikasi terlebih dahulu sebelum dapat mengakses data peserta didik.",
  peran: [
    {
      judul: "Peserta Didik",
      deskripsi: "Untuk remaja dan siswa yang ingin belajar, berlatih, dan mencari bantuan.",
      items: [
        "Simpan hasil kuis & simulasi",
        "Jurnal refleksi pribadi terenkripsi",
        "Lapor kejadian secara rahasia ke Guru BK",
        "Lihat siapa saja yang pernah membuka datamu",
      ],
    },
    {
      judul: "Guru BK / Konselor",
      deskripsi: "Pengelola terverifikasi yang mendampingi dan merujuk peserta didik.",
      items: [
        "Tinjau & tindak lanjuti laporan",
        "Pantau perkembangan belajar siswa",
        "Balas laporan dengan pesan terenkripsi",
        "Verifikasi akun Guru BK lain",
      ],
    },
  ],
};

export const privasiBeranda = {
  judul: "Rahasiamu tetap rahasia.",
  deskripsi:
    "Jawaban kuis, refleksi, dan laporanmu hanya bisa dilihat olehmu dan Guru BK yang sudah terverifikasi. Teks pribadi dienkripsi sebelum disimpan, dan setiap kali Guru BK membuka datamu, kamu bisa melihat catatannya.",
  cta: { label: "Baca pernyataan privasi", href: "/privasi" },
  jaminan: [
    "Enkripsi AES-256 untuk teks pribadi",
    "Akses berbasis peran yang ketat",
    "Guru BK wajib diverifikasi",
    "Riwayat akses data yang transparan",
  ],
};
