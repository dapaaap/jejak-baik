import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { KuisRefleksi } from "@/components/kuis/KuisRefleksi";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { kuisHero, kuisSeo } from "@/data/kuis";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(kuisSeo, "/kuis");

export default function KuisPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{kuisHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{kuisHero.judul}</h1>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{kuisHero.sub}</p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <KuisRefleksi />

          <aside className="rounded-lg border border-line bg-paper-deep p-5">
            <p className="text-caption font-semibold uppercase text-accent">Sebelum mulai</p>
            <ul className="mt-3 space-y-2.5 text-small text-ink-muted">
              <li>Delapan soal, tanpa batas waktu.</li>
              <li>Pembahasan muncul setelah semua soal dijawab.</li>
              <li>Refleksi bisa dikosongkan kalau belum siap.</li>
              <li>Semua jawaban tersimpan di perangkat ini saja.</li>
            </ul>
            <ButtonLink href="/materi" variant="secondary" className="mt-5">
              Buka Pusat Materi
            </ButtonLink>
          </aside>
        </Container>
      </Section>
    </>
  );
}
