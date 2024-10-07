import React from "react";
import { Metadata } from "next";
import NavBar from "@/components/dashboard/nav-bar";
import LeftSidebar from "@/components/dashboard/left-sidebar";
import WithAuth from "@/components/auth/withAuth";

export const metadata: Metadata = {
  title: "Dashboard | Dochub",
  description: "Coming soon",
};

function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <WithAuth>
      <div className="h-dvh flex flex-col">
        <header className="bg-primary-900 text-white h-[9dvh] flex justify-between">
          <NavBar />
        </header>
        <div className="flex flex-row h-[91dvh]">
          <LeftSidebar />
          <main className="flex-grow overflow-y-scroll bg-secondary-200">
            <div className="flex">
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </main>
        </div>
      </div>
    </WithAuth>
  );
}

export default DashboardLayout;
