"use client";

import Blog from "@/components/landing-page/blog";
import Customer from "@/components/landing-page/customer";
import IntegrationsSection from "@/components/landing-page/integration";
import Nav from "@/components/landing-page/nav";
import Payment from "@/components/landing-page/payment";
import Footer from "@/components/landing-page/footer";

export default function Component() {
    return (
        <div className="h-fit">
            <Nav />
            <IntegrationsSection />
            <Customer />
            <Blog />
            <Payment />
            <Footer />
        </div>
    );
}
