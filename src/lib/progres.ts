/**
 * Progres belajar disimpan di peramban pengguna (localStorage).
 * Situs ini statis tanpa server, jadi tidak ada data yang dikirim ke mana pun.
 */
export type Peran = "didik" | "guru";

export interface Profil {
  nama: string;
  peran: Peran;
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
  kuis: "jejak-baik:kuis",
  simulasi: "jejak-baik:simulasi",
} as const;

export function bacaProgres<T>(kunci: string): T | null {
  if (typeof window === "undefined") return null;

  const mentah = window.localStorage.getItem(kunci);
  if (!mentah) return null;

  try {
    return JSON.parse(mentah) as T;
  } catch {
    return null;
  }
}

export function simpanProgres(kunci: string, nilai: unknown) {
  window.localStorage.setItem(kunci, JSON.stringify(nilai));
}

export function hapusProgres(kunci: string) {
  window.localStorage.removeItem(kunci);
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
