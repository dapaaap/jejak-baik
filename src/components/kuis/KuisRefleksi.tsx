"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { pertanyaanKuis, refleksiKuis } from "@/data/kuis";
import { kunciProgres, simpanProgres } from "@/lib/progres";
import { cn } from "@/lib/cn";

const total = pertanyaanKuis.length;

export function KuisRefleksi() {
  const [aktif, setAktif] = useState(0);
  const [jawaban, setJawaban] = useState<Array<number | null>>(() =>
    pertanyaanKuis.map(() => null),
  );
  const [selesai, setSelesai] = useState(false);
  const [refleksi, setRefleksi] = useState<string[]>(() =>
    refleksiKuis.pertanyaan.map(() => ""),
  );
  const [statusSimpan, setStatusSimpan] = useState<"idle" | "ok" | "gagal">("idle");

  const pertanyaan = pertanyaanKuis[aktif];
  const dipilih = jawaban[aktif];
  const terjawab = jawaban.filter((nilai) => nilai !== null).length;

  const benar = pertanyaanKuis.reduce(
    (jumlah, item, index) => jumlah + (jawaban[index] === item.jawaban ? 1 : 0),
    0,
  );

  function pilih(index: number) {
    setJawaban((sebelumnya) =>
      sebelumnya.map((nilai, posisi) => (posisi === aktif ? index : nilai)),
    );
  }

  function selesaikan() {
    try {
      simpanProgres(kunciProgres.kuis, {
        benar,
        total,
        tanggal: new Date().toISOString(),
        refleksi: [],
      });
      setStatusSimpan("ok");
    } catch {
      setStatusSimpan("gagal");
    }

    setSelesai(true);
  }

  function simpanRefleksi() {
    try {
      simpanProgres(kunciProgres.kuis, {
        benar,
        total,
        tanggal: new Date().toISOString(),
        refleksi,
      });
      setStatusSimpan("ok");
    } catch {
      setStatusSimpan("gagal");
    }
  }

  function ulangi() {
    setJawaban(pertanyaanKuis.map(() => null));
    setAktif(0);
    setSelesai(false);
    setStatusSimpan("idle");
  }

  if (selesai) {
    return (
      <div className="grid gap-6">
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-caption font-semibold uppercase text-accent">Hasil kuis</p>

          <p className="mt-4 font-display text-display font-medium leading-none">
            {benar}
            <span className="text-h2 text-ink-soft"> / {total}</span>
          </p>
          <p className="mt-4 max-w-measure text-body text-ink-muted">
            {benar === total
              ? "Semua jawaban tepat. Coba jelaskan alasan tiap jawaban ke temanmu, itu cara paling cepat memastikan pemahamanmu benar-benar kuat."
              : benar >= total / 2
                ? "Sebagian besar sudah tepat. Baca pembahasan pada soal yang salah, lalu cocokkan dengan bab terkait di Pusat Materi."
                : "Masih banyak yang perlu dibaca ulang. Buka Pusat Materi, lalu kerjakan kuis ini sekali lagi."}
          </p>

          <p
            role="status"
            className={cn(
              "mt-4 text-small",
              statusSimpan === "gagal" ? "text-danger" : "text-ink-soft",
            )}
          >
            {statusSimpan === "gagal"
              ? "Peramban menolak menyimpan hasil. Hasil tetap tampil di halaman ini."
              : "Hasil tersimpan di perangkat ini."}
          </p>

          <details className="mt-6 rounded-md border border-line bg-paper">
            <summary className="flex min-h-11 items-center px-4 py-2 text-small font-semibold">
              Lihat pembahasan tiap soal
            </summary>
            <ol className="border-t border-line">
              {pertanyaanKuis.map((item, index) => {
                const jawabanBenar = item.opsi[item.jawaban];
                const jawabanDipilih = jawaban[index] === null ? null : item.opsi[jawaban[index]!];
                const tepat = jawaban[index] === item.jawaban;

                return (
                  <li key={item.id} className="border-b border-line p-4 last:border-b-0">
                    <p className="text-small font-semibold">
                      {item.nomor}. {item.pertanyaan}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-small font-medium",
                        tepat ? "text-success" : "text-danger",
                      )}
                    >
                      {tepat ? "Tepat" : "Belum tepat"}
                    </p>
                    {!tepat ? (
                      <p className="mt-1 text-small text-ink-muted">
                        Jawabanmu: {jawabanDipilih?.teks ?? "belum dijawab"}
                      </p>
                    ) : null}
                    <p className="mt-1 text-small text-ink-muted">
                      Jawaban tepat: {jawabanBenar.teks}
                    </p>
                    <p className="mt-2 text-small text-ink-soft">{item.penjelasan}</p>
                  </li>
                );
              })}
            </ol>
          </details>

          <div className="mt-6">
            <Button onClick={ulangi} variant="secondary">
              Kerjakan ulang
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <h3 className="text-h2 font-medium">{refleksiKuis.judul}</h3>
          <p className="mt-3 max-w-measure text-small text-ink-muted">{refleksiKuis.sub}</p>

          <div className="mt-6 space-y-6">
            {refleksiKuis.pertanyaan.map((item, index) => (
              <div key={item.id}>
                <label htmlFor={`refleksi-${item.id}`} className="text-small font-semibold">
                  {item.label}
                </label>
                <p className="mt-1 text-caption text-ink-soft">{item.petunjuk}</p>
                <textarea
                  id={`refleksi-${item.id}`}
                  rows={3}
                  value={refleksi[index]}
                  onChange={(event) =>
                    setRefleksi((sebelumnya) =>
                      sebelumnya.map((nilai, posisi) =>
                        posisi === index ? event.target.value : nilai,
                      ),
                    )
                  }
                  className="mt-2 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-small text-ink placeholder:text-ink-soft"
                  placeholder="Tulis di sini, hanya tersimpan di perangkat ini."
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={simpanRefleksi}>Simpan refleksi</Button>
            <p
              role="status"
              className={cn(
                "text-small",
                statusSimpan === "gagal" ? "text-danger" : "text-ink-soft",
              )}
            >
              {statusSimpan === "gagal"
                ? "Gagal menyimpan. Coba lagi."
                : statusSimpan === "ok"
                  ? "Refleksi tersimpan di perangkat ini."
                  : ""}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-caption font-semibold uppercase text-accent">
          Soal {aktif + 1} dari {total}
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
          {pertanyaan.opsi.map((opsi, index) => {
            const terpilih = dipilih === index;

            return (
              <label
                key={opsi.id}
                className={cn(
                  "flex min-h-11 cursor-pointer gap-3 rounded-md border p-3.5 transition-colors duration-fast",
                  terpilih
                    ? "border-forest bg-paper-deep"
                    : "border-line bg-paper hover:border-line-strong",
                )}
              >
                <input
                  type="radio"
                  name={`kuis-${pertanyaan.id}`}
                  checked={terpilih}
                  onChange={() => pilih(index)}
                  className="mt-1 h-4 w-4 shrink-0 accent-forest"
                />
                <span className="text-small text-ink">{opsi.teks}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap gap-3">
        {aktif > 0 ? (
          <Button variant="secondary" onClick={() => setAktif(aktif - 1)}>
            Kembali
          </Button>
        ) : null}

        {aktif < total - 1 ? (
          <Button onClick={() => setAktif(aktif + 1)} disabled={dipilih === null}>
            Soal berikutnya
          </Button>
        ) : (
          <Button onClick={selesaikan} disabled={dipilih === null}>
            Lihat hasil
          </Button>
        )}
      </div>
    </div>
  );
}
