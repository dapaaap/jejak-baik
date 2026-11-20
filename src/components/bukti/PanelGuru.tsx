"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { kategoriLaporan, panelGuru, statusLaporan } from "@/data/pelaporan";
import {
  bacaLaporan,
  ubahLaporan,
  type Laporan,
  type StatusLaporan,
} from "@/lib/laporan";
import { tanggalRingkas, type Profil } from "@/lib/progres";

export function PanelGuru({ profil }: { profil: Profil }) {
  const [daftar, setDaftar] = useState<Laporan[]>([]);
  const [terbuka, setTerbuka] = useState("");
  const [statusPilihan, setStatusPilihan] = useState<StatusLaporan>("terkirim");
  const [balasan, setBalasan] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setDaftar(bacaLaporan());
  }, []);

  function buka(laporan: Laporan) {
    setTerbuka(laporan.tiket);
    setStatusPilihan(laporan.status);
    setBalasan("");
    setPesan("");

    if (!laporan.dibuka) {
      const sekarang = new Date().toISOString();
      ubahLaporan(laporan.tiket, (lama) => ({ ...lama, dibuka: sekarang }));
      setDaftar(bacaLaporan());
    }
  }

  function simpanStatus(tiket: string) {
    if (!ubahLaporan(tiket, (lama) => ({ ...lama, status: statusPilihan }))) {
      setPesan("Penyimpanan peramban penuh. Status tidak tersimpan.");
      return;
    }

    setDaftar(bacaLaporan());
    setPesan("Status tersimpan.");
  }

  function kirimBalasan(tiket: string) {
    const isi = balasan.trim();
    if (isi.length < 2) {
      setPesan("Tulis balasan minimal 2 karakter.");
      return;
    }

    const berhasil = ubahLaporan(tiket, (lama) => ({
      ...lama,
      status: lama.status === "terkirim" ? "ditinjau" : lama.status,
      balasan: [
        ...lama.balasan,
        { dari: "guru", isi, tanggal: new Date().toISOString() },
      ],
    }));

    if (!berhasil) {
      setPesan("Penyimpanan peramban penuh. Balasan tidak tersimpan.");
      return;
    }

    setBalasan("");
    setDaftar(bacaLaporan());
    setPesan("Balasan tersimpan untuk pelapor.");
  }

  if (profil.peran !== "guru") {
    return <p className="text-small text-ink-muted">{panelGuru.akses}</p>;
  }

  return (
    <div>
      <h2 className="text-h2 font-medium">{panelGuru.judul}</h2>
      <p className="mt-2 max-w-measure text-small text-ink-muted">{panelGuru.sub}</p>

      {daftar.length === 0 ? (
        <p className="mt-5 rounded-lg border border-line bg-paper-deep p-5 text-small text-ink-muted">
          {panelGuru.kosong}
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
                          <Button onClick={() => simpanStatus(laporan.tiket)}>
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
                        <Button className="mt-3" onClick={() => kirimBalasan(laporan.tiket)}>
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

      <p className="mt-6 border-t border-line pt-4 text-small text-ink-soft">{panelGuru.catatan}</p>
    </div>
  );
}
