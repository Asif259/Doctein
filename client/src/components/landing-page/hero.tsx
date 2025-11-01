import React from "react";
import { Button } from "@nextui-org/react";
import { ArrowRight, Play } from "lucide-react";

function HeroSection() {
    return (
        <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-primary/10">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-700">
                            Trusted by 500+ healthcare professionals
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Revolutionize Your
                        </span>
                        <br />
                        <span className="text-gray-900">
                            Prescription Management
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Effortlessly manage patients, appointments, and
                        prescriptions with our comprehensive healthcare
                        platform.
                        <span className="block mt-2 text-lg text-gray-500">
                            Built for modern medical practices.
                        </span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button
                            size="lg"
                            className="bg-primary text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Get Started for Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-6 text-lg rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                        >
                            <Play className="mr-2 w-5 h-5" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">
                                10K+
                            </div>
                            <div className="text-gray-600 font-medium">
                                Active Users
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">
                                50K+
                            </div>
                            <div className="text-gray-600 font-medium">
                                Prescriptions Managed
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">
                                99.9%
                            </div>
                            <div className="text-gray-600 font-medium">
                                Uptime
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    );
}

export default HeroSection;
