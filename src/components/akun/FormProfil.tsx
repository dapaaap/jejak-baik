"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AvatarProfil } from "@/components/akun/AvatarProfil";
import {
  guruKosong,
  IsianGuru,
  validasiGuru,
  type NilaiGuru,
} from "@/components/akun/IsianGuru";
import { PilihPeran } from "@/components/akun/PilihPeran";
import { TombolGoogle } from "@/components/akun/TombolGoogle";
import {
  akunAdmin,
  akunGuru,
  akunGoogle,
  akunHero,
  akunTersimpan,
  pilihanPeran,
} from "@/data/akun";
import type { AkunGoogle } from "@/lib/google";
import {
  panggilSheets,
  sheetsAktif,
  type AkunServer,
  type StatusAkun,
} from "@/lib/jaringan";
import { hapusProgres, kunciProgres, type Peran, type Profil } from "@/lib/progres";
import { akhiriSesi, akunTerdaftar, kabariSesi, mulaiSesi, sesiAktif, tokenAktif } from "@/lib/sesi";

export function FormProfil() {
  const mode = useSearchParams().get("mode") === "masuk" ? "masuk" : "daftar";

  const [memuat, setMemuat] = useState(true);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [calon, setCalon] = useState<AkunGoogle | null>(null);
  const [mengubah, setMengubah] = useState(false);
  const [nama, setNama] = useState("");
  const [peran, setPeran] = useState<Peran>("didik");
  const [guru, setGuru] = useState<NilaiGuru>(guruKosong);
  const [galat, setGalat] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "gagal">("idle");
  const [mengirim, setMengirim] = useState(false);
  const [akunServer, setAkunServer] = useState<AkunServer | null>(null);
  const [memuatServer, setMemuatServer] = useState(false);
  const [galatServer, setGalatServer] = useState("");

  async function muatServer(aktif: Profil) {
    if (!sheetsAktif || !aktif.email) return;

    setMemuatServer(true);
    setGalatServer("");

    try {
      setAkunServer(await panggilSheets<AkunServer>("aku"));
    } catch (error) {
      setGalatServer(
        error instanceof Error && error.message
          ? error.message
          : "Status akun tidak bisa diperiksa.",
      );
    } finally {
      setMemuatServer(false);
    }
  }

  useEffect(() => {
    const aktif = sesiAktif();
    setProfil(aktif);
    setMemuat(false);
    if (aktif) void muatServer(aktif);
  }, []);

  function pakaiGoogle(akun: AkunGoogle) {
    const terdaftar = akunTerdaftar(akun.email);

    if (terdaftar) {
      mulaiSesi(terdaftar, akun.token);
      setProfil(terdaftar);
      setGalat("");
      void muatServer(terdaftar);
      return;
    }

    setCalon(akun);
  }

  async function simpanManual(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bersih = nama.trim();

    if (bersih.length < 2) {
      setGalat("Tulis nama panggilan minimal 2 huruf.");
      return;
    }

    setGalat("");
    let statusServer: StatusAkun | null = null;

    if (peran === "guru" && sheetsAktif) {
      if (!profil?.email) {
        setGalat(akunGuru.perluGoogle);
        return;
      }

      const salah = validasiGuru(guru);
      if (salah) {
        setGalat(salah);
        return;
      }

      setMengirim(true);

      try {
        const hasil = await panggilSheets<{ status: StatusAkun }>("daftarGuru", {
          sekolah: guru.sekolah.trim(),
          jabatan: guru.jabatan.trim(),
        });
        statusServer = hasil.status;
      } catch (error) {
        setGalat(
          error instanceof Error && error.message ? error.message : akunGuru.gagal,
        );
        return;
      } finally {
        setMengirim(false);
      }
    }

    const baru: Profil = {
      nama: bersih,
      peran,
      email: profil?.email,
      avatar: profil?.avatar,
      sub: profil?.sub,
      statusVerifikasi:
        peran === "guru"
          ? statusServer === "disetujui"
            ? "terverifikasi"
            : "menunggu"
          : undefined,
    };

    if (!mulaiSesi(baru, tokenAktif())) {
      setStatus("gagal");
      return;
    }

    setProfil(baru);
    setNama(bersih);
    setMengubah(false);
    setGalat("");
    setStatus("ok");
    void muatServer(baru);
  }

  async function ajukanAdmin() {
    if (!profil?.email) return;

    setMengirim(true);
    setGalatServer("");

    try {
      const hasil = await panggilSheets<{ status: StatusAkun }>("ajukanAdmin");
      setAkunServer((lama) => ({
        peran: lama?.peran ?? "didik",
        status: lama?.status ?? "belum-terdaftar",
        pemilik: lama?.pemilik ?? false,
        ajuanAdmin: hasil.status,
      }));
    } catch (error) {
      setGalatServer(
        error instanceof Error && error.message ? error.message : akunAdmin.gagal,
      );
    } finally {
      setMengirim(false);
    }
  }

  function keluar() {
    window.google?.accounts.id.disableAutoSelect();
    akhiriSesi();
    setProfil(null);
    setCalon(null);
    setMengubah(false);
    setNama("");
    setPeran("didik");
    setStatus("idle");
  }

  function hapus() {
    hapusProgres(kunciProgres.profil);
    hapusProgres(kunciProgres.akun);
    kabariSesi();
    setProfil(null);
    setCalon(null);
    setMengubah(false);
    setNama("");
    setPeran("didik");
    setStatus("idle");
  }

  const labelPeran =
    pilihanPeran.find((item) => item.id === profil?.peran)?.label ?? "Peserta Didik";

  let isi: React.ReactNode;

  if (memuat) {
    isi = (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p role="status" className="text-small text-ink-soft">
          Memuat profil di perangkat ini...
        </p>
      </div>
    );
  } else if (calon) {
    isi = (
      <PilihPeran
        akun={calon}
        onSelesai={(baru) => {
          setProfil(baru);
          setCalon(null);
          setStatus("ok");
          void muatServer(baru);
        }}
        onBatal={() => setCalon(null)}
      />
    );
  } else if (profil && !mengubah) {
    isi = (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-caption font-semibold uppercase text-accent">
          {akunTersimpan.judul}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <AvatarProfil profil={profil} />
          <div className="min-w-0">
            <p className="truncate font-display text-h2 font-medium">{profil.nama}</p>
            <p className="truncate text-small text-ink-muted">{labelPeran}</p>
            {profil.email ? (
              <p className="truncate text-small text-ink-muted">{profil.email}</p>
            ) : null}
          </div>
        </div>

        {profil.peran === "guru" ? (
          <div className="mt-4 grid gap-2">
            {sheetsAktif ? (
              <Badge>
                {memuatServer
                  ? akunGuru.memeriksa
                  : akunServer?.status === "disetujui"
                    ? akunGuru.disetujui
                    : akunServer?.status === "ditolak"
                      ? akunGuru.ditolak
                      : akunGuru.menunggu}
              </Badge>
            ) : (
              <Badge>
                {profil.statusVerifikasi === "menunggu"
                  ? akunGoogle.menunggu
                  : akunGoogle.terverifikasi}
              </Badge>
            )}

            {sheetsAktif && akunServer?.status === "belum-terdaftar" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setPeran("guru");
                  setNama(profil.nama);
                  setMengubah(true);
                }}
              >
                {akunGuru.lengkapi}
              </Button>
            ) : null}
          </div>
        ) : null}

        {sheetsAktif && profil.email && (memuatServer || akunServer || galatServer) ? (
          <div className="mt-4 grid justify-items-start gap-2">
            {memuatServer && !akunServer ? (
              <Badge>{akunAdmin.memeriksa}</Badge>
            ) : akunServer?.pemilik ? (
              <Badge>{akunAdmin.pemilik}</Badge>
            ) : akunServer?.peran === "admin" ? (
              <Badge>{akunAdmin.disetujui}</Badge>
            ) : akunServer?.ajuanAdmin === "menunggu" ? (
              <Badge>{akunAdmin.menunggu}</Badge>
            ) : (
              <>
                {akunServer?.ajuanAdmin === "ditolak" ? (
                  <p className="text-small text-ink-muted">{akunAdmin.ditolak}</p>
                ) : null}
                <Button variant="secondary" onClick={ajukanAdmin} disabled={mengirim}>
                  {mengirim ? akunAdmin.mengirim : akunAdmin.ajukan}
                </Button>
              </>
            )}
          </div>
        ) : null}

        {galatServer ? (
          <p role="alert" className="mt-4 text-small font-medium text-danger">
            {galatServer}
          </p>
        ) : null}

        {status === "ok" ? (
          <p role="status" className="mt-4 text-small text-success">
            {akunTersimpan.sukses}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-forest bg-forest px-5 py-2.5 text-small font-semibold text-paper transition-colors duration-fast hover:border-forest-deep hover:bg-forest-deep"
          >
            {akunTersimpan.lanjut}
          </Link>
          {akunServer?.peran === "admin" ? (
            <ButtonLink href="/admin" variant="secondary">
              {akunTersimpan.admin}
            </ButtonLink>
          ) : null}
          <Button
            variant="secondary"
            onClick={() => {
              setNama(profil.nama);
              setPeran(profil.peran);
              setMengubah(true);
            }}
          >
            {akunTersimpan.ubah}
          </Button>
          {profil.email ? (
            <Button variant="secondary" onClick={keluar}>
              {akunGoogle.keluar}
            </Button>
          ) : null}
          <Button variant="secondary" onClick={hapus}>
            {akunTersimpan.hapus}
          </Button>
        </div>
      </div>
    );
  } else {
    isi = (
      <div className="grid gap-6">
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-h3 font-semibold">{akunGoogle.judul}</h2>
          <p className="mt-2 max-w-measure text-small text-ink-muted">{akunGoogle.sub}</p>
          <div className="mt-4">
            <TombolGoogle onSukses={pakaiGoogle} />
          </div>
        </div>

        <form
          onSubmit={simpanManual}
          className="rounded-xl border border-line bg-surface p-6 sm:p-8"
        >
          <p className="text-caption font-semibold uppercase text-accent">{akunGoogle.atau}</p>

          {profil?.email ? (
            <p className="mt-2 text-small text-ink-muted">
              Akun Google {profil.email} tetap terhubung ke profil ini.
            </p>
          ) : null}

          <div className="mt-4">
            <label htmlFor="nama-panggilan" className="text-small font-semibold">
              Nama panggilan
            </label>
            <p className="mt-1 text-caption text-ink-soft">
              Cukup nama yang biasa dipakai di kelas. Jangan tulis nama lengkap.
            </p>
            <input
              id="nama-panggilan"
              name="nama"
              type="text"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              maxLength={40}
              autoComplete="off"
              aria-describedby={galat ? "galat-nama" : undefined}
              aria-invalid={galat ? true : undefined}
              className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-body text-ink"
              placeholder="Misalnya Rani"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="text-small font-semibold">Peran</legend>
            <div className="mt-2 space-y-2.5">
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
                    name="peran"
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
            <fieldset className="mt-6 rounded-lg border border-line bg-paper p-4">
              <legend className="px-1 text-small font-semibold">{akunGuru.judul}</legend>
              <p className="text-small text-ink-muted">{akunGuru.sub}</p>

              {profil?.email ? (
                <div className="mt-4">
                  <IsianGuru nilai={guru} onUbah={setGuru} idAwalan="profil-guru" />
                </div>
              ) : (
                <p className="mt-3 text-small font-medium text-danger">{akunGuru.perluGoogle}</p>
              )}
            </fieldset>
          ) : null}

          {galat ? (
            <p id="galat-nama" role="alert" className="mt-4 text-small font-medium text-danger">
              {galat}
            </p>
          ) : null}

          {status === "gagal" ? (
            <p role="alert" className="mt-4 text-small font-medium text-danger">
              Peramban menolak menyimpan. Coba matikan mode penyamaran atau izinkan penyimpanan
              situs ini.
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="submit" disabled={mengirim}>
              {mengirim ? akunGuru.mengirim : "Simpan profil"}
            </Button>
            {mengubah && profil ? (
              <Button variant="secondary" onClick={() => setMengubah(false)}>
                Batal
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <header className="max-w-measure">
        <Eyebrow>{mode === "masuk" ? akunHero.labelMasuk : akunHero.labelDaftar}</Eyebrow>
        <h1 className="mt-5 text-h1 font-medium">
          {mode === "masuk" ? akunHero.judulMasuk : akunHero.judulDaftar}
        </h1>
        <p className="mt-4 text-lead text-ink-muted">{akunHero.sub}</p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        {isi}
        <aside className="rounded-lg border border-line bg-paper-deep p-5">
          <p className="text-caption font-semibold uppercase text-accent">Perlu diketahui</p>
          <ul className="mt-3 space-y-2.5">
            {akunHero.catatan.map((catatan) => (
              <li key={catatan} className="flex gap-2.5 text-small text-ink-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                <span>{catatan}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
