import React from "react";

const SectionContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`${className ? className : ""} my-10 max-w-screen-xl mx-auto`}
        >
            {children}
        </div>
    );
};

export default SectionContainer;
