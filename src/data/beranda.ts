import type { SeoData } from "./materi";

export interface Aksi {
  label: string;
  href: string;
}

export const berandaSeo: SeoData = {
  title: "Jejak Baik | Ruang Aman Belajar Anti-Cyberbullying",
  description:
    "Kenali, cegah, dan tangani cyberbullying lewat materi interaktif, simulasi kasus, kuis, dan rujukan ke Guru BK. Data peserta didik dijaga rahasia.",
  ogTitle: "Jejak Baik | Ruang Aman Belajar Anti-Cyberbullying",
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
    "Jejak Baik membantumu mengenali, mencegah, dan menangani cyberbullying lewat materi interaktif, simulasi kasus, kuis, dan rujukan aman ke Guru BK.",
  aksi: [
    { label: "Buat profil belajar", href: "/auth?mode=daftar" },
    { label: "Coba simulasi kasus", href: "/simulasi" },
  ] satisfies Aksi[],
  jaminan: ["Tersimpan di perangkatmu", "Tanpa akun", "Terbuka untuk semua"],
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
    "Belajar dengan caramu sendiri. Semua halaman bisa dibuka tanpa akun; hasil kuis, refleksi, dan simulasi tersimpan di perangkatmu sendiri.",
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
      href: "/kuis",
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
  label: "Dua jenis peran",
  judul: "Siapa saja boleh bergabung",
  deskripsi:
    "Saat membuat profil, pilih peranmu. Profil hanya tersimpan di perangkat ini, tanpa kata sandi dan tanpa data yang dikirim ke server.",
  peran: [
    {
      judul: "Peserta Didik",
      deskripsi: "Untuk remaja dan siswa yang ingin belajar, berlatih, dan mencari bantuan.",
      items: [
        "Simpan hasil kuis & simulasi",
        "Tulis refleksi pribadi di perangkatmu",
        "Latihan menilai situasi lewat lima kasus",
        "Hapus semua data kapan saja dari dasbor",
      ],
    },
    {
      judul: "Guru BK / Konselor",
      deskripsi: "Pendamping yang bisa memakai materi dan simulasi sebagai bahan pendampingan.",
      items: [
        "Pakai materi sebagai bahan diskusi kelas",
        "Buka panduan untuk korban, saksi, dan pelaku",
        "Salin langkah pelaporan dan kanal bantuan",
        "Dampingi siswa tanpa melihat data pribadinya",
      ],
    },
  ],
};

export const privasiBeranda = {
  judul: "Rahasiamu tetap rahasia.",
  deskripsi:
    "Jawaban kuis, refleksi, dan hasil simulasimu disimpan di peramban perangkat ini dan tidak dikirim ke server mana pun. Pakai perangkat sendiri, dan hapus datanya kapan saja dari dasbor.",
  cta: { label: "Baca pernyataan privasi", href: "/privasi" },
  jaminan: [
    "Data tersimpan di perangkat sendiri",
    "Tanpa akun dan tanpa kata sandi",
    "Tidak dikirim ke server mana pun",
    "Hapus semua data kapan saja",
  ],
};
