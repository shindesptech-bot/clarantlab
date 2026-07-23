import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color tokens — map to CSS variables ───────────────────────────────
      colors: {
        bg: {
          0: "var(--bg-0)",
          1: "var(--bg-1)",
          2: "var(--bg-2)",
          3: "var(--bg-3)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          dim: "var(--fg-dim)",
          faint: "var(--fg-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          line: "var(--accent-line)",
          deep: "var(--accent-deep)",
        },
        good: "var(--good)",
        // ShadCN compatibility tokens
        background: "var(--bg-0)",
        foreground: "var(--fg)",
        border: "var(--line)",
        input: "var(--line-strong)",
        ring: "var(--accent)",
        primary: { DEFAULT: "var(--accent)", foreground: "#0a0a0a" },
        secondary: { DEFAULT: "var(--bg-2)", foreground: "var(--fg)" },
        muted: { DEFAULT: "var(--bg-2)", foreground: "var(--fg-dim)" },
        destructive: { DEFAULT: "#ff5555", foreground: "var(--fg)" },
        popover: { DEFAULT: "var(--bg-1)", foreground: "var(--fg)" },
        card: { DEFAULT: "var(--bg-1)", foreground: "var(--fg)" },
      },

      // ─── Typography — LOCKED (Space Grotesk display, Inter body) ────────────
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "22px",
        "2xl": "28px",
        "3xl": "36px",
        "4xl": "48px",
        "5xl": "64px",
        "6xl": "88px",
      },

      // ─── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "18px",
        xl: "24px",
        full: "9999px",
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      maxWidth: {
        site: "1280px",
      },

      // ─── Motion durations ──────────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        reveal: "700ms",
      },

      // ─── Keyframes ─────────────────────────────────────────────────────────
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        "bar-fill": {
          from: { width: "0%" },
          to: { width: "var(--bar-width)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1s steps(2) infinite",
        "reveal-up": "reveal-up 700ms ease forwards",
        "fade-in": "fade-in 300ms ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
