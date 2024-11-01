import React from "react";
import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <Navbar
            classNames={{
                base: "w-full py-2",
                wrapper: "max-w-full flex justify-around items-center",
            }}
        >
            <NavbarBrand>
                <SettingsIcon className="size-10 bg-black rounded-full text-white p-2" />
                <p className="ml-2 font-me text-2xl">Docten</p>
            </NavbarBrand>
            <NavbarContent className="gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" color="foreground">
                        Solutions
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Resources
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Pricing
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        onClick={() => router.push("/auth/login")}
                        variant="bordered"
                        className="rounded-lg hover:bg-gray-200"
                    >
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        variant="solid"
                        className="bg-black text-white rounded-lg hover:bg-gray-900"
                    >
                        Get Started
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
