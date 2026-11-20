import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChapterNav, type Chapter } from "@/components/materi/ChapterNav";
import { CiriGrid } from "@/components/materi/CiriGrid";
import { DampakGrid } from "@/components/materi/DampakGrid";
import { JenisCyberbullying } from "@/components/materi/JenisCyberbullying";
import { NilaiQuote } from "@/components/materi/NilaiQuote";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { bab1, bab2, bab3, bab4, materiCta, materiHero, materiSeo } from "@/data/materi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(materiSeo, "/materi");

const chapters: Chapter[] = [
  { id: "bab-1", nomor: bab1.nomor, judul: bab1.judul },
  { id: "bab-2", nomor: bab2.nomor, judul: bab2.judul },
  { id: "bab-3", nomor: bab3.nomor, judul: bab3.judul },
  { id: "bab-4", nomor: bab4.nomor, judul: bab4.judul },
];

function ChapterHeader({
  id,
  nomor,
  judul,
  lead,
  tone = "light",
  leadTone = "muted",
}: {
  id: string;
  nomor: number;
  judul: string;
  lead: string;
  tone?: "light" | "dark";
  leadTone?: "ink" | "muted";
}) {
  return (
    <div className="max-w-measure">
      <Eyebrow tone={tone}>{`Bab ${nomor}`}</Eyebrow>
      <h2 id={id} className="mt-4 text-h1 font-medium">
        {judul}
      </h2>
      <p
        className={
          tone === "dark"
            ? "mt-5 text-lead text-paper-muted"
            : leadTone === "ink"
              ? "mt-5 text-lead text-ink"
              : "mt-5 text-lead text-ink-muted"
        }
      >
        {lead}
      </p>
    </div>
  );
}

export default function MateriPage() {
  const [awalJudul, akhirJudul] = materiHero.judul.split("mencegah");

  return (
    <>
      <Section className="border-b border-line">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{materiHero.label}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-display font-medium">
              {awalJudul}
              <span className="italic text-accent">mencegah</span>
              {akhirJudul}
            </h1>
            <p className="mt-6 max-w-measure text-lead text-ink-muted">{materiHero.sub}</p>
          </div>

          <div className="on-dark rounded-xl bg-forest p-2">
            <ol>
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className="group flex min-h-14 items-center gap-4 rounded-lg px-4 py-3 transition-colors duration-fast hover:bg-forest-deep"
                  >
                    <span className="font-display text-caption text-gold">
                      {String(chapter.nomor).padStart(2, "0")}
                    </span>
                    <span className="font-display text-h3 text-paper">{chapter.judul}</span>
                    <Icon
                      name="arrow-right"
                      className="ml-auto h-4 w-4 text-gold transition-transform duration-fast group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Container className="grid gap-12 py-section lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <ChapterNav chapters={chapters} />
        </aside>

        <div>
          <section id="bab-1" className="scroll-mt-28">
            <ChapterHeader
              id="bab-1-judul"
              nomor={bab1.nomor}
              judul={bab1.judul}
              lead={bab1.definisi}
              leadTone="ink"
            />
            <CiriGrid items={bab1.ciri} />
          </section>

          <section id="bab-2" className="mt-16 scroll-mt-28 border-t border-line pt-12">
            <div className="rounded-xl bg-paper-deep p-5 sm:p-8">
              <ChapterHeader
                id="bab-2-judul"
                nomor={bab2.nomor}
                judul={bab2.judul}
                lead={bab2.sub}
              />
              <div className="mt-8">
                <JenisCyberbullying />
              </div>
            </div>
          </section>

          <section id="bab-3" className="mt-16 scroll-mt-28 border-t border-line pt-12">
            <ChapterHeader
              id="bab-3-judul"
              nomor={bab3.nomor}
              judul={bab3.judul}
              lead={bab3.sub}
            />
            <DampakGrid kelompok={bab3.kelompok} />
          </section>

          <section id="bab-4" className="mt-16 scroll-mt-28">
            <div className="on-dark rounded-xl bg-forest p-6 sm:p-10">
              <ChapterHeader
                id="bab-4-judul"
                nomor={bab4.nomor}
                judul={bab4.judul}
                lead={bab4.intro}
                tone="dark"
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {bab4.nilai.map((nilai) => (
                  <NilaiQuote key={nilai.referensi} nilai={nilai} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>

      <Section tone="accent" labelledBy="cta-judul">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="cta-judul" className="text-h1 font-medium text-paper lg:col-span-7">
            {materiCta.judul}
          </h2>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {materiCta.aksi.map((aksi, index) => (
              <ButtonLink
                key={aksi.href}
                href={aksi.href}
                variant={index === 0 ? "inverse" : "outlineInverse"}
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
