import type { CiriCyberbullying } from "@/data/materi";

export function CiriGrid({ items }: { items: CiriCyberbullying[] }) {
  return (
    <ol className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
      {items.map((item, index) => (
        <li key={item.judul} className="flex gap-4 border-b border-line py-6">
          <span className="w-8 shrink-0 font-display text-h3 font-medium text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-h3 font-semibold">{item.judul}</h3>
            <p className="mt-2 max-w-measure text-small text-ink-muted">{item.deskripsi}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
