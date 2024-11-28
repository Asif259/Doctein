"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrescriptionTemplate from "@/components/prescription/prescription-template";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Spinner,
} from "@nextui-org/react";
import { getAppointmentById } from "@/api/dashboard/appointmentAPI";
import { useRouter } from "next/navigation";
import { usePrescriptionStore } from "@/store/prescription-store";
import { savePrescription } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";

function Page({ params }: { params: { appointmentId: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const printableDiv = useRef<HTMLDivElement>(null);
    const [isPrint, setIsPrint] = useState<boolean>(false);
    const [history, setHistory] = useState<
        {
            key: string;
            date: string;
            note: string;
            status: string;
        }[]
    >([]);

    const printFn = useReactToPrint({
        onBeforePrint: async () => {
            setIsPrint(true);
        },
        onAfterPrint: () => {
            setIsPrint(false);
        },
    });

    const {
        prescription,
        isEditable,
        resetPrescription,
        setPrescriptionHeader,
        setEditable,
    } = usePrescriptionStore(
        useShallow((state) => ({
            prescription: state.prescription,
            isEditable: state.isEditable,
            resetPrescription: state.resetPrescription,
            setPrescriptionHeader: state.setPrescriptionHeader,
            setEditable: state.setEditable,
        })),
    );

    // handle appointment ID from params
    useEffect(() => {
        resetPrescription();
        (async () => {
            const appointmentId = params.appointmentId;
            const res = await getAppointmentById(appointmentId);
            if (res?.success) {
                console.log("Appointment:", res.data);
                setPrescriptionHeader(res.data);
                if (res.data?.patient?.history) {
                    setHistory(
                        res.data?.patient?.history.map(
                            (h: {
                                _id: string;
                                date: string;
                                note: string;
                                status: string;
                            }) => ({
                                key: h._id,
                                date: h.date,
                                note: h.note,
                                status: h.status,
                            }),
                        ),
                    );
                }
                setLoading(false);
            } else {
                router.push("/prescription/404");
            }
        })();
    }, [
        params.appointmentId,
        resetPrescription,
        router,
        setPrescriptionHeader,
    ]);

    // handle print prescriptions
    const handlePrint = () => {
        setIsPrint(true);
    };

    useEffect(() => {
        console.log("Printable Div: sadasd", printableDiv.current);
        if (isPrint && printableDiv.current) {
            printFn(() => printableDiv.current);
        }
    }, [isPrint, printableDiv, printFn]);

    // handle save prescriptions to database
    const handleSave = async () => {
        console.log("Prescription:", prescription);
        if (prescription.appointmentId === "") {
            return;
        }
        const res = await savePrescription(prescription);
        if (res?.success) {
            toast.success("Prescription saved successfully");
        }
    };

    if (loading) {
        return (
            <div className="flex h-dvh w-full justify-center items-center gap-4">
                <Spinner color="warning" size="lg" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-5 bg-secondary-600 p-3 rounded-md">
                <h1 className="font-black text-2xl">Prescription App</h1>
                <div className="flex flex-row gap-3">
                    {isEditable ? (
                        <>
                            <Button onClick={() => handleSave()}>Save</Button>
                            <Button onClick={() => setEditable(false)}>
                                Preview
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setEditable(true)}>Edit</Button>
                    )}
                    <Button onClick={handlePrint}>Print</Button>
                </div>
            </div>
            <div className="flex flex-row gap-3">
                <div className="w-1/4">
                    {/*<PrescriptionTabs />*/}
                    <Card>
                        <CardHeader className="font-bold">History</CardHeader>
                        <Divider />
                        <CardBody>
                            <ul className="list-none ml-5 text-sm">
                                {history.map((h) => (
                                    <li key={h.key}>
                                        <Link
                                            href={`/dashboard/prescription/${h.key}`}
                                        >
                                            <Card className="p-2">
                                                <p>
                                                    <span className="font-bold">
                                                        Date:
                                                    </span>{" "}
                                                    {h.date}
                                                </p>
                                                <p>
                                                    <span className="font-bold">
                                                        Note:
                                                    </span>{" "}
                                                    {h.note}
                                                </p>
                                                <p>
                                                    <span className="font-bold">
                                                        Status:
                                                    </span>{" "}
                                                    {h.status}
                                                </p>
                                            </Card>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </div>
                <div className="w-3/4">
                    <PrescriptionTemplate
                        isEditable={isEditable}
                        appointmentId={params.appointmentId}
                    />
                    <div className="hidden">
                        <PrescriptionTemplate
                            isEditable={false}
                            isPrint={isPrint}
                            ref={printableDiv}
                            appointmentId={params.appointmentId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
