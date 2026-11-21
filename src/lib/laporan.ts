/**
 * Laporan pengaduan. Kalau NEXT_PUBLIC_SHEET_API_URL diisi, isinya dikirim ke
 * Google Sheets sekolah (lihat src/lib/jaringan.ts). Tanpa URL itu, laporan
 * jatuh kembali ke localStorage seperti sebelumnya.
 *
 * Tipe dan helper di bawah dipakai kedua mode, supaya tampilan tidak bercabang.
 */
import type { LaporanServer } from "./jaringan";
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

/** Pasangan tiket dan rahasia untuk membuka laporan sendiri dari Google Sheets. */
export interface TiketRahasia {
  tiket: string;
  rahasia: string;
}

export function bacaTiket(): TiketRahasia[] {
  return bacaProgres<TiketRahasia[]>(kunciProgres.tiket) ?? [];
}

export function simpanTiket(tiket: string, rahasia: string): boolean {
  const daftar = bacaTiket().filter((item) => item.tiket !== tiket);
  return simpanProgres(kunciProgres.tiket, [...daftar, { tiket, rahasia }]);
}

/** Laporan dari Google Sheets memakai bentuk yang sama dengan laporan lokal. */
export function dariServer(laporan: LaporanServer, pemilik: string): Laporan {
  return {
    tiket: laporan.tiket,
    dibuat: laporan.dibuat,
    pemilik: laporan.email || pemilik,
    nama: laporan.nama,
    anonim: laporan.anonim,
    kategori: laporan.kategori,
    platform: laporan.platform,
    kejadian: laporan.kejadian,
    kronologi: laporan.kronologi,
    bukti: laporan.buktiUrl,
    status: laporan.status,
    dibuka: laporan.dibuka,
    balasan: laporan.balasan,
  };
}
