"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, navMerek } from "@/data/navigasi";
import { cn } from "@/lib/cn";
import { akunGoogle } from "@/data/akun";
import type { Profil } from "@/lib/progres";
import { akhiriSesi, eventSesi, sesiAktif } from "@/lib/sesi";
import { AvatarProfil } from "@/components/akun/AvatarProfil";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "./Container";

const utama = navItems.filter((item) => item.variant === "utama");
const akun = navItems.filter((item) => item.variant === "akun");

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sesi, setSesi] = useState<Profil | null>(null);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const baca = () => setSesi(sesiAktif());
    baca();
    window.addEventListener(eventSesi, baca);
    window.addEventListener("storage", baca);
    return () => {
      window.removeEventListener(eventSesi, baca);
      window.removeEventListener("storage", baca);
    };
  }, []);

  function keluar() {
    akhiriSesi();
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(href: string) {
    return pathname === href.replace(/\/$/, "") || pathname === `${href}/`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Link
          href={navMerek.href}
          className="inline-flex min-h-11 items-center rounded-sm"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
          {utama.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-small font-medium transition-colors duration-fast hover:text-forest",
                isActive(item.href)
                  ? "text-forest after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent after:content-['']"
                  : "text-ink-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {sesi ? (
            <>
              <Link
                href="/dashboard"
                className="flex min-h-11 items-center gap-2.5 rounded-md text-small font-semibold text-ink underline-offset-4 hover:text-forest hover:underline"
              >
                <AvatarProfil profil={sesi} ukuran={28} />
                <span className="max-w-40 truncate">{sesi.nama}</span>
              </Link>
              <button
                type="button"
                onClick={keluar}
                className="text-small font-semibold text-ink-muted underline-offset-4 hover:text-forest hover:underline"
              >
                {akunGoogle.keluar}
              </button>
            </>
          ) : (
            <>
              <Link
                href={akun[0].href}
                className="text-small font-semibold text-ink underline-offset-4 hover:text-forest hover:underline"
              >
                {akun[0].label}
              </Link>
              <Link
                href={akun[1].href}
                className="inline-flex min-h-10 items-center rounded-md bg-forest px-4 text-small font-semibold text-paper transition-colors duration-fast hover:bg-forest-deep"
              >
                {akun[1].label}
              </Link>
            </>
          )}
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="navigasi-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink transition-colors duration-fast hover:border-forest hover:text-forest lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </Container>

      {open ? (
        <div id="navigasi-mobile" className="border-t border-line bg-paper lg:hidden">
          <Container className="pb-6 pt-3">
            <nav aria-label="Navigasi utama">
              <ul>
                {utama.map((item, index) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex min-h-14 items-center justify-between gap-4 py-3 text-h3"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-small text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display">{item.label}</span>
                      </span>
                      <Icon name="arrow-right" className="h-5 w-5 text-forest" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {sesi ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-forest bg-forest px-4 text-small font-semibold text-paper"
                  >
                    <AvatarProfil profil={sesi} ukuran={28} />
                    <span className="truncate">Dasbor</span>
                  </Link>
                  <button
                    type="button"
                    onClick={keluar}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-4 text-small font-semibold text-ink"
                  >
                    {akunGoogle.keluar}
                  </button>
                </>
              ) : (
                akun.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-small font-semibold",
                      item.label === "Daftar"
                        ? "border-forest bg-forest text-paper"
                        : "border-line-strong text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
