import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn("h-px w-8", tone === "dark" ? "bg-gold" : "bg-accent")}
      />
      <p
        className={cn(
          "text-caption font-semibold uppercase",
          tone === "dark" ? "text-gold" : "text-accent",
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-measure", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          "text-h2 font-medium",
          eyebrow ? "mt-4" : "",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-measure text-lead",
            tone === "dark" ? "text-paper-muted" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
