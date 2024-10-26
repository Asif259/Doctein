import React from "react";
import { Card, CardBody, Button, CardHeader, Image } from "@nextui-org/react";
import SectionContainer from "@/components/landing-page/section_container";
import Card_container from "@/components/landing-page/card_container";

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
        <SectionContainer Background="bg-white">
            <div className="text-center mb-28">
                <div className="text-indigo-600 font-semibold mb-8 text-xl">
                    Integrations
                </div>
                <div className="text-4xl md:text-7xl text-semibold mb-8 flex flex-col gap-5  ">
                    <span>Make Payments Easier with</span>
                    <span>50+ Integrations</span>
                </div>
            </div>

            <Card_container
                gap={4}
                md_cols={2}
                lg_cols={3}
                extra_className={"mb-12 gap-y-28"}
            >
                {integrations.map((integration, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl h-64 ">
                        <div
                            className={
                                "flex flex-col items-center justify-center relative -top-10"
                            }
                        >
                            <Image
                                width={100}
                                alt={integration.name}
                                src={integration.image}
                            />
                            <div
                                className={
                                    "mt-6 text-black text-2xl text-center"
                                }
                            >
                                {integration.name}
                            </div>
                        </div>
                        <div className="px-6 text-center text-xl">
                            {integration.description}
                        </div>
                    </div>
                ))}
            </Card_container>

            <div className="text-center mb-12 text-gray-600 max-w-6xl mx-auto text-2xl">
                Streamline your business operations with seamless integrations.
                Connect with Xero, WooCommerce, Zapier, Stripe, Shopify,
                QuickBooks, and many other platforms.
            </div>

            <div className="text-center">
                <Button
                    color="primary"
                    variant="solid"
                    className="w-56 h-16 text-xl bg-black text-white hover:bg-gray-800"
                >
                    See All Integrations
                </Button>
            </div>
        </SectionContainer>
    );
}
