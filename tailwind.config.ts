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
        "circle-background": "var(--circle-gradient)",
        "bg-gradient": "var(--bg-gradient)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        redButton: "var(--main-button)",
        purpleButton: "var(--secondary-button)",
        hoverRedBtn: "var(--hover-red-btn)",
        hoverPurpleBtn: "var(--hover-purple-btn)",
        hoverDarkBtn: "var(--hover-dark-btn)",
        overlay: "var(--overlay)",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
    },
  },
  plugins: [],
} satisfies Config;
