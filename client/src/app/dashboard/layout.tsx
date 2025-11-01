"use client";

import React, { useState } from "react";
import NavBar from "@/components/dashboard/nav-bar";
import LeftSidebar from "@/components/dashboard/left-sidebar";
import WithAuth from "@/components/auth/withAuth";

function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <WithAuth>
            <div className="bg-background h-dvh flex flex-col overflow-hidden">
                <header className="flex justify-between">
                    <NavBar onMenuToggle={handleMenuToggle} />
                </header>
                <div className="flex flex-row h-[calc(100vh-4rem)] relative">
                    <div className="sidebar-container">
                        <LeftSidebar
                            isOpen={isSidebarOpen}
                            onClose={handleSidebarClose}
                        />
                    </div>
                    <main className="flex-grow overflow-y-auto md:ml-0">
                        <div className="flex">
                            <main className="flex-1 overflow-y-auto p-4 sm:p-7">
                                {children}
                            </main>
                        </div>
                    </main>
                </div>
            </div>
        </WithAuth>
    );
}

export default DashboardLayout;
