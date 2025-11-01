import React from "react";
import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <Navbar
            maxWidth="xl"
            classNames={{
                base: "w-full py-3 bg-transparent",
                wrapper: "max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8",
            }}
            isBlurred={false}
        >
            <NavbarBrand className="gap-2">
                <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg shadow-lg">
                        <Image
                            src="/Logo.png"
                            alt="Doctein Logo"
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-lg"
                        />
                    </div>
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Doctein
                    </Link>
                </div>
            </NavbarBrand>
            <NavbarContent className="hidden md:flex gap-6" justify="center">
                <NavbarItem>
                    <Link 
                        href="#features" 
                        className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link 
                        href="#testimonials" 
                        className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Testimonials
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link 
                        href="#pricing" 
                        className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Pricing
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link 
                        href="#faq" 
                        className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        FAQ
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="gap-3">
                <NavbarItem className="hidden sm:flex">
                    <Button
                        onClick={() => router.push("/auth/login")}
                        variant="bordered"
                        className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                    >
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        onClick={() => router.push("/auth/register")}
                        className="bg-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium px-6"
                    >
                        Get Started
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
