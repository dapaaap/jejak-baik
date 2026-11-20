import type { DampakKelompok } from "@/data/materi";

export function DampakGrid({ kelompok }: { kelompok: DampakKelompok[] }) {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {kelompok.map((item, index) => (
        <div key={item.area} className="border-t border-line pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 font-semibold">{item.area}</h3>
            <span aria-hidden="true" className="font-display text-caption text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {item.items.map((baris) => (
              <li key={baris} className="flex gap-3 text-small text-ink-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                <span>{baris}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
