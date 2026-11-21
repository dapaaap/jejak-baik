"use client";

import { akunGuru } from "@/data/akun";

export interface NilaiGuru {
  sekolah: string;
  jabatan: string;
}

export const guruKosong: NilaiGuru = { sekolah: "", jabatan: "" };

/** Aturan yang sama dipakai Apps Script, supaya pesan galat tidak berbeda. */
export function validasiGuru(nilai: NilaiGuru): string | null {
  if (nilai.sekolah.trim().length < 3) return akunGuru.sekolahBantuan;
  if (nilai.jabatan.trim().length < 3) return akunGuru.jabatanBantuan;
  return null;
}

/** Dua isian pendaftaran Guru BK, dipakai di halaman akun dan di panel pengaduan. */
export function IsianGuru({
  nilai,
  onUbah,
  idAwalan = "guru",
}: {
  nilai: NilaiGuru;
  onUbah: (nilai: NilaiGuru) => void;
  idAwalan?: string;
}) {
  return (
    <>
      <div>
        <label htmlFor={`${idAwalan}-sekolah`} className="text-small font-semibold">
          {akunGuru.sekolah}
        </label>
        <p className="mt-1 text-caption text-ink-soft">{akunGuru.sekolahBantuan}</p>
        <input
          id={`${idAwalan}-sekolah`}
          type="text"
          value={nilai.sekolah}
          onChange={(event) => onUbah({ ...nilai, sekolah: event.target.value })}
          maxLength={80}
          autoComplete="organization"
          className="mt-2 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-body text-ink"
        />
      </div>

      <div className="mt-4">
        <label htmlFor={`${idAwalan}-jabatan`} className="text-small font-semibold">
          {akunGuru.jabatan}
        </label>
        <p className="mt-1 text-caption text-ink-soft">{akunGuru.jabatanBantuan}</p>
        <input
          id={`${idAwalan}-jabatan`}
          type="text"
          value={nilai.jabatan}
          onChange={(event) => onUbah({ ...nilai, jabatan: event.target.value })}
          maxLength={60}
          autoComplete="organization-title"
          className="mt-2 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-body text-ink"
        />
      </div>
    </>
  );
}
