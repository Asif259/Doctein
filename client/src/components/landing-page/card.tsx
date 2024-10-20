import React from "react";
import {
    Card,
    CardBody,
    Avatar,
    CardHeader,
    CardFooter,
} from "@nextui-org/react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    rating: number;
    quote: string;
    authorName: string;
    authorTitle: string;
    avatarSrc: string;
}

const obj: TestimonialCardProps = {
    rating: 4.8,
    quote: "Payments are pivotal in our financial operations, serving as the primary interface between our finance department and clients.",
    authorName: "Novák Balázs",
    authorTitle: "Co-Founder, WoCommerce",
    avatarSrc: "/Sumit.png",
};

export default function CardDemo() {
    return (
        <Card className="max-w-md p-4">
            <CardHeader className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(obj.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700">
                    {obj.rating.toFixed(1)}
                </span>
            </CardHeader>
            <CardBody className="p-2">
                <p className="text-lg font-medium text-gray-800 mb-4">
                    "{obj.quote}"
                </p>
            </CardBody>
            <CardFooter className="flex items-center">
                <Avatar src={obj.avatarSrc} className="w-12 h-12" />
                <div className="ml-4">
                    <p className="font-semibold text-gray-800">
                        {obj.authorName}
                    </p>
                    <p className="text-sm text-gray-600">{obj.authorTitle}</p>
                </div>
            </CardFooter>
        </Card>
    );
}
