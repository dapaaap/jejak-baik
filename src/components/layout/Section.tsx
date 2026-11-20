import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  paper: "",
  sand: "bg-paper-deep",
  forest: "on-dark bg-forest text-paper",
  deep: "on-dark bg-forest-deep text-paper",
  accent: "on-dark bg-accent text-paper",
} as const;

export function Section({
  id,
  labelledBy,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-section", tones[tone], className)}
    >
      {children}
    </section>
  );
}
