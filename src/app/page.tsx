import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  akunBeranda,
  berandaSeo,
  heroBeranda,
  layananBeranda,
  pembandingBeranda,
  pengingatBeranda,
  privasiBeranda,
} from "@/data/beranda";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(berandaSeo, "/");

function MarkList({ items, tone }: { items: string[]; tone: "light" | "dark" }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-small">
          <Icon
            name={tone === "dark" ? "x" : "check"}
            className={tone === "dark" ? "mt-0.5 h-5 w-5 text-paper-muted" : "mt-0.5 h-5 w-5 text-forest"}
          />
          <span className={tone === "dark" ? "text-paper-muted" : "text-ink-muted"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BerandaPage() {
  return (
    <>
      <Section className="relative overflow-hidden border-b border-line">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] lg:gap-16">
          <div>
            <Eyebrow>{heroBeranda.label}</Eyebrow>

            <h1 className="mt-6 max-w-4xl text-display font-medium">
              {heroBeranda.judulBaris.map((baris, index) => (
                <span
                  key={baris}
                  className={
                    index === 1 ? "block italic text-accent" : index === 2 ? "block" : "block"
                  }
                >
                  {baris}
                  {index < heroBeranda.judulBaris.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-measure text-lead text-ink-muted">
              {heroBeranda.deskripsi}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroBeranda.aksi.map((aksi, index) => (
                <ButtonLink
                  key={aksi.href}
                  href={aksi.href}
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {aksi.label}
                </ButtonLink>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {heroBeranda.jaminan.map((jaminan) => (
                <li key={jaminan} className="flex items-center gap-2 text-small text-ink-soft">
                  <Icon name="check" className="h-4 w-4 text-forest" />
                  {jaminan}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-rise rounded-xl border border-line bg-surface px-6 py-12 shadow-soft sm:px-10 sm:py-16">
            <Wordmark className="mx-auto h-16 sm:h-20" />
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <Eyebrow>{pengingatBeranda.label}</Eyebrow>
          </div>
          <div className="lg:col-span-10">
            <p className="max-w-4xl font-display text-h2 font-medium">{pengingatBeranda.teks}</p>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {pengingatBeranda.langkah.map((langkah, index) => (
                <li key={langkah} className="bg-paper-deep p-4">
                  <p className="font-display text-caption text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-small font-medium">{langkah}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section labelledBy="layanan-judul">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="layanan-judul"
              eyebrow={layananBeranda.label}
              title={layananBeranda.judul}
              className="lg:col-span-7"
            />
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-measure text-lead text-ink-muted">
                {layananBeranda.deskripsi}
              </p>
              <div className="mt-5">
                <ButtonLink href="/bukti-pelaporan#lapor" variant="secondary">
                  Buat laporan sekarang
                </ButtonLink>
              </div>
            </div>
          </div>

          <ol className="mt-12 border-t border-line">
            {layananBeranda.items.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="group -mx-2 grid gap-2 rounded-sm px-2 py-6 transition-colors duration-fast hover:bg-paper-deep sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.35fr)_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-display text-small text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-h3 font-semibold">{item.judul}</span>
                  <span className="text-small text-ink-muted">{item.deskripsi}</span>
                  <span className="inline-flex items-center gap-2 text-small font-semibold text-forest">
                    {layananBeranda.cta}
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="text-h2 font-medium">{pembandingBeranda.candaan.judul}</h2>
            <MarkList items={pembandingBeranda.candaan.items} tone="light" />
          </div>

          <div className="on-dark rounded-xl border border-forest-deep bg-forest p-6 sm:p-8">
            <h2 className="text-h2 font-medium text-paper">{pembandingBeranda.perundungan.judul}</h2>
            <MarkList items={pembandingBeranda.perundungan.items} tone="dark" />
          </div>
        </Container>
      </Section>

      <Section labelledBy="akun-judul">
        <Container>
          <SectionHeading
            id="akun-judul"
            eyebrow={akunBeranda.label}
            title={akunBeranda.judul}
            description={akunBeranda.deskripsi}
          />

          <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-2 lg:gap-0">
            {akunBeranda.peran.map((peran, index) => (
              <div
                key={peran.judul}
                className={
                  index === 1
                    ? "lg:border-l lg:border-line lg:pl-10"
                    : "lg:pr-10"
                }
              >
                <p className="font-display text-caption text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h3 font-semibold">{peran.judul}</h3>
                <p className="mt-3 text-small text-ink-muted">{peran.deskripsi}</p>
                <ul className="mt-5 space-y-3">
                  {peran.items.map((item) => (
                    <li key={item} className="flex gap-3 text-small text-ink-muted">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-strong" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="forest" labelledBy="privasi-judul">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="privasi-judul" className="text-h1 font-medium text-paper">
              {privasiBeranda.judul}
            </h2>
            <p className="mt-5 max-w-measure text-lead text-paper-muted">
              {privasiBeranda.deskripsi}
            </p>
            <ButtonLink
              href={privasiBeranda.cta.href}
              variant="outlineInverse"
              className="mt-7"
            >
              {privasiBeranda.cta.label}
            </ButtonLink>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-md border border-line-strong bg-line-strong sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            {privasiBeranda.jaminan.map((jaminan, index) => (
              <li key={jaminan} className="bg-forest p-4">
                <p className="font-display text-caption text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-small text-paper">{jaminan}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
