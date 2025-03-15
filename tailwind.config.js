import { heroui } from "@heroui/theme"; // Use ES Module import

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        brightness: "brightness 2.2s linear infinite",
      },
      keyframes: {
        brightness: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0.2,
          },
          "50%": {
            transform: "translateX(100%)",
            opacity: 0.8,
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: 0.2,
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()], // Use the imported function directly
};

export default config; // Use ES Module export