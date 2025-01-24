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
      boxShadow: {
        // "custom-inner": "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.06)",
        "custom-inner": "var(--inner-box-shadow)",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
  },
  plugins: [],
} satisfies Config;
