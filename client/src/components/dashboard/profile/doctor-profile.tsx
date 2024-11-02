"use client";

import {Card, CardBody, CardHeader, Avatar, Chip} from "@nextui-org/react";
import {FaPhone, FaEnvelope, FaSignature, FaStethoscope} from "react-icons/fa";
import {doctor} from "@/types/dashboard";
import degreeData from "@/data/degrees";
import React from "react";

function DoctorProfile({doctor, email}: { doctor: doctor; email: string }) {
    const {name, designation, degrees, specialization, phone, bmdcNumber, digitalSignature} = doctor;

    const avatarFallback = name ? name.split(" ").map((n) => n[0]).join("") : "Dr";
    const degreeLabels = degrees.map(degreeKey => {
        const degree = degreeData.find(d => d.key === degreeKey);
        return degree ? degree.label : degreeKey;
    });

    return (
        <>
            <Card className="w-full max-w-3xl mx-auto shadow-lg border border-default-400">
                <CardHeader className="flex flex-col items-center pb-0 pt-4 bg-default-100">
                    <Avatar
                        src="/placeholder.svg?height=128&width=128"
                        alt={name}
                        className="w-32 h-32 text-large border-4 border-white"
                        fallback={avatarFallback}
                    />
                    <h2 className="text-3xl font-bold mt-4">{name}</h2>
                    <div className="flex items-center">
                        <Chip color="secondary" className="ml-2">{designation}</Chip>
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 px-8 py-6 bg-default-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FaStethoscope className="text-secondary-100 text-xl"/>
                                <div>
                                    <span className="font-semibold">Specialization:</span>
                                    <span className="ml-2">{specialization}</span>
                                </div>
                            </div>

                            <div>
                                <span className="font-semibold">Phone Numbers:</span>
                                {phone.map((phoneNumber, index) => (
                                    <div key={index} className="flex items-center gap-2 mt-2">
                                        <FaPhone className="text-secondary-100 text-xl"/>
                                        <span>{phoneNumber}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-end items-center gap-2 mb-4">
                                <FaEnvelope className="text-secondary-100 text-xl"/>
                                <div>
                                    <span className="font-semibold">Email:</span>
                                    <span className="ml-2">{email}</span>
                                </div>
                            </div>

                            <div className="flex justify-end flex-wrap mb-4">
                                <span className="font-semibold">Degrees:</span>
                                <span className="ml-1">
                                    {degreeLabels.join(", ")}
                                </span>
                            </div>
                            <div className="flex justify-end items-center">
                                <span className="font-semibold">BMDC No:</span>
                                <span className="ml-2">{bmdcNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8 border-t border-gray-400 pt-4">
                        <FaSignature className="text-secondary-100 text-xl"/>
                        <div className="ml-3">
                            <p className="font-serif italic text-secondary-100">{digitalSignature}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}


export default DoctorProfile;
