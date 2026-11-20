import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-accent bg-accent-tint px-2.5 py-1 text-caption font-semibold uppercase text-accent-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
