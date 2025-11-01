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
            defaultTheme: "light",
            themes: {
                light: {
                    layout: {
                        radius: {
                            small: "0.22rem",
                            medium: "0.44rem",
                            large: "0.66rem",
                        },
                    },
                    colors: {
                        background: "#ffffff",
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
                            DEFAULT: "#ffffff",
                            foreground: "#000000",
                            100: "#f9fafb",
                            200: "#f3f4f6",
                            300: "#e5e7eb",
                            400: "#d1d5db",
                            500: "#9ca3af",
                        },
                        warning: {
                            DEFAULT: "#e2a84b",
                            foreground: "#1d2129",
                            100: "#fef3c7",
                        },
                        danger: {
                            100: "#fee2e2",
                            500: "#f37877",
                        },
                    },
                },
            },
        }),
    ],
};

export default config;
