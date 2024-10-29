import {nextui} from "@nextui-org/react";
import type {Config} from "tailwindcss";

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
                    layout: {},
                    colors: {
                        background: "#1d2129",
                        primary: {
                            DEFAULT: "#24ae7c",
                            foreground: "#fff",
                        },
                        secondary: {
                            DEFAULT: "#152432",
                            foreground: "#70a8db",
                        },
                        default: {
                            DEFAULT: "#1d2129",
                            foreground: "#fff",
                            200: "#3f3f46",
                            300: "#abb7c4",
                            400: "#5f6872",
                            500: "#1a1d21",
                        },
                        warning: {
                            DEFAULT: "#3e1716",
                            foreground: "#f37877",
                            100: "#383e47"
                        },
                        disabled: "var(--disabled-color)",
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
