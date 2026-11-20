import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DasborKlien } from "@/components/dasbor/DasborKlien";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { dasborHero, dasborSeo } from "@/data/dasbor";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(dasborSeo, "/dashboard");

export default function DashboardPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{dasborHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{dasborHero.judul}</h1>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{dasborHero.sub}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <DasborKlien />
        </Container>
      </Section>
    </>
  );
}
