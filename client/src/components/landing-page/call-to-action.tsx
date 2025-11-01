import React from "react";
import {
    ArrowRight,
    CheckCircle2,
    CreditCard,
    Clock,
    XCircle,
    Sparkles,
    Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Call2Action() {
    const router = useRouter();

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 px-4 py-16 md:py-20 lg:py-24">
            {/* Animated background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                <div className="absolute top-20 right-10 w-80 h-80 bg-white/15 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                        Start Your Journey Today
                    </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight">
                        Ready to Transform
                        <br />
                        <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                            Your Practice?
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of healthcare professionals who are
                        already revolutionizing their practice management with
                        Doctein.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="group relative inline-flex items-center gap-3 px-8 py-5 bg-white text-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-3">
                            Get Started for Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            document
                                .getElementById("pricing")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        <Zap className="w-5 h-5" />
                        Explore Pricing
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                            <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                No Credit Card
                            </p>
                            <p className="text-xs text-white/80">Required</p>
                        </div>
                    </div>
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                14-Day Free
                            </p>
                            <p className="text-xs text-white/80">Trial</p>
                        </div>
                    </div>
                    <div className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                            <XCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                Cancel
                            </p>
                            <p className="text-xs text-white/80">Anytime</p>
                        </div>
                    </div>
                </div>

                {/* Additional trust badge */}
                <div className="pt-8 flex items-center justify-center gap-2 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-white/90" />
                    <span className="text-sm font-medium">
                        Trusted by 500+ healthcare professionals
                    </span>
                </div>
            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
    );
}
