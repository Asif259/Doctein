"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

interface PasswordComponentProps {
  placeholder: string;
  value: string;  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
}

export default function PasswordComponent({ placeholder, value, onChange }: PasswordComponentProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex-wrap md:flex-nowrap gap-4 w-full">
      <Input
        variant="underlined"
        placeholder={placeholder}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            style={{ color: 'black' }} 
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <PiEyeBold className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <PiEyeClosedBold className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        value={value}  // Added value to the input
        onChange={onChange}  // Added onChange to the input
        className="w-full"
        style={{ color: 'black' }}
      />
    </div>
  );
}
