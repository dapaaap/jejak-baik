import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  bantuanHero,
  bantuanPenutup,
  bantuanSekolah,
  bantuanSeo,
  dasarHukum,
  faqBantuan,
  kanalBantuan,
} from "@/data/bantuan";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(bantuanSeo, "/bantuan");

export default function BantuanPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{bantuanHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">{bantuanHero.judul}</h1>
          </div>
          <p className="max-w-measure text-lead text-ink-muted lg:col-span-5">{bantuanHero.sub}</p>
        </Container>
      </Section>

      <Section labelledBy="kanal-bantuan">
        <Container>
          <h2 id="kanal-bantuan" className="sr-only">
            Kanal bantuan
          </h2>

          <ul className="grid gap-4 md:grid-cols-2">
            {kanalBantuan.map((kanal) => (
              <li
                key={kanal.nama}
                className={
                  kanal.darurat
                    ? "flex h-full flex-col rounded-xl border border-accent bg-accent-tint p-6"
                    : "flex h-full flex-col rounded-xl border border-line bg-surface p-6"
                }
              >
                <p
                  className={
                    kanal.darurat
                      ? "text-caption font-semibold uppercase text-accent-strong"
                      : "text-caption font-semibold uppercase text-accent"
                  }
                >
                  {kanal.kontak}
                </p>
                <h3 className="mt-2 text-h2 font-medium">{kanal.nama}</h3>
                <p className="mt-3 flex-1 text-small text-ink-muted">{kanal.deskripsi}</p>
                {kanal.href && kanal.labelHref ? (
                  <a
                    href={kanal.href}
                    className="mt-5 inline-flex min-h-11 w-fit items-center rounded-md border border-forest bg-forest px-4 py-2 text-small font-semibold text-paper transition-colors duration-fast hover:border-forest-deep hover:bg-forest-deep"
                  >
                    {kanal.labelHref}
                  </a>
                ) : (
                  <p className="mt-5 text-small font-semibold text-forest">
                    Mulai dari wali kelas atau ruang BK.
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-h1 font-medium">{bantuanSekolah.judul}</h2>
          </div>
          <div className="space-y-4 lg:col-span-6 lg:col-start-7">
            {bantuanSekolah.paragraf.map((paragraf) => (
              <p key={paragraf} className="max-w-measure text-body text-ink-muted">
                {paragraf}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Eyebrow>{dasarHukum.judul}</Eyebrow>
            <p className="mt-5 font-display text-h3 font-semibold">{dasarHukum.rujukan}</p>
            <p className="mt-2 max-w-measure text-small text-ink-muted">{dasarHukum.ringkas}</p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {dasarHukum.poin.map((poin, index) => (
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

      <Section tone="sand" labelledBy="faq-bantuan">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 id="faq-bantuan" className="text-h1 font-medium">
              Pertanyaan yang sering muncul
            </h2>
            <p className="mt-4 max-w-measure text-small text-ink-muted">
              Empat hal yang paling sering ditanyakan sebelum seseorang memutuskan melapor.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {faqBantuan.map((item) => (
              <details key={item.tanya} className="group border-t border-line last:border-b">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-h3 font-semibold">
                  {item.tanya}
                  <span
                    aria-hidden="true"
                    className="text-caption font-normal text-ink-soft transition-transform duration-fast group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-measure pb-5 text-small text-ink-muted">{item.jawab}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="bantuan-penutup">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="bantuan-penutup" className="text-h1 font-medium">
              {bantuanPenutup.judul}
            </h2>
            <p className="mt-4 max-w-measure text-lead text-ink-muted">{bantuanPenutup.isi}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {bantuanPenutup.aksi.map((aksi, index) => (
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
