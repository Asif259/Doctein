import React from "react";
import {
    Button,
    Card,
    CardBody,
    Avatar,
    CardHeader,
    CardFooter,
} from "@nextui-org/react";
import { Star } from "lucide-react";
import SectionContainer from "@/components/landing-page/section_container";
import Card_container from "@/components/landing-page/card_container";

interface customerCardProperties {
    rating: number;
    quote: string;
    authorName: string;
    authorTitle: string;
    avatarSrc: string;
}

const objs: customerCardProperties[] = [
    {
        rating: 4.8,
        quote: "Payments are the main interaction point between Accenture's financial services clients and their customers, and are core to our relationships beyond that sector too.",
        authorName: "Charolette Hanlin",
        authorTitle: "Co-Founder, Heroes Digital",
        avatarSrc: "Sumit.png",
    },
    {
        rating: 4.8,
        quote: "Payments are pivotal in our financial operations, serving as the primary interface between our finance department and clients.",
        authorName: "Novák Balázs",
        authorTitle: "Co-Founder, WoCommerce",
        avatarSrc: "Sumit.png",
    },
    {
        rating: 4.8,
        quote: "Using this financial app has made me feel more organized and efficient in managing my finances.",
        authorName: "Orosz Boldizsár",
        authorTitle: "Founder, Okta",
        avatarSrc: "Sumit.png",
    },
    {
        rating: 4.8,
        quote: "The provided features are incredibly helpful in tracking expenses, managing investments, and planning for future financial goals.",
        authorName: "Floyd Miles",
        authorTitle: "Co-Founder, Slack",
        avatarSrc: "Sumit.png",
    },
    {
        rating: 4.8,
        quote: "This app has given me full control over my finances and provided greater confidence in making wise financial decisions.",
        authorName: "Darrell Steward",
        authorTitle: "CEO, Salesforce",
        avatarSrc: "Sumit.png",
    },
    {
        rating: 4.8,
        quote: "Since incorporating this finance app into my daily routine, I've experienced a significant improvement in my financial management.",
        authorName: "Devon Lane",
        authorTitle: "Marketing, Google",
        avatarSrc: "Sumit.png",
    },
];

export default function Customer() {
    return (
        <SectionContainer Background={"bg-gray-200"}>
            <div className="text-center mb-16">
                <div className="text-indigo-600 font-semibold mb-8 text-xl">
                    Our Customers
                </div>
                <div className="text-4xl md:text-7xl text-semibold mb-8 flex flex-col gap-5  ">
                    <span>See What Our</span>
                    <span>Customers Are Saying</span>
                </div>
                <div className="text-gray-600 text-2xl mx-auto">
                    Here's what some of our customers say about our platform.
                </div>
            </div>

            <Card_container
                gap={4}
                md_cols={2}
                lg_cols={3}
                extra_className="relative mb-12"
            >
                {objs.map((obj, index) => (
                    <>
                        <Card
                            className={`max-w-lg p-8 ${index >= 3 ? "relative" : ""}`}
                        >
                            <CardHeader className="flex items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-7 h-7 ${i < Math.floor(obj.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                                <span className="ml-2 text-xl font-semibold text-gray-700">
                                    {obj.rating.toFixed(1)}
                                </span>
                            </CardHeader>
                            <CardBody className="p-2">
                                <div className="text-2xl font-medium text-gray-800 mb-6">
                                    "{obj.quote}"
                                </div>
                            </CardBody>
                            <CardFooter className="flex items-center">
                                <Avatar
                                    src={obj.avatarSrc}
                                    className=""
                                    size={"lg"}
                                />
                                <div className="ml-4">
                                    <p className="font-semibold text-gray-800 text-xl">
                                        {obj.authorName}
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        {obj.authorTitle}
                                    </p>
                                </div>
                                {index >= 3 && (
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70 rounded-lg"></div>
                                )}
                            </CardFooter>
                        </Card>
                    </>
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </Card_container>

            <div className="text-center relative z-10">
                <Button
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                >
                    See All Customer Stories
                </Button>
            </div>
        </SectionContainer>
    );
}
