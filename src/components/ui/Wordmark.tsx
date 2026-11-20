import { cn } from "@/lib/cn";

export function Wordmark({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={cn("h-7 w-7", onDark ? "text-gold" : "text-forest")}
      >
        <path
          d="M4.5 26c4-1.2 6.8-4.4 8.6-8.6C15.2 12 19 7.4 25 6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="1 4.5"
          opacity="0.7"
        />
        <circle cx="6.5" cy="26" r="2.6" fill="currentColor" />
        <circle cx="13" cy="18.5" r="2.2" fill="currentColor" />
        <circle cx="18.5" cy="11.5" r="1.8" fill="currentColor" />
        <circle cx="25" cy="6.4" r="1.4" fill="currentColor" />
      </svg>
      <span
        className={cn(
          "font-display text-h3 font-semibold leading-none tracking-[-0.025em]",
          onDark ? "text-paper" : "text-ink",
        )}
      >
        Jejak <em className="italic">Baik</em>
      </span>
    </span>
  );
}
