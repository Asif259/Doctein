import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
        nextui({
            prefix: "tw-",
            defaultTheme: "dark",
            themes: {
                light: {
                    layout: {},
                    colors: {
                        background: "#f9f9f9",
                    },
                },
                dark: {
                    layout: {
                        radius: {
                            small: "0.22rem",
                            medium: "0.44rem",
                            large: "0.66rem",
                        },
                    },
                    colors: {
                        background: "#1d2129",
                        primary: {
                            DEFAULT: "#24ae7c",
                            foreground: "#fff",
                        },
                        secondary: {
                            //blue
                            DEFAULT: "#152432",
                            foreground: "#79b5ec",
                            100: "#79b5ec",
                        },
                        default: {
                            DEFAULT: "#1d2129",
                            foreground: "#fff",
                            100: "#292f3a",
                            200: "#3f3f46",
                            300: "#abb7c4",
                            400: "#5f6872",
                            500: "#1a1d21",
                        },
                        warning: {
                            DEFAULT: "#e2a84b",
                            foreground: "#1d2129",
                            100: "#383e47",
                        },
                        danger: {
                            100: "#3e1716",
                            500: "#f37877",
                        },
                    },
                },
            },
        }),
    ],
};

export default config;
