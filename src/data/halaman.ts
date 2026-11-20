export interface HalamanPlaceholder {
  judul: string;
  seoTitle: string;
  seoDescription: string;
}

// Halaman yang belum dibangun pada tahap fondasi. Tidak ada isi fitur yang dikarang.
export const halamanPlaceholder = {
  simulasi: {
    judul: "Simulasi Kasus",
    seoTitle: "Simulasi Kasus · Jejak Baik",
    seoDescription: "Halaman Simulasi Kasus sedang disiapkan.",
  },
  panduan: {
    judul: "Panduan Tindakan Aman",
    seoTitle: "Panduan Tindakan Aman · Jejak Baik",
    seoDescription: "Halaman Panduan Tindakan Aman sedang disiapkan.",
  },
  "bukti-pelaporan": {
    judul: "Simpan Bukti & Lapor",
    seoTitle: "Simpan Bukti & Lapor · Jejak Baik",
    seoDescription: "Halaman Simpan Bukti & Lapor sedang disiapkan.",
  },
  bantuan: {
    judul: "Desk Bantuan & Rujukan",
    seoTitle: "Desk Bantuan & Rujukan · Jejak Baik",
    seoDescription: "Halaman Desk Bantuan & Rujukan sedang disiapkan.",
  },
  kuis: {
    judul: "Kuis & Refleksi",
    seoTitle: "Kuis & Refleksi · Jejak Baik",
    seoDescription: "Halaman Kuis & Refleksi sedang disiapkan.",
  },
  privasi: {
    judul: "Pernyataan Privasi",
    seoTitle: "Pernyataan Privasi · Jejak Baik",
    seoDescription: "Halaman Pernyataan Privasi sedang disiapkan.",
  },
  auth: {
    judul: "Masuk atau Daftar",
    seoTitle: "Masuk atau Daftar · Jejak Baik",
    seoDescription: "Halaman akun Jejak Baik sedang disiapkan.",
  },
  dashboard: {
    judul: "Dasbor",
    seoTitle: "Dasbor · Jejak Baik",
    seoDescription: "Halaman dasbor Jejak Baik sedang disiapkan.",
  },
} satisfies Record<string, HalamanPlaceholder>;

export type HalamanPlaceholderKey = keyof typeof halamanPlaceholder;

export const placeholderCopy = {
  status: "Segera hadir",
  teks: "Halaman ini belum tersedia pada tahap fondasi. Isi dan fiturnya akan ditambahkan pada tahap berikutnya.",
  kembali: "Kembali ke Pusat Materi",
};
