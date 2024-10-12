"use client";

import {
    Button,
    Card,
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
    Avatar,
    CardHeader,
    Divider,
    CardBody,
    Image,
    Link,
    User,
} from "@nextui-org/react";
import {
    Home,
    User2,
    X,
    Search,
    Menu,
    Heart,
    Calendar,
    Clock,
    ArrowRight,
    Play,
} from "lucide-react";
import { CardFooter } from "@nextui-org/card";

export default function Component() {
    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            <Navbar isBordered={false} className="bg-transparent z-10">
                <NavbarBrand>
                    <span className="font-bold text-xl">Mental.me</span>
                </NavbarBrand>
                <NavbarContent>
                    {[Home, User2, X, Search, Menu].map((Icon, index) => (
                        <NavbarItem key={index}>
                            <Icon size={20} />
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </Navbar>

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-76px)] relative z-1 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                    High Quality Checkup
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Makes You Healthy
                </h2>

                <div className="flex gap-4 mb-8">
                    <Avatar src="/logo.png" size="lg" />
                    <Avatar name="🌾" size="lg" />
                    <Avatar icon={<Heart size={20} />} size="lg" />
                    <Avatar name="Tue" size="lg" />
                </div>

                {/*card here*/}
                <Card className="mb-8 w-full max-w-md p-4">
                    <CardHeader className="flex justify-between items-center ">
                        <span className="text-black ">Patients History</span>
                        <Button size="sm" color="warning">
                            +15%
                        </Button>
                    </CardHeader>
                    <CardBody
                        className={
                            "card-body flex-row justify-between items-center text-center"
                        }
                    >
                        <div className="inline-block user">
                            <User
                                className={"text-black"}
                                name={"Sumit mia"}
                                description={"saibo da doctor dayo"}
                                avatarProps={{
                                    src: "/Sumit.png",
                                }}
                            />
                        </div>
                        <span className="text-sm">7d</span>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between  ">
                        <span className="flex items-center justify-between  ">
                            <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1 border-hidden">
                                <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                            </div>
                            <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1">
                                <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                            </div>
                            <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1 border-hidden">
                                <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                            </div>
                        </span>

                        <span className="text-black text-4xl">+10.57</span>
                    </CardFooter>
                </Card>
                <Card className="max-w-md w-full mb-8 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Patient's History</span>
                        <Button size="sm" color="warning">
                            + 15%
                        </Button>
                    </div>
                    <div className="flex items-center mb-4">
                        <Avatar
                            src="/placeholder.svg?height=40&width=40"
                            size="lg"
                            className="mr-4"
                        />
                        <div>
                            <p className="font-bold">Brian</p>
                            <p className="text-sm">19 y.o (Male)</p>
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-4">+10.57</p>
                    <div className="flex items-center">
                        <Heart size={20} />
                        <span className="ml-2 text-sm">
                            Heart Beep (88 bpm)
                        </span>
                    </div>
                </Card>

                <div className="flex gap-4 mb-8 w-full max-w-md">
                    <Button
                        startContent={<Calendar size={18} />}
                        className="flex-1"
                    >
                        Tuesday, 1 Jun 24
                    </Button>
                    <Button
                        startContent={<Clock size={18} />}
                        className="flex-1"
                    >
                        8am
                    </Button>
                    <Button>
                        Guides <ArrowRight size={18} />
                    </Button>
                </div>

                <Button size="lg" startContent={<Play size={18} />}>
                    Reserve A Checkup
                </Button>
            </main>

            <div className="absolute bottom-0 left-0 w-full h-3/5 bg-blue-50 rounded-t-full -z-10" />

            <footer className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-gray-500">
                <span>306 Chapmans Lane San Ysidro, NM 87053</span>
                <span>All rights reserved</span>
            </footer>
        </div>
    );
}
