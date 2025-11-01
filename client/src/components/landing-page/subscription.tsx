import React from "react";
import { Button } from "@nextui-org/react";
import { Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const SubscriptionPackages = () => {
    const router = useRouter();
    
    const packages = [
        {
            title: "Free",
            subtitle: "Forever",
            price: "$0",
            period: "forever",
            description: "Perfect for individual practitioners getting started.",
            features: [
                "Basic patient and appointment management",
                "Up to 50 patient records",
                "Up to 100 appointment records",
                "Limited prescription records",
                "Watermark on prescriptions",
                "Email support",
            ],
            popular: false,
            cta: "Get Started",
        },
        {
            title: "Standard",
            subtitle: "Most Popular",
            price: "$29",
            period: "per month",
            description: "Advanced features for growing practices.",
            features: [
                "Unlimited patient records",
                "Unlimited appointments",
                "Unlimited prescriptions",
                "Detailed prescription management",
                "Staff management (up to 5)",
                "No watermarks",
                "Priority email support",
                "Basic analytics",
            ],
            popular: true,
            cta: "Start Free Trial",
        },
        {
            title: "Professional",
            subtitle: "For Large Practices",
            price: "$79",
            period: "per month",
            description: "Complete solution for established practices.",
            features: [
                "All Standard features",
                "Unlimited staff members",
                "Advanced reporting and analytics",
                "Customizable templates",
                "API access",
                "Third-party integrations",
                "Priority phone & email support",
                "Dedicated account manager",
            ],
            popular: false,
            cta: "Start Free Trial",
        },
    ];

    return (
        <div className="flex flex-col items-center py-20 max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                        Pricing
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    <span className="text-primary">
                        Choose Your
                    </span>
                    <br />
                    <span className="text-gray-900">Perfect Plan</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Flexible pricing plans designed to grow with your practice. 
                    Start free and upgrade anytime.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                            pkg.popular
                                ? "border-primary shadow-xl scale-105"
                                : "border-gray-200"
                        }`}
                    >
                        {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {pkg.title}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {pkg.subtitle}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-2">{pkg.description}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-gray-900">
                                    {pkg.price}
                                </span>
                                {pkg.period !== "forever" && (
                                    <span className="text-gray-500">/{pkg.period}</span>
                                )}
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0">
                                        <Check className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => router.push("/auth/register")}
                            size="lg"
                            className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                                pkg.popular
                                    ? "bg-primary text-white hover:shadow-lg hover:scale-105"
                                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            }`}
                        >
                            {pkg.cta}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Custom Package */}
            <div className="text-center bg-primary/10 rounded-2xl p-12 border border-primary/20">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Need a Custom Solution?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Contact us for enterprise pricing and a tailored solution that fits your practice's unique needs.
                </p>
                <Button
                    size="lg"
                    variant="bordered"
                    className="border-2 border-primary text-primary font-semibold px-8 py-6 text-lg rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                >
                    Contact Sales
                </Button>
            </div>
        </div>
    );
};

export default SubscriptionPackages;
