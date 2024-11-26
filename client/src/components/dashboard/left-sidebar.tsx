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
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/api/api";

function LeftSidebar() {
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
    return (
        <Navbar
            classNames={{
                base: "w-64 h-full shadow-md",
                wrapper: "flex flex-col items-between h-full",
                brand: "flex-grow-0 items-center justify-start h-16",
                content: "flex flex-col w-full",
                item: "flex items-center w-full px-4 py-2 mb-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded",
            }}
        >
            <NavbarContent className="mt-4 items-start">
                <NavbarItem
                    className={`${currentPath === "/dashboard" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard"
                        className="flex items-center"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem
                    className={`${currentPath === "/dashboard/patients" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard/patients"
                        className="flex items-center"
                    >
                        <Users className="w-5 h-5 mr-2" />
                        Patients
                    </Link>
                </NavbarItem>
                <NavbarItem
                    className={`${currentPath === "/dashboard/appointments" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard/appointments"
                        className="flex items-center"
                    >
                        <Calendar className="w-5 h-5 mr-2" />
                        Appointments
                    </Link>
                </NavbarItem>
                <NavbarItem
                    className={`${currentPath === "/dashboard/prescription" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard/prescription"
                        className="flex items-center"
                    >
                        <Pill className="w-5 h-5 mr-2" />
                        Prescription App
                    </Link>
                </NavbarItem>
                <NavbarItem
                    className={`${currentPath === "/dashboard/staffs" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard/staffs"
                        className="flex items-center"
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Staffs
                    </Link>
                </NavbarItem>
                <NavbarItem
                    className={`${currentPath === "/dashboard/profile" ? "bg-gray-700 text-white" : ""}`}
                >
                    <Link
                        color="foreground"
                        href="/dashboard/profile"
                        className="flex items-center"
                    >
                        <CircleUserIcon className="w-5 h-5 mr-2" />
                        Profile
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent
                onClick={handleLogout}
                className="mb-4 !flex-grow-0 h-fit w-full cursor-pointer"
            >
                <NavbarItem className="text-red-600 hover:bg-red-500 border-danger-600 hover:text-white">
                    <span color="danger" className="flex items-center">
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </span>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default LeftSidebar;
