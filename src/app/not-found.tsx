import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan · Jejak Baik",
  description: "Halaman yang kamu cari tidak tersedia.",
};

export default function NotFound() {
  return (
    <Section>
      <Container>
        <p className="kicker">404</p>
        <h1 className="mt-6 max-w-3xl text-display font-medium">Halaman tidak ditemukan</h1>
        <p className="mt-6 max-w-measure text-lead text-ink-muted">
          Alamat ini tidak tersedia. Kembali ke beranda atau buka Pusat Materi.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-small font-semibold text-forest">
          <Link href="/" className="underline-offset-4 hover:underline">
            Beranda
          </Link>
          <Link href="/materi" className="underline-offset-4 hover:underline">
            Pusat Materi
          </Link>
        </div>
      </Container>
    </Section>
  );
}
