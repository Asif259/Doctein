"use client";

import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react";
import React from "react";
import { BsBellFill } from "react-icons/bs";
import { BiSolidChat } from "react-icons/bi";

export default function NavBar() {
    return (
        <Navbar
            classNames={{
                base: "w-full bg-secondary text-white px-6",
                wrapper: "flex mx-auto items-center justify-between w-full",
            }}
        >
            <NavbarBrand>
                <p className="text-white animate-pulse font-bold text-xl">
                    Dochub
                </p>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                <Input
                    type="text"
                    placeholder="Search..."
                    variant="flat"
                    className="px-4 py-2 focus:outline-none focus:ring-2"
                    onChange={(e) => console.log(e.target.value)}
                />
                <BiSolidChat className="text-2xl cursor-pointer" />
                <BsBellFill className="text-2xl cursor-pointer" />
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">Settings</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
