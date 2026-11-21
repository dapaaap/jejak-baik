/**
 * Jembatan ke Google Sheets lewat Apps Script (docs/apps-script.gs).
 * Situs tetap statis: tidak ada server Jejak Baik, hanya satu URL Web App.
 */
import type { StatusLaporan } from "./laporan";
import { tokenAktif } from "./sesi";

export const apiSheets = (process.env.NEXT_PUBLIC_SHEET_API_URL ?? "").trim();

/** Tanpa URL, situs kembali ke mode lokal seperti sebelumnya. */
export const sheetsAktif = apiSheets.length > 0;

export type PeranServer = "admin" | "guru" | "didik" | "tamu";
export type StatusAkun = "menunggu" | "disetujui" | "ditolak" | "belum-terdaftar";

export interface AkunServer {
  peran: PeranServer;
  status: StatusAkun;
}

export interface PendaftarGuru {
  email: string;
  nama: string;
  sekolah: string;
  jabatan: string;
  status: "menunggu" | "disetujui" | "ditolak";
  tanggal: string;
  putusanOleh?: string;
  tanggalPutusan?: string;
}

export interface BalasanServer {
  dari: "guru" | "pelapor";
  isi: string;
  tanggal: string;
}

export interface LaporanServer {
  tiket: string;
  dibuat: string;
  nama: string;
  anonim: boolean;
  kategori: string;
  platform: string;
  kejadian: string;
  kronologi: string;
  buktiUrl: string;
  status: StatusLaporan;
  dibuka: string;
  balasan: BalasanServer[];
}

export class GalatJaringan extends Error {}

export async function panggilSheets<T>(
  aksi: string,
  muatan: Record<string, unknown> = {},
): Promise<T> {
  if (!sheetsAktif) throw new GalatJaringan("Google Sheets belum tersambung.");

  const kendali = new AbortController();
  const batas = setTimeout(() => kendali.abort(), 25000);

  try {
    const respons = await fetch(apiSheets, {
      method: "POST",
      // text/plain menghindari preflight CORS yang ditolak Apps Script.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ aksi, token: tokenAktif(), ...muatan }),
      signal: kendali.signal,
    });

    if (!respons.ok) {
      throw new GalatJaringan("Google Sheets menolak permintaan. Coba lagi.");
    }

    const isi = (await respons.json()) as { ok: boolean; data?: T; galat?: string };

    if (!isi.ok) throw new GalatJaringan(isi.galat ?? "Permintaan gagal.");
    return isi.data as T;
  } catch (galat) {
    if (galat instanceof GalatJaringan) throw galat;
    if (galat instanceof DOMException && galat.name === "AbortError") {
      throw new GalatJaringan("Google Sheets tidak menjawab. Periksa koneksi lalu coba lagi.");
    }
    throw new GalatJaringan("Tidak bisa menghubungi Google Sheets. Periksa koneksi.");
  } finally {
    clearTimeout(batas);
  }
}
