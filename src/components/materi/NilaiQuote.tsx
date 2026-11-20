import type { NilaiMoral } from "@/data/materi";

export function NilaiQuote({ nilai }: { nilai: NilaiMoral }) {
  return (
    <figure className="flex h-full flex-col rounded-lg bg-surface p-6 text-ink">
      <p className="text-caption font-semibold uppercase text-accent">{nilai.referensi}</p>
      <h3 className="mt-2 text-h3 font-semibold">{nilai.judul}</h3>
      <blockquote className="mt-4 flex-1 font-display text-lead leading-relaxed text-ink">
        <p>{nilai.kutipan}</p>
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4 text-small text-ink-muted">
        {nilai.praktik}
      </figcaption>
    </figure>
  );
}
