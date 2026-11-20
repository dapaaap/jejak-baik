export interface NavItem {
  label: string;
  href: string;
  variant: "utama" | "akun";
}

export const navItems: NavItem[] = [
  { label: "Materi", href: "/materi", variant: "utama" },
  { label: "Simulasi", href: "/simulasi", variant: "utama" },
  { label: "Panduan Aman", href: "/panduan", variant: "utama" },
  { label: "Bukti & Lapor", href: "/bukti-pelaporan", variant: "utama" },
  { label: "Bantuan", href: "/bantuan", variant: "utama" },
  { label: "Masuk", href: "/auth?mode=masuk", variant: "akun" },
  { label: "Daftar", href: "/auth?mode=daftar", variant: "akun" },
];

export const navMerek = {
  nama: "JejakBaik",
  href: "/",
};

export interface FooterLink {
  label: string;
  href: string;
}

export const footerJelajahi: FooterLink[] = [
  { label: "Pusat Materi", href: "/materi" },
  { label: "Simulasi Kasus", href: "/simulasi" },
  { label: "Panduan Tindakan Aman", href: "/panduan" },
  { label: "Simpan Bukti & Lapor", href: "/bukti-pelaporan" },
  { label: "Pernyataan Privasi", href: "/privasi" },
];

export const footerBantuan = {
  judul: "Butuh bantuan?",
  kontak: "SAPA 129 · WA 08111-129-129",
  sekolah: "Guru BK sekolahmu",
  tautan: { label: "Desk Bantuan & Rujukan →", href: "/bantuan" },
};
