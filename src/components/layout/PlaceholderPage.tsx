import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TraceArt } from "@/components/ui/TraceArt";
import { placeholderCopy, type HalamanPlaceholder } from "@/data/halaman";

export function PlaceholderPage({ halaman }: { halaman: HalamanPlaceholder }) {
  return (
    <Section>
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <Badge>{placeholderCopy.status}</Badge>
          <h1 className="mt-6 max-w-3xl text-display font-medium">{halaman.judul}</h1>
          <p className="mt-6 max-w-measure text-lead text-ink-muted">{placeholderCopy.teks}</p>
          <ButtonLink href="/materi" variant="secondary" className="mt-8">
            {placeholderCopy.kembali}
          </ButtonLink>
        </div>

        <div className="rounded-xl border border-line bg-paper-deep p-6 sm:p-8">
          <TraceArt className="mx-auto max-w-xs text-forest" />
        </div>
      </Container>
    </Section>
  );
}
