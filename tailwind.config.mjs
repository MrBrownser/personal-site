/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        /* Backward compat for components not yet migrated */
        neu: {
          base: "var(--background)",
          "text-primary": "var(--foreground)",
          "text-secondary": "var(--muted-foreground)",
          accent: "var(--primary)",
          "accent-hover": "var(--primary)",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        neu: "12px",
        "neu-lg": "16px",
        "neu-xl": "24px",
      },
      boxShadow: {
        "neu-raised": "var(--neu-raised)",
        "neu-raised-sm": "var(--neu-raised-sm)",
        "neu-inset": "var(--neu-inset)",
        "neu-flat": "var(--neu-flat)",
      },
    },
  },
  plugins: [],
};
