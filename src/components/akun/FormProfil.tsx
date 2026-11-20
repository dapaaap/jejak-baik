"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { akunHero, akunTersimpan, pilihanPeran } from "@/data/akun";
import {
  bacaProgres,
  hapusProgres,
  kunciProgres,
  simpanProgres,
  type Peran,
  type Profil,
} from "@/lib/progres";

export function FormProfil() {
  const mode = useSearchParams().get("mode") === "masuk" ? "masuk" : "daftar";

  const [memuat, setMemuat] = useState(true);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [mengubah, setMengubah] = useState(false);
  const [nama, setNama] = useState("");
  const [peran, setPeran] = useState<Peran>("didik");
  const [galat, setGalat] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "gagal">("idle");

  useEffect(() => {
    try {
      const tersimpan = bacaProgres<Profil>(kunciProgres.profil);
      if (tersimpan) {
        setProfil(tersimpan);
        setNama(tersimpan.nama);
        setPeran(tersimpan.peran);
      }
    } catch {
      setStatus("gagal");
    }
    setMemuat(false);
  }, []);

  function simpan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bersih = nama.trim();

    if (bersih.length < 2) {
      setGalat("Tulis nama panggilan minimal 2 huruf.");
      return;
    }

    try {
      const baru: Profil = { nama: bersih, peran };
      simpanProgres(kunciProgres.profil, baru);
      setProfil(baru);
      setNama(bersih);
      setGalat("");
      setStatus("ok");
      setMengubah(false);
    } catch {
      setStatus("gagal");
    }
  }

  function hapus() {
    try {
      hapusProgres(kunciProgres.profil);
    } catch {
      setStatus("gagal");
      return;
    }

    setProfil(null);
    setNama("");
    setPeran("didik");
    setStatus("idle");
    setMengubah(true);
  }

  let isi: React.ReactNode;

  if (memuat) {
    isi = (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p role="status" className="text-small text-ink-soft">
          Memuat profil di perangkat ini...
        </p>
      </div>
    );
  } else if (profil && !mengubah) {
    const labelPeran =
      pilihanPeran.find((item) => item.id === profil.peran)?.label ?? "Peserta Didik";

    isi = (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-caption font-semibold uppercase text-accent">
          {akunTersimpan.judul}
        </p>
        <p className="mt-3 font-display text-h2 font-medium">{profil.nama}</p>
        <p className="mt-1 text-small text-ink-muted">{labelPeran}</p>

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
          <Button variant="secondary" onClick={() => setMengubah(true)}>
            {akunTersimpan.ubah}
          </Button>
          <Button variant="secondary" onClick={hapus}>
            {akunTersimpan.hapus}
          </Button>
        </div>
      </div>
    );
  } else {
    isi = (
      <form onSubmit={simpan} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div>
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
          <Button type="submit">Simpan profil</Button>
          {profil && mengubah ? (
            <Button variant="secondary" onClick={() => setMengubah(false)}>
              Batal
            </Button>
          ) : null}
        </div>
      </form>
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
