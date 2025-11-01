"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Stethoscope, User, ArrowRight } from "lucide-react";

export default function RoleSelection() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<
        "doctor" | "patient" | null
    >(null);

    const handleSelect = (role: "doctor" | "patient") => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole) {
            router.push(`/auth/register?role=${selectedRole}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="p-2 bg-primary rounded-lg shadow-lg">
                            <Stethoscope className="size-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-primary">
                            Doctein
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-primary">
                            Join Doctein
                        </span>
                        <br />
                        <span className="text-gray-900">Get Started Today</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose your role to begin your journey with our
                        healthcare management platform
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Doctor Card */}
                    <div
                        onClick={() => handleSelect("doctor")}
                        className={`group relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                            selectedRole === "doctor"
                                ? "border-primary shadow-xl scale-105"
                                : "border-gray-200 hover:border-primary"
                        }`}
                    >
                        {selectedRole === "doctor" && (
                            <div className="absolute -top-3 right-4">
                                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Selected
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div
                                className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    selectedRole === "doctor"
                                        ? "bg-primary"
                                        : "bg-primary/10 group-hover:bg-primary/20"
                                }`}
                            >
                                <Stethoscope
                                    className={`w-10 h-10 ${
                                        selectedRole === "doctor"
                                            ? "text-white"
                                            : "text-primary"
                                    }`}
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Doctor
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Manage your practice, appointments, and
                                    prescriptions with our comprehensive doctor
                                    dashboard
                                </p>
                            </div>
                            <ul className="text-left space-y-2 text-sm text-gray-600 w-full mt-4">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Patient management
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Appointment scheduling
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Prescription management
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Patient Card */}
                    <div
                        onClick={() => handleSelect("patient")}
                        className={`group relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                            selectedRole === "patient"
                                ? "border-primary shadow-xl scale-105"
                                : "border-gray-200 hover:border-primary"
                        }`}
                    >
                        {selectedRole === "patient" && (
                            <div className="absolute -top-3 right-4">
                                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Selected
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div
                                className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    selectedRole === "patient"
                                        ? "bg-primary"
                                        : "bg-primary/10 group-hover:bg-primary/20"
                                }`}
                            >
                                <User
                                    className={`w-10 h-10 ${
                                        selectedRole === "patient"
                                            ? "text-white"
                                            : "text-primary"
                                    }`}
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Patient
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Book appointments, access medical records,
                                    and manage your healthcare journey
                                </p>
                            </div>
                            <ul className="text-left space-y-2 text-sm text-gray-600 w-full mt-4">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Book appointments
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    View medical records
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Prescription access
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col items-center space-y-6">
                    <Button
                        size="lg"
                        className={`w-full md:w-auto min-w-[280px] bg-primary text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                            !selectedRole ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        isDisabled={!selectedRole}
                        onClick={handleContinue}
                    >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/auth/login"
                            className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
                        >
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
