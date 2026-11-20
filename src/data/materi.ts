export interface SeoData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterDescription: string;
  ogType: "website" | "article";
  author: string;
}

export interface CiriCyberbullying {
  judul: string;
  deskripsi: string;
}

export type IkonJenis =
  | "flame"
  | "chat-repeated"
  | "smear"
  | "mask"
  | "secret"
  | "trap"
  | "door"
  | "eye";

export interface JenisCyberbullying {
  id: string;
  nama: string;
  labelSingkat: string;
  penjelasan: string;
  contoh: string;
  /** Nama ikon dari set orisinal di components/ui/Icon. */
  ikon: IkonJenis;
}

export interface DampakKelompok {
  area: string;
  items: string[];
}

export interface NilaiMoral {
  referensi: string;
  judul: string;
  kutipan: string;
  praktik: string;
}

export const materiSeo: SeoData = {
  title: "Pusat Materi Cyberbullying | Jejak Baik",
  description:
    "Definisi cyberbullying, 8 jenis menurut klasifikasi Willard, dampak psikososial, serta nilai tabayyun dan menjaga kehormatan sesama.",
  ogTitle: "Pusat Materi Cyberbullying | Jejak Baik",
  ogDescription: "Pahami jenis, dampak, dan nilai moral untuk mencegah cyberbullying.",
  twitterDescription: "Pahami jenis, dampak, dan nilai moral untuk mencegah cyberbullying.",
  ogType: "article",
  author: "Jejak Baik",
};

export const materiHero = {
  label: "Pusat Materi Interaktif",
  judul: "Kenali dulu, baru bisa mencegah.",
  sub: "Empat bab singkat: definisi, jenis-jenis, dampak, dan nilai kebaikan yang menjadi pegangan.",
};

export const bab1 = {
  nomor: 1,
  judul: "Apa itu cyberbullying?",
  definisi:
    "Cyberbullying (perundungan siber) adalah perilaku menyakiti orang lain secara sengaja dan berulang melalui media digital (chat, media sosial, game online, atau platform lain), di mana ada ketidakseimbangan kekuatan antara pelaku dan korban.",
  ciri: [
    {
      judul: "Disengaja",
      deskripsi: "Ada niat merendahkan, mempermalukan, atau menyakiti.",
    },
    {
      judul: "Berulang",
      deskripsi: "Terjadi lebih dari sekali, atau satu unggahan yang terus dibagikan ulang.",
    },
    {
      judul: "Timpang",
      deskripsi:
        "Pelaku merasa lebih kuat: lebih populer, beramai-ramai, atau anonim.",
    },
    {
      judul: "Menyakitkan",
      deskripsi: "Korban merasa takut, malu, sedih, atau tidak aman.",
    },
  ] satisfies CiriCyberbullying[],
};

export const bab2 = {
  nomor: 2,
  judul: "8 jenis cyberbullying (klasifikasi Nancy Willard)",
  sub: "Ketuk setiap jenis untuk melihat penjelasan dan contohnya.",
  jenis: [
    {
      id: "flaming",
      nama: "Flaming",
      labelSingkat: "Perang kata",
      penjelasan:
        "Pertengkaran online dengan kata-kata kasar, marah, dan vulgar, sering di kolom komentar atau grup.",
      contoh: "Membalas komentar dengan makian berantai di grup kelas.",
      ikon: "flame",
    },
    {
      id: "harassment",
      nama: "Harassment",
      labelSingkat: "Pelecehan berulang",
      penjelasan:
        "Mengirim pesan menghina atau mengancam secara terus-menerus kepada seseorang.",
      contoh: "Mengirim DM berisi ejekan setiap malam ke satu teman.",
      ikon: "chat-repeated",
    },
    {
      id: "denigration",
      nama: "Denigration",
      labelSingkat: "Pencemaran",
      penjelasan:
        "Menyebarkan gosip, fitnah, atau konten yang merusak reputasi seseorang.",
      contoh: "Membuat meme yang mengejek fisik teman lalu menyebarkannya.",
      ikon: "smear",
    },
    {
      id: "impersonation",
      nama: "Impersonation",
      labelSingkat: "Menyamar",
      penjelasan:
        "Berpura-pura menjadi orang lain (akun palsu / meretas akun) untuk mempermalukannya.",
      contoh: "Membuat akun palsu atas nama teman lalu memposting hal memalukan.",
      ikon: "mask",
    },
    {
      id: "outing",
      nama: "Outing",
      labelSingkat: "Membongkar rahasia",
      penjelasan:
        "Menyebarkan rahasia, foto, atau informasi pribadi seseorang tanpa izin.",
      contoh: "Membagikan screenshot curhatan pribadi teman ke grup.",
      ikon: "secret",
    },
    {
      id: "trickery",
      nama: "Trickery",
      labelSingkat: "Tipu daya",
      penjelasan: "Membujuk seseorang agar menceritakan rahasia, lalu menyebarkannya.",
      contoh: "Pura-pura jadi sahabat, memancing curhat, lalu menyebar isinya.",
      ikon: "trap",
    },
    {
      id: "exclusion",
      nama: "Exclusion",
      labelSingkat: "Pengucilan",
      penjelasan:
        "Sengaja mengeluarkan atau tidak mengikutsertakan seseorang dari grup online.",
      contoh:
        "Mengeluarkan satu teman dari grup kelas dan membuat grup baru tanpa dia.",
      ikon: "door",
    },
    {
      id: "cyberstalking",
      nama: "Cyberstalking",
      labelSingkat: "Penguntitan siber",
      penjelasan:
        "Memantau, mengikuti, dan mengancam seseorang secara intens sehingga ia merasa takut.",
      contoh: "Terus melacak lokasi dan aktivitas seseorang sambil mengirim ancaman.",
      ikon: "eye",
    },
  ] satisfies JenisCyberbullying[],
};

