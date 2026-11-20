import Link from "next/link";
import { footerMerek } from "@/data/kontak";
import { footerBantuan, footerJelajahi, navMerek } from "@/data/navigasi";
import { TraceArt } from "@/components/ui/TraceArt";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-deep">
      <TraceArt className="pointer-events-none absolute -bottom-40 -right-32 hidden w-[30rem] text-forest opacity-10 lg:block" />

      <Container className="relative py-section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={navMerek.href} className="inline-flex min-h-11 items-center">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-sm text-small text-ink-muted">{footerMerek.deskripsi}</p>
          </div>

          <nav aria-labelledby="footer-jelajahi" className="lg:col-span-3">
            <h2 id="footer-jelajahi" className="text-caption font-semibold uppercase text-accent">
              Jelajahi
            </h2>
            <ul className="mt-4 space-y-1">
              {footerJelajahi.map((tautan) => (
                <li key={tautan.href}>
                  <Link
                    href={tautan.href}
                    className="inline-flex min-h-11 items-center text-small text-ink-muted underline-offset-4 transition-colors duration-fast hover:text-forest hover:underline"
                  >
                    {tautan.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-caption font-semibold uppercase text-accent">
              {footerBantuan.judul}
            </h2>
            <ul className="mt-4 space-y-2 text-small text-ink-muted">
              <li>{footerBantuan.kontak}</li>
              <li>{footerBantuan.sekolah}</li>
              <li>
                <Link
                  href={footerBantuan.tautan.href}
                  className="inline-flex min-h-11 items-center font-semibold text-forest underline-offset-4 hover:underline"
                >
                  {footerBantuan.tautan.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line-strong pt-6">
          <p className="max-w-4xl text-small text-ink-muted">
            {footerMerek.disclaimer.map((bagian, index) =>
              bagian.tebal ? (
                <strong key={index} className="font-semibold text-ink">
                  {bagian.teks}
                </strong>
              ) : (
                <span key={index}>{bagian.teks}</span>
              ),
            )}
          </p>
        </div>

        <p className="mt-8 text-small text-ink-soft">{footerMerek.hakCipta}</p>
      </Container>
    </footer>
  );
}
