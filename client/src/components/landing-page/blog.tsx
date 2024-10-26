import React from "react";
import { Card, Avatar, Image, CardBody } from "@nextui-org/react";
import { CalendarDays } from "lucide-react";
import SectionContainer from "@/components/landing-page/section_container";
import Card_container from "@/components/landing-page/card_container";

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
        <SectionContainer Background="bg-white">
            <div className="text-center text-lg text-indigo-600 font-semibold mb-2">
                Our Blog
            </div>
            <div className="text-5xl  text-center mb-4">
                Learn From The Blogs
            </div>
            <div className="text-md text-center text-gray-600 mb-12">
                Here's what some of our customers say about our platform.
            </div>

            <Card_container gap={4} md_cols={2}>
                {blogPosts.map((post, index) => (
                    <Card key={index} shadow={"none"} radius={"lg"}>
                        <CardBody className="overflow-hidden items-center flex-row flex gap-8">
                            {/*<div className={"items-center flex-row flex"}>*/}
                            <img
                                src={post.image}
                                alt={post.title}
                                className="max-w-80 max-h-72 object-cover rounded-2xl p-0 m=0"
                            />
                            {/*</div>*/}

                            <div className="p-2 ">
                                <div className="text-indigo-600 font-semibold mb-2">
                                    {post.category}
                                </div>
                                <div className="text-3xl font-semibold text-black mb-2">
                                    {post.title}
                                </div>
                                <div className="text-gray-600 mb-4 text-xl">
                                    {post.description}
                                </div>
                                <div className="flex items-center">
                                    <Avatar
                                        src={post.author.avatar}
                                        size="md"
                                    />
                                    <div className="ml-3 ">
                                        <div className="text-gray-600 text-sm text-xl">
                                            <span>{post.author.name}</span>
                                            <div
                                                className={
                                                    "rounded-full border-0 bg-green-400 inline-flex w-3 h-3 mx-2"
                                                }
                                            ></div>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </Card_container>
        </SectionContainer>
    );
}
