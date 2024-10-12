import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Image,
} from "@nextui-org/react";
import { Atom, Dna, House, Menu, Search } from "lucide-react"; // oilo
const Nav = () => {
    return (
        <Navbar className="w-full">
            <NavbarBrand>
                <Image src="/Logo.png" alt="Logo is here" height={100} />
                <p className="font-bold text-inherit">Mental.me</p>
            </NavbarBrand>

            <NavbarContent className="gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <div className="rounded-full bg-gray-100 p-1">
                            <Dna
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </div>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" color="foreground">
                        <div className="rounded-full bg-gray-100 p-1">
                            <Image
                                src="/tooth.png"
                                alt="Teeth"
                                height={24}
                                width={24}
                            />
                        </div>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <div className="rounded-full bg-gray-100 p-1">
                            <House
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </div>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <div className="rounded-full bg-gray-100 p-1">
                            <Atom
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </div>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link href="#">
                        <div className="rounded-full bg-gray-100 p-1">
                            <Search
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </div>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#">
                        <div className="rounded-full bg-gray-100 p-1">
                            <Menu
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </div>
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
