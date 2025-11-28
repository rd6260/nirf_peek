import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#e4e4e7",
        card: "#1a1a24",
        primary: {
          DEFAULT: "#a78bfa",
          light: "#c4b5fd",
          dark: "#8b5cf6",
        },
        secondary: {
          DEFAULT: "#818cf8",
          light: "#a5b4fc",
        },
        accent: {
          DEFAULT: "#c4b5fd",
          pink: "#f0abfc",
          blue: "#93c5fd",
          green: "#86efac",
          yellow: "#fde047",
          red: "#fca5a5",
        },
        muted: {
          DEFAULT: "#27273a",
          foreground: "#a1a1aa",
        },
        border: "#27273a",
      },
    },
  },
  plugins: [],
} satisfies Config;