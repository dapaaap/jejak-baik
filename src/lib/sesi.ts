/**
 * Sesi belajar disimpan di peramban ini. "Akun" di sini adalah profil lokal:
 * tidak ada kata sandi dan tidak ada data yang dikirim ke server Jejak Baik.
 * Token Google hanya dipakai untuk meminta izin ke Apps Script, dan ikut
 * terhapus saat keluar.
 */
import {
  bacaProgres,
  hapusProgres,
  kunciProgres,
  simpanProgres,
  type Profil,
} from "./progres";

export const eventSesi = "jejak-baik:sesi";

export function sesiAktif(): Profil | null {
  return bacaProgres<Profil>(kunciProgres.profil);
}

export function akunTerdaftar(email: string): Profil | null {
  const daftar = bacaProgres<Profil[]>(kunciProgres.akun) ?? [];
  return daftar.find((akun) => akun.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

function simpanDaftarAkun(profil: Profil) {
  const daftar = bacaProgres<Profil[]>(kunciProgres.akun) ?? [];
  const tanpaDuplikat = daftar.filter(
    (akun) => akun.email?.toLowerCase() !== profil.email?.toLowerCase(),
  );
  simpanProgres(kunciProgres.akun, [...tanpaDuplikat, profil]);
}

/** Menyimpan sesi berjalan dan, kalau ada email, mendaftarkannya sebagai akun perangkat ini. */
export function mulaiSesi(profil: Profil, token?: string): boolean {
  const tersimpan = simpanProgres(kunciProgres.profil, profil);
  if (tersimpan && profil.email) simpanDaftarAkun(profil);
  if (tersimpan && token) simpanProgres(kunciProgres.token, token);
  kabariSesi();
  return tersimpan;
}

/** Keluar hanya menutup sesi. Hasil kuis, simulasi, dan laporan tetap ada. */
export function akhiriSesi() {
  hapusProgres(kunciProgres.profil);
  hapusProgres(kunciProgres.token);
  kabariSesi();
}

/** Token Google untuk meminta izin ke Apps Script. Kosong berarti belum masuk. */
export function tokenAktif(): string {
  return bacaProgres<string>(kunciProgres.token) ?? "";
}

export function kabariSesi() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(eventSesi));
}
