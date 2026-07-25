import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "mono-tech": ['"IBM Plex Mono"', "monospace"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#1A1A1A",
          dark: "#0B0F19",
          teal: "#0D9488",
          "teal-hover": "#0F766E",
          "teal-light": "#CCFBF1",
          gold: "#C5A059",
          "gold-light": "#F5EFE0",
        },
        surface: {
          canvas: "#F9F9F8",
          white: "#FFFFFF",
          cream: "#F3F1ED",
          light: "#F5F5F4",
          warm: "#FAF8F5",
        },
        border: {
          subtle: "#E5E5E0",
          medium: "#D9D9D9",
          strong: "#C5C5C5",
        },
        text: {
          primary: "#1A1A1A",
          body: "#374151",
          muted: "#666666",
          subtle: "#9CA3AF",
        },
        /* Preserve diagnostic overlay colors for product detail HUD */
        clinical: {
          dark: "#0B0F19",
          primary: "#0F172A",
          teal: "#0284c7",
          cyan: "#06B6D4",
          amber: "#D97706",
          dopplerRed: "#EF4444",
          dopplerBlue: "#3B82F6",
        },
      },
      borderRadius: {
        pill: "9999px",
        card: "10px",
        modal: "20px",
      },
      boxShadow: {
        header: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
        "card-rest": "0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 20px 30px -10px rgba(0, 0, 0, 0.08)",
        "card-elevated": "0 25px 40px -12px rgba(0, 0, 0, 0.12)",
        "hero-glow": "0 0 80px 20px rgba(13, 148, 136, 0.08)",
        modal: "0px 4px 20px rgba(0, 0, 0, 0.15)",
      },
      spacing: {
        "section-sm": "3rem",     /* 48px - mobile */
        "section-md": "4rem",     /* 64px - tablet */
        "section-lg": "6rem",     /* 96px - desktop */
        "section-xl": "9rem",     /* 144px - major dividers */
      },
      fontSize: {
        "hero-xl": [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        "hero-lg": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        "section-title": [
          "clamp(1.75rem, 3vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "card-title": [
          "1.25rem",
          { lineHeight: "1.3" },
        ],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.15em" },
        ],
      },
      keyframes: {
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ecgPulse: {
          "0%": { strokeDashoffset: "600" },
          "100%": { strokeDashoffset: "0" },
        },
        sectorSweep: {
          "0%": { transform: "rotate(-35deg)" },
          "50%": { transform: "rotate(35deg)" },
          "100%": { transform: "rotate(-35deg)" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
        ecg: "ecgPulse 3s linear infinite",
        sweep: "sectorSweep 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
