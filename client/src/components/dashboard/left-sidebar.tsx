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
    const res = await logoutUser();
    console.log(res.message);
    router.push("/auth/login");
  };
  return (
    <Navbar
      classNames={{
        base: "w-64 h-full bg-gradient-to-br from-secondary-300 to-secondary-400 shadow-md",
        wrapper: "flex flex-col items-between h-full",
        brand: "flex-grow-0 items-center justify-start h-16",
        content: "flex flex-col w-full",
        item: "flex flex-col border-1 border-secondary-900 px-3 py-2 w-full rounded-full hover:bg-secondary-300",
      }}
    >
      <NavbarContent className="mt-4 items-start">
        <NavbarItem
          className={`${currentPath === "/dashboard" ? "bg-gradient-to-br from-secondary-800 to-secondary-900 text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
          className={`${currentPath === "/dashboard/patients" ? "bg-gradient-to-l from-secondary-600 to-secondary-900 text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
          className={`${currentPath === "/dashboard/appointments" ? "bg-gradient-to-l from-secondary-600 to-secondary-900  text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
          className={`${currentPath === "/dashboard/prescription" ? "bg-gradient-to-l from-secondary-600 to-secondary-900  text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
          className={`${currentPath === "/dashboard/staffs" ? "bg-gradient-to-l from-secondary-600 to-secondary-900  text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
          className={`${currentPath === "/dashboard/profile" ? "bg-gradient-to-l from-secondary-600 to-secondary-900  text-white hover:bg-opacity-90 hover:bg-gradient-to-r" : ""}`}
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
      <NavbarContent className="mb-4 !flex-grow-0 h-fit w-full">
        <NavbarItem className="text-red-600 hover:bg-red-500 border-danger-600 hover:text-white">
          <span
            onClick={handleLogout}
            color="danger"
            className="flex items-center cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </span>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default LeftSidebar;
