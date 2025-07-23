"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function RoleSelection() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"doctor" | "patient" | null>(null);

    const handleSelect = (role: "doctor" | "patient") => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole) {
            router.push(`/auth/register?role=${selectedRole}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#23272f]">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold mb-10 text-black">
                    Join as a client or freelancer
                </h1>

                <div className="flex gap-8 mb-6">
                    <div
                        onClick={() => handleSelect("doctor")}
                        className={`w-72 p-6 border rounded-xl cursor-pointer transition ${
                            selectedRole === "doctor"
                                ? "border-primary bg-primary/10"
                                : "border-gray-300 hover:border-primary"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">👨‍⚕️</span>
                            <div className="text-left">
                                <h2 className="text-lg font-medium text-black">
                                    I'm a client, hiring for a project
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => handleSelect("patient")}
                        className={`w-72 p-6 border rounded-xl cursor-pointer transition ${
                            selectedRole === "patient"
                                ? "border-green-600 bg-green-600/10"
                                : "border-gray-300 hover:border-green-600"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💼</span>
                            <div className="text-left">
                                <h2 className="text-lg font-medium text-black">
                                    I'm a freelancer, looking for work
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    className="w-64 text-white bg-black rounded-md"
                    isDisabled={!selectedRole}
                    onClick={handleContinue}
                >
                    Create Account
                </Button>

                <p className="text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-primary hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}
