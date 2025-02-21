import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#138141",
          dark: "#0e6332",
          light: "#1a9f50",
        },
        accent: {
          DEFAULT: "#ff5e3d",
          dark: "#e54b2a",
          light: "#ff745c",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "word-rotate": {
          "0%, 20%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          "24%, 25%": {
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "26%, 45%": {
            transform: "translateY(-100%)",
            opacity: "1"
          },
          "49%, 50%": {
            transform: "translateY(-200%)",
            opacity: "0"
          },
          "51%, 70%": {
            transform: "translateY(-200%)",
            opacity: "1"
          },
          "74%, 75%": {
            transform: "translateY(-300%)",
            opacity: "0"
          },
          "76%, 95%": {
            transform: "translateY(-300%)",
            opacity: "1"
          },
          "99%": {
            transform: "translateY(-400%)",
            opacity: "0"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          }
        }
      },
      animation: {
        "slide-in": "slide-in 0.6s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        "word-rotate": "word-rotate 8s steps(1) infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
