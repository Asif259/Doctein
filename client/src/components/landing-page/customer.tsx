import React from "react";
import { Button } from "@nextui-org/react";

export default function Customer() {
    return (
        <div className="container ">
            <div className="text-center mb-16">
                <h2 className="text-indigo-600 font-semibold mb-2">
                    Our Customers
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    See What Our
                    <br />
                    Customers Are Saying
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Here's what some of our customers say about our platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className={`bg-gray-200 h-64 rounded-lg shadow-md ${index >= 3 ? "relative" : ""}`}
                    >
                        {index >= 3 && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70 rounded-lg"></div>
                        )}
                    </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            <div className="text-center relative z-10">
                <Button
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                >
                    See All Customer Stories
                </Button>
            </div>
        </div>
    );
}
