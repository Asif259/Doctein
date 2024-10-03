"use client"; 

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter(); 

  const [role, setRole] = useState<"doctor" | "patient" | null>(null);

  const handleRoleSelection = (selectedRole: "doctor" | "patient") => {
    setRole(selectedRole);
    router.push(`/auth/register/${selectedRole}`);
  };

  return (
    <div className=" flex justify-center items-center bg-gray-100">
      <div className="h-[90vh] mt-8 flex flex-col md:flex-row w-10/12 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Section - Doctor */}
        <div
          className="w-1/2 bg-primary flex flex-col items-center justify-center cursor-pointer hover:bg-primary-800"
          onClick={() => handleRoleSelection("doctor")}
        >
          <h2 className="text-white text-3xl font-bold">Log in as Doctor</h2>
          <p className="text-white mt-4">Click here to log in as a Doctor</p>
        </div>

        {/* Right Section Patient*/}
        <div
          className="w-1/2 bg-green-500 flex flex-col items-center justify-center cursor-pointer hover:bg-green-600"
          onClick={() => handleRoleSelection("patient")}
        >
          <h2 className="text-white text-3xl font-bold">Log in as Patient</h2>
          <p className="text-white mt-4">Click here to log in as a Patient</p>
        </div>
      </div>
    </div>
  );
}
