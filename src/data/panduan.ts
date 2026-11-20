import type { SeoData } from "./materi";

export interface LangkahPanduan {
  judul: string;
  isi: string;
}

export interface JalurPanduan {
  id: string;
  nomor: number;
  audiens: string;
  ringkas: string;
  langkah: LangkahPanduan[];
  hindari: string[];
}

export const panduanSeo: SeoData = {
  title: "Panduan Tindakan Aman · Jejak Baik",
  description:
    "Langkah praktis untuk korban, saksi, dan pelaku cyberbullying: hentikan, simpan bukti, libatkan orang dewasa tepercaya, dan cari pendampingan.",
  ogTitle: "Panduan Tindakan Aman · Jejak Baik",
  ogDescription: "Langkah praktis untuk korban, saksi, dan pelaku yang ingin berhenti.",
  twitterDescription: "Langkah praktis untuk korban, saksi, dan pelaku yang ingin berhenti.",
  ogType: "article",
  author: "Jejak Baik",
};

export const panduanHero = {
  label: "Panduan tindakan aman",
  judul: "Apa yang bisa dilakukan sekarang.",
  sub: "Tiga jalur sesuai posisimu: yang mengalami, yang melihat, dan yang ingin berhenti. Mulai dari langkah pertama yang paling kecil.",
};

export const jalurPanduan: JalurPanduan[] = [
  {
    id: "korban",
    nomor: 1,
    audiens: "Kalau kamu yang mengalaminya",
    ringkas:
      "Rasa malu dan takut itu wajar. Yang tidak wajar adalah dibiarkan sendirian. Urutan langkah ini dibuat agar kamu tidak memperbesar risiko saat menyelamatkan diri.",
    langkah: [
      {
        judul: "Berhenti membalas",
        isi: "Balasanmu memberi bahan baru bagi pelaku. Tutup percakapan, jangan mengetik saat marah.",
      },
      {
        judul: "Simpan bukti sebelum apa pun",
        isi: "Tangkap layar percakapan, unggahan, atau akun pelaku. Lihat halaman Bukti & Pelaporan untuk rinciannya.",
      },
      {
        judul: "Blokir dan laporkan di platform",
        isi: "Gunakan fitur laporkan pada aplikasi. Setelah bukti aman, blokir akun pelaku supaya pesan baru tidak masuk.",
      },
      {
        judul: "Ceritakan ke satu orang dewasa tepercaya",
        isi: "Orang tua, wali kelas, atau Guru BK. Kamu tidak perlu menceritakan semuanya sekaligus. Cukup bilang kamu butuh bantuan.",
      },
      {
        judul: "Minta pendampingan lanjutan",
        isi: "Guru BK bisa membantu proses di sekolah. SAPA 129 menyediakan pendampingan lewat telepon atau WhatsApp.",
      },
    ],
    hindari: [
      "Menghapus percakapan sebelum menyimpan bukti.",
      "Membalas dengan ancaman atau ejekan yang sama.",
      "Menghadapi pelaku sendirian di luar jalur sekolah.",
      "Menyalahkan diri sendiri karena sudah mengunggah atau membalas sesuatu.",
    ],
  },
  {
    id: "saksi",
    nomor: 2,
    audiens: "Kalau kamu yang melihatnya",
    ringkas:
      "Saksi sering dianggap penonton. Padahal diam atau ikut tertawa membuat pelaku merasa didukung. Kamu tidak harus jadi pahlawan, cukup jangan menambah kerusakan.",
    langkah: [
      {
        judul: "Jangan ikut menyebarkan",
        isi: "Termasuk meneruskan ke grup lain dengan niat mengkritik. Setiap penerusan memperluas luka.",
      },
      {
        judul: "Hubungi korban secara pribadi",
        isi: "Satu pesan singkat seperti \"aku lihat kejadian itu, kamu baik-baik saja?\" sudah berarti. Jangan memaksa dia bercerita.",
      },
      {
        judul: "Laporkan ke platform",
        isi: "Fitur laporkan biasanya tersedia di menu unggahan atau profil. Pilih alasan yang paling sesuai.",
      },
      {
        judul: "Beri tahu orang dewasa",
        isi: "Kalau kejadian berulang atau korban terlihat ketakutan, sampaikan ke Guru BK. Kamu bisa meminta identitasmu tidak disebut.",
      },
      {
        judul: "Tetap jaga hubungan baik dengan korban",
        isi: "Ajak dia bergabung di kegiatan biasa. Rasa diterima membantu pemulihan lebih dari nasihat panjang.",
      },
    ],
    hindari: [
      "Menertawakan atau memberi emoji lucu pada unggahan itu.",
      "Menyebarkan tangkapan layar ke grup lain untuk membahasnya.",
      "Menyuruh korban \"santai aja\" tanpa menanyakan keadaannya.",
      "Membuat polling atau voting tentang siapa yang salah.",
    ],
  },
  {
    id: "pelaku",
    nomor: 3,
    audiens: "Kalau kamu yang melakukannya",
    ringkas:
      "Mengakui kesalahan terasa berat, tapi jauh lebih ringan daripada membiarkan orang lain terus terluka. Kamu bisa berhenti tanpa menunggu dimaafkan.",
    langkah: [
      {
        judul: "Hentikan sekarang",
        isi: "Berhenti mengirim, mengomentari, atau meneruskan. Tidak perlu menunggu balasan korban.",
      },
      {
        judul: "Hapus dan tarik unggahan",
        isi: "Hapus kontennya, dan minta orang yang sudah menerima untuk ikut menghapus. Simpan salinan hanya kalau diminta sekolah.",
      },
      {
        judul: "Minta maaf secara pribadi dan tulus",
        isi: "Satu pesan langsung, tanpa alasan pembenaran. Hindari meminta maaf di grup karena itu menambah tontonan.",
      },
      {
        judul: "Cari bimbingan",
        isi: "Bicara ke Guru BK. Tujuannya bukan menghukum, tapi membantu kamu mengubah kebiasaan dan memperbaiki hubungan.",
      },
      {
        judul: "Perhatikan kebiasaan berikutnya",
        isi: "Kalau muncul dorongan mengomentari fisik orang lain, tahan dulu. Kebiasaan berubah lewat pengulangan, bukan niat saja.",
      },
    ],
    hindari: [
      "Memakai alasan \"cuma bercanda\" untuk menutup masalah.",
      "Menyalahkan korban karena \"terlalu sensitif\".",
      "Meminta orang lain ikut menyembunyikan kejadian.",
      "Menghubungi korban terus-menerus setelah diminta berhenti.",
    ],
  },
];

export const panduanDarurat = {
  judul: "Kalau keselamatan sedang terancam",
  isi: "Ancaman fisik, ajakan bertemu, atau penyebaran foto pribadi yang mengancam harus ditangani segera. Hubungi 112 atau SAPA 129, dan beri tahu orang dewasa tepercaya.",
  tautan: { label: "Lihat kanal bantuan", href: "/bantuan" },
};

export const panduanPenutup = {
  judul: "Satu langkah sudah cukup untuk hari ini",
  isi: "Tidak semua orang bisa langsung melakukan semua langkah di atas. Pilih satu yang paling mungkin kamu lakukan sekarang, lalu lanjutkan besok.",
  aksi: [
    { label: "Cara menyimpan bukti", href: "/bukti-pelaporan" },
    { label: "Latihan lewat simulasi", href: "/simulasi" },
  ],
};
