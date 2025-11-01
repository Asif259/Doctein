import React from "react";
import { Button } from "@nextui-org/react";
import {
    ArrowRight,
    Activity,
    Pill,
    TestTube,
    CreditCard,
    Calendar,
    Video,
    Sparkles,
} from "lucide-react";
import SectionContainer from "@/components/landing-page/section-container";

interface Integration {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    description: string;
    color: string;
}

const integrations: Integration[] = [
    {
        icon: Activity,
        name: "EHR Systems",
        description:
            "Seamlessly integrate with major Electronic Health Record systems for comprehensive patient data management",
        color: "text-blue-600",
    },
    {
        icon: Pill,
        name: "Pharmacy Networks",
        description:
            "Connect with pharmacy networks for instant prescription delivery and medication tracking",
        color: "text-purple-600",
    },
    {
        icon: TestTube,
        name: "Lab Integrations",
        description:
            "Automate lab result management and seamlessly sync test results with patient records",
        color: "text-green-600",
    },
    {
        icon: CreditCard,
        name: "Payment Gateways",
        description:
            "Accept payments securely with integrated payment processing for appointments and services",
        color: "text-indigo-600",
    },
    {
        icon: Calendar,
        name: "Calendar Systems",
        description:
            "Sync with Google Calendar, Outlook, and other calendar systems for seamless scheduling",
        color: "text-orange-600",
    },
    {
        icon: Video,
        name: "Telemedicine",
        description:
            "Connect with leading telemedicine platforms for virtual consultations and remote care",
        color: "text-red-600",
    },
];

export default function IntegrationsSection() {
    return (
        <SectionContainer className="space-y-12 md:space-y-14 lg:space-y-16 py-8 md:py-12 lg:py-16">
            {/* Header */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                        Integrations
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                        Connect with 50+
                    </span>
                    <br />
                    <span className="text-gray-900">Healthcare Platforms</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Streamline your practice operations with seamless
                    integrations. Connect with EHR systems, pharmacies, labs,
                    and more.
                </p>
            </div>

            {/* Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {integrations.map((integration, index) => {
                    const IconComponent = integration.icon;
                    return (
                        <div key={index} className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white border-2 border-gray-200/80 rounded-2xl p-6 lg:p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                                <div className="flex items-start gap-4 mb-5">
                                    <div
                                        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent
                                            className={`w-7 h-7 ${integration.color} group-hover:scale-110 transition-transform duration-300`}
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight pt-1">
                                        {integration.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                    {integration.description}
                                </p>
                                <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pt-4 border-t-2 border-gray-100">
                                    <span className="text-sm font-semibold mr-2">
                                        Learn more
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="text-center space-y-6 pt-8">
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Streamline your business operations with seamless
                    integrations. Connect with EHR systems, pharmacy networks,
                    lab systems, payment gateways, and many other healthcare
                    platforms.
                </p>
                <Button
                    size="lg"
                    className="group bg-gradient-to-r from-primary to-primary/90 text-white font-bold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                >
                    See All Integrations
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
            </div>
        </SectionContainer>
    );
}
