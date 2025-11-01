import React from "react";
import { Link } from "@nextui-org/react";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import SectionContainer from "@/components/landing-page/section-container";

interface FooterColumn {
    title: string;
    links: string[];
}

const footerData: Record<string, FooterColumn> = {
    Features: {
        title: "Features",
        links: [
            "Appointment Management",
            "Prescription Management",
            "Patient Records",
            "Staff Management",
            "Integrations",
            "Pricing",
        ],
    },
    Solutions: {
        title: "Solutions",
        links: [
            "Medical Practices",
            "Clinics",
            "Hospitals",
            "Specialty Care",
            "Telemedicine",
        ],
    },
    Resources: {
        title: "Resources",
        links: ["Tutorials", "Blog", "Community", "Privacy Policy"],
    },
    About: {
        title: "About",
        links: ["Company", "Careers", "FAQ", "Contact Us"],
    },
};

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white w-full ">
            <SectionContainer className="py-8 md:py-12 lg:py-16 px-6 mb-0 mt-0">
                {/* Main Footer Content */}
                <div className="space-y-8 md:space-y-12">
                    {/* Logo and Links Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                        {/* Logo Section */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:max-w-xs">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/Logo.png"
                                    alt="Doctein Logo"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg"
                                />
                                <span className="ml-2 text-xl md:text-2xl font-bold text-primary">
                                    Doctein
                                </span>
                            </div>
                            <p className="text-sm md:text-base text-gray-400 max-w-md">
                                Empowering healthcare professionals with
                                innovative practice management solutions.
                            </p>
                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 flex-1">
                            {Object.values(footerData).map((column, index) => (
                                <div
                                    key={index}
                                    className="space-y-3 md:space-y-4"
                                >
                                    <h4 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3">
                                        {column.title}
                                    </h4>
                                    <ul className="space-y-2 md:space-y-3">
                                        {column.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    href="#"
                                                    className="text-xs md:text-sm text-gray-400 hover:text-primary transition-colors duration-300"
                                                >
                                                    {link}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-6 md:pt-8 border-t border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-xs md:text-sm text-gray-400">
                                    &copy; {new Date().getFullYear()} Doctein.
                                    All rights reserved
                                </p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-end gap-4 md:gap-5">
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 hover:bg-gray-800/50 rounded-lg"
                                    aria-label="Facebook"
                                >
                                    <Facebook
                                        size={18}
                                        className="md:w-5 md:h-5"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 hover:bg-gray-800/50 rounded-lg"
                                    aria-label="Instagram"
                                >
                                    <Instagram
                                        size={18}
                                        className="md:w-5 md:h-5"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 hover:bg-gray-800/50 rounded-lg"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin
                                        size={18}
                                        className="md:w-5 md:h-5"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 hover:bg-gray-800/50 rounded-lg"
                                    aria-label="GitHub"
                                >
                                    <Github
                                        size={18}
                                        className="md:w-5 md:h-5"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </footer>
    );
};

export default Footer;
