import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "icon-sm": "0.75rem",
        "icon-md": "1rem",
        "icon-lg": "1.25rem",
        "icon-xl": "1.5rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#112D4E",
        secondary: "#3F72AF",
        accent: "#DBE2EF",
        neutral: "#F9F7F7",
        danger: "#FF5C58"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
