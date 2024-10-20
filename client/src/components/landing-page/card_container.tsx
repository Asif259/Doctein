import React from "react";

const CardContainer = ({
    children,
    gap,
    md_cols,
    lg_cols = md_cols,
    extra_className = "",
}: {
    children: React.ReactNode;
    gap: Number;
    md_cols: Number;
    lg_cols?: Number;
    extra_className?: string;
}) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-${md_cols} lg:grid-cols-${lg_cols} gap-${gap} ${extra_className}`}
        >
            {children}
        </div>
    );
};

export default CardContainer;
