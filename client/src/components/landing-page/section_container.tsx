import React from "react";

const SectionContainer = ({
    children,
    Background,
    extra_className = "",
}: {
    children: React.ReactNode;
    Background: String;
    extra_className?: string;
}) => {
    return (
        <div
            className={`${Background} py-16 px-36 max-w-full ${extra_className}`}
        >
            {children}
        </div>
    );
};

export default SectionContainer;