export const bab3 = {
  nomor: 3,
  judul: "Dampak psikososial",
  sub: "Luka akibat cyberbullying tidak terlihat, tapi nyata. Kenali tandanya pada dirimu dan temanmu.",
  kelompok: [
    {
      area: "Emosional",
      items: [
        "Cemas, takut, dan mudah sedih",
        "Rasa malu dan harga diri menurun",
        "Merasa sendirian dan tidak berharga",
      ],
    },
    {
      area: "Sosial",
      items: [
        "Menarik diri dari teman dan keluarga",
        "Sulit percaya pada orang lain",
        "Takut membuka media sosial",
      ],
    },
    {
      area: "Akademik",
      items: ["Sulit konsentrasi belajar", "Menghindari sekolah", "Prestasi menurun"],
    },
    {
      area: "Fisik",
      items: ["Gangguan tidur", "Sakit kepala atau sakit perut", "Perubahan pola makan"],
    },
  ] satisfies DampakKelompok[],
};

export const bab4 = {
  nomor: 4,
  judul: "Nilai moral & keagamaan",
  intro:
    "Nilai-nilai ini sejalan dengan ajaran semua agama dan Pancasila: memperlakukan orang lain sebagaimana kita ingin diperlakukan, empati, kejujuran, dan kemanusiaan yang adil dan beradab.",
  nilai: [
    {
      referensi: "QS. Al-Hujurat [49]: 6",
      judul: "Tabayyun: cek & ricek",
      kutipan:
        '"Jika datang kepadamu orang fasik membawa suatu berita, maka periksalah dengan teliti…"',
      praktik:
        "Sebelum percaya, membagikan, atau mengomentari sebuah kabar tentang orang lain, periksa dulu kebenarannya. Jangan jadi rantai penyebar fitnah.",
    },
    {
      referensi: "QS. Al-Hujurat [49]: 11",
      judul: "Jangan mengolok-olok",
      kutipan:
        '"Janganlah suatu kaum mengolok-olok kaum yang lain, boleh jadi mereka lebih baik…"',
      praktik:
        "Ejekan soal fisik, nama orang tua, atau latar belakang bukan candaan. Panggil teman dengan nama yang ia sukai.",
    },
    {
      referensi: "QS. Al-Hujurat [49]: 12",
      judul: "Menjaga kehormatan sesama",
      kutipan:
        '"Jauhilah banyak prasangka… dan janganlah mencari-cari kesalahan orang lain dan menggunjing…"',
      praktik:
        "Tidak kepo berlebihan, tidak menyebar aib, dan tidak bergosip di grup. Kehormatan orang lain adalah amanah.",
    },
    {
      referensi: "HR. Bukhari & Muslim",
      judul: "Selamat dari lisan & tangan",
      kutipan:
        '"Seorang muslim adalah orang yang kaum muslimin lainnya selamat dari lisan dan tangannya."',
      praktik:
        'Di era digital, "lisan" juga berarti ketikan jari. Pastikan unggahanmu tidak menyakiti siapa pun.',
    },
  ] satisfies NilaiMoral[],
};

export const materiCta = {
  judul: "Siap menguji pemahamanmu?",
  aksi: [
    { label: "Mulai simulasi kasus", href: "/simulasi" },
    { label: "Kerjakan kuis", href: "/kuis" },
  ],
};
