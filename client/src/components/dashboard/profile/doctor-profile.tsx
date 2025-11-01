"use client";

import { Avatar, Chip, Divider } from "@nextui-org/react";
import {
    FaPhone,
    FaEnvelope,
    FaSignature,
    FaStethoscope,
    FaGraduationCap,
    FaAward,
    FaUserMd,
} from "react-icons/fa";
import { doctor } from "@/types/dashboard";
import degreeData from "@/data/degrees";
import React from "react";

function DoctorProfile({ doctor, email }: { doctor: doctor; email: string }) {
    const {
        name,
        designation,
        degrees,
        specialization,
        phone,
        bmdcNumber,
        digitalSignature,
    } = doctor;

    const avatarFallback = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
        : "Dr";
    const degreeLabels = degrees.map((degreeKey) => {
        const degree = degreeData.find((d) => d.key === degreeKey);
        return degree ? degree.label : degreeKey;
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <div className="lg:col-span-2 space-y-6">
                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-8 pt-12 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white/20">
                                    {avatarFallback}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <FaUserMd className="text-primary text-lg" />
                                </div>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {name}
                                </h2>
                                {designation && (
                                    <Chip
                                        className="bg-white/20 text-white backdrop-blur-sm border-white/30"
                                        size="lg"
                                    >
                                        {designation}
                                    </Chip>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Specialization */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FaStethoscope className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        Specialization
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {specialization || "Not specified"}
                                    </p>
                                </div>
                            </div>

                            {/* BMDC Number */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FaAward className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        BMDC Registration
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {bmdcNumber}
                                    </p>
                                </div>
                            </div>

                            {/* Degrees */}
                            <div className="flex items-start gap-4 md:col-span-2">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FaGraduationCap className="text-primary text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        Qualifications
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {degreeLabels.map((degree, index) => (
                                            <Chip
                                                key={index}
                                                className="bg-primary/10 text-primary border border-primary/20"
                                                size="md"
                                            >
                                                {degree}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Contact Information
                    </h3>
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FaEnvelope className="text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-base font-semibold text-gray-900">
                                    {email}
                                </p>
                            </div>
                        </div>

                        {/* Phone Numbers */}
                        {phone.map((phoneNumber, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FaPhone className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">
                                        {index === 0
                                            ? "Primary Phone"
                                            : `Phone ${index + 1}`}
                                    </p>
                                    <p className="text-base font-semibold text-gray-900">
                                        {phoneNumber}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Digital Signature Card */}
                {digitalSignature && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-1 h-6 bg-primary rounded-full"></div>
                            Digital Signature
                        </h3>
                        <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FaSignature className="text-primary text-xl" />
                            </div>
                            <p className="text-lg font-serif italic text-gray-700">
                                {digitalSignature}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar Card */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {avatarFallback}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {name}
                            </h3>
                            {designation && (
                                <p className="text-sm text-gray-600">
                                    {designation}
                                </p>
                            )}
                        </div>
                        <Divider className="my-4" />
                        <div className="space-y-3 text-left">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Status
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Active Profile
                                    </p>
                                </div>
                            </div>
                            <Divider className="my-3" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Registered
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                    {bmdcNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;
