import type { SeoData } from "./materi";

export interface KanalBantuan {
  nama: string;
  kontak: string;
  deskripsi: string;
  href?: string;
  labelHref?: string;
  darurat?: boolean;
}

export interface TanyaJawab {
  tanya: string;
  jawab: string;
}

export const bantuanSeo: SeoData = {
  title: "Desk Bantuan & Rujukan · Jejak Baik",
  description:
    "Kontak Guru BK, SAPA 129, dan 112, penjelasan dasar hukum Permendikbudristek 46/2023, serta jawaban atas pertanyaan seputar pelaporan perundungan.",
  ogTitle: "Desk Bantuan & Rujukan · Jejak Baik",
  ogDescription: "Kontak pendampingan, dasar hukum, dan jawaban seputar pelaporan perundungan.",
  twitterDescription: "Kontak pendampingan, dasar hukum, dan jawaban seputar pelaporan perundungan.",
  ogType: "article",
  author: "Jejak Baik",
};

export const bantuanHero = {
  label: "Desk bantuan",
  judul: "Kamu tidak harus tahu semuanya sendiri.",
  sub: "Mulai dari orang terdekat di sekolah. Kalau jalur itu belum cukup, ada layanan pendampingan yang bisa dihubungi dari mana saja.",
};

export const kanalBantuan: KanalBantuan[] = [
  {
    nama: "112",
    kontak: "Nomor darurat nasional",
    deskripsi: "Hubungi kalau keselamatanmu atau orang lain terancam saat ini juga, misalnya ada ancaman fisik atau ajakan bertemu.",
    href: "tel:112",
    labelHref: "Telepon 112",
    darurat: true,
  },
  {
    nama: "SAPA 129",
    kontak: "Telepon 129",
    deskripsi: "Layanan pengaduan dan pendampingan untuk perempuan dan anak, termasuk kekerasan yang terjadi secara daring.",
    href: "tel:129",
    labelHref: "Telepon 129",
  },
  {
    nama: "WhatsApp SAPA 129",
    kontak: "08111-129-129",
    deskripsi: "Kanal pesan kalau kamu lebih nyaman menulis daripada menelepon.",
    href: "https://wa.me/628111129129",
    labelHref: "Buka WhatsApp",
  },
  {
    nama: "Guru BK sekolahmu",
    kontak: "Datang langsung atau lewat wali kelas",
    deskripsi: "Pendamping pertama di lingkungan sekolah. Kamu bisa meminta percakapan berdua tanpa melibatkan teman sekelas.",
  },
];

export const bantuanSekolah = {
  judul: "Kalau kamu melapor ke sekolah",
  paragraf: [
    "Setiap satuan pendidikan memiliki tim pencegahan dan penanganan kekerasan. Kamu bisa menyampaikan laporan ke Guru BK, wali kelas, atau langsung ke tim tersebut.",
    "Bawa bukti yang sudah disimpan dan tulis urutan kejadiannya. Kamu boleh meminta identitasmu tidak disebarkan ke siswa lain.",
    "Kalau laporan belum ditindaklanjuti, tanyakan perkembangan secara berkala, lalu eskalasi ke kepala sekolah atau dinas pendidikan setempat.",
  ],
};

export const dasarHukum = {
  judul: "Dasar hukum",
  rujukan: "Permendikbudristek Nomor 46 Tahun 2023",
  ringkas: "Tentang Pencegahan dan Penanganan Kekerasan di Lingkungan Satuan Pendidikan.",
  poin: [
    "Sekolah wajib membentuk tim pencegahan dan penanganan kekerasan.",
    "Kekerasan psikis, termasuk perundungan dan perundungan siber, termasuk yang ditangani.",
    "Pelapor dan korban berhak mendapat perlindungan selama proses penanganan.",
  ],
};

export const faqBantuan: TanyaJawab[] = [
  {
    tanya: "Apakah laporan saya dikirim lewat Jejak Baik?",
    jawab:
      "Tidak. Jejak Baik hanya menyediakan panduan dan kontak. Laporan kamu kirim sendiri lewat kanal yang kamu pilih, jadi kamu yang memegang kendali atas isi dan identitasmu.",
  },
  {
    tanya: "Apakah harus punya bukti lengkap dulu?",
    jawab:
      "Tidak. Bukti membantu, tapi kekurangan bukti bukan alasan untuk menunda melapor. Ceritakan apa yang kamu alami atau lihat, lalu lengkapi bukti sambil proses berjalan.",
  },
  {
    tanya: "Bagaimana kalau yang saya laporkan adalah teman dekat?",
    jawab:
      "Melapor bukan berarti menyerang. Kamu bisa mulai dengan bicara pribadi dan meminta dia berhenti. Kalau kejadian berulang, tetap libatkan Guru BK supaya ada pendampingan untuk kedua pihak.",
  },
  {
    tanya: "Bagaimana kalau sekolah lambat menanggapi?",
    jawab:
      "Tanyakan perkembangan ke Guru BK atau kepala sekolah, dan simpan catatan tanggal pelaporan. Kamu juga bisa menyampaikan ke SAPA 129 untuk mendapat arahan lanjutan.",
  },
];

export const bantuanPenutup = {
  judul: "Butuh langkah yang lebih rinci?",
  isi: "Panduan tindakan memuat urutan langkah untuk korban, saksi, dan pelaku. Halaman bukti dan pelaporan menjelaskan cara menyiapkan bukti sebelum melapor.",
  aksi: [
    { label: "Panduan tindakan aman", href: "/panduan" },
    { label: "Simpan bukti & lapor", href: "/bukti-pelaporan" },
  ],
};
