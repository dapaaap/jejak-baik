import type { SeoData } from "./materi";

export interface BagianPrivasi {
  judul: string;
  paragraf: string[];
  poin?: string[];
}

export const privasiSeo: SeoData = {
  title: "Pernyataan Privasi · Jejak Baik",
  description:
    "Penjelasan apa yang disimpan Jejak Baik, siapa yang bisa melihatnya, apa yang tidak dikumpulkan, dan cara menghapusnya dari perangkatmu.",
  ogTitle: "Pernyataan Privasi · Jejak Baik",
  ogDescription: "Data apa yang disimpan, siapa yang bisa melihat, dan cara menghapusnya.",
  twitterDescription: "Data apa yang disimpan, siapa yang bisa melihat, dan cara menghapusnya.",
  ogType: "article",
  author: "Jejak Baik",
};

export const privasiHero = {
  label: "Pernyataan privasi",
  judul: "Data belajarmu tinggal di perangkatmu.",
  sub: "Halaman ini menjelaskan cara kerja Jejak Baik apa adanya, termasuk batasannya. Kalau ada yang belum jelas, tanyakan ke Guru BK pendamping.",
  diperbarui: "Diperbarui 20 November 2026",
};

export const privasiRingkas = [
  "Tanpa akun daring dan tanpa server data.",
  "Hasil kuis, simulasi, dan refleksi tersimpan di peramban ini.",
  "Tidak ada pelacak, iklan, atau cookie analitik.",
  "Semua data bisa kamu hapus sendiri dari Dasbor.",
];

export const privasiBagian: BagianPrivasi[] = [
  {
    judul: "Apa yang disimpan",
    paragraf: [
      "Jejak Baik saat ini berjalan sebagai situs statis. Tidak ada basis data dan tidak ada akun daring yang aktif. Semua yang kamu tulis disimpan di penyimpanan lokal peramban (localStorage) pada perangkat yang kamu pakai.",
    ],
    poin: [
      "Nama panggilan dan peran yang kamu isi di halaman akun.",
      "Skor kuis, skor simulasi, dan tanggal pengerjaannya.",
      "Teks refleksi yang kamu simpan sendiri.",
    ],
  },
  {
    judul: "Siapa yang bisa melihat",
    paragraf: [
      "Karena data berada di perangkat ini, siapa pun yang memakai peramban yang sama bisa membukanya. Itu termasuk teman atau petugas lab komputer kalau kamu memakai perangkat bersama.",
      "Guru BK tidak bisa membuka data ini dari perangkat mereka. Kalau kamu ingin Guru BK mengetahuinya, kamu perlu menunjukkan atau mengirimkannya sendiri.",
    ],
  },
  {
    judul: "Yang tidak dikumpulkan",
    paragraf: [
      "Situs ini tidak memuat layanan analitik, jaringan iklan, atau skrip pelacak pihak ketiga. Huruf dan seluruh berkas disajikan dari server yang sama dengan halaman ini.",
    ],
    poin: [
      "Tidak ada cookie untuk pelacakan atau iklan.",
      "Tidak ada pengiriman isi refleksi ke server mana pun.",
      "Tidak ada pencatatan lokasi atau nomor telepon.",
    ],
  },
  {
    judul: "Cara menghapus data",
    paragraf: [
      "Buka Dasbor, lalu pilih Hapus data di perangkat ini. Data profil, hasil kuis, hasil simulasi, dan refleksi akan terhapus dari peramban.",
      "Kamu juga bisa menghapusnya lewat pengaturan peramban: buka daftar cookie dan data situs, lalu hapus data untuk alamat Jejak Baik.",
    ],
  },
  {
    judul: "Batas layanan ini",
    paragraf: [
      "Jejak Baik adalah media edukasi, bukan layanan konseling, bukan alat diagnosis, dan tidak memantau isi refleksimu. Tidak ada seorang pun yang membaca jawabanmu secara otomatis.",
      "Kalau kamu sedang dalam bahaya atau butuh pendampingan, hubungi orang dewasa tepercaya, Guru BK, SAPA 129, atau 112 untuk keadaan darurat.",
    ],
  },
  {
    judul: "Kalau cara kerja situs berubah",
    paragraf: [
      "Halaman ini akan diperbarui ketika fitur baru mengubah cara data disimpan, misalnya saat akun daring dan pendampingan Guru BK aktif. Versi terbaru selalu ada di alamat ini.",
    ],
  },
];

export const privasiStatus = {
  judul: "Status fitur akun",
  isi: "Akun daring, verifikasi Guru BK, enkripsi, dan riwayat akses belum aktif. Fitur-fitur itu membutuhkan server dan proses verifikasi yang belum dipasang. Sampai saat itu, satu-satunya penyimpanan adalah peramban milikmu.",
  aksi: { label: "Buka pengaturan profil", href: "/auth" },
};
