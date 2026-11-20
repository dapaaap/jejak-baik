"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface Chapter {
  id: string;
  nomor: number;
  judul: string;
}

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-24% 0px -62% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Daftar bab" className="sticky top-24">
      <p className="text-caption font-semibold uppercase text-ink-soft">Daftar bab</p>
      <ol className="mt-4">
        {chapters.map((chapter) => {
          const current = chapter.id === active;

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "group flex gap-3 border-l-2 py-3 pl-4 transition-colors duration-fast",
                  current
                    ? "border-accent text-ink"
                    : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "font-display text-caption",
                    current ? "text-accent" : "text-ink-soft",
                  )}
                >
                  {String(chapter.nomor).padStart(2, "0")}
                </span>
                <span className="text-small font-medium">{chapter.judul}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
