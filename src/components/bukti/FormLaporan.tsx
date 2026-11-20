"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AvatarProfil } from "@/components/akun/AvatarProfil";
import { PilihPeran } from "@/components/akun/PilihPeran";
import { TombolGoogle } from "@/components/akun/TombolGoogle";
import { TombolSalin } from "@/components/bukti/TombolSalin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  formLaporan,
  kategoriLaporan,
  laporanSaya,
  platformLaporan,
  statusLaporan,
} from "@/data/pelaporan";
import type { AkunGoogle } from "@/lib/google";
import {
  bacaLaporan,
  buatTiket,
  kunciPemilik,
  tambahLaporan,
  type Laporan,
} from "@/lib/laporan";
import { tanggalRingkas, type Profil } from "@/lib/progres";
import { akunTerdaftar, mulaiSesi, sesiAktif } from "@/lib/sesi";

interface Gambar {
  url: string;
  lebar: number;
  tinggi: number;
}

async function kompres(file: File): Promise<Gambar> {
  const bitmap = await createImageBitmap(file);
  const skala = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
  const lebar = Math.round(bitmap.width * skala);
  const tinggi = Math.round(bitmap.height * skala);

  const kanvas = document.createElement("canvas");
  kanvas.width = lebar;
  kanvas.height = tinggi;

  const konteks = kanvas.getContext("2d");
  if (!konteks) throw new Error("Kanvas tidak tersedia");

  konteks.drawImage(bitmap, 0, 0, lebar, tinggi);
  bitmap.close();

  return { url: kanvas.toDataURL("image/jpeg", 0.72), lebar, tinggi };
}

