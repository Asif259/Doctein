import React from "react";
import { Card, Avatar, Image, CardBody } from "@nextui-org/react";
import { CalendarDays } from "lucide-react";

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
        <div className="py-16 px-4 max-w-full mx-28">
            <div className="text-center text-lg text-indigo-600 font-semibold mb-2">
                Our Blog
            </div>
            <div className="text-5xl  text-center mb-4">
                Learn From The Blogs
            </div>
            <div className="text-md text-center text-gray-600 mb-12">
                Here's what some of our customers say about our platform.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                    <Card key={index} shadow={"none"} radius={"none"}>
                        <CardBody className="overflow-hidden grid grid-cols-1 md:grid-cols-7 gap-1">
                            <div
                                className={
                                    "h-full w-full col-span-3 flex flex-row items-center justify-center"
                                }
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className=" h-5/6 object-cover rounded-2xl "
                                />
                            </div>

                            <div className="p-2 col-span-4">
                                <div className="text-indigo-600 font-semibold mb-2">
                                    {post.category}
                                </div>
                                <div className="text-2xl font-bold text-black mb-2">
                                    {post.title}
                                </div>
                                <div className="text-gray-600 mb-4">
                                    {post.description}
                                </div>
                                <div className="flex items-center">
                                    <Avatar
                                        src={post.author.avatar}
                                        size="sm"
                                    />
                                    <div className="ml-3">
                                        <div className="text-gray-600 text-sm ">
                                            <span>{post.author.name}</span>
                                            <div
                                                className={
                                                    "rounded-full border-0 bg-green-400 inline-flex w-2 h-2 mx-2"
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
            </div>
        </div>
    );
}
