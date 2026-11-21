"use client";

import { useEffect, useState } from "react";
import { PanelGuru } from "@/components/bukti/PanelGuru";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { panelAdmin } from "@/data/admin";
import {
  panggilSheets,
  sheetsAktif,
  type AkunServer,
  type PendaftarGuru,
} from "@/lib/jaringan";
import { tanggalRingkas } from "@/lib/progres";

type Tahap = "memuat" | "boleh" | "tolak" | "galat";
type Tab = "pengaduan" | "pendaftaran";

const labelStatus = {
  menunggu: panelAdmin.statusMenunggu,
  disetujui: panelAdmin.statusDisetujui,
  ditolak: panelAdmin.statusDitolak,
} as const;

function pesanGalat(error: unknown) {
  return error instanceof Error && error.message ? error.message : panelAdmin.galat;
}

export function PanelAdmin() {
  const [tahap, setTahap] = useState<Tahap>(sheetsAktif ? "memuat" : "tolak");
  const [tab, setTab] = useState<Tab>("pengaduan");
  const [pendaftar, setPendaftar] = useState<PendaftarGuru[]>([]);
  const [memuatDaftar, setMemuatDaftar] = useState(false);
  const [galat, setGalat] = useState("");
  const [pesan, setPesan] = useState("");
  const [sibuk, setSibuk] = useState("");
  const [ulang, setUlang] = useState(0);

  useEffect(() => {
    if (!sheetsAktif) return;

    let aktif = true;

    async function mulai() {
      setTahap("memuat");
      setGalat("");

      try {
        const akun = await panggilSheets<AkunServer>("aku");
        if (!aktif) return;

        if (akun.peran !== "admin") {
          setTahap("tolak");
          return;
        }

        setTahap("boleh");
        setMemuatDaftar(true);
        const hasil = await panggilSheets<PendaftarGuru[]>("adminPendaftaran");
        if (!aktif) return;

        setPendaftar(hasil);
      } catch (error) {
        if (!aktif) return;
        setGalat(pesanGalat(error));
        setTahap("galat");
      } finally {
        if (aktif) setMemuatDaftar(false);
      }
    }

    void mulai();
    return () => {
      aktif = false;
    };
  }, [ulang]);

  async function putuskan(email: string, putusan: "disetujui" | "ditolak") {
    setSibuk(email);
    setPesan("");
    setGalat("");

    try {
      await panggilSheets("adminPutusan", { email, putusan });
      setPendaftar((lama) =>
        lama.map((item) => (item.email === email ? { ...item, status: putusan } : item)),
      );
      setPesan(panelAdmin.sukses);
    } catch (error) {
      setGalat(pesanGalat(error));
    } finally {
      setSibuk("");
    }
  }

  if (!sheetsAktif) {
    return (
      <p className="rounded-lg border border-line bg-paper-deep p-5 text-small text-ink-muted">
        {panelAdmin.tanpaJaringan}
      </p>
    );
  }

  if (tahap === "memuat") {
    return (
      <p role="status" className="text-small text-ink-muted">
        {panelAdmin.memuat}
      </p>
    );
  }

  if (tahap === "galat") {
    return (
      <div role="alert" className="rounded-xl border border-line-strong bg-accent-tint p-5">
        <p className="text-small font-medium text-ink">{galat}</p>
        <Button variant="secondary" className="mt-4" onClick={() => setUlang((nilai) => nilai + 1)}>
          {panelAdmin.coba}
        </Button>
      </div>
    );
  }

  if (tahap === "tolak") {
    return <p className="max-w-measure text-small text-ink-muted">{panelAdmin.tolak}</p>;
  }

  const urut = pendaftar
    .slice()
    .sort((a, b) => {
      if (a.status === "menunggu" && b.status !== "menunggu") return -1;
      if (a.status !== "menunggu" && b.status === "menunggu") return 1;
      return b.tanggal.localeCompare(a.tanggal);
    });

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        <button
          type="button"
          aria-pressed={tab === "pengaduan"}
          onClick={() => setTab("pengaduan")}
          className={
            tab === "pengaduan"
              ? "inline-flex min-h-11 items-center rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
              : "inline-flex min-h-11 items-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink hover:border-forest"
          }
        >
          {panelAdmin.tabPengaduan}
        </button>
        <button
          type="button"
          aria-pressed={tab === "pendaftaran"}
          onClick={() => setTab("pendaftaran")}
          className={
            tab === "pendaftaran"
              ? "inline-flex min-h-11 items-center rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
              : "inline-flex min-h-11 items-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink hover:border-forest"
          }
        >
          {panelAdmin.tabPendaftaran}
        </button>
      </div>

      {tab === "pengaduan" ? <PanelGuru profil={null} /> : null}

      {tab === "pendaftaran" ? (
        <div>
          <h2 className="text-h2 font-medium">{panelAdmin.tabPendaftaran}</h2>

          {galat ? (
            <p role="alert" className="mt-3 text-small font-medium text-danger">
              {galat}
            </p>
          ) : null}

          {pesan ? (
            <p role="status" className="mt-3 text-small text-ink-soft">
              {pesan}
            </p>
          ) : null}

          {memuatDaftar ? (
            <p role="status" className="mt-3 text-small text-ink-muted">
              {panelAdmin.memuatDaftar}
            </p>
          ) : urut.length === 0 ? (
            <p className="mt-3 text-small text-ink-muted">{panelAdmin.kosong}</p>
          ) : (
            <ul className="mt-5 grid gap-4">
              {urut.map((item) => (
                <li key={item.email} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-h3 font-semibold">{item.nama}</p>
                      <p className="break-words text-small text-ink-muted">{item.email}</p>
                    </div>
                    <Badge>{labelStatus[item.status]}</Badge>
                  </div>

                  <dl className="mt-4 grid gap-3 text-small sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold">{panelAdmin.sekolah}</dt>
                      <dd className="mt-0.5 text-ink-muted">{item.sekolah}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">{panelAdmin.jabatan}</dt>
                      <dd className="mt-0.5 text-ink-muted">{item.jabatan}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">{panelAdmin.mendaftar}</dt>
                      <dd className="mt-0.5 text-ink-muted">
                        {tanggalRingkas(item.tanggal) || item.tanggal}
                      </dd>
                    </div>
                    {item.putusanOleh ? (
                      <div>
                        <dt className="font-semibold">{panelAdmin.diputuskan}</dt>
                        <dd className="mt-0.5 break-words text-ink-muted">
                          {item.putusanOleh}
                          {item.tanggalPutusan
                            ? ` · ${tanggalRingkas(item.tanggalPutusan)}`
                            : ""}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      disabled={sibuk === item.email || item.status === "disetujui"}
                      onClick={() => putuskan(item.email, "disetujui")}
                    >
                      {panelAdmin.setujui}
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={sibuk === item.email || item.status === "ditolak"}
                      onClick={() => putuskan(item.email, "ditolak")}
                    >
                      {panelAdmin.tolakAksi}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
