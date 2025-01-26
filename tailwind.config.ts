import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
        darkBtn: "var(--dark-btn)",
        purpleButton: "var(--secondary-button)",
        hoverRedBtn: "var(--hover-red-btn)",
        hoverPurpleBtn: "var(--hover-purple-btn)",
        hoverDarkBtn: "var(--hover-dark-btn)",
        overlay: "var(--overlay)",
        bgDark: "var(--bg-dark)",
        headerBg: "var(--header-bg)",
        textCol: "var(--text-main)",
        userCard: "var(--user-card)",
        profileBg: "var(--profile-bg)",
        inputCol: "var(--input-col)",
        btnBg: "var(--btn-bg)",
        btnCol: "var(--btn-col)",
        footerBg: "var(--footer-bg)",
        bgAuth: "var(--bg-auth)",
        authForm: "var(--auth-form)",
      },
      boxShadow: {
        "custom-inner": "var(--inner-box-shadow)",
      },
      animation: {
        "custom-spin": "spin 0.8s linear infinite",
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
