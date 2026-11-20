import type { SeoData } from "./materi";

export interface OpsiKuis {
  id: string;
  teks: string;
}

export interface PertanyaanKuis {
  id: string;
  nomor: number;
  pertanyaan: string;
  opsi: OpsiKuis[];
  /** Indeks opsi yang benar pada array opsi. */
  jawaban: number;
  penjelasan: string;
}

export const kuisSeo: SeoData = {
  title: "Kuis & Refleksi Cyberbullying · Jejak Baik",
  description:
    "Delapan soal pilihan ganda tentang jenis dan dampak cyberbullying, plus tiga pertanyaan refleksi yang disimpan di perangkatmu sendiri.",
  ogTitle: "Kuis & Refleksi Cyberbullying · Jejak Baik",
  ogDescription: "Uji pemahaman, lihat pembahasan tiap soal, lalu tulis refleksi pribadimu.",
  twitterDescription: "Uji pemahaman, lihat pembahasan tiap soal, lalu tulis refleksi pribadimu.",
  ogType: "article",
  author: "Jejak Baik",
};

export const kuisHero = {
  label: "Kuis & refleksi",
  judul: "Delapan soal, satu cermin.",
  sub: "Tidak ada nilai rapor di sini. Setiap jawaban dibahas, dan refleksimu hanya tersimpan di perangkat ini.",
};

export const pertanyaanKuis: PertanyaanKuis[] = [
  {
    id: "ciri",
    nomor: 1,
    pertanyaan: "Tiga ciri utama cyberbullying adalah...",
    opsi: [
      { id: "a", teks: "Disengaja, berulang, dan ada ketidakseimbangan kekuatan" },
      { id: "b", teks: "Sekali terjadi, tidak sengaja, dan seimbang" },
      { id: "c", teks: "Hanya terjadi di media sosial besar" },
    ],
    jawaban: 0,
    penjelasan:
      "Ketiga ciri itu yang membedakan perundungan dari pertengkaran biasa. Kalau salah satu hilang, bisa jadi itu konflik, bukan perundungan.",
  },
  {
    id: "exclusion",
    nomor: 2,
    pertanyaan: "Mengeluarkan satu teman dari grup kelas lalu membuat grup baru tanpa dia disebut...",
    opsi: [
      { id: "a", teks: "Flaming" },
      { id: "b", teks: "Exclusion" },
      { id: "c", teks: "Impersonation" },
    ],
    jawaban: 1,
    penjelasan:
      "Exclusion adalah pengucilan yang disengaja. Tidak ada kata kasar, tapi dampaknya tetap membuat korban merasa tidak diterima.",
  },
  {
    id: "impersonation",
    nomor: 3,
    pertanyaan: "Membuat akun palsu atas nama teman lalu mengunggah hal memalukan termasuk...",
    opsi: [
      { id: "a", teks: "Impersonation" },
      { id: "b", teks: "Outing" },
      { id: "c", teks: "Cyberstalking" },
    ],
    jawaban: 0,
    penjelasan:
      "Impersonation berarti menyamar sebagai orang lain, termasuk lewat akun palsu, untuk mempermalukan atau merusak nama baiknya.",
  },
  {
    id: "denigration",
    nomor: 4,
    pertanyaan: "Menyebarkan ulang meme yang mengejek fisik teman termasuk...",
    opsi: [
      { id: "a", teks: "Trickery" },
      { id: "b", teks: "Denigration" },
      { id: "c", teks: "Exclusion" },
    ],
    jawaban: 1,
    penjelasan:
      "Denigration adalah menyebar gosip atau konten yang merusak reputasi. Ikut menyebarkan ulang tetap bagian dari perundungan itu.",
  },
  {
    id: "langkah",
    nomor: 5,
    pertanyaan: "Langkah pertama saat menerima pesan yang menghina terus-menerus adalah...",
    opsi: [
      { id: "a", teks: "Membalas dengan kata-kata yang lebih keras" },
      { id: "b", teks: "Berhenti membalas, simpan bukti, lalu blokir dan laporkan" },
      { id: "c", teks: "Menghapus akun media sosial" },
    ],
    jawaban: 1,
    penjelasan:
      "Membalas memperpanjang konflik. Menghapus akun bisa menghilangkan bukti. Simpan dulu, baru amankan diri dengan memblokir.",
  },
  {
    id: "bukti",
    nomor: 6,
    pertanyaan: "Tangkapan layar bukti yang berguna untuk pelaporan memuat...",
    opsi: [
      { id: "a", teks: "Hanya isi pesan, tanpa nama akun" },
      { id: "b", teks: "Nama akun, tanggal dan waktu, isi pesan utuh, serta alamat halaman" },
      { id: "c", teks: "Foto korban dari galeri pribadi" },
    ],
    jawaban: 1,
    penjelasan:
      "Tanpa nama akun dan waktu, bukti sulit ditelusuri. Foto pribadi korban justru tidak perlu disebar lagi.",
  },
  {
    id: "tabayyun",
    nomor: 7,
    pertanyaan: "Perintah tabayyun dalam QS. Al-Hujurat ayat 6 mengajarkan...",
    opsi: [
      { id: "a", teks: "Langsung percaya dan menyebarkan kabar" },
      { id: "b", teks: "Memeriksa kebenaran berita sebelum percaya atau menyebarkan" },
      { id: "c", teks: "Diam saja walau tahu kabar itu bohong" },
    ],
    jawaban: 1,
    penjelasan:
      "Tabayyun adalah memeriksa dengan teliti. Diam saat tahu ada fitnah bukan tabayyun, karena membiarkan kebohongan menyebar.",
  },
  {
    id: "candaan-sehat",
    nomor: 8,
    pertanyaan: "Candaan sehat bisa dikenali dari...",
    opsi: [
      { id: "a", teks: "Semua pihak ikut tertawa dan berhenti saat ada yang keberatan" },
      { id: "b", teks: "Satu orang jadi bahan tertawaan" },
      { id: "c", teks: "Terus diulang walau korban sudah minta berhenti" },
    ],
    jawaban: 0,
    penjelasan:
      "Candaan sehat berhenti begitu ada yang tidak nyaman. Kalau satu orang terluka, itu bukan candaan lagi.",
  },
];

export const refleksiKuis = {
  judul: "Refleksi pribadi",
  sub: "Jawabanmu tidak dikirim ke mana pun. Tulis sejujur yang kamu mau, atau lewati kalau belum siap.",
  pertanyaan: [
    {
      id: "kebiasaan",
      label: "Satu kebiasaan digital yang ingin kamu ubah setelah membaca materi ini.",
      petunjuk: "Misalnya cara membalas komentar, atau kebiasaan meneruskan unggahan.",
    },
    {
      id: "saksi",
      label: "Hal yang akan kamu lakukan kalau melihat teman dipermalukan di grup.",
      petunjuk: "Tulis langkah kecil yang realistis, bukan jawaban yang terdengar mulia.",
    },
    {
      id: "bantuan",
      label: "Orang dewasa tepercaya yang bisa kamu hubungi saat merasa tidak aman.",
      petunjuk: "Bisa Guru BK, wali kelas, atau orang tua. Cukup perannya, tidak perlu nama.",
    },
  ],
};
