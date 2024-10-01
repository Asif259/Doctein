import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
};
export default config;
