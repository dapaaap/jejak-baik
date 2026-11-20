import type { StatusLaporan } from "@/lib/laporan";

export const formLaporan = {
  judul: "Formulir pengaduan",
  sub: "Isi sejelas mungkin. Kamu bisa menyembunyikan namamu dari Guru BK, tetapi laporan tetap terhubung ke akunmu supaya balasannya bisa kamu baca.",
  identitas: "Identitas pelapor",
  anonim: "Sembunyikan identitas saya dari Guru BK (kirim anonim)",
  anonimCatatan:
    "Nama dan emailmu tidak ditampilkan di panel Guru BK. Nomor tiket tetap terhubung ke akunmu.",
  kategori: "Jenis kejadian",
  kategoriBantuan: "Sesuai delapan jenis cyberbullying di halaman materi.",
  platform: "Platform",
  kejadian: "Tanggal atau perkiraan waktu",
  kronologi: "Kronologi kejadian",
  kronologiBantuan:
    "Tulis urutan kejadian, siapa yang terlibat, dan apa yang kamu rasakan. Minimal 20 karakter.",
  bukti: "Lampiran bukti",
  buktiBantuan:
    "Satu gambar JPG, PNG, atau WebP, maksimal 5 MB. Gambar diperkecil dulu sebelum disimpan.",
  kirim: "Kirim laporan",
  kirimUlang: "Kirim laporan lain",
  privasi:
    "Laporan disimpan di peramban perangkat ini, bukan di server sekolah. Guru BK hanya bisa membukanya dari perangkat yang sama. Karena itu, simpan nomor tiket dan tunjukkan laporan ini langsung ke Guru BK.",
  sukses: "Laporan tercatat di perangkat ini.",
  tiketLabel: "Nomor tiket",
  tiketCatatan: "Simpan nomor ini. Kamu bisa membuka halaman ini lagi untuk melihat status dan balasan.",
};

export const kategoriLaporan = [
  { id: "flaming", nama: "Flaming", label: "Perang kata" },
  { id: "harassment", nama: "Harassment", label: "Pelecehan berulang" },
  { id: "denigration", nama: "Denigration", label: "Pencemaran nama" },
  { id: "impersonation", nama: "Impersonation", label: "Menyamar jadi orang lain" },
  { id: "outing", nama: "Outing", label: "Membongkar rahasia" },
  { id: "trickery", nama: "Trickery", label: "Tipu daya" },
  { id: "exclusion", nama: "Exclusion", label: "Pengucilan" },
  { id: "cyberstalking", nama: "Cyberstalking", label: "Penguntitan siber" },
];

export const platformLaporan = [
  "WhatsApp",
  "Instagram",
  "TikTok",
  "X",
  "Game online",
  "Lainnya",
];

export const statusLaporan: { id: StatusLaporan; label: string; deskripsi: string }[] = [
  {
    id: "terkirim",
    label: "Terkirim",
    deskripsi: "Laporan sudah tercatat dan menunggu dibuka Guru BK.",
  },
  {
    id: "ditinjau",
    label: "Sedang ditinjau",
    deskripsi: "Guru BK sudah membuka laporan dan sedang memeriksa isinya.",
  },
  {
    id: "ditindaklanjuti",
    label: "Ditindaklanjuti",
    deskripsi: "Guru BK sedang menjalankan langkah penanganan.",
  },
  {
    id: "selesai",
    label: "Selesai",
    deskripsi: "Penanganan dinyatakan selesai oleh Guru BK.",
  },
];

export const laporanSaya = {
  judul: "Laporan saya",
  kosong: "Belum ada laporan dari perangkat ini.",
  dibuka: "Dibuka Guru BK",
  belumDibuka: "Belum dibuka Guru BK",
  balasan: "Balasan",
  belumAdaBalasan: "Belum ada balasan.",
};

export const panelGuru = {
  judul: "Pengaduan masuk",
  sub: "Daftar laporan yang tersimpan di perangkat ini. Laporan anonim menyembunyikan nama dan email pelapor.",
  kosong: "Belum ada laporan masuk di perangkat ini.",
  pilih: "Buka",
  tutup: "Tutup",
  pelapor: "Pelapor",
  anonim: "Pelapor anonim",
  status: "Status penanganan",
  simpanStatus: "Simpan status",
  balas: "Balasan untuk pelapor",
  balasan: "Balasan",
  kirimBalasan: "Kirim balasan",
  bukti: "Bukti tangkapan layar",
  tanpaBukti: "Tidak ada lampiran bukti.",
  dibuka: "Dibuka",
  belumDibuka: "Belum dibuka",
  catatan:
    "Perubahan status dan balasan juga tersimpan di perangkat ini, jadi pelapor hanya melihatnya kalau memakai peramban yang sama.",
  akses: "Panel ini hanya untuk peran Guru BK / Konselor.",
};
