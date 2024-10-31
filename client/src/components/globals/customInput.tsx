import { Input, InputProps } from "@nextui-org/react";
import React from "react";


const CustomInput: React.FC<InputProps> = ({...props }) => {
    return (
        <Input
            radius="sm"
            {...props}
        />
    );
};

export default CustomInput;
