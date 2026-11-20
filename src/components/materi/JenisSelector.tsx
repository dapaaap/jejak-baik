import { Icon } from "@/components/ui/Icon";
import type { JenisCyberbullying } from "@/data/materi";
import { cn } from "@/lib/cn";

export function JenisSelector({
  items,
  activeIndex,
  onSelect,
  onKeyDown,
  registerTab,
}: {
  items: JenisCyberbullying[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  registerTab: (element: HTMLButtonElement | null, index: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Delapan jenis cyberbullying"
      className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1.5"
    >
      {items.map((item, index) => {
        const selected = index === activeIndex;

        return (
          <button
            key={item.id}
            ref={(element) => registerTab(element, index)}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={onKeyDown}
            className={cn(
              "flex min-h-12 items-center gap-3 rounded-md border px-3 py-2.5 text-left transition duration-fast ease-out",
              selected
                ? "border-accent bg-surface shadow-lift"
                : "border-transparent hover:bg-surface",
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm",
                selected ? "bg-accent-tint text-accent" : "bg-paper text-forest",
              )}
            >
              <Icon name={item.ikon} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block text-small font-semibold",
                  selected ? "text-ink" : "text-ink-muted",
                )}
              >
                {item.nama}
              </span>
              <span className="mt-0.5 block text-caption font-medium uppercase text-ink-soft">
                {item.labelSingkat}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function JenisPanel({
  item,
  index,
}: {
  item: JenisCyberbullying;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      id={`panel-${item.id}`}
      aria-labelledby={`tab-${item.id}`}
      tabIndex={0}
      key={item.id}
      className="relative animate-panel overflow-hidden rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[8rem] leading-none text-accent opacity-10"
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="relative flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-paper-deep text-forest">
          <Icon name={item.ikon} className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-h2 font-medium">{item.nama}</h3>
          <p className="mt-1 text-caption font-semibold uppercase text-accent">
            {item.labelSingkat}
          </p>
        </div>
      </div>

      <dl className="relative mt-8 space-y-6">
        <div>
          <dt className="text-caption font-semibold uppercase text-ink-soft">Penjelasan</dt>
          <dd className="mt-2 max-w-measure text-body text-ink-muted">{item.penjelasan}</dd>
        </div>
        <div className="rounded-md bg-accent-tint p-4 sm:p-5">
          <dt className="text-caption font-semibold uppercase text-accent-strong">Contoh</dt>
          <dd className="mt-1 max-w-measure text-small text-ink">{item.contoh}</dd>
        </div>
      </dl>
    </div>
  );
}
