export interface TeksBertanda {
  teks: string;
  tebal?: boolean;
}

export const kontakDarurat = {
  nomorDarurat: "112",
  sapa: "SAPA 129",
  whatsapp: "WA 08111-129-129",
  dasarHukum: "Permendikbudristek 46/2023",
};

export const footerMerek = {
  deskripsi:
    "Ruang belajar yang aman bagi remaja untuk mengenali, mencegah, dan menangani cyberbullying dengan hati, akal sehat, dan nilai kebaikan.",
  disclaimer: [
    { teks: "Jejak Baik adalah media edukasi, " },
    { teks: "bukan alat diagnosis klinis atau layanan konseling darurat", tebal: true },
    { teks: ". Dalam keadaan darurat, hubungi 112 atau SAPA 129." },
  ] satisfies TeksBertanda[],
  hakCipta: "© 2026 Jejak Baik · Tinggalkan jejak baik di setiap ketikanmu.",
};

export const pesanDarurat = {
  teks: "Dalam keadaan darurat, hubungi 112 atau SAPA 129.",
};
