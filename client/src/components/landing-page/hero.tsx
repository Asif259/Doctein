import React from "react";
import { Button } from "@nextui-org/react";

function HeroSection() {
    return (
        <div className="flex flex-col gap-10 justify-center items-center min-h-[500px] h-[60vh] mx-4 rounded-3xl bg-black">
            <div className="text-center space-y-5 mt-12 max-w-2xl">
                <p className="text-5xl font-medium text-white">
                    Simplify your medical needs
                </p>
                <p className="text-foreground-400 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Architecto aspernatur at ea illum, impedit inventore
                </p>
                <div className="flex justify-center space-x-4">
                    <Button color="primary" className="font-medium">
                        Get Started
                    </Button>
                    <Button className="font-medium">Learn More</Button>
                </div>
            </div>
            <div className="bg-primary-200 size-[900px] rounded-t-3xl"></div>
        </div>
    );
}

export default HeroSection;
