/** Joins class names, dropping falsy values. Keeps component APIs free of class libraries. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
