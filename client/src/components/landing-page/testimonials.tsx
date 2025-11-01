"use client";

import React, { useState, useEffect } from "react";
import { Button, Avatar } from "@nextui-org/react";
import {
    Star,
    Sparkles,
    Quote,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import SectionContainer from "@/components/landing-page/section-container";

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
        quote: "Doctein has completely transformed how we manage our practice. The prescription management system is intuitive and saves us hours every week.",
        authorName: "Dr. Sarah Johnson",
        authorTitle: "General Practitioner",
        avatarSrc: "/Logo.png",
    },
    {
        rating: 4.9,
        quote: "The patient management features are exceptional. Everything is streamlined, and our staff can focus more on patient care rather than paperwork.",
        authorName: "Dr. Michael Chen",
        authorTitle: "Cardiologist",
        avatarSrc: "/Logo.png",
    },
    {
        rating: 5.0,
        quote: "As a busy practice owner, Doctein has been a game-changer. The appointment scheduling and prescription features work flawlessly together.",
        authorName: "Dr. Emily Rodriguez",
        authorTitle: "Pediatrician",
        avatarSrc: "/Logo.png",
    },
    {
        rating: 4.8,
        quote: "The integration capabilities are impressive. We can connect with our existing systems seamlessly, making the transition smooth.",
        authorName: "Dr. James Wilson",
        authorTitle: "Orthopedic Surgeon",
        avatarSrc: "/Logo.png",
    },
    {
        rating: 4.9,
        quote: "Our patient satisfaction has increased significantly since using Doctein. The platform is user-friendly for both staff and patients.",
        authorName: "Dr. Lisa Anderson",
        authorTitle: "Dermatologist",
        avatarSrc: "/Logo.png",
    },
    {
        rating: 5.0,
        quote: "The prescription management system is incredibly efficient. We've reduced medication errors and improved our workflow dramatically.",
        authorName: "Dr. Robert Martinez",
        authorTitle: "Internal Medicine",
        avatarSrc: "/Logo.png",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);

    // Determine cards per view based on screen size
    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateCardsPerView = () => {
            if (window.innerWidth >= 1024) {
                setCardsPerView(3); // lg: 3 cards
            } else if (window.innerWidth >= 768) {
                setCardsPerView(2); // md: 2 cards
            } else {
                setCardsPerView(1); // sm: 1 card
            }
        };

        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    const maxIndex = Math.max(0, objs.length - cardsPerView);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [maxIndex]);

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    return (
        <SectionContainer className="space-y-12 py-8 md:py-12">
            {/* Header */}
            <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-primary animate-pulse" />
                    <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">
                        Testimonials
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                        Trusted by
                    </span>
                    <br />
                    <span className="text-gray-900">
                        Healthcare Professionals
                    </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                    Here&apos;s what doctors and medical professionals are
                    saying about how Doctein has transformed their practice
                    management.
                </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden px-4">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                        }}
                    >
                        {objs.map((obj, index) => (
                            <div
                                key={index}
                                className="relative group flex-shrink-0 px-2 md:px-3"
                                style={{ width: `${100 / cardsPerView}%` }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-white border-2 border-gray-200/80 rounded-2xl p-5 md:p-6 lg:p-8 h-full flex flex-col hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                                    {/* Quote Icon */}
                                    <div className="mb-3 md:mb-4">
                                        <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Quote className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 md:w-4 h-3.5 md:h-4 ${
                                                        i <
                                                        Math.floor(obj.rating)
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                    } transition-colors duration-300`}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs md:text-sm font-bold text-gray-900">
                                            {obj.rating.toFixed(1)}
                                        </span>
                                    </div>

                                    {/* Quote */}
                                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6 flex-1">
                                        &quot;{obj.quote}&quot;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-5 border-t-2 border-gray-100">
                                        <Avatar
                                            src={obj.avatarSrc}
                                            size="md"
                                            className="ring-2 ring-gray-200 group-hover:ring-primary/50 transition-all duration-300"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm md:text-base text-gray-900 truncate">
                                                {obj.authorName}
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-600 truncate">
                                                {obj.authorTitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2  top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-full p-2 hover:bg-white hover:border-primary hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-4 md:w-5 h-4 md:h-5 text-gray-700" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2  top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-full p-2 hover:bg-white hover:border-primary hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-4 md:w-5 h-4 md:h-5 text-gray-700" />
                </button>

                {/* Dot Indicators */}
                <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                                index === currentIndex
                                    ? "w-3 h-3 bg-primary"
                                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6 md:pt-8 px-4">
                <Button
                    size="lg"
                    variant="bordered"
                    className="group border-2 border-primary text-primary font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-primary/30"
                >
                    See All Customer Stories
                    <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
            </div>
        </SectionContainer>
    );
}
