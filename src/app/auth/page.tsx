import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FormProfil } from "@/components/akun/FormProfil";
import { akunSeo } from "@/data/akun";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(akunSeo, "/auth");

export default function AuthPage() {
  return (
    <Section>
      <Container>
        <Suspense
          fallback={<p className="text-small text-ink-soft">Memuat formulir profil...</p>}
        >
          <FormProfil />
        </Suspense>
      </Container>
    </Section>
  );
}
