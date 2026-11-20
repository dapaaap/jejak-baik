import type { Config } from "tailwindcss";

// Every value points at a CSS variable in src/styles/tokens.css.
// Components use these names, never raw hex values or pixel values.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-deep": "var(--color-paper-deep)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-soft": "var(--color-ink-soft)",
        "paper-muted": "var(--color-paper-muted)",
        forest: "var(--color-forest)",
        "forest-deep": "var(--color-forest-deep)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        "accent-tint": "var(--color-accent-tint)",
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        focus: "var(--color-focus)",
        "focus-inverse": "var(--color-focus-inverse)",
        gold: "var(--color-gold)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
      },
      fontSize: {
        display: [
          "var(--text-display)",
          { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" },
        ],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-h1)", letterSpacing: "var(--tracking-h1)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-h2)", letterSpacing: "var(--tracking-h2)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-h3)" }],
        lead: ["var(--text-lead)", { lineHeight: "var(--leading-lead)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        small: ["var(--text-small)", { lineHeight: "var(--leading-small)" }],
        caption: [
          "var(--text-caption)",
          { lineHeight: "var(--leading-caption)", letterSpacing: "var(--tracking-caption)" },
        ],
      },
      spacing: {
        gutter: "var(--space-gutter)",
        section: "var(--space-section)",
        stack: "var(--space-stack)",
        tight: "var(--space-tight)",
      },
      maxWidth: {
        container: "var(--container-max)",
        measure: "var(--measure)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        panel: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise var(--duration-slow) var(--ease-out) both",
        panel: "panel var(--duration-base) var(--ease-out) both",
      },
    },
  },
  plugins: [],
};

export default config;
