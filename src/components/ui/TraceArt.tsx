import { cn } from "@/lib/cn";

/**
 * Original contour illustration for "jejak": digital traces that spread and settle.
 * Decorative, so it is hidden from assistive technology.
 */
export function TraceArt({ className }: { className?: string }) {
  const contour =
    "M292 52c72-4 136 30 178 90 42 60 54 141 21 205-33 64-105 105-177 113-72 8-146-18-190-74-44-56-51-139-21-205C133 115 220 56 292 52Z";

  return (
    <svg
      viewBox="0 0 560 560"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
    >
      <g stroke="currentColor" strokeWidth="1.6" opacity="0.75">
        <path d={contour} />
        <path
          d={contour}
          transform="rotate(7 280 280) translate(280 280) scale(.84) translate(-280 -280)"
          strokeDasharray="1 7"
        />
        <path
          d={contour}
          transform="rotate(-5 280 280) translate(280 280) scale(.68) translate(-280 -280)"
        />
        <path
          d={contour}
          transform="rotate(11 280 280) translate(280 280) scale(.52) translate(-280 -280)"
          strokeDasharray="1 6"
        />
        <path
          d={contour}
          transform="rotate(-8 280 280) translate(280 280) scale(.36) translate(-280 -280)"
        />
      </g>

      <g stroke="currentColor" strokeWidth="1.4" opacity="0.5">
        <path d="M56 332c44 26 83 30 122 12M88 390c44 20 78 17 112-4M420 102c-22 30-30 61-20 92" />
      </g>

      <path
        d="M150 430c48-6 84-28 109-64 25-36 44-77 86-100 27-15 51-20 76-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 9"
        className="text-accent"
      />

      <g fill="currentColor" className="text-forest">
        <circle cx="158" cy="429" r="3.4" />
        <circle cx="203" cy="404" r="3" />
        <circle cx="241" cy="368" r="2.7" />
        <circle cx="272" cy="326" r="2.3" />
        <circle cx="301" cy="282" r="2" />
        <circle cx="337" cy="240" r="1.7" />
        <circle cx="377" cy="206" r="1.4" />
      </g>

      <circle cx="444" cy="168" r="4.5" className="fill-accent" />
      <circle cx="472" cy="196" r="2.4" className="fill-accent" />
      <circle cx="116" cy="214" r="2.4" className="fill-forest" />
    </svg>
  );
}
