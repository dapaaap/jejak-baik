import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  jalurPanduan,
  panduanDarurat,
  panduanHero,
  panduanPenutup,
  panduanSeo,
} from "@/data/panduan";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(panduanSeo, "/panduan");

export default function PanduanPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{panduanHero.label}</Eyebrow>
              <h1 className="mt-6 max-w-3xl text-display font-medium">{panduanHero.judul}</h1>
            </div>
            <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">
              {panduanHero.sub}
            </p>
          </div>

          <nav aria-label="Pilih situasimu" className="mt-12 border-t border-line pt-6">
            <ol className="grid gap-2 sm:grid-cols-3">
              {jalurPanduan.map((jalur) => (
                <li key={jalur.id}>
                  <a
                    href={`#${jalur.id}`}
                    className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-small font-semibold text-ink transition-colors duration-fast hover:bg-paper-deep hover:text-forest"
                  >
                    <span aria-hidden="true" className="font-display text-accent">
                      {String(jalur.nomor).padStart(2, "0")}
                    </span>
                    {jalur.audiens}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </Section>

      <Section>
        <Container>
          {jalurPanduan.map((jalur) => (
            <article
              key={jalur.id}
              id={jalur.id}
              className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 last:pb-0"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <p
                    aria-hidden="true"
                    className="font-display text-h1 font-medium leading-none text-accent"
                  >
                    {String(jalur.nomor).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-h2 font-medium">{jalur.audiens}</h2>
                  <p className="mt-4 max-w-measure text-body text-ink-muted">{jalur.ringkas}</p>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <ol className="space-y-5">
                    {jalur.langkah.map((langkah, index) => (
                      <li key={langkah.judul} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-forest font-display text-small text-paper"
                        >
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-h3 font-semibold">{langkah.judul}</h3>
                          <p className="mt-1.5 max-w-measure text-small text-ink-muted">
                            {langkah.isi}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8 rounded-md border border-line bg-accent-tint p-5">
                    <p className="text-caption font-semibold uppercase text-accent-strong">
                      Sebaiknya dihindari
                    </p>
                    <ul className="mt-3 space-y-2">
                      {jalur.hindari.map((item) => (
                        <li key={item} className="flex gap-2.5 text-small text-ink">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-strong"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section tone="forest" labelledBy="panduan-darurat">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 id="panduan-darurat" className="text-h1 font-medium text-paper">
              {panduanDarurat.judul}
            </h2>
            <p className="mt-4 max-w-measure text-lead text-paper-muted">{panduanDarurat.isi}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={panduanDarurat.tautan.href} variant="inverse">
              {panduanDarurat.tautan.label}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section labelledBy="panduan-penutup">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="panduan-penutup" className="text-h1 font-medium">
              {panduanPenutup.judul}
            </h2>
            <p className="mt-4 max-w-measure text-lead text-ink-muted">{panduanPenutup.isi}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {panduanPenutup.aksi.map((aksi, index) => (
              <ButtonLink
                key={aksi.href}
                href={aksi.href}
                variant={index === 0 ? "primary" : "secondary"}
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
