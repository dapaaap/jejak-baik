/**
 * Google Identity Services dimuat hanya saat halaman akun dibuka, bukan di <head>.
 * Kredensial yang diterima adalah JWT yang sudah ditandatangani Google. Isinya
 * dibaca di peramban hanya untuk menampilkan nama, email, dan avatar. Untuk
 * tindakan yang perlu izin (panel admin, pendaftaran Guru BK), token asli ikut
 * dikirim ke Apps Script dan diperiksa tanda tangannya di sana.
 */

export interface AkunGoogle {
  sub: string;
  email: string;
  nama: string;
  avatar: string;
  /** Token asli dari Google. Dikirim ke Apps Script untuk diperiksa di sana. */
  token: string;
}

interface GoogleIdentity {
  accounts: {
    id: {
      initialize(config: {
        client_id: string;
        callback: (respons: { credential: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
      }): void;
      renderButton(parent: HTMLElement, options: Record<string, string | number>): void;
      disableAutoSelect(): void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

const SUMBER = "https://accounts.google.com/gsi/client";

let pemuatan: Promise<boolean> | null = null;

export function clientIdGoogle() {
  return (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "").trim();
}

export function muatGoogle(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.google?.accounts?.id) return Promise.resolve(true);
  if (pemuatan) return pemuatan;

  pemuatan = new Promise((selesai) => {
    const skrip = document.createElement("script");
    skrip.src = SUMBER;
    skrip.async = true;
    skrip.onload = () => selesai(Boolean(window.google?.accounts?.id));
    skrip.onerror = () => selesai(false);
    document.head.appendChild(skrip);
  });

  return pemuatan;
}

/** Membaca isi JWT Google. Hanya untuk menampilkan nama, email, dan avatar. */
export function bacaCredential(credential: string): AkunGoogle | null {
  try {
    const bagian = credential.split(".")[1];
    if (!bagian) return null;

    const biner = atob(bagian.replace(/-/g, "+").replace(/_/g, "/"));
    const byte = Uint8Array.from(biner, (huruf) => huruf.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(byte)) as {
      sub?: string;
      email?: string;
      name?: string;
      picture?: string;
    };

    if (!data.sub || !data.email) return null;

    return {
      sub: data.sub,
      email: data.email,
      nama: data.name?.trim() || data.email.split("@")[0],
      avatar: data.picture ?? "",
      token: credential,
    };
  } catch {
    return null;
  }
}
