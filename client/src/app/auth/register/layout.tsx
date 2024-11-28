import { ReactNode, Suspense } from "react";
import { Spinner } from "@nextui-org/react";

const Layout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen w-full justify-center items-center text-7xl">
                    <Spinner size="lg" />
                    Loading...
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default Layout;
