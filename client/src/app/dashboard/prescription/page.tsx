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
    Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
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
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "time" },
    { name: "STATUS", uid: "status" },
    { name: "ACTION", uid: "action" },
];

export default function Page() {
    const router = useRouter();
    const [search, setSearch] = React.useState("");
    const [selectedPatient, setSelectedPatient] = React.useState<string>("");
    const [selectedAppointment, setSelectedAppointment] =
        React.useState<IAppointment | null>(null);
    const [appointments, addAppointments] = useState<IAppointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = React.useState<
        IAppointment[]
    >([]);
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
                appointments.map((appointment) =>
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
                size="5xl"
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>View Snapshot</ModalHeader>
                            <ModalBody>
                                {selectedAppointment?.snapshot && (
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_API_STATIC_URL +
                                            selectedAppointment.snapshot
                                        }
                                        alt="Snapshot"
                                        className="w-fit h-fit"
                                        width={600}
                                        height={800}
                                    />
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                    }}
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    Update
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
            <h1 className="text-3xl font-bold mb-8">Prescriptions</h1>
            <div className="flex justify-between gap-4">
                <Input
                    isClearable
                    type="search"
                    variant="flat"
                    placeholder="Search prescriptions by name, phone, etc."
                    defaultValue=""
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => console.log("input cleared")}
                    className="max-w-xs mb-4"
                />
                <Button
                    startContent={<PlusIcon />}
                    variant="solid"
                    color="primary"
                    className="hover:bg-primary hover:text-white"
                    onClick={() => setIsPatientModalOpen(true)}
                >
                    Add Prescription
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0">
                <div className="flex-1">
                    <Table
                        selectionMode="single"
                        onSelectionChange={(key) => {
                            const set = new Set(key);
                            setSelectedPatient(
                                set.values().next().value as string,
                            );
                        }}
                        classNames={{
                            wrapper: "lg:rounded-r-none",
                        }}
                        aria-label="Example table with custom cells"
                    >
                        <TableHeader columns={patientCols}>
                            {(column) => (
                                <TableColumn key={column.uid} align={"center"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map((patient) => (
                                <TableRow key={patient.key}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>
                                        <Chip color="success">
                                            {patient.age}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex-1">
                    {selectedPatient ? (
                        <Table
                            classNames={{
                                base: "h-full",
                                wrapper: "lg:rounded-l-none h-full",
                            }}
                            aria-label="Example table with custom cells"
                        >
                            <TableHeader columns={appointmentCols}>
                                {(column) => (
                                    <TableColumn
                                        key={column.uid}
                                        align={"center"}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody>
                                {filteredAppointments.map((appointment) => (
                                    <TableRow key={appointment.key}>
                                        <TableCell>
                                            {appointment.date}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.time}
                                        </TableCell>
                                        <TableCell>
                                            <Chip color="success">
                                                {appointment.status}
                                            </Chip>
                                        </TableCell>
                                        <TableCell className="flex flex-row gap-2 justify-center">
                                            {appointment?.snapshot ? (
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    color="success"
                                                    className="hover:bg-success hover:text-white"
                                                    onClick={() => {
                                                        if (!appointment.key)
                                                            return;
                                                        setSelectedAppointment(
                                                            appointment,
                                                        );
                                                        setIsViewModalOpen(
                                                            true,
                                                        );
                                                    }}
                                                >
                                                    View Snapshot
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    color="success"
                                                    className="hover:bg-success hover:text-white"
                                                    onClick={() => {
                                                        if (!appointment.key)
                                                            return;
                                                        setSelectedAppointment(
                                                            appointment,
                                                        );
                                                        handleUploadSnapshot(
                                                            appointment.key,
                                                        );
                                                    }}
                                                >
                                                    Add Snapshot
                                                </Button>
                                            )}

                                            <Button
                                                size="sm"
                                                variant="solid"
                                                color="primary"
                                                className="hover:bg-primary-700"
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/prescription/${appointment.key}`,
                                                    )
                                                }
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Card
                            classNames={{
                                base: "h-full rounded-l-none",
                            }}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-lg text-gray-500">
                                    Select a patient to view details
                                </p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
