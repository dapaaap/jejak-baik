import { cn } from "@/lib/cn";

const logo = {
  src: "/brand/jejak-baik-logo.png",
  width: 661,
  height: 281,
};

export function Wordmark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt="Jejak Baik"
      width={logo.width}
      height={logo.height}
      className={cn("h-10 w-auto", className)}
    />
  );
}
