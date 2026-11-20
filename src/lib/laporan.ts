/**
 * Laporan pengaduan disimpan di peramban ini (localStorage), sama seperti progres
 * belajar. Tidak ada server yang menerima laporan, jadi Guru BK hanya bisa membuka
 * laporan dari perangkat yang sama.
 */
import { bacaProgres, kunciProgres, simpanProgres, type Profil } from "./progres";

export type StatusLaporan = "terkirim" | "ditinjau" | "ditindaklanjuti" | "selesai";

export interface Balasan {
  dari: "guru" | "pelapor";
  isi: string;
  tanggal: string;
}

export interface Laporan {
  tiket: string;
  dibuat: string;
  pemilik: string;
  nama: string;
  anonim: boolean;
  kategori: string;
  platform: string;
  kejadian: string;
  kronologi: string;
  bukti?: string;
  buktiLebar?: number;
  buktiTinggi?: number;
  status: StatusLaporan;
  dibuka?: string;
  balasan: Balasan[];
}

export function bacaLaporan(): Laporan[] {
  return bacaProgres<Laporan[]>(kunciProgres.laporan) ?? [];
}

export function simpanLaporan(daftar: Laporan[]): boolean {
  return simpanProgres(kunciProgres.laporan, daftar);
}

/** Kunci pemilik laporan: email akun, atau nama profil manual bila tanpa email. */
export function kunciPemilik(profil: Profil) {
  return profil.email?.toLowerCase() ?? `nama:${profil.nama.toLowerCase()}`;
}

export function buatTiket(daftar: Laporan[]) {
  const tahun = new Date().getFullYear();
  let urut = daftar.length + 1;
  let tiket = "";

  do {
    tiket = `JB-${tahun}-${String(urut).padStart(4, "0")}`;
    urut += 1;
  } while (daftar.some((laporan) => laporan.tiket === tiket));

  return tiket;
}

export function tambahLaporan(laporan: Laporan): boolean {
  const daftar = bacaLaporan();
  return simpanLaporan([...daftar, laporan]);
}

export function ubahLaporan(tiket: string, ubah: (laporan: Laporan) => Laporan): boolean {
  const daftar = bacaLaporan();
  return simpanLaporan(
    daftar.map((laporan) => (laporan.tiket === tiket ? ubah(laporan) : laporan)),
  );
}
