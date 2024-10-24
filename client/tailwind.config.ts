import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    nextui({
      prefix: "tw-",
      defaultTheme: "dark",
      themes: {
        light: {},
        dark: {
          // colors: {
          //   primary: {
          //     DEFAULT: "#24ae7c",
          //     foreground: "#fff",
          //   },
          //   secondary: {
          //     100: "#70a8db",
          //     500: "#152432",
          //   },
          //   neutral: "#abb7c4",
          //   warning: "#ffd147",
          //   disabled: "var(--disabled-color)",
          //   danger: {
          //     100: "#3e1716",
          //     500: "#f37877",
          //   },
          //   btn: {
          //     light: "var(--button-background)",
          //     text: "var(--button-text)",
          //   },
          // },
        },
      },
    }),
  ],
};

export default config;
