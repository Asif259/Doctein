import React from "react";
import { Metadata } from "next";
import NavBar from "@/components/dashboard/nav-bar";
import LeftSidebar from "@/components/dashboard/left-sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Dochub",
  description: "Coming soon",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-svh flex flex-col">
      <header className="bg-secondary flex justify-between">
        <NavBar />
      </header>
      <div className="flex flex-row flex-grow">
        <LeftSidebar />
        <main className="flex-grow bg-cyan-300 p-4">{children}</main>
      </div>
    </div>
  );
}
