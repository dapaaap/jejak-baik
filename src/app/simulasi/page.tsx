import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SimulasiKasus } from "@/components/simulasi/SimulasiKasus";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  kasusSimulasi,
  penutupSimulasi,
  simulasiHero,
  simulasiSeo,
} from "@/data/simulasi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(simulasiSeo, "/simulasi");

export default function SimulasiPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{simulasiHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{simulasiHero.judul}</h1>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{simulasiHero.sub}</p>
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <p className="text-caption font-semibold uppercase text-accent">Studi kasus</p>
            <h2 className="mt-3 text-h2 font-medium">{kasusSimulasi.judul}</h2>

            <div className="mt-6 space-y-4 border-l-2 border-accent pl-5">
              {kasusSimulasi.paragraf.map((paragraf) => (
                <p key={paragraf} className="text-body text-ink">
                  {paragraf}
                </p>
              ))}
            </div>

            <p className="mt-5 text-caption text-ink-soft">{kasusSimulasi.keterangan}</p>
          </div>

          <SimulasiKasus />
        </Container>
      </Section>

      <Section labelledBy="simulasi-ingat">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="simulasi-ingat" className="text-h1 font-medium">
              {penutupSimulasi.judul}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {penutupSimulasi.aksi.map((aksi, index) => (
                <ButtonLink
                  key={aksi.href}
                  href={aksi.href}
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {aksi.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {penutupSimulasi.poin.map((poin, index) => (
              <li key={poin} className="flex gap-4 border-t border-line py-5 last:border-b">
                <span aria-hidden="true" className="font-display text-small text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-body text-ink-muted">{poin}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
