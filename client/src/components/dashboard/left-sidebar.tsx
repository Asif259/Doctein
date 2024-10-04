import React from "react";
import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Calendar, Home, LogOut, Pill, Settings, Users } from "lucide-react";

function LeftSidebar() {
  return (
    <Navbar
      classNames={{
        base: "w-64 h-full bg-white shadow-md",
        wrapper: "flex flex-col items-between h-full",
        brand: "flex-grow-0 items-center justify-start h-16",
        content: "flex flex-col",
        item: "flex flex-col",
        menu: "menu-classes", // the one that appears when the menu is open    menuItem: "menu-item-classes",
      }}
    >
      <NavbarContent className="mt-4 items-start">
        <NavbarItem>
          <Link color="foreground" href="#" className="flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Patients
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Appointments
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="flex items-center">
            <Pill className="w-5 h-5 mr-2" />
            Prescriptions
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="mb-4 !flex-grow-0 h-fit">
        <NavbarItem>
          <Link color="danger" href="#" className="flex items-center">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default LeftSidebar;
