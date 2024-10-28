import React from "react";
import { Button } from "@nextui-org/react";

const SubscriptionPackages = () => {
    const packages = [
        {
            title: "Free (Forever)",
            description: "Basic features for personal use.",
            features: [
                "Basic patient and appointment management",
                "Limited patient records",
                "Limited appointment records",
                "Limited prescription records",
                "Watermark on prescriptions",
                "Basic support",
            ],
        },
        {
            title: "Standard",
            description: "Advanced features for small teams.",
            features: [
                "Unlimited patient and appointment management",
                "Unlimited prescription records",
                "Detailed prescription management",
                "Staff management",
                "No watermarks",
                "Priority support",
            ],
        },
        {
            title: "Professional",
            description: "All features for large teams.",
            features: [
                "All standard features",
                "Advanced reporting and analytics",
                "Customizable templates",
                "Integration with third-party tools",
                "Phone and email support",
                "Priority support",
            ],
        },
    ];

    return (
        <div className="flex flex-col items-center py-12 bg-primary-200">
            <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
            <p className="text-gray-600 mb-8">
                Flexible plans to suit your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg w-80"
                    >
                        <h3 className="text-xl font-semibold mb-4">
                            {pkg.title}
                        </h3>
                        <p className="text-gray-600 mb-6">{pkg.description}</p>
                        <ul className="text-gray-600 space-y-2">
                            {pkg.features.map((feature, index) => (
                                <li key={index}>
                                    <span className="text-black">•</span>{" "}
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button color="primary" className="w-full">
                            {pkg.title === "Free (Forever)"
                                ? "Get Started"
                                : "Choose Plan"}
                        </Button>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Custom Package</h3>
                <p className="text-gray-600 mb-6">
                    Contact us for a tailored solution.
                </p>
                <Button size="lg" className="bg-black text-white">
                    Contact Us for a Quote
                </Button>
            </div>
        </div>
    );
};

export default SubscriptionPackages;
