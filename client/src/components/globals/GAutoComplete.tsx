import {
    Autocomplete,
    AutocompleteItem,
    AutocompleteProps,
} from "@nextui-org/react";
import React from "react";

export interface Item {
    key: number;
    value: string;
    label: string;
}

interface ItemProps extends Omit<AutocompleteProps, "children"> {
    items?: Item[];
}

const GAutoComplete = ({ items = [], ...props }: ItemProps) => {
    return (
        <Autocomplete
            radius="sm"
            inputProps={{
                classNames: {
                    input: "placeholder:text-default-400",
                    inputWrapper: "bg-default-500 hover:bg-default-200",
                },
            }}
            {...props}
        >
            {items.map((item) => (
                <AutocompleteItem key={item.key} value={item.value}>
                    {item.label}
                </AutocompleteItem>
            ))}
        </Autocomplete>

    );
};

export default GAutoComplete;