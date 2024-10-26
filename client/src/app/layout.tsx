import type { Metadata } from "next";
import { inter, robotoMono } from "@/app/fonts";
import "./globals.css";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Landing page | Dochub",
    description: "Coming soon",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <Toaster position="bottom-right" />
        <NextUIProvider>
          <main className="dark text-foreground bg-background">{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}
