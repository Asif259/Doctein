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
    <div className="h-dvh flex flex-col">
      <header className="bg-secondary h-[8dvh] flex justify-between">
        <NavBar />
      </header>
      <div className="flex flex-row h-[92dvh]">
        <LeftSidebar />
        <main className="flex-grow overflow-y-scroll bg-cyan-300">{children}</main>
      </div>
    </div>
  );
}
