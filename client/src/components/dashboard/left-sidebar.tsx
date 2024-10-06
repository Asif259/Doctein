"use client";

import React from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import {
  Calendar,
  CircleUserIcon,
  Home,
  LogOut,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftSidebar() {
  const currentPath = usePathname();
  return (
    <Navbar
      classNames={{
        base: "w-64 h-full bg-gradient-to-br from-secondary-300 to-secondary-400 shadow-md",
        wrapper: "flex flex-col items-between h-full",
        brand: "flex-grow-0 items-center justify-start h-16",
        content: "flex flex-col w-full",
        item: "flex flex-col border-1 border-secondary-900 p-2 w-full rounded-md hover:bg-secondary-300",
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
          <Link href="#" className="flex items-center">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default LeftSidebar;
