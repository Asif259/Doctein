import {Autocomplete, AutocompleteProps} from "@nextui-org/react";
import React from "react";

const CustomAutoComplete: React.FC<AutocompleteProps> = ({children, ...props}) => {
    return (
        <Autocomplete radius="sm" {...props}>
            {children}
        </Autocomplete>
    );
};

export default CustomAutoComplete;
