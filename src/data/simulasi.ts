import type { SeoData } from "./materi";

export interface OpsiSimulasi {
  id: string;
  teks: string;
  tepat: boolean;
  umpan: string;
}

export interface PertanyaanSimulasi {
  id: string;
  nomor: number;
  pertanyaan: string;
  opsi: OpsiSimulasi[];
}

export const simulasiSeo: SeoData = {
  title: "Simulasi Kasus Cyberbullying · Jejak Baik",
  description:
    "Latihan lima pertanyaan menilai satu studi kasus fiktif: apakah ini candaan atau perundungan, dan apa langkah paling aman.",
  ogTitle: "Simulasi Kasus Cyberbullying · Jejak Baik",
  ogDescription: "Studi kasus fiktif dengan lima pertanyaan penuntun dan umpan balik tiap pilihan.",
  twitterDescription: "Studi kasus fiktif dengan lima pertanyaan penuntun dan umpan balik tiap pilihan.",
  ogType: "article",
  author: "Jejak Baik",
};

export const simulasiHero = {
  label: "Latihan menilai situasi",
  judul: "Candaan atau perundungan?",
  sub: "Baca satu kasus fiktif, lalu jawab lima pertanyaan. Setiap pilihan diberi penjelasan, bukan cuma benar atau salah.",
};

export const kasusSimulasi = {
  judul: "Foto di grup kelas",
  keterangan: "Tokoh dan kejadian di halaman ini fiktif, dibuat untuk latihan.",
  paragraf: [
    "Rani, siswa kelas X, mengirim foto liburannya ke grup kelas. Sudut fotonya kurang bagus, dan ia sempat ragu sebelum mengirim.",
    "Malamnya Dimas mengubah foto itu jadi meme, menambahkan tulisan yang mengejek bentuk tubuh Rani, lalu mengirimnya ke grup. Tiga teman membalas dengan emoji tertawa. Besoknya meme itu sudah ada di dua grup lain.",
    "Rani melihatnya, merasa malu, dan mulai tidak masuk sekolah. Saat ditanya, Dimas menjawab, \"Cuma bercanda, kok.\"",
  ],
};

