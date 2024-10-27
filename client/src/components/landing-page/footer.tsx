import React from "react";
import { Link } from "@nextui-org/react";
import { Linkedin, SettingsIcon } from "lucide-react";

interface FooterColumn {
    title: string;
    links: string[];
}

const footerData: Record<string, FooterColumn> = {
    Features: {
        title: "Features",
        links: [
            "Payment Link",
            "Recurring Billing",
            "Invoicing",
            "Checkout",
            "Integrations",
            "Pricing",
        ],
    },
    Solutions: {
        title: "Solutions",
        links: [
            "eCommerce",
            "Finance Automation",
            "Crypto",
            "Global Business",
            "Marketplaces",
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
        <div className="bg-[#111111] text-white py-12 w-full">
            <div className="mx-4 px-32">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <h3 className="text-xl font-bold mb-4 flex flex-row">
                            <SettingsIcon size={25} />
                            <span className="ml-2">Metafi</span>
                        </h3>
                    </div>
                    <div className="flex flex-row gap-20">
                        {Object.values(footerData).map((column, index) => (
                            <div key={index} className="space-y-2">
                                <h4 className="text-sm font-medium text-default-400 mb-2">
                                    {column.title}
                                </h4>
                                <div className="border border-gray-400"></div>
                                <ul className="space-y-2">
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href="#"
                                                className="text-white text-sm hover:text-gray-300 transition-colors"
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
                <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                        <p className="text-sm text-gray-400">
                            &copy; 2024 Metafi. All rights reserved
                        </p>
                    </div>
                    <div className="flex justify-end space-x-4 ">
                        <Link
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <Linkedin size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
