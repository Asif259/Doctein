import React from "react";
import { Button, Image } from "@nextui-org/react";
import SectionContainer from "@/components/landing-page/section-container";
import CardContainer from "@/components/landing-page/card-container";

interface Integration {
    image: string;
    name: string;
    description: string;
}

const integrations: Integration[] = [
    {
        image: "slack.png",
        name: "Shopify integration",
        description:
            "Scale your entire business with the best ranked commerce platform",
    },
    {
        image: "slack.png",
        name: "Slack integration",
        description:
            "With Metafi's integration for Slack, your team can seamlessly send messages to a Metafi database",
    },
    {
        image: "slack.png",
        name: "Zapier integration",
        description:
            "Connect Apps and Automate Workflows with Zapier — No Coding Required.",
    },
    {
        image: "slack.png",
        name: "Google integration",
        description:
            "Comprehensive tools to connect applications (Google Cloud and others).",
    },
    {
        image: "slack.png",
        name: "Okta integration",
        description:
            "Scale & flexibility with the broadest & deepest set of integrations",
    },
    {
        image: "slack.png",
        name: "Stripe integration",
        description:
            "Work faster and smarter by integrating directly with Notion, right in the app.",
    },
];

export default function IntegrationsSection() {
    return (
        <SectionContainer className="grid-cols-3 space-y-5">
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="font-semibold text-primary text-xl">
                    Integrations
                </div>
                <div className="text-5xl font-medium flex flex-col gap-5 max-w-xl text-center">
                    Make Payments Easier with 50+ Integrations
                </div>
            </div>

            <CardContainer className="grid grid-cols-3 gap-5">
                {integrations.map((integration, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 justify-center items-center rounded-2xl h-52"
                    >
                        <Image
                            width={50}
                            alt={integration.name}
                            src={integration.image}
                        />
                        <p className="font-medium text-xl text-center">
                            {integration.name}
                        </p>
                        <p className="px-6 text-center text-gray-600">
                            {integration.description}
                        </p>
                    </div>
                ))}
            </CardContainer>

            <div className="text-center text-gray-600 max-w-3xl mx-auto">
                Streamline your business operations with seamless integrations.
                Connect with Xero, WooCommerce, Zapier, Stripe, Shopify,
                QuickBooks, and many other platforms.
            </div>

            <div className="text-center">
                <Button
                    className="bg-black text-white"
                    size="lg"
                    variant="solid"
                >
                    See All Integrations
                </Button>
            </div>
        </SectionContainer>
    );
}
