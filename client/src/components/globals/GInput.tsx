import { Input, InputProps } from "@nextui-org/react";
import React from "react";


const GInput: React.FC<InputProps> = ({...props }) => {
    return (
        <Input
            radius="sm"
            classNames={{
                label: "text-default-300",
                input: ["placeholder:text-default-400"],
                inputWrapper: [
                    "bg-default-500",
                    "hover:bg-default-200",
                ],
            }}
            {...props}
        />
    );
};

export default GInput;
