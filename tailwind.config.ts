import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background": "url('/assets/oppenheimer.jpeg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        redButton: "var(--main-button)",
        hoverRedBtn: "var(--hover-red-btn)",
        hoverDarkBtn: "var(--hover-dark-btn)",
        overlay: "var(--overlay)",
      },
    },
    screens: {
      xs: "400px",
    },
  },
  plugins: [],
} satisfies Config;
