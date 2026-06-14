import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lantern: {
          black: "#0a0a0a",
          dark: "#121212",
          gray: "#1a1a1a",
          muted: "#2a2a2a",
          border: "#333333",
          text: "#e5e5e5",
          "muted-text": "#888888",
          accent: "#f5c542",
          "accent-dim": "rgba(245, 197, 66, 0.15)",
          red: "#dc2626",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "Fira Code", "monospace"],
      },
      animation: {
        "ticker-scroll": "ticker-scroll 40s linear infinite",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
