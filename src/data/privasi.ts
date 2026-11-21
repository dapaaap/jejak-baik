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
  "Hasil kuis, simulasi, dan refleksi tersimpan di peramban ini.",
  "Laporan pengaduan dikirim ke Google Sheets sekolah bila fitur itu aktif.",
  "Tidak ada pelacak, iklan, atau cookie analitik.",
];

export const privasiBagian: BagianPrivasi[] = [
  {
    judul: "Apa yang disimpan",
    paragraf: [
      "Jejak Baik berjalan sebagai situs statis tanpa server sendiri. Profil, hasil kuis, hasil simulasi, dan refleksi disimpan di penyimpanan lokal peramban (localStorage) pada perangkat yang kamu pakai.",
      "Laporan pengaduan adalah pengecualian. Kalau sekolah mengaktifkan fitur ini, isi laporan dikirim ke Google Sheets milik sekolah lewat Apps Script supaya Guru BK bisa membukanya dari perangkat lain. Lampiran bukti disimpan di Google Drive sekolah, dan yang dicatat di sheet hanya tautannya.",
      "Login Google memakai Google Identity Services. Jejak Baik membaca nama, email, dan foto profil dari token Google. Token yang sama dikirim ke Apps Script hanya untuk memeriksa izin admin atau Guru BK, lalu disimpan di perangkat ini sampai kamu keluar.",
    ],
    poin: [
      "Nama panggilan, peran, email, dan avatar dari akun Google atau profil manual.",
      "Skor kuis, skor simulasi, dan tanggal pengerjaannya.",
      "Teks refleksi yang kamu simpan sendiri.",
      "Laporan pengaduan: kategori, platform, tanggal kejadian, kronologi, tautan bukti, status, dan balasan.",
      "Pendaftaran Guru BK: nama, email, sekolah, jabatan, dan status persetujuan.",
    ],
  },
  {
    judul: "Siapa yang bisa melihat",
    paragraf: [
      "Data belajar di perangkat ini bisa dibuka siapa pun yang memakai peramban yang sama. Itu termasuk teman atau petugas lab komputer kalau kamu memakai perangkat bersama.",
      "Laporan pengaduan bisa dibaca admin sekolah dan Guru BK yang sudah disetujui admin. Guru BK yang belum disetujui tidak bisa membuka panel pengaduan.",
      "Kalau kamu memilih anonim, nama dan emailmu tidak ikut disimpan di baris laporan. Kamu tetap bisa membuka laporan itu lewat nomor tiket dan kunci yang tersimpan di perangkat ini.",
    ],
  },
  {
    judul: "Yang tidak dikumpulkan",
    paragraf: [
      "Situs ini tidak memuat layanan analitik, jaringan iklan, atau skrip pelacak. Skrip Google Identity Services hanya dimuat di halaman akun dan halaman laporan, dan hanya saat tombol Google dirender.",
    ],
    poin: [
      "Tidak ada cookie untuk pelacakan atau iklan.",
      "Isi refleksi, jawaban kuis, dan hasil simulasi tidak pernah dikirim ke Google Sheets.",
      "Tidak ada pencatatan lokasi atau nomor telepon.",
    ],
  },
  {
    judul: "Cara menghapus data",
    paragraf: [
      "Buka Dasbor, lalu pilih Hapus data di perangkat ini. Profil, daftar akun, hasil kuis, hasil simulasi, refleksi, dan salinan laporan di peramban akan terhapus.",
      "Laporan yang sudah terkirim ke Google Sheets sekolah tetap tersimpan di sana. Minta admin sekolah menghapusnya kalau kamu ingin laporan itu hilang sepenuhnya.",
      "Kamu juga bisa menghapus data peramban lewat pengaturan peramban: buka daftar cookie dan data situs, lalu hapus data untuk alamat Jejak Baik.",
    ],
  },
  {
    judul: "Batas layanan ini",
    paragraf: [
      "Jejak Baik adalah media edukasi, bukan layanan konseling, bukan alat diagnosis, dan tidak memantau isi refleksimu. Tidak ada seorang pun yang membaca jawabanmu secara otomatis.",
      "Laporan yang terkirim masuk ke panel Guru BK, tetapi tidak mengirim notifikasi otomatis. Untuk hal yang mendesak, hubungi Guru BK atau kanal resmi sekolah secara langsung.",
      "Kalau kamu sedang dalam bahaya atau butuh pendampingan, hubungi orang dewasa tepercaya, Guru BK, SAPA 129, atau 112 untuk keadaan darurat.",
    ],
  },
  {
    judul: "Kalau cara kerja situs berubah",
    paragraf: [
      "Halaman ini diperbarui saat cara data disimpan berubah, termasuk ketika verifikasi Guru BK dan pengiriman laporan ke Google Sheets sekolah diaktifkan. Versi terbaru selalu ada di alamat ini.",
    ],
  },
];

export const privasiStatus = {
  judul: "Status fitur akun",
  isi: "Login Google aktif bila kunci klien diisi saat build. Pendaftaran Guru BK dan pengaduan lintas perangkat aktif bila NEXT_PUBLIC_SHEET_API_URL diisi dan Apps Script sudah di-deploy. Yang belum ada: enkripsi tambahan dan notifikasi otomatis ke Guru BK.",
  aksi: { label: "Buka pengaturan profil", href: "/auth" },
};
