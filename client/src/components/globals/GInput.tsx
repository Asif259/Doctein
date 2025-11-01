import { Input, InputProps } from "@nextui-org/react";
import React from "react";

const GInput: React.FC<InputProps> = ({ classNames = {}, ...props }) => {
    // Default classNames that should always be applied
    const defaultInputClasses = [
        "placeholder:text-gray-400",
        "!text-gray-900", // Important to ensure dark text
        "text-gray-900", // Fallback
        "bg-transparent",
        "autofill:!text-gray-900", // For autofill state
    ];

    const defaultInputWrapperClasses = [
        "bg-gray-50",
        "border border-gray-200",
        "hover:bg-gray-50",
        "hover:border-gray-300",
        "focus-within:!bg-white",
        "focus-within:!border-primary",
        "focus-within:shadow-sm",
        "data-[hover=true]:bg-gray-50",
        "data-[hover=true]:border-gray-300",
        "group-data-[focus=true]:!bg-white",
        "group-data-[focus=true]:!border-primary",
    ];

    // Merge input classes: ensure text-gray-900 is always included
    const mergedInputClasses = Array.isArray(classNames.input)
        ? [...defaultInputClasses, ...classNames.input]
        : typeof classNames.input === "string"
          ? [...defaultInputClasses, classNames.input]
          : defaultInputClasses;

    // Merge inputWrapper classes
    const mergedInputWrapperClasses = Array.isArray(classNames.inputWrapper)
        ? [...defaultInputWrapperClasses, ...classNames.inputWrapper]
        : typeof classNames.inputWrapper === "string"
          ? [...defaultInputWrapperClasses, classNames.inputWrapper]
          : defaultInputWrapperClasses;

    return (
        <Input
            radius="sm"
            variant="bordered"
            classNames={{
                base: "w-full",
                label: classNames.label || "!text-black font-medium",
                input: mergedInputClasses,
                inputWrapper: mergedInputWrapperClasses,
                ...Object.fromEntries(
                    Object.entries(classNames).filter(
                        ([key]) =>
                            key !== "input" &&
                            key !== "inputWrapper" &&
                            key !== "label",
                    ),
                ),
            }}
            {...props}
        />
    );
};

export default GInput;
