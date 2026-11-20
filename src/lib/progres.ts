/**
 * Progres belajar disimpan di peramban pengguna (localStorage).
 * Situs ini statis tanpa server, jadi tidak ada data yang dikirim ke mana pun.
 */
export type Peran = "didik" | "guru";

export interface Profil {
  nama: string;
  peran: Peran;
  email?: string;
  avatar?: string;
  sub?: string;
  statusVerifikasi?: "menunggu" | "terverifikasi";
}

export interface HasilKuis {
  benar: number;
  total: number;
  tanggal: string;
  refleksi: string[];
}

export interface HasilSimulasi {
  tepat: number;
  total: number;
  tanggal: string;
}

export const kunciProgres = {
  profil: "jejak-baik:profil",
  akun: "jejak-baik:akun",
  kuis: "jejak-baik:kuis",
  simulasi: "jejak-baik:simulasi",
  laporan: "jejak-baik:laporan",
} as const;

export function bacaProgres<T>(kunci: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const mentah = window.localStorage.getItem(kunci);
    return mentah ? (JSON.parse(mentah) as T) : null;
  } catch {
    // Data rusak atau localStorage diblokir: anggap belum ada progres.
    return null;
  }
}

export function simpanProgres(kunci: string, nilai: unknown): boolean {
  try {
    window.localStorage.setItem(kunci, JSON.stringify(nilai));
    return true;
  } catch {
    // shortcut: kegagalan simpan (kuota penuh / storage diblokir) tidak dilaporkan ke UI,
    // halaman tetap jalan. Pemanggil yang perlu tahu (laporan) memakai nilai kembalian ini.
    return false;
  }
}

export function hapusProgres(kunci: string) {
  try {
    window.localStorage.removeItem(kunci);
  } catch {
    // Sama seperti simpan: kegagalan penyimpanan tidak boleh mematikan halaman.
  }
}

export function tanggalRingkas(iso: string) {
  const tanggal = new Date(iso);
  if (Number.isNaN(tanggal.getTime())) return "";

  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
