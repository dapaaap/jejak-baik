import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  privasiBagian,
  privasiHero,
  privasiRingkas,
  privasiSeo,
  privasiStatus,
} from "@/data/privasi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(privasiSeo, "/privasi");

export default function PrivasiPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{privasiHero.label}</Eyebrow>
              <h1 className="mt-6 max-w-3xl text-display font-medium">{privasiHero.judul}</h1>
              <p className="mt-5 max-w-measure text-lead text-ink-muted">{privasiHero.sub}</p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-caption font-semibold uppercase text-ink-soft">
                {privasiHero.diperbarui}
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {privasiRingkas.map((poin) => (
                  <li key={poin} className="flex gap-2.5 text-small text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest"
                    />
                    <span>{poin}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <p className="text-caption font-semibold uppercase text-accent">Isi pernyataan</p>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {privasiBagian.map((bagian, index) => (
              <section
                key={bagian.judul}
                className="border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="font-display text-small text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-h2 font-medium">{bagian.judul}</h2>
                </div>

                <div className="mt-4 space-y-3 pl-8">
                  {bagian.paragraf.map((paragraf) => (
                    <p key={paragraf} className="max-w-measure text-body text-ink-muted">
                      {paragraf}
                    </p>
                  ))}

                  {bagian.poin ? (
                    <ul className="space-y-2 pt-1">
                      {bagian.poin.map((poin) => (
                        <li key={poin} className="flex gap-2.5 text-small text-ink">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest"
                          />
                          <span>{poin}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" labelledBy="privasi-status">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 id="privasi-status" className="text-h2 font-medium">
              {privasiStatus.judul}
            </h2>
            <p className="mt-3 max-w-measure text-body text-ink-muted">{privasiStatus.isi}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={privasiStatus.aksi.href} variant="secondary">
              {privasiStatus.aksi.label}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
