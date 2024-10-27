import React from "react";

const CardContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={className}>{children}</div>;
};

export default CardContainer;
