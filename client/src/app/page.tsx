"use client";

import Blog from "@/components/landing-page/blog";
import Customer from "@/components/landing-page/customer";
import IntegrationsSection from "@/components/landing-page/integration";
import Nav from "@/components/landing-page/nav";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import SubscriptionPackages from "@/components/landing-page/subscription";
import FAQ from "@/components/landing-page/FAQ";
import Call2Action from "@/components/landing-page/call-to-action";

export default function Component() {
    return (
        <div className="h-fit w-full">
            <Nav />
            <HeroSection />
            <IntegrationsSection />
            <SubscriptionPackages />
            <Customer />
            <FAQ />
            <Blog />
            <Call2Action />
            <Footer />
        </div>
    );
}
