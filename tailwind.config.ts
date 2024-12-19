import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enables class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#D8C4B6", // Default background color
        foreground: "hsl(var(--foreground, 240, 11%, 21%))", // Fallback for variable
        card: {
          DEFAULT: "#D8C4B6",
          foreground: "#1F2937",
        },
        popover: {
          DEFAULT: "#E7CCCC",
          foreground: "hsl(var(--popover-foreground, 0, 0%, 15%))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 210, 100%, 56%))",
          foreground: "hsl(var(--primary-foreground, 0, 0%, 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 162, 100%, 41%))",
          foreground: "hsl(var(--secondary-foreground, 0, 0%, 15%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 210, 16%, 82%))",
          foreground: "hsl(var(--muted-foreground, 0, 0%, 39%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 340, 82%, 52%))",
          foreground: "hsl(var(--accent-foreground, 0, 0%, 100%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 70%, 50%))",
          foreground: "hsl(var(--destructive-foreground, 0, 0%, 100%))",
        },
        border: "hsl(var(--border, 240, 11%, 91%))",
        input: "hsl(var(--input, 0, 0%, 97%))",
        ring: "hsl(var(--ring, 210, 80%, 56%))",
        chart: {
          "1": "hsl(var(--chart-1, 210, 100%, 56%))",
          "2": "hsl(var(--chart-2, 162, 100%, 41%))",
          "3": "hsl(var(--chart-3, 340, 82%, 52%))",
          "4": "hsl(var(--chart-4, 50, 100%, 50%))",
          "5": "hsl(var(--chart-5, 20, 70%, 50%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 12px)",
        md: "calc(var(--radius, 12px) - 2px)",
        sm: "calc(var(--radius, 12px) - 4px)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Adding animate plugin
};

export default config;
