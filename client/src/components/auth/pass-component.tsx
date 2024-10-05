"use client";
import React, { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

interface PasswordComponentProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordComponent = ({ placeholder, value, onChange, onBlur, ...props}: PasswordComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative w-full">
      <input
        className="w-full px-4 py-2 border rounded-lg"
        placeholder={placeholder}
        type={isVisible ? "text" : "password"} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        {...props} 
      />
      <button
        type="button"
        className="absolute inset-y-0 right-4 flex items-center"
        onClick={toggleVisibility}
        aria-label="toggle password visibility"
      >
        {isVisible ? (
          <PiEyeBold className="text-2xl" />
        ) : (
          <PiEyeClosedBold className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default PasswordComponent;
