import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-small font-semibold transition duration-fast ease-out";

const variants = {
  primary:
    "border-forest bg-forest text-paper hover:border-forest-deep hover:bg-forest-deep",
  secondary:
    "border-line-strong bg-transparent text-ink hover:border-forest hover:bg-paper-deep",
  inverse:
    "border-paper bg-paper text-forest hover:border-gold hover:bg-gold hover:text-forest-deep",
  outlineInverse:
    "border-line-strong bg-transparent text-paper hover:border-paper hover:bg-forest-deep",
} as const;

export type ButtonVariant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  variant = "primary",
  className,
  children,
  onClick,
  disabled,
}: {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
