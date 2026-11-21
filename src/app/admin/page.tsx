import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PanelAdmin } from "@/components/admin/PanelAdmin";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { adminHero, adminSeo } from "@/data/admin";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(adminSeo, "/admin");

export default function AdminPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{adminHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{adminHero.judul}</h1>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{adminHero.sub}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <PanelAdmin />
        </Container>
      </Section>
    </>
  );
}
