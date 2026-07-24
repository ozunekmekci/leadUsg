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
        display: ["Space Grotesk", "sans-serif"],
        "mono-tech": ["IBM Plex Mono", "monospace"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        clinical: {
          dark: "#090d16",
          primary: "#0f172a",
          teal: "#0284c7",
          cyan: "#06b6d4",
          amber: "#d97706",
          dopplerRed: "#ef4444",
          dopplerBlue: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
