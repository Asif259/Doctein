"use client";

import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Blog from "@/components/landing-page/blog";
import Card from "@/components/landing-page/card";
import CardDemo from "@/components/landing-page/card";
import Nav from "@/components/landing-page/nav";

export default function Component() {
    return (
        <div className="">
            <Nav />
            <Blog />
            <Hero />
            <Footer />
        </div>
    );
}
