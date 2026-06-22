import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3effe",
          100: "#dfd4f5",
          200: "#c0a8e8",
          300: "#9b7dd4",
          400: "#7a57c0",
          500: "#6040a8",
          600: "#4E2F8E",
          700: "#3e2776",
          800: "#321f5e",
          900: "#251645",
          950: "#1a0f30",
        },
      },
      boxShadow: {
        brand: "0 4px 24px rgba(78,47,142,0.08)",
        "brand-lg": "0 16px 60px rgba(78,47,142,0.14)",
      },
      fontFamily: {
        display: ["Lora", "serif"],
        sans: ["Cabinet Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
