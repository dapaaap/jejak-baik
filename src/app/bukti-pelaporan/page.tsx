import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TombolSalin } from "@/components/bukti/TombolSalin";
import { FormLaporan } from "@/components/bukti/FormLaporan";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  buktiHero,
  buktiPenutup,
  buktiSeo,
  buktiWajib,
  kanalLaporan,
  langkahBukti,
  templateCatatan,
  templateLaporan,
} from "@/data/buktiPelaporan";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(buktiSeo, "/bukti-pelaporan");

export default function BuktiPelaporanPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{buktiHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{buktiHero.judul}</h1>
            <div className="mt-6">
              <ButtonLink href={buktiHero.aksi.href}>{buktiHero.aksi.label}</ButtonLink>
            </div>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{buktiHero.sub}</p>
        </Container>
      </Section>

      <Section id="lapor" tone="sand" className="border-b border-line">
        <Container>
          <FormLaporan />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <div>
            <p className="text-caption font-semibold uppercase text-accent">Menyimpan bukti</p>
            <ol className="mt-6">
              {langkahBukti.map((langkah, index) => (
                <li
                  key={langkah.judul}
                  className="flex gap-5 border-t border-line py-6 last:border-b"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-h3 font-medium text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-h3 font-semibold">{langkah.judul}</h2>
                    <p className="mt-2 max-w-measure text-small text-ink-muted">{langkah.isi}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit rounded-xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-h2 font-medium">{buktiWajib.judul}</h2>
            <ul className="mt-5 space-y-3">
              {buktiWajib.poin.map((poin) => (
                <li key={poin} className="flex gap-3 text-small text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest"
                  />
                  <span>{poin}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-small text-ink-muted">
              {buktiWajib.catatan}
            </p>
          </aside>
        </Container>
      </Section>

      <Section tone="sand" labelledBy="kanal-judul">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Ke mana melapor</Eyebrow>
              <h2 id="kanal-judul" className="mt-5 text-h1 font-medium">
                Pilih jalur yang paling dekat.
              </h2>
            </div>
            <p className="max-w-measure text-small text-ink-muted lg:col-span-4 lg:col-start-9">
              Boleh lebih dari satu jalur. Platform menangani kontennya, sekolah menangani
              siswanya, dan layanan pendampingan membantu proses pemulihan.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {kanalLaporan.map((kanal) => (
              <li key={kanal.nama} className="rounded-lg border border-line bg-paper p-5 sm:p-6">
                <h3 className="text-h3 font-semibold">{kanal.nama}</h3>
                <p className="mt-2 text-small text-ink-muted">{kanal.untuk}</p>
                <p className="mt-3 text-small text-ink">{kanal.cara}</p>
                {kanal.href && kanal.labelHref ? (
                  <a
                    href={kanal.href}
                    className="mt-4 inline-flex min-h-11 items-center text-small font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    {kanal.labelHref}
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="template-judul">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 id="template-judul" className="text-h1 font-medium">
              Template laporan
            </h2>
            <p className="mt-4 max-w-measure text-small text-ink-muted">
              Kerangka singkat supaya laporanmu tidak melebar. Ganti bagian bertanda titik-titik
              dengan kejadian yang sebenarnya.
            </p>
            <ul className="mt-6 space-y-2.5">
              {templateCatatan.map((catatan) => (
                <li key={catatan} className="flex gap-2.5 text-small text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest"
                  />
                  <span>{catatan}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <TombolSalin teks={templateLaporan} />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-line bg-surface p-5 font-sans text-small leading-relaxed text-ink sm:p-6">
              {templateLaporan}
            </pre>
          </div>
        </Container>
      </Section>

      <Section tone="forest" labelledBy="bukti-penutup">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="bukti-penutup" className="text-h1 font-medium text-paper">
              {buktiPenutup.judul}
            </h2>
            <p className="mt-4 max-w-measure text-lead text-paper-muted">{buktiPenutup.isi}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {buktiPenutup.aksi.map((aksi, index) => (
              <ButtonLink
                key={aksi.href}
                href={aksi.href}
                variant={index === 0 ? "inverse" : "outlineInverse"}
              >
                {aksi.label}
              </ButtonLink>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
