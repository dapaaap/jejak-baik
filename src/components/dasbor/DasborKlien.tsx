"use client";

import { useEffect, useState } from "react";
import { PanelGuru } from "@/components/bukti/PanelGuru";
import { Button, ButtonLink } from "@/components/ui/Button";
import { pilihanPeran } from "@/data/akun";
import { dasborHapus, dasborKartu, dasborKosong } from "@/data/dasbor";
import {
  bacaProgres,
  hapusProgres,
  kunciProgres,
  tanggalRingkas,
  type HasilKuis,
  type HasilSimulasi,
  type Profil,
} from "@/lib/progres";

type Status = "memuat" | "siap" | "galat";

export function DasborKlien() {
  const [status, setStatus] = useState<Status>("memuat");
  const [profil, setProfil] = useState<Profil | null>(null);
  const [kuis, setKuis] = useState<HasilKuis | null>(null);
  const [simulasi, setSimulasi] = useState<HasilSimulasi | null>(null);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [pesan, setPesan] = useState("");
  const [tampilan, setTampilan] = useState<"belajar" | "pengaduan">("belajar");

  useEffect(() => {
    try {
      setProfil(bacaProgres<Profil>(kunciProgres.profil));
      setKuis(bacaProgres<HasilKuis>(kunciProgres.kuis));
      setSimulasi(bacaProgres<HasilSimulasi>(kunciProgres.simulasi));
      setStatus("siap");
    } catch {
      setStatus("galat");
    }
  }, []);

  function hapusSemua() {
    try {
      hapusProgres(kunciProgres.profil);
      hapusProgres(kunciProgres.akun);
      hapusProgres(kunciProgres.kuis);
      hapusProgres(kunciProgres.simulasi);
      hapusProgres(kunciProgres.laporan);
      setProfil(null);
      setKuis(null);
      setSimulasi(null);
      setKonfirmasi(false);
      setTampilan("belajar");
      setPesan(dasborHapus.sukses);
    } catch {
      setPesan("Peramban menolak menghapus data. Coba hapus lewat pengaturan peramban.");
    }
  }

  if (status === "memuat") {
    return (
      <p role="status" className="text-body text-ink-muted">
        Memuat progres dari perangkat ini...
      </p>
    );
  }

  if (status === "galat") {
    return (
      <div role="alert" className="rounded-xl border border-line-strong bg-accent-tint p-6">
        <h2 className="text-h3 font-semibold">Penyimpanan lokal tidak bisa dibuka</h2>
        <p className="mt-2 max-w-measure text-small text-ink">
          Peramban memblokir penyimpanan untuk situs ini, mungkin karena mode penyamaran atau
          pengaturan privasi. Kuis dan simulasi tetap bisa dikerjakan, tapi hasilnya tidak akan
          tersimpan.
        </p>
      </div>
    );
  }

  const kosong = !profil && !kuis && !simulasi;
  const guru = profil?.peran === "guru";

  return (
    <div className="grid gap-8">
      {guru ? (
        <div className="flex flex-wrap gap-2 border-b border-line pb-3">
          <button
            type="button"
            aria-pressed={tampilan === "belajar"}
            onClick={() => setTampilan("belajar")}
            className={
              tampilan === "belajar"
                ? "inline-flex min-h-11 items-center rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
                : "inline-flex min-h-11 items-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink hover:border-forest"
            }
          >
            Progres belajar
          </button>
          <button
            type="button"
            aria-pressed={tampilan === "pengaduan"}
            onClick={() => setTampilan("pengaduan")}
            className={
              tampilan === "pengaduan"
                ? "inline-flex min-h-11 items-center rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
                : "inline-flex min-h-11 items-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink hover:border-forest"
            }
          >
            Pengaduan masuk
          </button>
        </div>
      ) : null}

      {guru && tampilan === "pengaduan" ? (
        <PanelGuru profil={profil} />
      ) : (
        <>
      {kosong ? (
        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <h2 className="text-h2 font-medium">{dasborKosong.judul}</h2>
          <p className="mt-3 max-w-measure text-small text-ink-muted">{dasborKosong.isi}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {dasborKosong.aksi.map((aksi, index) => (
              <ButtonLink
                key={aksi.href}
                href={aksi.href}
                variant={index === 0 ? "primary" : "secondary"}
              >
                {aksi.label}
              </ButtonLink>
            ))}
          </div>
          {pesan ? (
            <p role="status" className="mt-4 text-small text-ink-soft">
              {pesan}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-line bg-surface p-6">
            <p className="text-caption font-semibold uppercase text-accent">
              {dasborKartu.kuis.judul}
            </p>
            {kuis ? (
              <>
                <p className="mt-3 font-display text-h1 font-medium leading-none">
                  {kuis.benar}
                  <span className="text-h3 text-ink-soft"> / {kuis.total}</span>
                </p>
                <p className="mt-2 text-small text-ink-muted">
                  Dikerjakan {tanggalRingkas(kuis.tanggal)}
                </p>
                <p className="mt-1 text-small text-ink-muted">
                  {kuis.refleksi.filter((isi) => isi.trim().length > 0).length} dari{" "}
                  {kuis.refleksi.length || 3} refleksi terisi
                </p>
                <ButtonLink href="/kuis" variant="secondary" className="mt-4">
                  {dasborKartu.kuis.ulangi}
                </ButtonLink>
              </>
            ) : (
              <>
                <p className="mt-3 text-body text-ink-muted">{dasborKartu.kuis.belum}</p>
                <ButtonLink href="/kuis" variant="secondary" className="mt-4">
                  {dasborKartu.kuis.aksi}
                </ButtonLink>
              </>
            )}
          </article>

          <article className="rounded-xl border border-line bg-surface p-6">
            <p className="text-caption font-semibold uppercase text-accent">
              {dasborKartu.simulasi.judul}
            </p>
            {simulasi ? (
              <>
                <p className="mt-3 font-display text-h1 font-medium leading-none">
                  {simulasi.tepat}
                  <span className="text-h3 text-ink-soft"> / {simulasi.total}</span>
                </p>
                <p className="mt-2 text-small text-ink-muted">
                  Dicoba {tanggalRingkas(simulasi.tanggal)}
                </p>
                <ButtonLink href="/simulasi" variant="secondary" className="mt-4">
                  {dasborKartu.simulasi.ulangi}
                </ButtonLink>
              </>
            ) : (
              <>
                <p className="mt-3 text-body text-ink-muted">{dasborKartu.simulasi.belum}</p>
                <ButtonLink href="/simulasi" variant="secondary" className="mt-4">
                  {dasborKartu.simulasi.aksi}
                </ButtonLink>
              </>
            )}
          </article>

          <article className="rounded-xl border border-line bg-surface p-6">
            <p className="text-caption font-semibold uppercase text-accent">
              {dasborKartu.profil.judul}
            </p>
            {profil ? (
              <>
                <p className="mt-3 font-display text-h3 font-semibold">{profil.nama}</p>
                <p className="mt-1 text-small text-ink-muted">
                  {pilihanPeran.find((item) => item.id === profil.peran)?.label}
                </p>
                <ButtonLink href="/auth?mode=masuk" variant="secondary" className="mt-4">
                  Ubah profil
                </ButtonLink>
              </>
            ) : (
              <>
                <p className="mt-3 text-body text-ink-muted">{dasborKartu.profil.belum}</p>
                <ButtonLink href="/auth?mode=daftar" variant="secondary" className="mt-4">
                  {dasborKartu.profil.aksi}
                </ButtonLink>
              </>
            )}
          </article>
        </div>
      )}

      {!kosong ? (
        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <h2 className="text-h3 font-semibold">{dasborHapus.judul}</h2>
          <p className="mt-2 max-w-measure text-small text-ink-muted">{dasborHapus.isi}</p>

          {konfirmasi ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-small font-semibold">{dasborHapus.konfirmasi}</p>
              <Button onClick={hapusSemua}>{dasborHapus.tombol}</Button>
              <Button variant="secondary" onClick={() => setKonfirmasi(false)}>
                {dasborHapus.batal}
              </Button>
            </div>
          ) : (
            <Button variant="secondary" className="mt-4" onClick={() => setKonfirmasi(true)}>
              {dasborHapus.tombol}
            </Button>
          )}

          {pesan ? (
            <p role="status" className="mt-3 text-small text-ink-soft">
              {pesan}
            </p>
          ) : null}
        </div>
      ) : null}
        </>
      )}
    </div>
  );
}
