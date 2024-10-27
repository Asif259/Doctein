import React from "react";
import { Card, Avatar, Image, CardBody } from "@nextui-org/react";
import SectionContainer from "@/components/landing-page/section-container";
import CardContainer from "@/components/landing-page/card-container";

interface BlogPost {
    category: string;
    title: string;
    description: string;
    image: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
}

const blogPosts: BlogPost[] = [
    {
        category: "Product",
        title: "A dynamic back office is the new business",
        description:
            "The back office has become an important strategic lever. We are adding new features t...",
        image: "/SumitLogo.png",
        author: {
            name: "Sesar Varma",
            avatar: "/Sumit.png",
        },
        date: "Oct 24, 2023",
    },
    {
        category: "Company",
        title: "The creator economy goes global",
        description:
            "Metafi data shows that the creator economy has evolved but is still thriving. We have seen...",
        image: "/SumitLogo.png",
        author: {
            name: "Jenny Wilson",
            avatar: "/Sumit.png",
        },
        date: "Oct 24, 2023",
    },
    {
        category: "Engineering",
        title: "How Metafi builds interactive docs Slack",
        description:
            "Delivering a good user experience without compromising the authoring experience re...",
        image: "/SumitLogo.png",
        author: {
            name: "Darlene Robertson",
            avatar: "/Sumit.png",
        },
        date: "Oct 24, 2023",
    },
    {
        category: "Design",
        title: "Tincidunt lorem consectetur et massa velit ut.",
        description:
            "How do you create compelling presentations that wow your colleagues and impress you...",
        image: "/SumitLogo.png",
        author: {
            name: "Savannah Nguyen",
            avatar: "/Sumit.png",
        },
        date: "Oct 24, 2023",
    },
];

export default function Blog() {
    return (
        <SectionContainer className="space-y-4">
            <div className="text-center text-xl text-indigo-600 font-semibold">
                Our Blog
            </div>
            <div className="text-5xl font-medium max-w-xl mx-auto text-center">
                Learn From The Blogs
            </div>
            <div className="text-md text-center text-gray-600">
                Here's what some of our customers say about our platform.
            </div>

            <CardContainer className="grid grid-cols-2">
                {blogPosts.map((post, index) => (
                    <Card key={index} shadow="none" radius="lg">
                        <CardBody className=" items-center justify-center flex-row flex gap-4">
                            <div className="w-60 flex items-center">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className="rounded-2xl p-0 m-0"
                                />
                            </div>
                            <div className="p-2 space-y-3">
                                <p className="text-indigo-600 font-semibold">
                                    {post.category}
                                </p>
                                <p className="text-xl font-semibold text-black">
                                    {post.title}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {post.description}
                                </p>
                                <div className="flex items-center">
                                    <Avatar
                                        src={post.author.avatar}
                                        size="sm"
                                    />
                                    <div className="ml-3 text-sm">
                                        <div className="text-gray-600">
                                            <span>{post.author.name}</span>
                                            <div className="rounded-full border-0 bg-default inline-flex w-2 h-2 mx-2"></div>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </CardContainer>
        </SectionContainer>
    );
}
