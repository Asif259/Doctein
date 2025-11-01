"use client";

import React from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import {
    Calendar,
    CircleUserIcon,
    Home,
    LogOut,
    Pill,
    UserPlus,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/api/api";

interface LeftSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

function LeftSidebar({ isOpen = true, onClose }: LeftSidebarProps) {
    const currentPath = usePathname();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (!res?.success) return;
            console.log(res?.message);
            router.push("/auth/login");
        } catch (error) {
            console.error("Error logging out user:", error);
        }
    };

    // Close sidebar when clicking outside on mobile
    React.useEffect(() => {
        if (isOpen && window.innerWidth < 640) {
            const handleClickOutside = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (
                    !target.closest(".sidebar-container") &&
                    !target.closest('[aria-label*="menu"]')
                ) {
                    onClose?.();
                }
            };
            document.addEventListener("click", handleClickOutside);
            return () =>
                document.removeEventListener("click", handleClickOutside);
        }
    }, [isOpen, onClose]);

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}
            <Navbar
                classNames={{
                    base: `fixed md:static w-64 h-full shadow-md bg-white z-50 transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`,
                    wrapper: "flex flex-col items-between h-full",
                    brand: "flex-grow-0 items-center justify-start h-16",
                    content: "flex flex-col w-full",
                    item: "w-full",
                }}
            >
                {/* Mobile close button */}
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <NavbarContent className="mt-4 items-start">
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Dashboard
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard/patients"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard/patients"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <Users className="w-5 h-5 mr-2" />
                            Patients
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard/appointments"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard/appointments"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Appointments
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard/prescription"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard/prescription"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <Pill className="w-5 h-5 mr-2" />
                            Prescription App
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard/staffs"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard/staffs"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Staffs
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="p-0">
                        <Link
                            color="foreground"
                            href="/dashboard/profile"
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                                currentPath === "/dashboard/profile"
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                        >
                            <CircleUserIcon className="w-5 h-5 mr-2" />
                            Profile
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="mb-4 !flex-grow-0 h-fit w-full">
                    <NavbarItem className="p-0">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 rounded border border-red-500 text-red-600 bg-transparent hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}

export default LeftSidebar;
