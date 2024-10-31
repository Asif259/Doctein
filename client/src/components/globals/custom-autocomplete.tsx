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

const CustomAutocomplete = ({ items = [], ...props }: ItemProps) => {
    return (
        <Autocomplete {...props}>
            {items.map((item) => (
                <AutocompleteItem key={item.key} value={item.value}>
                    {item.label}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};

export default CustomAutocomplete;
