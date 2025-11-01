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
    Chip,
} from "@nextui-org/react";
import { Save, Eye, Edit, Printer, ArrowLeft, Clock, FileText } from "lucide-react";
import { getAppointmentById } from "@/api/dashboard/appointmentAPI";
import { useRouter } from "next/navigation";
import { usePrescriptionStore } from "@/store/prescription-store";
import { savePrescription } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import moment from "moment";

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
        const appointmentId = params.appointmentId;
        if (!appointmentId) return;
        (async () => {
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
                                date: moment(h.date).format("DD MMM YYYY"),
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
    }, [params.appointmentId, setPrescriptionHeader]);

    // handle print prescriptions
    const handlePrint = () => {
        setIsPrint(true);
    };

    useEffect(() => {
        console.log("Printable Div: sadasd", printableDiv.current);
        if (isPrint && printableDiv.current) {
            printFn(() => printableDiv.current);
        }
    }, [isPrint, printableDiv]);

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
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto ">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Button
                                    isIconOnly
                                    variant="light"
                                    className="hover:bg-gray-100"
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                                    Prescription Editor
                                </h1>
                            </div>
                            <p className="text-lg text-gray-600 ml-11">
                                Create and manage patient prescriptions
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {isEditable ? (
                                <>
                                    <Button
                                        startContent={<Save className="w-4 h-4" />}
                                        className="bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-lg"
                                        onClick={() => handleSave()}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        startContent={<Eye className="w-4 h-4" />}
                                        variant="bordered"
                                        className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                        onClick={() => setEditable(false)}
                                    >
                                        Preview
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    startContent={<Edit className="w-4 h-4" />}
                                    className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                                    onClick={() => setEditable(true)}
                                >
                                    Edit Prescription
                                </Button>
                            )}
                            <Button
                                startContent={<Printer className="w-4 h-4" />}
                                className="bg-gray-700 text-white hover:bg-gray-800 transition-all duration-200 shadow-lg"
                                onClick={handlePrint}
                            >
                                Print
                            </Button>
                        </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="ml-11">
                        <Chip
                            color={isEditable ? "warning" : "success"}
                            variant="flat"
                            className="font-medium"
                        >
                            {isEditable ? "Editing Mode" : "Preview Mode"}
                        </Chip>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* History Sidebar */}
                    <div className="lg:w-1/4">
                        <Card className="shadow-xl border border-gray-100 sticky top-8">
                            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Patient History
                                        </h2>
                                        <p className="text-xs text-gray-600">
                                            Previous appointments
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className="p-4">
                                {history.length > 0 ? (
                                    <div className="space-y-3">
                                        {history.map((h) => (
                                            <Link
                                                key={h.key}
                                                href={`/dashboard/prescription/${h.key}`}
                                                className="block"
                                            >
                                                <Card className="hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-primary/50 cursor-pointer">
                                                    <CardBody className="p-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                                    <span className="text-sm font-semibold text-gray-900">
                                                                        {h.date}
                                                                    </span>
                                                                </div>
                                                                <Chip
                                                                    size="sm"
                                                                    color={
                                                                        h.status ===
                                                                        "completed"
                                                                            ? "success"
                                                                            : "warning"
                                                                    }
                                                                    variant="flat"
                                                                    className="text-xs"
                                                                >
                                                                    {h.status}
                                                                </Chip>
                                                            </div>
                                                            {h.note && (
                                                                <div className="flex items-start gap-2">
                                                                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                                    <p className="text-xs text-gray-600 line-clamp-2">
                                                                        {h.note}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Clock className="w-12 h-12 text-gray-300 mb-3" />
                                        <p className="text-sm text-gray-500">
                                            No history available
                                        </p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Prescription Template */}
                    <div className="lg:w-3/4">
                        <Card className="shadow-xl border border-gray-100">
                            <CardBody className="p-6">
                                <PrescriptionTemplate
                                    isEditable={isEditable}
                                    appointmentId={params.appointmentId}
                                />
                            </CardBody>
                        </Card>
                        {/* Hidden Print Template */}
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
        </div>
    );
}

export default Page;