export function FormLaporan() {
  const [memuat, setMemuat] = useState(true);
  const [sesi, setSesi] = useState<Profil | null>(null);
  const [calon, setCalon] = useState<AkunGoogle | null>(null);
  const [daftar, setDaftar] = useState<Laporan[]>([]);

  const [anonim, setAnonim] = useState(false);
  const [kategori, setKategori] = useState("");
  const [platform, setPlatform] = useState("");
  const [kejadian, setKejadian] = useState("");
  const [kronologi, setKronologi] = useState("");
  const [gambar, setGambar] = useState<Gambar | null>(null);
  const [galatBukti, setGalatBukti] = useState("");
  const [galat, setGalat] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [tiketBaru, setTiketBaru] = useState("");
  const berkas = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSesi(sesiAktif());
    setDaftar(bacaLaporan());
    setMemuat(false);
  }, []);

  function pakaiGoogle(akun: AkunGoogle) {
    const terdaftar = akunTerdaftar(akun.email);

    if (terdaftar) {
      mulaiSesi(terdaftar);
      setSesi(terdaftar);
      return;
    }

    setCalon(akun);
  }

  function pilihPeran(profil: Profil) {
    setSesi(profil);
    setCalon(null);
  }

  async function pilihBerkas(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setGalatBukti("");
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setGalatBukti("Format harus JPG, PNG, atau WebP.");
      if (berkas.current) berkas.current.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setGalatBukti("Ukuran gambar maksimal 5 MB.");
      if (berkas.current) berkas.current.value = "";
      return;
    }

    try {
      setGambar(await kompres(file));
    } catch {
      setGalatBukti("Gambar tidak bisa dibaca. Coba file lain.");
      if (berkas.current) berkas.current.value = "";
    }
  }

  function hapusBukti() {
    setGambar(null);
    if (berkas.current) berkas.current.value = "";
  }

  function kirim(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sesi) return;

    if (!kategori || !platform || !kejadian) {
      setGalat("Lengkapi jenis kejadian, platform, dan tanggal kejadian.");
      return;
    }

    if (kronologi.trim().length < 20) {
      setGalat("Tulis kronologi minimal 20 karakter supaya Guru BK paham kejadiannya.");
      return;
    }

    setMengirim(true);
    setGalat("");

    const semua = bacaLaporan();
    const laporan: Laporan = {
      tiket: buatTiket(semua),
      dibuat: new Date().toISOString(),
      pemilik: kunciPemilik(sesi),
      nama: sesi.nama,
      anonim,
      kategori,
      platform,
      kejadian,
      kronologi: kronologi.trim(),
      bukti: gambar?.url,
      buktiLebar: gambar?.lebar,
      buktiTinggi: gambar?.tinggi,
      status: "terkirim",
      balasan: [],
    };

    if (!tambahLaporan(laporan)) {
      setGalat(
        "Penyimpanan peramban penuh. Hapus laporan lama di Dasbor, atau kirim tanpa lampiran bukti.",
      );
      setMengirim(false);
      return;
    }

    setDaftar(bacaLaporan());
    setTiketBaru(laporan.tiket);
    setKategori("");
    setPlatform("");
    setKejadian("");
    setKronologi("");
    setAnonim(false);
    hapusBukti();
    setMengirim(false);
  }

  if (memuat) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p role="status" className="text-small text-ink-soft">
          Memuat profil dan laporan di perangkat ini...
        </p>
      </div>
    );
  }

  if (!sesi) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-h2 font-medium">Masuk dulu supaya laporan bisa dipantau.</h2>
          <p className="mt-3 max-w-measure text-small text-ink-muted">
            Laporan terhubung ke akunmu, jadi status dan balasan Guru BK bisa kamu buka lagi dari
            nomor tiket. Cukup satu langkah.
          </p>

          <div className="mt-5">
            {calon ? (
              <PilihPeran akun={calon} onSelesai={pilihPeran} onBatal={() => setCalon(null)} />
            ) : (
              <TombolGoogle onSukses={pakaiGoogle} />
            )}
          </div>

          <p className="mt-4 text-small text-ink-muted">
            Belum punya profil?{" "}
            <Link
              href="/auth?mode=daftar"
              className="font-semibold text-forest underline-offset-4 hover:underline"
            >
              Buat profil manual
            </Link>
            .
          </p>
        </div>

        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <p className="text-caption font-semibold uppercase text-accent">Kenapa perlu akun</p>
          <ul className="mt-4 space-y-3">
            {[
              "Nomor tiket dan status penanganan tersimpan bersama akunmu.",
              "Balasan Guru BK bisa kamu buka kapan saja di halaman ini.",
              "Kamu bisa memilih mengirim anonim tanpa kehilangan akses ke laporan.",
            ].map((poin) => (
              <li key={poin} className="flex gap-2.5 text-small text-ink-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                <span>{poin}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-small text-ink-soft">
            {formLaporan.privasi}
          </p>
        </div>
      </div>
    );
  }

  const laporanSayaIni = daftar.filter((laporan) => laporan.pemilik === kunciPemilik(sesi));
  const hariIni = new Date().toISOString().slice(0, 10);

  return (
    <div className="grid gap-10">
      {tiketBaru ? (
        <div className="rounded-xl border border-forest bg-paper-deep p-6 sm:p-8">
          <p className="text-caption font-semibold uppercase text-accent">{formLaporan.sukses}</p>
          <p className="mt-2 text-small text-ink-muted">{formLaporan.tiketLabel}</p>
          <p className="mt-1 font-display text-h1 font-medium">{tiketBaru}</p>
          <p className="mt-2 max-w-measure text-small text-ink-muted">
            {formLaporan.tiketCatatan}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <TombolSalin
              teks={tiketBaru}
              label="Salin nomor tiket"
              pesanOk="Nomor tiket tersalin."
            />
            <Button variant="secondary" onClick={() => setTiketBaru("")}>
              {formLaporan.kirimUlang}
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={kirim}
          className="rounded-xl border border-line bg-surface p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-h2 font-medium">{formLaporan.judul}</h2>
            <span className="flex items-center gap-2 text-small text-ink-muted">
              <AvatarProfil profil={sesi} ukuran={28} />
              {sesi.nama}
            </span>
          </div>
          <p className="mt-2 max-w-measure text-small text-ink-muted">{formLaporan.sub}</p>

          <fieldset className="mt-6 rounded-lg border border-line bg-paper p-4">
            <legend className="px-1 text-small font-semibold">{formLaporan.identitas}</legend>
            <p className="text-small text-ink">{sesi.nama}</p>
            {sesi.email ? <p className="text-small text-ink-muted">{sesi.email}</p> : null}
            <label className="mt-3 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={anonim}
                onChange={(event) => setAnonim(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-forest"
              />
              <span>
                <span className="block text-small font-semibold">{formLaporan.anonim}</span>
                <span className="mt-0.5 block text-small text-ink-muted">
                  {formLaporan.anonimCatatan}
                </span>
              </span>
            </label>
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="kategori" className="text-small font-semibold">
                {formLaporan.kategori}
              </label>
              <p className="mt-1 text-caption text-ink-soft">{formLaporan.kategoriBantuan}</p>
              <select
                id="kategori"
                value={kategori}
                onChange={(event) => setKategori(event.target.value)}
                className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-body text-ink"
              >
                <option value="">Pilih jenis kejadian</option>
                {kategoriLaporan.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama} ({item.label})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="platform" className="text-small font-semibold">
                {formLaporan.platform}
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-body text-ink"
              >
                <option value="">Pilih platform</option>
                {platformLaporan.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="kejadian" className="text-small font-semibold">
                {formLaporan.kejadian}
              </label>
              <input
                id="kejadian"
                type="date"
                value={kejadian}
                max={hariIni}
                onChange={(event) => setKejadian(event.target.value)}
                className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-body text-ink sm:max-w-xs"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="kronologi" className="text-small font-semibold">
              {formLaporan.kronologi}
            </label>
            <p className="mt-1 text-caption text-ink-soft">{formLaporan.kronologiBantuan}</p>
            <textarea
              id="kronologi"
              value={kronologi}
              onChange={(event) => setKronologi(event.target.value)}
              rows={6}
              maxLength={4000}
              className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-body text-ink"
            />
            <p className="mt-1 text-caption text-ink-soft">{kronologi.length} dari 4000 karakter</p>
          </div>

          <div className="mt-6">
            <label htmlFor="bukti" className="text-small font-semibold">
              {formLaporan.bukti}
            </label>
            <p className="mt-1 text-caption text-ink-soft">{formLaporan.buktiBantuan}</p>
            <input
              ref={berkas}
              id="bukti"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={pilihBerkas}
              className="mt-2 block w-full cursor-pointer rounded-md border border-line-strong bg-paper px-3 py-2.5 text-small text-ink file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-paper-deep file:px-3 file:py-1.5 file:text-small file:font-semibold file:text-forest"
            />

            {galatBukti ? (
              <p role="alert" className="mt-2 text-small font-medium text-danger">
                {galatBukti}
              </p>
            ) : null}

            {gambar ? (
              <div className="mt-3 w-fit max-w-full rounded-md border border-line bg-paper p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gambar.url}
                  alt="Pratinjau bukti yang akan dikirim"
                  width={gambar.lebar}
                  height={gambar.tinggi}
                  className="h-auto max-h-64 w-auto max-w-full rounded-sm"
                />
                <button
                  type="button"
                  onClick={hapusBukti}
                  className="mt-2 inline-flex min-h-11 cursor-pointer items-center text-small font-semibold text-danger underline-offset-4 hover:underline"
                >
                  Hapus lampiran
                </button>
              </div>
            ) : null}
          </div>

          {galat ? (
            <p role="alert" className="mt-5 text-small font-medium text-danger">
              {galat}
            </p>
          ) : null}

          <p className="mt-5 max-w-measure border-t border-line pt-4 text-small text-ink-soft">
            {formLaporan.privasi}
          </p>

          <div className="mt-5">
            <Button type="submit" disabled={mengirim}>
              {mengirim ? "Menyimpan..." : formLaporan.kirim}
            </Button>
          </div>
        </form>
      )}

      <div>
        <h2 className="text-h2 font-medium">{laporanSaya.judul}</h2>
        {laporanSayaIni.length === 0 ? (
          <p className="mt-3 text-small text-ink-muted">{laporanSaya.kosong}</p>
        ) : (
          <ul className="mt-5 grid gap-4">
            {laporanSayaIni
              .slice()
              .reverse()
              .map((laporan) => {
                const status = statusLaporan.find((item) => item.id === laporan.status);
                const kategori = kategoriLaporan.find((item) => item.id === laporan.kategori);

                return (
                  <li key={laporan.tiket} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-h3 font-semibold">{laporan.tiket}</p>
                        <p className="text-small text-ink-muted">
                          {kategori?.nama ?? laporan.kategori} · {laporan.platform} ·{" "}
                          {tanggalRingkas(laporan.dibuat)}
                        </p>
                      </div>
                      <Badge>{status?.label ?? laporan.status}</Badge>
                    </div>

                    {status ? (
                      <p className="mt-3 text-small text-ink-muted">{status.deskripsi}</p>
                    ) : null}

                    <p className="mt-2 text-small text-ink-muted">
                      {laporan.dibuka
                        ? `${laporanSaya.dibuka} ${tanggalRingkas(laporan.dibuka)}`
                        : laporanSaya.belumDibuka}
                    </p>

                    <div className="mt-4 border-t border-line pt-4">
                      <p className="text-caption font-semibold uppercase text-accent">
                        {laporanSaya.balasan}
                      </p>
                      {laporan.balasan.length === 0 ? (
                        <p className="mt-2 text-small text-ink-muted">{laporanSaya.belumAdaBalasan}</p>
                      ) : (
                        <ul className="mt-3 space-y-3">
                          {laporan.balasan.map((balasan, index) => (
                            <li
                              key={`${balasan.tanggal}-${index}`}
                              className="rounded-md border border-line bg-paper p-3.5"
                            >
                              <p className="text-caption text-ink-soft">
                                {tanggalRingkas(balasan.tanggal)}
                              </p>
                              <p className="mt-1 whitespace-pre-wrap break-words text-small text-ink">
                                {balasan.isi}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
