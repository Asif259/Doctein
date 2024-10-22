import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        text: "var(--text-color)",
        disabled: "var(--disabled-color)",
        danger: {
          100: colors.red[100],
          200: colors.red[200],
          300: colors.red[300],
          400: colors.red[400],
          500: colors.red[500],
          600: colors.red[600],
          700: colors.red[700],
          800: colors.red[800],
          900: colors.red[900],
        },
        btn: {
          bg: "var(--button-background)",
          text: "var(--button-text)",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
