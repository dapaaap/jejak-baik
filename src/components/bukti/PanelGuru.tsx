"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { kategoriLaporan, panelGuru, statusLaporan } from "@/data/pelaporan";
import {
  panggilSheets,
  sheetsAktif,
  type AkunServer,
  type LaporanServer,
} from "@/lib/jaringan";
import {
  bacaLaporan,
  dariServer,
  ubahLaporan,
  type Laporan,
  type StatusLaporan,
} from "@/lib/laporan";
import { tanggalRingkas, type Profil } from "@/lib/progres";

type Tahap = "memuat" | "boleh" | "tolak" | "galat";

function pesanGalat(error: unknown) {
  return error instanceof Error && error.message
    ? error.message
    : "Google Sheets tidak bisa dihubungi. Periksa koneksi lalu coba lagi.";
}

export function PanelGuru({ profil }: { profil: Profil | null }) {
  const [tahap, setTahap] = useState<Tahap>(
    sheetsAktif ? "memuat" : profil?.peran === "guru" ? "boleh" : "tolak",
  );
  const [daftar, setDaftar] = useState<Laporan[]>([]);
  const [terbuka, setTerbuka] = useState("");
  const [statusPilihan, setStatusPilihan] = useState<StatusLaporan>("terkirim");
  const [balasan, setBalasan] = useState("");
  const [pesan, setPesan] = useState("");
  const [galat, setGalat] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [ulang, setUlang] = useState(0);

  useEffect(() => {
    if (!sheetsAktif) {
      setDaftar(bacaLaporan());
      return;
    }

    let aktif = true;

    async function mulai() {
      setTahap("memuat");
      setGalat("");

      try {
        const akun = await panggilSheets<AkunServer>("aku");
        if (!aktif) return;

        const boleh =
          akun.peran === "admin" || (akun.peran === "guru" && akun.status === "disetujui");

        if (!boleh) {
          setTahap("tolak");
          return;
        }

        const hasil = await panggilSheets<LaporanServer[]>("laporanMasuk");
        if (!aktif) return;

        setDaftar(hasil.map((laporan) => dariServer(laporan, "")));
        setTahap("boleh");
      } catch (error) {
        if (!aktif) return;
        setGalat(pesanGalat(error));
        setTahap("galat");
      }
    }

    void mulai();
    return () => {
      aktif = false;
    };
  }, [ulang]);

  function buka(laporan: Laporan) {
    setTerbuka(laporan.tiket);
    setStatusPilihan(laporan.status);
    setBalasan("");
    setPesan("");
    setGalat("");

    if (laporan.dibuka) return;

    const sekarang = new Date().toISOString();
    setDaftar((lama) =>
      lama.map((item) => (item.tiket === laporan.tiket ? { ...item, dibuka: sekarang } : item)),
    );

    if (sheetsAktif) {
      void panggilSheets("ubahLaporan", { tiket: laporan.tiket, dibuka: true }).catch(() => {
        setPesan("Tanda dibuka tidak tersimpan. Status tetap bisa diubah.");
      });
    } else {
      ubahLaporan(laporan.tiket, (item) => ({ ...item, dibuka: sekarang }));
    }
  }

  async function simpanStatus(tiket: string) {
    setPesan("");
    setGalat("");
    setSibuk(true);

    try {
      if (sheetsAktif) {
        await panggilSheets("ubahLaporan", { tiket, status: statusPilihan });
      } else if (!ubahLaporan(tiket, (lama) => ({ ...lama, status: statusPilihan }))) {
        setPesan("Penyimpanan peramban penuh. Status tidak tersimpan.");
        return;
      }

      setDaftar((lama) =>
        lama.map((item) => (item.tiket === tiket ? { ...item, status: statusPilihan } : item)),
      );
      setPesan("Status tersimpan.");
    } catch (error) {
      setGalat(pesanGalat(error));
    } finally {
      setSibuk(false);
    }
  }

  async function kirimBalasan(tiket: string) {
    const isi = balasan.trim();

    if (isi.length < 2) {
      setPesan("Tulis balasan minimal 2 karakter.");
      return;
    }

    setPesan("");
    setGalat("");
    setSibuk(true);

    const statusBaru: StatusLaporan | undefined =
      statusPilihan === "terkirim" ? "ditinjau" : undefined;

    try {
      if (sheetsAktif) {
        await panggilSheets("ubahLaporan", {
          tiket,
          balasan: isi,
          status: statusBaru,
        });
      } else if (
        !ubahLaporan(tiket, (lama) => ({
          ...lama,
          status: statusBaru ?? lama.status,
          balasan: [...lama.balasan, { dari: "guru", isi, tanggal: new Date().toISOString() }],
        }))
      ) {
        setPesan("Penyimpanan peramban penuh. Balasan tidak tersimpan.");
        return;
      }

      setDaftar((lama) =>
        lama.map((item) =>
          item.tiket === tiket
            ? {
                ...item,
                status: statusBaru ?? item.status,
                balasan: [
                  ...item.balasan,
                  { dari: "guru", isi, tanggal: new Date().toISOString() },
                ],
              }
            : item,
        ),
      );
      setBalasan("");
      setPesan("Balasan tersimpan untuk pelapor.");
    } catch (error) {
      setGalat(pesanGalat(error));
    } finally {
      setSibuk(false);
    }
  }

  if (tahap === "memuat") {
    return (
      <p role="status" className="text-small text-ink-muted">
        {panelGuru.memuat}
      </p>
    );
  }

  if (tahap === "galat") {
    return (
      <div role="alert" className="rounded-xl border border-line-strong bg-accent-tint p-5">
        <p className="text-small font-medium text-ink">{galat}</p>
        <Button variant="secondary" className="mt-4" onClick={() => setUlang((nilai) => nilai + 1)}>
          Coba lagi
        </Button>
      </div>
    );
  }

  if (tahap === "tolak") {
    return (
      <p className="text-small text-ink-muted">
        {sheetsAktif ? panelGuru.akses : panelGuru.aksesLokal}
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-h2 font-medium">{panelGuru.judul}</h2>
      <p className="mt-2 max-w-measure text-small text-ink-muted">
        {sheetsAktif ? panelGuru.sub : panelGuru.subLokal}
      </p>

      {daftar.length === 0 ? (
        <p className="mt-5 rounded-lg border border-line bg-paper-deep p-5 text-small text-ink-muted">
          {sheetsAktif ? panelGuru.kosong : panelGuru.kosongLokal}
        </p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {daftar
            .slice()
            .reverse()
            .map((laporan) => {
              const status = statusLaporan.find((item) => item.id === laporan.status);
              const kategori = kategoriLaporan.find((item) => item.id === laporan.kategori);
              const sedangDibuka = terbuka === laporan.tiket;

              return (
                <li key={laporan.tiket} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-h3 font-semibold">{laporan.tiket}</p>
                      <p className="text-small text-ink-muted">
                        {kategori?.nama ?? laporan.kategori} · {laporan.platform} ·{" "}
                        {tanggalRingkas(laporan.dibuat)}
                      </p>
                      <p className="mt-1 text-small text-ink-soft">
                        {laporan.anonim ? panelGuru.anonim : laporan.nama}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge>{status?.label ?? laporan.status}</Badge>
                      <Button
                        variant="secondary"
                        onClick={() => (sedangDibuka ? setTerbuka("") : buka(laporan))}
                      >
                        {sedangDibuka ? panelGuru.tutup : panelGuru.pilih}
                      </Button>
                    </div>
                  </div>

                  {sedangDibuka ? (
                    <div className="mt-5 grid gap-5 border-t border-line pt-5">
                      <dl className="grid gap-3 text-small sm:grid-cols-2">
                        <div>
                          <dt className="font-semibold">{panelGuru.pelapor}</dt>
                          <dd className="mt-0.5 text-ink-muted">
                            {laporan.anonim
                              ? panelGuru.anonim
                              : `${laporan.nama}${laporan.pemilik.includes("@") ? ` (${laporan.pemilik})` : ""}`}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold">{panelGuru.dibuka}</dt>
                          <dd className="mt-0.5 text-ink-muted">
                            {laporan.dibuka
                              ? tanggalRingkas(laporan.dibuka)
                              : panelGuru.belumDibuka}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold">Tanggal kejadian</dt>
                          <dd className="mt-0.5 text-ink-muted">
                            {tanggalRingkas(laporan.kejadian) || laporan.kejadian}
                          </dd>
                        </div>
                      </dl>

                      <div>
                        <p className="text-small font-semibold">Kronologi</p>
                        <p className="mt-1 whitespace-pre-wrap break-words text-small text-ink">
                          {laporan.kronologi}
                        </p>
                      </div>

                      <div>
                        <p className="text-small font-semibold">{panelGuru.bukti}</p>
                        {laporan.bukti ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={laporan.bukti}
                            alt={`Bukti tangkapan layar untuk ${laporan.tiket}`}
                            width={laporan.buktiLebar ?? 900}
                            height={laporan.buktiTinggi ?? 600}
                            className="mt-2 h-auto max-h-80 w-auto max-w-full rounded-md border border-line"
                          />
                        ) : (
                          <p className="mt-1 text-small text-ink-muted">{panelGuru.tanpaBukti}</p>
                        )}
                      </div>

                      <div className="rounded-lg border border-line bg-paper p-4">
                        <label htmlFor={`status-${laporan.tiket}`} className="text-small font-semibold">
                          {panelGuru.status}
                        </label>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <select
                            id={`status-${laporan.tiket}`}
                            value={statusPilihan}
                            onChange={(event) =>
                              setStatusPilihan(event.target.value as StatusLaporan)
                            }
                            className="rounded-md border border-line-strong bg-paper px-3 py-2.5 text-small text-ink"
                          >
                            {statusLaporan.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                          <Button disabled={sibuk} onClick={() => simpanStatus(laporan.tiket)}>
                            {panelGuru.simpanStatus}
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border border-line bg-paper p-4">
                        <p className="text-small font-semibold">{panelGuru.balasan}</p>
                        {laporan.balasan.length === 0 ? (
                          <p className="mt-1 text-small text-ink-muted">
                            Belum ada balasan untuk pelapor.
                          </p>
                        ) : (
                          <ul className="mt-2 space-y-2">
                            {laporan.balasan.map((item, index) => (
                              <li
                                key={`${item.tanggal}-${index}`}
                                className="rounded-md border border-line bg-surface p-3"
                              >
                                <p className="text-caption text-ink-soft">
                                  {item.dari === "guru" ? "Guru BK" : "Pelapor"} ·{" "}
                                  {tanggalRingkas(item.tanggal)}
                                </p>
                                <p className="mt-1 whitespace-pre-wrap break-words text-small text-ink">
                                  {item.isi}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}

                        <label
                          htmlFor={`balas-${laporan.tiket}`}
                          className="mt-4 block text-small font-semibold"
                        >
                          {panelGuru.balas}
                        </label>
                        <textarea
                          id={`balas-${laporan.tiket}`}
                          value={balasan}
                          onChange={(event) => setBalasan(event.target.value)}
                          rows={3}
                          maxLength={2000}
                          className="mt-2 w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-small text-ink"
                        />
                        <Button
                          className="mt-3"
                          disabled={sibuk}
                          onClick={() => kirimBalasan(laporan.tiket)}
                        >
                          {panelGuru.kirimBalasan}
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
        </ul>
      )}

      {pesan ? (
        <p role="status" className="mt-4 text-small text-ink-soft">
          {pesan}
        </p>
      ) : null}

      {galat ? (
        <p role="alert" className="mt-4 text-small font-medium text-danger">
          {galat}
        </p>
      ) : null}

      <p className="mt-6 border-t border-line pt-4 text-small text-ink-soft">
        {sheetsAktif ? panelGuru.catatan : panelGuru.catatanLokal}
      </p>
    </div>
  );
}
