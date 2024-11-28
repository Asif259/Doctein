import React, { useEffect } from "react";
import { usePrescriptionStore } from "@/store/prescription-store";
import { extractDateAndTime } from "@/utilities/timeZone";

function PrescriptionHeader() {
    const prescriptionHeader = usePrescriptionStore(
        (state) => state.prescriptionHeader,
    );
    const [dateTime, setDateTime] = React.useState<{
        date: string;
        time: string;
    }>({
        date: "",
        time: "",
    });

    useEffect(() => {
        if (!prescriptionHeader) return;
        const { date, time } = extractDateAndTime(prescriptionHeader.date);
        setDateTime({ date, time });
    }, [prescriptionHeader]);

    return (
        <>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-green-600">
                        {prescriptionHeader?.doctor.name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {prescriptionHeader?.doctor.degrees.map((degree) => (
                            <span key={degree}>{degree}</span>
                        ))}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                        {prescriptionHeader?.doctor.designation},{" "}
                        {prescriptionHeader?.doctor.specialization}
                    </p>
                    <p className="text-sm text-gray-600">
                        Popular diagnostic center and hospital, Mirpur 10
                    </p>
                    <p className="text-sm text-gray-600">
                        Email: {prescriptionHeader?.doctor.email}
                    </p>
                    <p className="text-sm text-gray-600">
                        Cell: {prescriptionHeader?.doctor.phone.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                        BMDC: {prescriptionHeader?.doctor.bmdcNumber}
                    </p>
                </div>
                {/*<Image*/}
                {/*  src="/placeholder.svg"*/}
                {/*  alt="Hospital Logo"*/}
                {/*  width={80}*/}
                {/*  height={80}*/}
                {/*  className="bg-green-600"*/}
                {/*/>*/}
            </div>
            <div className="border-t border-b border-gray-300 py-2 mb-4 flex flex-wrap justify-between text-sm">
                <div>
                    <span className="font-semibold">Patient:</span>{" "}
                    {prescriptionHeader?.patient.name}
                    <span className="ml-4 font-semibold">Age:</span>{" "}
                    {prescriptionHeader?.patient.age} years
                    <span className="ml-4 font-semibold">Weight:</span>{" "}
                    {prescriptionHeader?.patient.weight}kg
                </div>
                <div>
                    <span className="ml-4 font-semibold">Date:</span>{" "}
                    {dateTime.date}
                    <span className="ml-4 font-semibold">Time:</span>{" "}
                    {dateTime.time}
                </div>
            </div>
        </>
    );
}

export default PrescriptionHeader;
