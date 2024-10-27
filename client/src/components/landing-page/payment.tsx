import React from "react";
import { Button } from "@nextui-org/react";

export default function Payment() {
    return (
        <div className="h-fit flex flex-col justify-center items-center text-center bg-indigo-600 px-4 py-16">
            <p className="text-5xl text-white  leading-tight flex flex-col justify-center items-center">
                <span className="mb-4">Simplifying Payments for</span>

                <span className="mb-8">Growing Business</span>
            </p>
            <p className="text-default opacity-80 mb-12 max-w-2xl">
                Join over 300+ partners and customers already growing with
                Metafi
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    color="default"
                    size="md"
                    className="bg-white text-indigo-600 font-semibold hover:bg-opacity-90"
                >
                    Get Started
                </Button>
                <Button
                    color="default"
                    size="md"
                    className="text-white font-semibold bg-transparent border border-white hover:bg-opacity-90"
                >
                    Contact Us
                </Button>
            </div>
        </div>
    );
}
