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
    NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { BiSolidChat } from "react-icons/bi";
import { getUserProfile } from "@/api/api";
import { logoutUser } from "@/api/api";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profile-store";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
    onMenuToggle?: () => void;
}

export default function NavBar({ onMenuToggle }: NavBarProps) {
    const router = useRouter();
    const { Doctor } = useProfileStore((state) => state);
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserProfile();
                if (response?.success && response.data) {
                    setEmail(response.data.email || "");
                    if (response.data.doctor?.name) {
                        setUserName(response.data.doctor.name);
                    } else {
                        // Use email username as fallback
                        const emailUsername =
                            response.data.email?.split("@")[0] || "User";
                        setUserName(emailUsername);
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        })();
    }, [Doctor]);

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res?.success) {
                router.push("/auth/login");
            }
        } catch (error) {
            console.error("Error logging out:", error);
            router.push("/auth/login");
        }
    };

    const getAvatarInitials = () => {
        if (userName) {
            return userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        if (email) {
            return email[0].toUpperCase();
        }
        return "U";
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        if (onMenuToggle) {
            onMenuToggle();
        }
    };

    return (
        <Navbar
            classNames={{
                base: "w-full bg-primary text-white px-2 sm:px-4",
                wrapper: "flex items-center justify-between w-full max-w-full",
            }}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                    onClick={handleMenuToggle}
                />
                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-white/10">
                            <Image
                                src="/Logo.png"
                                alt="Doctein Logo"
                                width={20}
                                height={20}
                                className="w-10 h-10 rounded-lg"
                            />
                        </div>
                        <p className="text-white font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity">
                            Doctein
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent as="div" justify="end" className="gap-2 sm:gap-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    variant="flat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    classNames={{
                        base: "hidden md:block max-w-xs",
                        input: "text-white placeholder:text-white/60",
                        inputWrapper:
                            "bg-white/20 hover:bg-white/30 border-white/20",
                    }}
                />
                <BiSolidChat
                    className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    title="Chat"
                />
                <BsBellFill
                    className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    title="Notifications"
                />
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform hover:scale-110"
                            color="secondary"
                            name={userName || "User"}
                            size="sm"
                            src={Doctor?.profileImage}
                            fallback={getAvatarInitials()}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                            key="profile"
                            className="h-14 gap-2"
                            onClick={() => router.push("/dashboard/profile")}
                        >
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{email || "User"}</p>
                        </DropdownItem>
                        <DropdownItem
                            key="profile-link"
                            onClick={() => router.push("/dashboard/profile")}
                        >
                            My Profile
                        </DropdownItem>
                        <DropdownItem key="settings">Settings</DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onClick={handleLogout}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
