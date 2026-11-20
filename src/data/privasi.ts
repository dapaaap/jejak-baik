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
  diperbarui: "Diperbarui 21 November 2026",
};

export const privasiRingkas = [
  "Akun Google opsional, tanpa kata sandi Jejak Baik.",
  "Hasil kuis, simulasi, refleksi, dan laporan tersimpan di peramban ini.",
  "Tidak ada pelacak, iklan, atau cookie analitik.",
  "Semua data bisa kamu hapus sendiri dari Dasbor.",
];

export const privasiBagian: BagianPrivasi[] = [
  {
    judul: "Apa yang disimpan",
    paragraf: [
      "Jejak Baik berjalan sebagai situs statis. Tidak ada basis data dan tidak ada server milik Jejak Baik yang menerima isi profil, refleksi, atau laporan. Semua yang kamu tulis disimpan di penyimpanan lokal peramban (localStorage) pada perangkat yang kamu pakai.",
      "Login Google memakai Google Identity Services. Jejak Baik hanya membaca nama, email, dan foto profil dari token yang diberikan Google, lalu menyimpannya di perangkat ini. Tidak ada kata sandi Jejak Baik dan tidak ada data yang dikirim balik ke server kami.",
    ],
    poin: [
      "Nama panggilan, peran, email, dan avatar dari akun Google atau profil manual.",
      "Skor kuis, skor simulasi, dan tanggal pengerjaannya.",
      "Teks refleksi yang kamu simpan sendiri.",
      "Laporan pengaduan: kategori, platform, tanggal kejadian, kronologi, lampiran bukti, status, dan balasan.",
    ],
  },
  {
    judul: "Siapa yang bisa melihat",
    paragraf: [
      "Karena data berada di perangkat ini, siapa pun yang memakai peramban yang sama bisa membukanya. Itu termasuk teman atau petugas lab komputer kalau kamu memakai perangkat bersama.",
      "Guru BK tidak bisa membuka laporan dari perangkat mereka. Panel Pengaduan Masuk hanya membaca data di peramban yang sama. Kalau kamu ingin Guru BK mengetahuinya, tunjukkan nomor tiket dan laporanmu langsung, atau kirim lewat kanal sekolah.",
      "Pilihan kirim anonim menyembunyikan nama dan emailmu di panel Guru BK, tetapi laporan tetap terhubung ke akunmu di perangkat ini supaya balasannya bisa kamu baca.",
    ],
  },
  {
    judul: "Yang tidak dikumpulkan",
    paragraf: [
      "Situs ini tidak memuat layanan analitik, jaringan iklan, atau skrip pelacak. Skrip Google Identity Services hanya dimuat di halaman akun dan halaman laporan, dan hanya saat tombol Google dirender.",
    ],
    poin: [
      "Tidak ada cookie untuk pelacakan atau iklan.",
      "Tidak ada pengiriman isi refleksi atau kronologi laporan ke server mana pun.",
      "Tidak ada pencatatan lokasi atau nomor telepon.",
    ],
  },
  {
    judul: "Cara menghapus data",
    paragraf: [
      "Buka Dasbor, lalu pilih Hapus data di perangkat ini. Profil, daftar akun, hasil kuis, hasil simulasi, refleksi, dan seluruh laporan pengaduan akan terhapus dari peramban.",
      "Kamu juga bisa menghapusnya lewat pengaturan peramban: buka daftar cookie dan data situs, lalu hapus data untuk alamat Jejak Baik.",
    ],
  },
  {
    judul: "Batas layanan ini",
    paragraf: [
      "Jejak Baik adalah media edukasi, bukan layanan konseling, bukan alat diagnosis, dan tidak memantau isi refleksimu. Tidak ada seorang pun yang membaca jawabanmu secara otomatis.",
      "Laporan yang dikirim lewat formulir di situs ini belum masuk ke sistem sekolah. Guru BK baru mengetahuinya kalau kamu menunjukkan nomor tiket atau mengirim laporan lewat kanal resmi sekolah.",
      "Kalau kamu sedang dalam bahaya atau butuh pendampingan, hubungi orang dewasa tepercaya, Guru BK, SAPA 129, atau 112 untuk keadaan darurat.",
    ],
  },
  {
    judul: "Kalau cara kerja situs berubah",
    paragraf: [
      "Halaman ini akan diperbarui ketika fitur baru mengubah cara data disimpan, misalnya saat laporan terkirim ke server sekolah dan verifikasi Guru BK aktif. Versi terbaru selalu ada di alamat ini.",
    ],
  },
];

export const privasiStatus = {
  judul: "Status fitur akun",
  isi: "Login Google sudah tersedia bila kunci klien diisi saat build. Yang belum aktif: verifikasi Guru BK oleh sekolah, enkripsi, riwayat akses lintas perangkat, dan pengiriman laporan ke server sekolah. Sampai itu dipasang, akun, laporan, dan balasan hanya hidup di peramban ini.",
  aksi: { label: "Buka pengaturan profil", href: "/auth" },
};
