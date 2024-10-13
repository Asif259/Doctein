"use client";

import Nav from "@/components/landing-page/nav";
import CardLeft from "@/components/landing-page/card-left";
import Footer from "@/components/landing-page/footer";
import { Avatar, Button } from "@nextui-org/react";
import {
    ArrowRight,
    CalendarDays,
    CircleUserRound,
    Clock,
    LeafyGreen,
    LifeBuoy,
    Play,
    Radar,
} from "lucide-react";
import React, { ReactNode } from "react";
function CircleIconWhite({ children }: { children: ReactNode }) {
    return (
        <div className={`rounded-full bg-white m-1 p-2 border-1 `}>
            {children}
        </div>
    );
}
function CircleIconBlack({ children }: { children: ReactNode }) {
    return (
        <div
            className={
                "rounded-full p-16 flex justify-center items-center bg-white m-6"
            }
        >
            <Button className={`rounded-full bg-black `} isIconOnly size={"lg"}>
                {children}
            </Button>
        </div>
    );
}
export default function Component() {
    return (
        <>
            <Nav />
            <main className="min-h-screen  relative overflow-hidden pt-4">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-76px)] relative z-1 px-4 ">
                    <span className="text-2xl md:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                        High Quality Checkup
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Makes You Healthy
                    </span>
                    <div className="flex gap-1 ">
                        <Avatar
                            icon={<CircleUserRound absoluteStrokeWidth />}
                            size="md"
                        />
                        <Avatar
                            icon={<LeafyGreen absoluteStrokeWidth />}
                            size="md"
                        />
                        <Avatar
                            icon={<Radar absoluteStrokeWidth />}
                            size="md"
                        />
                        <Avatar name="Tue" size="md" className={"text-black"} />
                    </div>
                    <div className="cards flex flex-row items-center justify-center w-full min">
                        <CardLeft />
                    </div>

                    <div className="flex gap-4 m-2 w-full max-w-lg ">
                        <Button
                            startContent={
                                <CircleIconWhite>
                                    <CalendarDays size={16} />
                                </CircleIconWhite>
                            }
                            className="flex-1 bg-gray-200"
                        >
                            Tuesday, 1 Jun 24
                        </Button>
                        <Button
                            startContent={
                                <CircleIconWhite>
                                    <Clock size={16} />
                                </CircleIconWhite>
                            }
                            className="flex-1 bg-gray-200 mx-w-sm"
                        >
                            8am
                        </Button>
                        <Button className={"bg-gray-900"}>
                            <span className={"text-white"}>Guides</span>
                            <CircleIconWhite>
                                <ArrowRight size={12} />
                            </CircleIconWhite>
                        </Button>
                    </div>
                    <Button
                        className={
                            "bg-transparent border-1 border-green-400 mt-4"
                        }
                        size="lg"
                        startContent={
                            <CircleIconWhite>
                                <LifeBuoy size={24} />
                            </CircleIconWhite>
                        }
                    >
                        Reserve A Checkup
                    </Button>
                    <CircleIconBlack>
                        <Play
                            size={24}
                            color="#ffffff"
                            strokeWidth={3}
                            absoluteStrokeWidth
                        />
                    </CircleIconBlack>
                </div>
            </main>
            <Footer />
        </>
    );
}
