import type { SeoData } from "./materi";

export interface LangkahBukti {
  judul: string;
  isi: string;
}

export interface KanalLaporan {
  nama: string;
  untuk: string;
  cara: string;
  href?: string;
  labelHref?: string;
}

export const buktiSeo: SeoData = {
  title: "Lapor Cyberbullying · Jejak Baik",
  description:
    "Kirim laporan perundungan siber langsung dari situs, simpan bukti tangkapan layar, dan pantau status penanganannya lewat nomor tiket.",
  ogTitle: "Lapor Cyberbullying · Jejak Baik",
  ogDescription: "Formulir laporan, nomor tiket, dan pelacakan status penanganan.",
  twitterDescription: "Formulir laporan, nomor tiket, dan pelacakan status penanganan.",
  ogType: "article",
  author: "Jejak Baik",
};

export const buktiHero = {
  label: "Bukti & pelaporan",
  judul: "Bukti yang rapi membuat ceritamu didengar.",
  sub: "Bukan untuk membuktikan bahwa kamu benar, tapi supaya kejadiannya tidak bisa dibantah begitu saja. Empat langkah, lalu pilih kanal yang paling dekat.",
  aksi: { label: "Buat laporan sekarang", href: "#lapor" },
};

export const langkahBukti: LangkahBukti[] = [
  {
    judul: "Tangkap layar sebelum memblokir",
    isi: "Buka percakapan atau unggahan, lalu tangkap layar. Lakukan sebelum memblokir atau menghapus, karena isinya bisa hilang permanen.",
  },
  {
    judul: "Ambil lebih dari satu gambar",
    isi: "Satu gambar untuk unggahan utuh, satu untuk profil pelaku, dan satu untuk percakapan lengkap. Kalau pesannya panjang, gulir dan tangkap bertahap.",
  },
  {
    judul: "Simpan di tempat yang tidak mudah terhapus",
    isi: "Pindahkan ke folder khusus atau simpan di dua tempat. Jangan hanya mengandalkan galeri ponsel yang bisa terhapus atau tersinkron ulang.",
  },
  {
    judul: "Jangan edit gambarnya",
    isi: "Jangan potong, tambah tulisan, atau sensor nama akun. Kalau perlu menyamarkan identitas, buat salinan terpisah dan simpan versi aslinya.",
  },
];

export const buktiWajib = {
  judul: "Yang sebaiknya terlihat di bukti",
  poin: [
    "Nama akun atau nama tampilan pelaku",
    "Tanggal dan waktu unggahan atau pesan",
    "Isi pesan atau unggahan secara utuh",
    "Alamat halaman atau nama grup tempat kejadian",
    "Jumlah dan isi komentar yang ikut menertawakan, kalau ada",
  ],
  catatan:
    "Kalau salah satu belum terlihat, ambil tangkapan layar tambahan. Kekurangan bukti bukan alasan untuk menunda melapor.",
};

export const kanalLaporan: KanalLaporan[] = [
  {
    nama: "Fitur laporkan di platform",
    untuk: "Konten yang masih tayang atau akun yang masih aktif.",
    cara: "Buka menu titik tiga pada unggahan, komentar, atau profil. Pilih Laporkan, lalu ikuti pilihan alasannya.",
  },
  {
    nama: "Guru BK atau tim PPKSP sekolah",
    untuk: "Kejadian yang melibatkan siswa dari sekolah yang sama.",
    cara: "Datang langsung, atau titip pesan lewat wali kelas. Bawa bukti yang sudah disimpan dan ceritakan urutan kejadiannya.",
  },
  {
    nama: "SAPA 129",
    untuk: "Pendampingan, rujukan layanan, dan pengaduan kekerasan terhadap anak.",
    cara: "Telepon 129 atau kirim pesan WhatsApp ke 08111-129-129.",
    href: "https://wa.me/628111129129",
    labelHref: "Buka WhatsApp SAPA 129",
  },
  {
    nama: "112",
    untuk: "Keadaan darurat yang mengancam keselamatan saat ini juga.",
    cara: "Telepon 112. Hubungi lebih dulu kalau ada ancaman fisik atau ajakan bertemu.",
    href: "tel:112",
    labelHref: "Telepon 112",
  },
];

export const templateLaporan = `Halo, saya ingin melaporkan perundungan siber.

Nama saya: (boleh dikosongkan kalau ingin anonim)
Kelas atau sekolah: ...
Peran saya: korban / saksi

Kejadian:
Tanggal dan waktu: ...
Platform: ...
Nama akun pelaku: ...
Apa yang terjadi: ...

Bukti: tangkapan layar terlampir, memuat nama akun, tanggal, dan isi pesan.

Dampak yang saya rasakan: ...

Yang saya harapkan: ...

Terima kasih.`;

export const templateCatatan = [
  "Sebutkan fakta, bukan tuduhan. Tulis apa yang kamu lihat atau alami sendiri.",
  "Kalau kamu saksi, tulis juga apa yang kamu lakukan saat itu.",
  "Simpan salinan laporan yang sudah dikirim, termasuk tanggal pengirimannya.",
];

export const buktiPenutup = {
  judul: "Laporan di situs ini masuk ke panel Guru BK",
  isi: "Formulir di atas mengirim laporan ke Google Sheets sekolah, jadi Guru BK yang sudah disetujui bisa membacanya dari perangkat mereka. Kalau kamu butuh respons hari itu juga, kirim juga lewat kanal yang kamu pilih di atas, atau tunjukkan nomor tiketmu langsung ke Guru BK.",
  aksi: [
    { label: "Buka kanal bantuan", href: "/bantuan" },
    { label: "Baca panduan tindakan", href: "/panduan" },
  ],
};

export const buktiPenutupLokal = {
  judul: "Laporan di situs ini tersimpan di perangkatmu",
  isi: "Formulir di atas mencatat laporan di peramban perangkat ini, bukan di server sekolah. Kalau kamu butuh laporan yang benar-benar diterima Guru BK hari itu juga, kirim juga lewat kanal yang kamu pilih di atas, atau tunjukkan nomor tiketmu langsung ke Guru BK.",
  aksi: buktiPenutup.aksi,
};
