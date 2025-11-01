"use client";

import Blog from "@/components/landing-page/blog";
import Customer from "@/components/landing-page/testimonials";
import IntegrationsSection from "@/components/landing-page/integration";
import Nav from "@/components/landing-page/nav";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import SubscriptionPackages from "@/components/landing-page/subscription";
import FAQ from "@/components/landing-page/FAQ";
import Call2Action from "@/components/landing-page/call-to-action";
import Testimonials from "@/components/landing-page/testimonials";

export default function Component() {
    return (
        <div className="h-fit w-full bg-gradient-to-b from-white via-gray-50 to-white">
            {/* Navigation with backdrop blur effect */}
            <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50">
                <Nav />
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <HeroSection />
            </section>

            {/* Features/Integrations Section */}
            <section id="features" className="py-12 md:py-16 px-4 scroll-mt-20">
                <IntegrationsSection />
            </section>

            {/* Subscription/Pricing Section */}
            <section
                id="pricing"
                className="py-12 md:py-16 px-4 bg-white scroll-mt-20"
            >
                <SubscriptionPackages />
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-gray-50 scroll-mt-20"
            >
                <Testimonials />
            </section>

            {/* FAQ Section */}
            <section
                id="faq"
                className="py-12 md:py-16 px-4 bg-white scroll-mt-20"
            >
                <FAQ />
            </section>

            {/* Blog Section */}
            <section
                id="blog"
                className="py-12 md:py-16 px-4 bg-gray-50 scroll-mt-20"
            >
                <Blog />
            </section>

            {/* Call to Action Section */}
            <Call2Action />

            {/* Footer */}
            <Footer />
        </div>
    );
}