export const pertanyaanSimulasi: PertanyaanSimulasi[] = [
  {
    id: "candaan",
    nomor: 1,
    pertanyaan: "Apakah yang dilakukan Dimas masih bisa disebut candaan?",
    opsi: [
      {
        id: "fisik",
        teks: "Ya, karena Dimas tidak menyentuh Rani secara fisik.",
        tepat: false,
        umpan:
          "Perundungan siber tidak butuh sentuhan fisik. Kalau Rani malu sampai tidak masuk sekolah, itu sudah menyakiti.",
      },
      {
        id: "bukan",
        teks: "Tidak. Ada ejekan fisik, disebar berulang, dan Rani jadi sasaran.",
        tepat: true,
        umpan:
          "Tiga ciri muncul sekaligus: disengaja, berulang karena meme diteruskan, dan timpang karena banyak orang ikut menertawakan.",
      },
      {
        id: "balas",
        teks: "Tergantung apakah Rani pernah ikut bercanda soal Dimas.",
        tepat: false,
        umpan:
          "Perundungan tidak jadi sah karena korban pernah bercanda. Setiap orang tetap berhak merasa aman.",
      },
    ],
  },
  {
    id: "langkah-pertama",
    nomor: 2,
    pertanyaan: "Rani sudah melihat meme itu. Apa langkah pertama yang paling aman?",
    opsi: [
      {
        id: "balas-ejekan",
        teks: "Membalas meme itu dengan ejekan yang lebih keras.",
        tepat: false,
        umpan:
          "Membalas dengan ejekan memperpanjang pertengkaran dan bisa membuat Rani terlihat sebagai pelaku. Amankan diri dulu.",
      },
      {
        id: "simpan-bukti",
        teks: "Menyimpan tangkapan layar lengkap dengan nama akun, tanggal, dan isi pesan.",
        tepat: true,
        umpan:
          "Bukti membuat cerita Rani kuat saat dilaporkan, baik ke platform maupun ke sekolah.",
      },
      {
        id: "hapus-semua",
        teks: "Langsung keluar dari grup dan menghapus semuanya.",
        tepat: false,
        umpan:
          "Keluar dari grup boleh untuk melindungi diri. Tapi kalau semua bukti dihapus lebih dulu, laporan jadi sulit dibuktikan.",
      },
    ],
  },
  {
    id: "libatkan",
    nomor: 3,
    pertanyaan: "Siapa yang sebaiknya Rani libatkan?",
    opsi: [
      {
        id: "sendiri",
        teks: "Dihadapi sendiri saja supaya tidak dianggap lemah.",
        tepat: false,
        umpan:
          "Menghadapi sendiri bukan tanda kuat. Perundungan melibatkan ketidakseimbangan kekuatan, jadi butuh bantuan orang lain.",
      },
      {
        id: "dewasa",
        teks: "Satu orang dewasa tepercaya, misalnya orang tua atau Guru BK, lalu lapor ke platform.",
        tepat: true,
        umpan:
          "Orang dewasa tepercaya membantu menjaga proses tetap aman dan memastikan laporan ditindaklanjuti.",
      },
      {
        id: "polling",
        teks: "Semua teman di grup, dengan cara membuat polling siapa yang salah.",
        tepat: false,
        umpan:
          "Polling di grup justru mempermalukan Rani lagi dan menambah penonton. Laporan sebaiknya lewat jalur yang menjaga privasi.",
      },
    ],
  },
  {
    id: "saksi",
    nomor: 4,
    pertanyaan: "Kamu teman sekelas yang melihat meme itu. Apa yang paling membantu?",
    opsi: [
      {
        id: "ikut-tertawa",
        teks: "Ikut tertawa supaya tidak dianggap aneh.",
        tepat: false,
        umpan:
          "Tertawa membuat pelaku merasa didukung. Diam saja pun sudah memberi ruang bagi perundungan untuk berlanjut.",
      },
      {
        id: "sebar",
        teks: "Menyebarkan meme ke grup lain sambil bilang, \"ini parah banget\".",
        tepat: false,
        umpan:
          "Menyebar walau niatnya mengkritik tetap memperluas kerusakan. Jangan jadi rantai penyebaran.",
      },
      {
        id: "dukung",
        teks: "Menghubungi Rani secara pribadi, menanyakan kabarnya, dan menawarkan menemani ke Guru BK.",
        tepat: true,
        umpan:
          "Dukungan pribadi mengurangi rasa sendirian. Menemani ke Guru BK membuat langkah pertama terasa lebih ringan.",
      },
    ],
  },
  {
    id: "pelaku",
    nomor: 5,
    pertanyaan: "Dimas menyesal dan ingin berhenti. Apa langkah pertama yang benar?",
    opsi: [
      {
        id: "diam",
        teks: "Menghapus meme tanpa mengatakan apa pun, lalu pura-pura tidak terjadi.",
        tepat: false,
        umpan:
          "Menghapus memang perlu. Tapi tanpa mengakui dan meminta maaf, Rani tetap tidak tahu apakah kejadian ini akan berulang.",
      },
      {
        id: "tanggung-jawab",
        teks: "Menghapus unggahan, minta maaf langsung dan pribadi, lalu minta bimbingan Guru BK.",
        tepat: true,
        umpan:
          "Pertanggungjawaban yang tulus: hentikan, hapus, akui, perbaiki, lalu minta pendampingan.",
      },
      {
        id: "tunggu",
        teks: "Menunggu Rani memaafkan dulu, baru berhenti.",
        tepat: false,
        umpan:
          "Berhenti tidak perlu menunggu izin korban. Hentikan sekarang, lalu perbaiki.",
      },
    ],
  },
];

export const hasilSimulasi = [
  {
    minimal: 5,
    judul: "Kamu siap jadi saksi yang aman",
    isi: "Kamu menangkap semua hal penting: kenali cirinya, amankan bukti, libatkan orang dewasa, dan jangan menambah kerusakan.",
  },
  {
    minimal: 3,
    judul: "Pemahamanmu sudah kuat",
    isi: "Sebagian besar langkah sudah tepat. Baca ulang penjelasan pada pertanyaan yang belum pas, lalu coba sekali lagi.",
  },
  {
    minimal: 0,
    judul: "Masih perlu latihan",
    isi: "Tidak apa-apa. Buka Pusat Materi sebentar, lalu ulangi simulasi ini. Yang penting bukan skornya, tapi langkah yang kamu ingat.",
  },
];

export const penutupSimulasi = {
  judul: "Yang perlu diingat",
  poin: [
    "Hentikan penyebaran sebelum menambah penjelasan apa pun.",
    "Simpan bukti sebelum memblokir atau menghapus percakapan.",
    "Libatkan satu orang dewasa tepercaya, jangan hadapi sendiri.",
    "Menegur pelaku boleh, tapi keselamatan korban tetap nomor satu.",
  ],
  aksi: [
    { label: "Buka panduan tindakan", href: "/panduan" },
    { label: "Uji pemahaman di kuis", href: "/kuis" },
  ],
};
