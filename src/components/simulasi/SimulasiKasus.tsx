"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { hasilSimulasi, pertanyaanSimulasi } from "@/data/simulasi";
import { kunciProgres, simpanProgres } from "@/lib/progres";
import { cn } from "@/lib/cn";

const total = pertanyaanSimulasi.length;

export function SimulasiKasus() {
  const [aktif, setAktif] = useState(0);
  const [pilihan, setPilihan] = useState<Array<string | null>>(() =>
    pertanyaanSimulasi.map(() => null),
  );
  const [selesai, setSelesai] = useState(false);
  const [statusSimpan, setStatusSimpan] = useState<"idle" | "ok" | "gagal">("idle");

  const pertanyaan = pertanyaanSimulasi[aktif];
  const opsiTerpilih = pilihan[aktif];
  const opsiAktif = pertanyaan.opsi.find((opsi) => opsi.id === opsiTerpilih);
  const terjawab = pilihan.filter(Boolean).length;

  const tepat = pertanyaanSimulasi.reduce((jumlah, item, index) => {
    const opsi = item.opsi.find((kandidat) => kandidat.id === pilihan[index]);
    return jumlah + (opsi?.tepat ? 1 : 0);
  }, 0);

  const hasil = hasilSimulasi.find((band) => tepat >= band.minimal) ?? hasilSimulasi[2];

  function pilih(id: string) {
    setPilihan((sebelumnya) =>
      sebelumnya.map((nilai, index) => (index === aktif ? id : nilai)),
    );
  }

  function selesaikan() {
    try {
      simpanProgres(kunciProgres.simulasi, {
        tepat,
        total,
        tanggal: new Date().toISOString(),
      });
      setStatusSimpan("ok");
    } catch {
      setStatusSimpan("gagal");
    }

    setSelesai(true);
  }

  function ulangi() {
    setPilihan(pertanyaanSimulasi.map(() => null));
    setAktif(0);
    setSelesai(false);
    setStatusSimpan("idle");
  }

  if (selesai) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-caption font-semibold uppercase text-accent">Hasil simulasi</p>

        <p className="mt-4 font-display text-display font-medium leading-none">
          {tepat}
          <span className="text-h2 text-ink-soft"> / {total}</span>
        </p>
        <h3 className="mt-3 text-h2 font-medium">{hasil.judul}</h3>
        <p className="mt-3 max-w-measure text-body text-ink-muted">{hasil.isi}</p>

        <p
          role="status"
          className={cn(
            "mt-5 text-small",
            statusSimpan === "gagal" ? "text-danger" : "text-ink-soft",
          )}
        >
          {statusSimpan === "ok"
            ? "Hasil tersimpan di perangkat ini dan bisa dilihat di Dasbor."
            : statusSimpan === "gagal"
              ? "Peramban menolak menyimpan hasil. Hasil tetap tampil di halaman ini."
              : ""}
        </p>

        <details className="mt-6 rounded-md border border-line bg-paper">
          <summary className="flex min-h-11 items-center px-4 py-2 text-small font-semibold">
            Lihat pembahasan tiap pertanyaan
          </summary>
          <ol className="border-t border-line">
            {pertanyaanSimulasi.map((item, index) => {
              const dipilih = item.opsi.find((opsi) => opsi.id === pilihan[index]);
              const benar = item.opsi.find((opsi) => opsi.tepat);

              return (
                <li key={item.id} className="border-b border-line p-4 last:border-b-0">
                  <p className="text-small font-semibold">
                    {item.nomor}. {item.pertanyaan}
                  </p>
                  <p className="mt-2 text-small text-ink-muted">
                    Jawabanmu: {dipilih?.teks ?? "belum dijawab"}
                  </p>
                  {!dipilih?.tepat && benar ? (
                    <p className="mt-1 text-small text-ink-muted">Jawaban tepat: {benar.teks}</p>
                  ) : null}
                  <p className="mt-2 text-small text-ink-soft">{dipilih?.umpan ?? benar?.umpan}</p>
                </li>
              );
            })}
          </ol>
        </details>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={ulangi} variant="secondary">
            Ulangi simulasi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-caption font-semibold uppercase text-accent">
          Pertanyaan {aktif + 1} dari {total}
        </p>
        <p className="text-small text-ink-soft">{terjawab} sudah dijawab</p>
      </div>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-paper-deep">
        <div
          className="h-full rounded-full bg-forest transition-all duration-base ease-out"
          style={{ width: `${((aktif + 1) / total) * 100}%` }}
        />
      </div>

      <h3 className="mt-6 max-w-measure text-h3 font-semibold">{pertanyaan.pertanyaan}</h3>

      <fieldset className="mt-5">
        <legend className="sr-only">{pertanyaan.pertanyaan}</legend>
        <div className="space-y-2.5">
          {pertanyaan.opsi.map((opsi) => {
            const dipilih = opsiTerpilih === opsi.id;

            return (
              <label
                key={opsi.id}
                className={cn(
                  "flex min-h-11 cursor-pointer gap-3 rounded-md border p-3.5 transition-colors duration-fast",
                  dipilih
                    ? "border-forest bg-paper-deep"
                    : "border-line bg-paper hover:border-line-strong",
                )}
              >
                <input
                  type="radio"
                  name={`simulasi-${pertanyaan.id}`}
                  value={opsi.id}
                  checked={dipilih}
                  onChange={() => pilih(opsi.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-forest"
                />
                <span className="text-small text-ink">{opsi.teks}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {opsiAktif ? (
        <div
          role="status"
          className={cn(
            "mt-5 rounded-md border p-4",
            opsiAktif.tepat
              ? "border-success bg-paper-deep"
              : "border-line-strong bg-accent-tint",
          )}
        >
          <p className="text-small font-semibold">
            {opsiAktif.tepat ? "Tepat" : "Belum tepat"}
          </p>
          <p className="mt-1 text-small text-ink-muted">{opsiAktif.umpan}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {aktif > 0 ? (
          <Button variant="secondary" onClick={() => setAktif(aktif - 1)}>
            Kembali
          </Button>
        ) : null}

        {aktif < total - 1 ? (
          <Button onClick={() => setAktif(aktif + 1)} disabled={!opsiTerpilih}>
            Pertanyaan berikutnya
          </Button>
        ) : (
          <Button onClick={selesaikan} disabled={!opsiTerpilih}>
            Lihat hasil
          </Button>
        )}
      </div>
    </div>
  );
}
