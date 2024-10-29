import { Input, InputProps } from "@nextui-org/react";
import React from "react";


const CustomInput: React.FC<InputProps> = ({...props }) => {
    return (
        <Input
            {...props}
        />
    );
};

export default CustomInput;
