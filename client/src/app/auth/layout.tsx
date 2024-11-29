import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | Dochub",
    description: "Authentication page",
};

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <>{children}</>;
};

export default Layout;
