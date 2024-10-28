import React from "react";
import { Button } from "@nextui-org/react";

export default function Call2Action() {
    return (
        <div className="h-fit flex flex-col justify-center items-center text-center bg-indigo-600 px-4 py-16">
            <p className="text-5xl text-white  leading-tight flex flex-col justify-center items-center">
                Ready to Transform Your Practice?
            </p>
            <p className="text-default opacity-80 mb-12 max-w-2xl">
                Sign up today and start improving your practice management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    color="default"
                    size="md"
                    className="bg-white text-indigo-600 font-semibold hover:bg-opacity-90"
                >
                    Get Started for Free
                </Button>
                <Button
                    color="default"
                    size="md"
                    className="text-white font-semibold bg-transparent border border-white hover:bg-opacity-90"
                >
                    Explore Pricing
                </Button>
            </div>
        </div>
    );
}
