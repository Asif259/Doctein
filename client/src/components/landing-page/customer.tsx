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
import CardContainer from "@/components/landing-page/card-container";

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
        <div className="bg-gray-100 py-10">
            <div className="text-center mb-16 space-y-4">
                <div className="text-indigo-600 font-semibold mb-8 text-xl">
                    Our Customers
                </div>
                <div className="text-5xl max-w-xl mx-auto font-medium flex flex-col gap-5">
                    See What Our Customers Are Saying
                </div>
                <div className="text-gray-600 mx-auto">
                    Here's what some of our customers say about our platform.
                </div>
            </div>

            <CardContainer className="max-w-screen-xl mx-auto grid grid-cols-3 gap-5">
                {objs.map((obj, index) => (
                    <div key={index}>
                        <Card
                            className={`max-w-md p-5 h-full ${index >= 3 ? "relative" : ""}`}
                        >
                            <CardHeader className="flex items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(obj.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                                <span className="ml-2 font-semibold text-gray-700">
                                    {obj.rating.toFixed(1)}
                                </span>
                            </CardHeader>
                            <CardBody className="p-2">
                                <div className="font-medium text-gray-800 mb-6">
                                    "{obj.quote}"
                                </div>
                            </CardBody>
                            <CardFooter className="flex items-center">
                                <Avatar src={obj.avatarSrc} size="sm" />
                                <div className="ml-4">
                                    <p className="font-semibold text-gray-800">
                                        {obj.authorName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {obj.authorTitle}
                                    </p>
                                </div>
                                {index >= 3 && (
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70 rounded-lg"></div>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
                {/*<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>*/}
            </CardContainer>

            <div className="text-center relative z-10">
                <Button
                    variant="solid"
                    size="md"
                    className="bg-black text-white hover:bg-gray-800"
                >
                    See All Customer Stories
                </Button>
            </div>
        </div>
    );
}
