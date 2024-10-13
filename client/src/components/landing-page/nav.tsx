import React, { ReactNode } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Tooltip,
    Button,
    Image,
} from "@nextui-org/react";
function CircleIconGray({
    children,
    content,
}: {
    children: ReactNode;
    content: String;
}) {
    return (
        <Tooltip content={content}>
            <Button
                isIconOnly
                className={"rounded-full bg-gray-200 m-1 p-2 border-1"}
            >
                {children}
            </Button>
        </Tooltip>
    );
}
import { Atom, Baby, Dna, House, Menu, Pill, Search } from "lucide-react"; // oilo
const Nav = () => {
    return (
        <Navbar className="w-full ">
            <NavbarBrand>
                <Image src="/Logo.png" alt="Logo is here" height={50} />
                <p className="font-bold text-inherit">Mental.me</p>
            </NavbarBrand>

            <NavbarContent className="gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <CircleIconGray content={"Prescription"}>
                            <Pill
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" color="foreground">
                        <CircleIconGray content={""}>
                            <Image
                                src="/tooth.png"
                                alt="Teeth"
                                height={24}
                                width={24}
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <CircleIconGray content={"Dashboard"}>
                            <House
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <CircleIconGray content={""}>
                            <Atom
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link href="#">
                        <CircleIconGray content={"Search"}>
                            <Search
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#">
                        <CircleIconGray content={"Menu"}>
                            <Menu
                                color="#000000"
                                strokeWidth={1.75}
                                absoluteStrokeWidth
                            />
                        </CircleIconGray>
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
