import { cn } from "@/lib/cn";

export type IconName =
  | "flame"
  | "chat-repeated"
  | "smear"
  | "mask"
  | "secret"
  | "trap"
  | "door"
  | "eye"
  | "menu"
  | "close"
  | "arrow-right"
  | "check"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  flame: (
    <>
      <path d="M13 3c.8 3.4 4.5 5.2 4.5 9.5a5.5 5.5 0 0 1-11 0c0-2.2 1.1-3.8 2.6-5.2.4 1.5 1 2.3 2 2.8C10.8 7.5 11.5 5.4 13 3Z" />
      <path d="M11 16.5c-1.2-.8-1.6-2-1.4-3.2" />
    </>
  ),
  "chat-repeated": (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h6A2.5 2.5 0 0 1 15 6.5v3a2.5 2.5 0 0 1-2.5 2.5H9l-3.2 2.5V12H6.5A2.5 2.5 0 0 1 4 9.5v-3Z" />
      <path d="M17.5 9H18a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 18 17h-.4v2.6L14.8 17H12a2.5 2.5 0 0 1-2.4-1.8" />
    </>
  ),
  smear: (
    <>
      <path d="M12 3.5c2.8 3.8 5.5 6.2 5.5 9.4a5.5 5.5 0 0 1-11 0c0-3.2 2.7-5.6 5.5-9.4Z" />
      <path d="M4.5 4.5h.01M19 4h.01M20 7.5h.01M4 8h.01" />
    </>
  ),
  mask: (
    <>
      <path d="M4.5 5.5c2.5 1.4 5 1.4 7.5 0 2.5 1.4 5 1.4 7.5 0v6.8a7.5 7.5 0 0 1-15 0V5.5Z" />
      <path d="M8.5 10.5h.01M15.5 10.5h.01M9.5 15c1.7 1.1 3.3 1.1 5 0" />
    </>
  ),
  secret: (
    <>
      <path d="M3.5 8.5 12 3l8.5 5.5v10a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-10Z" />
      <path d="m4 8 8 5.5L20 8" />
      <path d="M12 13.2v2.2" />
    </>
  ),
  trap: (
    <>
      <path d="M12 3v9a5 5 0 0 0 10 0v-2" />
      <path d="m9 5.8 3-2.8 3 2.8M22 8.8l-2.5 2.6L17 9" />
    </>
  ),
  door: (
    <>
      <path d="M13.5 4H5v16h8.5" />
      <path d="M9 12h11M16.5 8.5 20 12l-3.5 3.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.8 12S6.3 5.8 12 5.8 21.2 12 21.2 12 17.7 18.2 12 18.2 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "arrow-right": <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />,
  check: <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({
  name,
  className,
  label,
}: {
  name: IconName;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn("h-6 w-6 shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
