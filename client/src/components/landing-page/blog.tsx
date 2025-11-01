import React from "react";
import { Card, Avatar, Image, CardBody } from "@nextui-org/react";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import SectionContainer from "@/components/landing-page/section-container";

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
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        category: "Healthcare Tech",
        title: "The Future of Digital Healthcare Management",
        description:
            "Discover how modern healthcare platforms are revolutionizing patient care and practice management through innovative technology solutions...",
        image: "/Logo.png",
        author: {
            name: "Dr. Sarah Johnson",
            avatar: "/Logo.png",
        },
        date: "Oct 24, 2024",
        readTime: "5 min read",
    },
    {
        category: "Practice Management",
        title: "Streamlining Your Medical Practice Operations",
        description:
            "Learn best practices for optimizing your medical practice workflow, from appointment scheduling to patient record management...",
        image: "/Logo.png",
        author: {
            name: "Dr. Michael Chen",
            avatar: "/Logo.png",
        },
        date: "Oct 20, 2024",
        readTime: "4 min read",
    },
    {
        category: "Product Updates",
        title: "New Features: Enhanced Prescription Management",
        description:
            "We've launched exciting new features that make prescription management faster, more secure, and easier than ever before...",
        image: "/Logo.png",
        author: {
            name: "Doctein Team",
            avatar: "/Logo.png",
        },
        date: "Oct 15, 2024",
        readTime: "3 min read",
    },
    {
        category: "Industry Insights",
        title: "Telemedicine: The New Normal in Healthcare",
        description:
            "Explore how telemedicine platforms are transforming patient-doctor interactions and making healthcare more accessible...",
        image: "/Logo.png",
        author: {
            name: "Dr. Emily Rodriguez",
            avatar: "/Logo.png",
        },
        date: "Oct 10, 2024",
        readTime: "6 min read",
    },
];

export default function Blog() {
    return (
        <SectionContainer className="space-y-12 md:space-y-16 lg:space-y-20 py-8 md:py-12 lg:py-16">
            {/* Header */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                        Latest Insights
                    </span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                        Stories & Updates
                    </span>
                    <br />
                    <span className="text-gray-900">From Our Blog</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Explore the latest in healthcare innovation, expert
                    insights, and practice management strategies
                </p>
            </div>

            {/* Featured Post */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Card className="relative bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-gray-200/80 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-80 lg:h-[500px] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                            <div className="absolute inset-0">
                                <Image
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <div className="absolute top-6 left-6 z-10">
                                <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm text-primary text-sm font-bold rounded-full shadow-xl border border-primary/20">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Featured
                                </span>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{blogPosts[0].readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardBody className="p-8 lg:p-12 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="px-4 py-1.5 bg-gradient-to-r from-primary/15 to-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider border border-primary/20">
                                    {blogPosts[0].category}
                                </span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-5 group-hover:text-primary transition-colors duration-300 leading-tight">
                                {blogPosts[0].title}
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-4">
                                {blogPosts[0].description}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        src={blogPosts[0].author.avatar}
                                        size="lg"
                                        className="ring-4 ring-primary/20 ring-offset-2"
                                    />
                                    <div>
                                        <p className="text-base font-bold text-gray-900">
                                            {blogPosts[0].author.name}
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {blogPosts[0].date}
                                        </p>
                                    </div>
                                </div>
                                <button className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-full hover:from-primary/90 hover:to-primary transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105">
                                    <span>Read Article</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </CardBody>
                    </div>
                </Card>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {blogPosts.slice(1).map((post, index) => (
                    <div key={index} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Card className="relative bg-white border-2 border-gray-200/80 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-lg border border-primary/20">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                            <CardBody className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-1">
                                    {post.description}
                                </p>
                                <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src={post.author.avatar}
                                            size="sm"
                                            className="ring-2 ring-gray-200 group-hover:ring-primary/50 transition-all duration-300"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                {post.author.name}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-primary/95 to-primary text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 border-2 border-primary/20">
                    <span>Explore All Articles</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </SectionContainer>
    );
}
