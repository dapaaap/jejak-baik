"use client";

import { useState } from "react";
import { AvatarProfil } from "@/components/akun/AvatarProfil";
import {
  guruKosong,
  IsianGuru,
  validasiGuru,
  type NilaiGuru,
} from "@/components/akun/IsianGuru";
import { Button } from "@/components/ui/Button";
import { akunGuru, akunGoogle, pilihanPeran } from "@/data/akun";
import type { AkunGoogle } from "@/lib/google";
import { panggilSheets, sheetsAktif } from "@/lib/jaringan";
import type { Peran, Profil } from "@/lib/progres";
import { mulaiSesi } from "@/lib/sesi";

/** Langkah wajib setelah login Google untuk akun yang belum pernah memakai perangkat ini. */
export function PilihPeran({
  akun,
  onSelesai,
  onBatal,
}: {
  akun: AkunGoogle;
  onSelesai: (profil: Profil) => void;
  onBatal?: () => void;
}) {
  const [peran, setPeran] = useState<Peran>("didik");
  const [guru, setGuru] = useState<NilaiGuru>(guruKosong);
  const [galat, setGalat] = useState("");
  const [mengirim, setMengirim] = useState(false);

  async function simpan() {
    setGalat("");

    if (peran === "guru" && sheetsAktif) {
      const salah = validasiGuru(guru);
      if (salah) {
        setGalat(salah);
        return;
      }

      setMengirim(true);

      try {
        await panggilSheets("daftarGuru", {
          sekolah: guru.sekolah.trim(),
          jabatan: guru.jabatan.trim(),
        });
      } catch (error) {
        setMengirim(false);
        setGalat(
          error instanceof Error && error.message ? error.message : akunGuru.gagal,
        );
        return;
      }

      setMengirim(false);
    }

    const profil: Profil = {
      nama: akun.nama,
      peran,
      email: akun.email,
      avatar: akun.avatar,
      sub: akun.sub,
      statusVerifikasi: peran === "guru" ? "menunggu" : undefined,
    };

    if (!mulaiSesi(profil, akun.token)) {
      setGalat(
        "Peramban menolak menyimpan. Coba matikan mode penyamaran atau izinkan penyimpanan situs ini.",
      );
      return;
    }

    onSelesai(profil);
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <AvatarProfil profil={akun} />
        <div className="min-w-0">
          <p className="truncate font-display text-h3 font-semibold">{akun.nama}</p>
          <p className="truncate text-small text-ink-muted">{akun.email}</p>
        </div>
      </div>

      <h2 className="mt-6 text-h2 font-medium">{akunGoogle.peranJudul}</h2>
      <p className="mt-2 max-w-measure text-small text-ink-muted">{akunGoogle.peranSub}</p>

      <fieldset className="mt-5">
        <legend className="sr-only">Peran</legend>
        <div className="space-y-2.5">
          {pilihanPeran.map((item) => (
            <label
              key={item.id}
              className={
                peran === item.id
                  ? "flex min-h-11 cursor-pointer gap-3 rounded-md border border-forest bg-paper-deep p-3.5"
                  : "flex min-h-11 cursor-pointer gap-3 rounded-md border border-line bg-paper p-3.5 hover:border-line-strong"
              }
            >
              <input
                type="radio"
                name="peran-google"
                value={item.id}
                checked={peran === item.id}
                onChange={() => setPeran(item.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-forest"
              />
              <span>
                <span className="block text-small font-semibold">{item.label}</span>
                <span className="mt-0.5 block text-small text-ink-muted">{item.deskripsi}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {peran === "guru" && sheetsAktif ? (
        <fieldset className="mt-5 rounded-lg border border-line bg-paper p-4">
          <legend className="px-1 text-small font-semibold">{akunGuru.judul}</legend>
          <p className="text-small text-ink-muted">{akunGuru.sub}</p>
          <div className="mt-4">
            <IsianGuru nilai={guru} onUbah={setGuru} idAwalan="peran-guru" />
          </div>
        </fieldset>
      ) : null}

      {peran === "guru" && !sheetsAktif ? (
        <p className="mt-4 rounded-md border border-line bg-paper-deep p-4 text-small text-ink-muted">
          {akunGuru.tanpaJaringan}
        </p>
      ) : null}

      {galat ? (
        <p role="alert" className="mt-4 text-small font-medium text-danger">
          {galat}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={simpan} disabled={mengirim}>
          {mengirim ? akunGuru.mengirim : akunGoogle.lanjut}
        </Button>
        {onBatal ? (
          <Button variant="secondary" onClick={onBatal}>
            Batal
          </Button>
        ) : null}
      </div>
    </div>
  );
}
