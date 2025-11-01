"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import { PlusIcon, Calendar, Users } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { IAppointment, IPatient } from "@/types/dashboard";
import { getAppointmentByPatientId } from "@/api/dashboard/appointmentAPI";
import { getPatients } from "@/api/dashboard/patientAPI";
import { useRouter } from "next/navigation";
import DragAndDropInput from "@/app/dashboard/prescription/dnd-input";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import PatientForm from "@/app/dashboard/patients/patient-form";
import moment from "moment";

const patientCols = [
    { name: "PATIENT NAME", uid: "patientName" },
    { name: "PHONE", uid: "phone" },
    { name: "AGE", uid: "age" },
];

const appointmentCols = [
    { name: "DATE & TIME", uid: "date" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "action" },
];

export default function Page() {
    const router = useRouter();
    const [search, setSearch] = React.useState("");
    const [selectedPatient, setSelectedPatient] = React.useState<string>("");
    const [selectedAppointment, setSelectedAppointment] =
        React.useState<IAppointment | null>(null);
    const [appointments, addAppointments] = useState<IAppointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = React.useState<IAppointment[]>([]);
    const { patients, addPatients } = useDashboardStore(
        useShallow((state) => ({
            patients: state.patients,
            addPatients: state.addPatients,
        })),
    );
    const [filteredPatients, setFilteredPatients] =
        useState<IPatient[]>(patients);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isPatientModalOpen, setIsPatientModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        console.log("Selected Patient:", selectedPatient);
        if (!selectedPatient) {
            setFilteredAppointments([]);
            return;
        }
        (async () => {
            const res = await getAppointmentByPatientId(selectedPatient);
            if (res?.success) {
                if (res.data) {
                    const appointments = res.data.map(
                        (appointment: IAppointment) => {
                            return {
                                ...appointment,
                                date: moment(appointment.date).format(
                                    "DD MMM YYYY",
                                ),
                                time: moment(appointment.date).format(
                                    "hh:mm A",
                                ),
                            };
                        },
                    );
                    console.log(appointments);
                    addAppointments(appointments);
                }
            }
        })();
    }, [selectedPatient]);

    useEffect(() => {
        if (!search) {
            setFilteredPatients(patients);
            return;
        }

        const searchValue = search.toLowerCase();
        const filtered = patients.filter((patient) =>
            Object.values(patient).some((value) =>
                String(value).toLowerCase().includes(searchValue),
            ),
        );

        setFilteredPatients(filtered);
    }, [search, patients]);

    useEffect(() => {
        (async () => {
            // Fetch patients
            const res = await getPatients("prescription");
            if (res?.success) {
                if (res.data) {
                    addPatients(res.data);
                }
            }
        })();
    }, [addPatients]);

    useEffect(() => {
        setFilteredPatients(patients);
    }, [patients]);

    useEffect(() => {
        console.log("Appointments:", appointments);
        setFilteredAppointments(appointments);
    }, [appointments]);

    // Handle upload snapshot
    useEffect(() => {
        console.log("Selected Appointment:", selectedAppointment);
        if (selectedAppointment?.snapshot) {
            setFilteredAppointments((appointments) =>
                appointments.map((appointment: IAppointment) =>
                    appointment.key === selectedAppointment.key
                        ? {
                              ...appointment,
                              snapshot: selectedAppointment.snapshot,
                          }
                        : appointment,
                ),
            );
        }
    }, [selectedAppointment]);

    const handleUploadSnapshot = (_appointmentId: string | undefined) => {
        console.log("Appointment ID:", _appointmentId);
        setIsModalOpen(true);
        // toast.success("Snapshot uploaded successfully");
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {selectedAppointment?.snapshot
                                    ? "Update"
                                    : "Add"}{" "}
                                Snapshot
                            </ModalHeader>
                            <ModalBody>
                                {selectedAppointment && (
                                    <DragAndDropInput
                                        onClose={onClose}
                                        appointment={selectedAppointment}
                                        setAppointment={setSelectedAppointment}
                                    />
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                size="2xl"
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                scrollBehavior="inside"
                classNames={{
                    base: "bg-white",
                    header: "border-b border-gray-200 pb-4",
                    footer: "border-t border-gray-200 pt-4",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Prescription Snapshot
                                </h2>
                                {selectedAppointment?.patientName && (
                                    <p className="text-sm text-gray-600 font-normal">
                                        Patient:{" "}
                                        {selectedAppointment.patientName}
                                    </p>
                                )}
                            </ModalHeader>
                            <ModalBody className="py-6 overflow-hidden">
                                {selectedAppointment?.snapshot ? (
                                    <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <div className="relative w-full flex justify-center max-h-[calc(80vh-200px)] overflow-hidden">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_API_STATIC_URL +
                                                    selectedAppointment.snapshot.replace(
                                                        /\\/g,
                                                        "/",
                                                    )
                                                }
                                                alt="Prescription Snapshot"
                                                className="rounded-lg shadow-lg object-contain"
                                                width={500}
                                                height={700}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight:
                                                        "calc(80vh - 200px)",
                                                    height: "auto",
                                                    width: "auto",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <p className="text-gray-500 text-lg">
                                            No snapshot available
                                        </p>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="flex justify-between gap-3">
                                <Button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                    }}
                                    variant="bordered"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                                >
                                    Update Snapshot
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                className="p-4"
                isOpen={isPatientModalOpen}
                onOpenChange={setIsPatientModalOpen}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Add Prescription</ModalHeader>
                            <ModalBody>
                                <PatientForm isPrescription={true} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                            Prescriptions
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage patient prescriptions and medical records
                        </p>
                    </div>
                    <Button
                        startContent={<PlusIcon />}
                        size="lg"
                        className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                        onClick={() => setIsPatientModalOpen(true)}
                    >
                        Add Prescription
                    </Button>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <Input
                        isClearable
                        type="search"
                        variant="bordered"
                        placeholder="Search patients by name, phone, etc."
                        defaultValue=""
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch("")}
                        className="max-w-md"
                        classNames={{
                            input: "text-base",
                            inputWrapper:
                                "border-gray-300 hover:border-primary",
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Patients Section */}
                <div className="flex-1">
                    <Card className="shadow-xl border border-gray-100">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Patients
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Select a patient to view appointments
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="p-0">
                            <Table
                                selectionMode="single"
                                onSelectionChange={(key) => {
                                    const set = new Set(key);
                                    setSelectedPatient(
                                        set.values().next().value as string,
                                    );
                                }}
                                aria-label="Patients table"
                                classNames={{
                                    wrapper: "min-h-[400px]",
                                    th: "bg-gray-50 text-gray-700 font-semibold",
                                    td: "text-gray-800",
                                }}
                            >
                                <TableHeader columns={patientCols}>
                                    {(column) => (
                                        <TableColumn key={column.uid}>
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody emptyContent="No patients found">
                                    {filteredPatients.map((patient) => (
                                        <TableRow key={patient.key}>
                                            <TableCell>
                                                <span className="font-semibold text-gray-900">
                                                    {patient.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-gray-700">
                                                    {patient.phone}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    color="primary"
                                                    variant="flat"
                                                    className="font-medium"
                                                >
                                                    {patient.age} years
                                                </Chip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>

                {/* Appointments Section */}
                <div className="flex-1">
                    {selectedPatient ? (
                        <Card className="shadow-xl border border-gray-100">
                            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Appointments
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            View and manage appointments
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="p-0">
                                <Table
                                    aria-label="Appointments table"
                                    classNames={{
                                        wrapper: "min-h-[400px]",
                                        th: "bg-gray-50 text-gray-700 font-semibold",
                                        td: "text-gray-800",
                                    }}
                                >
                                    <TableHeader columns={appointmentCols}>
                                        {(column) => (
                                            <TableColumn key={column.uid}>
                                                {column.name}
                                            </TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody emptyContent="No appointments found">
                                        {filteredAppointments.map(
                                            (appointment: IAppointment) => (
                                                <TableRow key={appointment.key}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900">
                                                                {
                                                                    appointment.date
                                                                }
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    appointment.time
                                                                }
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            color={
                                                                appointment.status ===
                                                                "completed"
                                                                    ? "success"
                                                                    : appointment.status ===
                                                                        "upcoming"
                                                                      ? "warning"
                                                                      : "danger"
                                                            }
                                                            variant="flat"
                                                            className="font-medium capitalize"
                                                        >
                                                            {appointment.status}
                                                        </Chip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-row gap-2 justify-center">
                                                            {appointment?.snapshot ? (
                                                                <Button
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="success"
                                                                    className="font-medium"
                                                                    onClick={() => {
                                                                        if (
                                                                            !appointment.key
                                                                        )
                                                                            return;
                                                                        setSelectedAppointment(
                                                                            appointment,
                                                                        );
                                                                        setIsViewModalOpen(
                                                                            true,
                                                                        );
                                                                    }}
>
                                                                    View
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="default"
                                                                    className="font-medium bg-secondary text-white hover:bg-secondary/90 transition-all duration-200 shadow-lg shadow-secondary/20"
                                                                    onClick={() => {
                                                                        if (
                                                                            !appointment.key
                                                                        )
                                                                            return;
                                                                        setSelectedAppointment(
                                                                            appointment,
                                                                        );
                                                                        handleUploadSnapshot(
                                                                            appointment.key,
                                                                        );
                                                                    }}
                                                                >
                                                                    Upload
                                                                </Button>
                                                            )}
                                                            <Button
                                                                size="sm"
                                                                className="bg-primary text-white hover:bg-primary/90 font-medium shadow-md"
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/dashboard/prescription/${appointment.key}`,
                                                                    )
                                                                }
                                                            >
                                                                Prescription
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </CardBody>
                        </Card>
                    ) : (
                        <Card className="shadow-xl border border-gray-100 h-full">
                            <CardBody className="flex flex-col items-center justify-center h-[400px]">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-4 ring-4 ring-gray-50">
                                    <Users className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Patient Selected
                                </h3>
                                <p className="text-gray-600 text-center max-w-md">
                                    Select a patient from the list to view
                                    their appointment history and manage
                                    prescriptions
                                </p>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}