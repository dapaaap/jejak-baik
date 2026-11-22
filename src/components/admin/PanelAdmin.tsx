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
  type CalonAdmin,
  type PendaftarGuru,
} from "@/lib/jaringan";
import { tanggalRingkas } from "@/lib/progres";

type Tahap = "memuat" | "boleh" | "tolak" | "galat";
type Tab = "pengaduan" | "pendaftaran" | "admin";
type Putusan = "disetujui" | "ditolak";

interface Permintaan {
  email: string;
  nama: string;
  status: Putusan | "menunggu";
  tanggal: string;
  putusanOleh?: string;
  tanggalPutusan?: string;
}

const labelStatus = {
  menunggu: panelAdmin.statusMenunggu,
  disetujui: panelAdmin.statusDisetujui,
  ditolak: panelAdmin.statusDitolak,
} as const;

function pesanGalat(error: unknown) {
  return error instanceof Error && error.message ? error.message : panelAdmin.galat;
}

function urutkan<T extends Permintaan>(daftar: T[]) {
  return daftar.slice().sort((a, b) => {
    if (a.status === "menunggu" && b.status !== "menunggu") return -1;
    if (a.status !== "menunggu" && b.status === "menunggu") return 1;
    return b.tanggal.localeCompare(a.tanggal);
  });
}

function TabTombol({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={aktif}
      onClick={onClick}
      className={
        aktif
          ? "inline-flex min-h-11 items-center rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
          : "inline-flex min-h-11 items-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink hover:border-forest"
      }
    >
      {children}
    </button>
  );
}

function KartuPermintaan({
  item,
  rincian = [],
  sibuk,
  onPutusan,
}: {
  item: Permintaan;
  rincian?: { label: string; nilai: string }[];
  sibuk: boolean;
  onPutusan: (putusan: Putusan) => void;
}) {
  return (
    <li className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-h3 font-semibold">{item.nama}</p>
          <p className="break-words text-small text-ink-muted">{item.email}</p>
        </div>
        <Badge>{labelStatus[item.status]}</Badge>
      </div>

      <dl className="mt-4 grid gap-3 text-small sm:grid-cols-2">
        {rincian.map((baris) => (
          <div key={baris.label}>
            <dt className="font-semibold">{baris.label}</dt>
            <dd className="mt-0.5 break-words text-ink-muted">{baris.nilai}</dd>
          </div>
        ))}
        <div>
          <dt className="font-semibold">{panelAdmin.mendaftar}</dt>
          <dd className="mt-0.5 text-ink-muted">{tanggalRingkas(item.tanggal) || item.tanggal}</dd>
        </div>
        {item.putusanOleh ? (
          <div>
            <dt className="font-semibold">{panelAdmin.diputuskan}</dt>
            <dd className="mt-0.5 break-words text-ink-muted">
              {item.putusanOleh}
              {item.tanggalPutusan ? ` · ${tanggalRingkas(item.tanggalPutusan)}` : ""}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          disabled={sibuk || item.status === "disetujui"}
          onClick={() => onPutusan("disetujui")}
        >
          {panelAdmin.setujui}
        </Button>
        <Button
          variant="secondary"
          disabled={sibuk || item.status === "ditolak"}
          onClick={() => onPutusan("ditolak")}
        >
          {panelAdmin.tolakAksi}
        </Button>
      </div>
    </li>
  );
}

export function PanelAdmin() {
  const [tahap, setTahap] = useState<Tahap>(sheetsAktif ? "memuat" : "tolak");
  const [tab, setTab] = useState<Tab>("pengaduan");
  const [pendaftar, setPendaftar] = useState<PendaftarGuru[]>([]);
  const [calonAdmin, setCalonAdmin] = useState<CalonAdmin[]>([]);
  const [pemilik, setPemilik] = useState(false);
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

        setPemilik(Boolean(akun.pemilik));
        setTahap("boleh");
        setMemuatDaftar(true);

        const [hasil, permintaanAdmin] = await Promise.all([
          panggilSheets<PendaftarGuru[]>("adminPendaftaran"),
          akun.pemilik
            ? panggilSheets<CalonAdmin[]>("adminPendaftaranAdmin")
            : Promise.resolve([] as CalonAdmin[]),
        ]);
        if (!aktif) return;

        setPendaftar(hasil);
        setCalonAdmin(permintaanAdmin);
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

  async function putuskan(email: string, putusan: Putusan) {
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

  async function putuskanAdmin(email: string, putusan: Putusan) {
    setSibuk(email);
    setPesan("");
    setGalat("");

    try {
      await panggilSheets("adminPutusanAdmin", { email, putusan });
      setCalonAdmin((lama) =>
        lama.map((item) => (item.email === email ? { ...item, status: putusan } : item)),
      );
      setPesan(panelAdmin.suksesAdmin);
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

  const urut = urutkan(pendaftar);
  const urutAdmin = urutkan(calonAdmin);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        <TabTombol aktif={tab === "pengaduan"} onClick={() => setTab("pengaduan")}>
          {panelAdmin.tabPengaduan}
        </TabTombol>
        <TabTombol aktif={tab === "pendaftaran"} onClick={() => setTab("pendaftaran")}>
          {panelAdmin.tabPendaftaran}
        </TabTombol>
        {pemilik ? (
          <TabTombol aktif={tab === "admin"} onClick={() => setTab("admin")}>
            {panelAdmin.tabAdmin}
          </TabTombol>
        ) : null}
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
                <KartuPermintaan
                  key={item.email}
                  item={item}
                  sibuk={sibuk === item.email}
                  onPutusan={(putusan) => putuskan(item.email, putusan)}
                  rincian={[
                    { label: panelAdmin.sekolah, nilai: item.sekolah },
                    { label: panelAdmin.jabatan, nilai: item.jabatan },
                  ]}
                />
              ))}
            </ul>
          )}
        </div>
      ) : null}

      {tab === "admin" && pemilik ? (
        <div>
          <h2 className="text-h2 font-medium">{panelAdmin.tabAdmin}</h2>
          <p className="mt-2 max-w-measure text-small text-ink-muted">
            {panelAdmin.adminCatatan}
          </p>

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
              {panelAdmin.memuatDaftarAdmin}
            </p>
          ) : urutAdmin.length === 0 ? (
            <p className="mt-3 text-small text-ink-muted">{panelAdmin.kosongAdmin}</p>
          ) : (
            <ul className="mt-5 grid gap-4">
              {urutAdmin.map((item) => (
                <KartuPermintaan
                  key={item.email}
                  item={item}
                  sibuk={sibuk === item.email}
                  onPutusan={(putusan) => putuskanAdmin(item.email, putusan)}
                />
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
