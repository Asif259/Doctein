"use client";

import { Card, CardBody, CardHeader, Avatar, Chip } from "@nextui-org/react";
import { FaPhone, FaEnvelope, FaSignature, FaStethoscope } from "react-icons/fa";
import { doctor } from "@/types/dashboard";

function DoctorProfile({ doctor, email }: { doctor: doctor; email: string }) {
  const { name, designation, degrees, specialization, phone, bmdcNumber, digitalSignature } = doctor;

  const avatarFallback = name ? name.split(" ").map((n) => n[0]).join("") : "Dr";

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center pb-0 pt-6 bg-blue-600 text-white rounded-t-lg">
          <Avatar
            src="/placeholder.svg?height=128&width=128"
            alt={name}
            className="w-32 h-32 text-large border-4 border-white"
            fallback={avatarFallback}
          />
          <h2 className="text-3xl font-bold mt-4">{name}</h2>
          <Chip color="primary" variant="flat" className="m-2 bg-blue-200 text-blue-800">
            {designation}
          </Chip>
        </CardHeader>
        <CardBody className="flex flex-col gap-6 bg-white px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center text-gray-800">
            {degrees.map((degree, idx) => (
              <Chip key={idx} variant="flat" className="bg-blue-50 text-blue-600 border border-blue-300">
                {degree}
              </Chip>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaStethoscope className="text-blue-600 text-xl" />
                <div>
                  <span className="font-semibold">Specialization:</span>
                  <span className="ml-2">{specialization}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold">Phone Numbers:</span>
                {phone.map((phoneNumber, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <FaPhone className="text-blue-600 text-xl" />
                    <span>{phoneNumber}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-start md:justify-end items-center gap-2 mb-4">
                <FaEnvelope className="text-blue-600 text-xl" />
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="ml-2">{email}</span>
                </div>
              </div>

              <div className="flex justify-start md:justify-end items-center text-gray-700">
                <span className="font-semibold">BMDC No:</span>
                <span className="ml-2 text-blue-600">{bmdcNumber}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 text-gray-700 border-t border-gray-400 pt-4">
            <FaSignature className="text-blue-600 text-xl" />
            <div className="ml-3">
              <p className="font-serif italic text-blue-600">{digitalSignature}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}


export default DoctorProfile;
