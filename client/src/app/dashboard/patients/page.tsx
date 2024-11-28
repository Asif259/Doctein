"use client";

import React, { useCallback, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { deletePatient, getPatients } from "@/api/dashboard/patientAPI";
import { IPatient } from "@/types/dashboard";
import { useDashboardStore } from "@/store/dashboard-store";
import PatientForm from "@/app/dashboard/patients/patient-form";
import { useShallow } from "zustand/react/shallow";

const columns = [
    { name: "NAME", uid: "name" },
    { name: "AGE", uid: "age" },
    { name: "WEIGHT", uid: "weight" },
    { name: "PHONE", uid: "phone" },
    { name: "ADDRESS", uid: "address" },
    { name: "ACTIONS", uid: "actions" },
];

export default function Page() {
    const [search, setSearch] = React.useState("");
    const [filteredPatients, setFilteredPatients] = React.useState<IPatient[]>(
        [],
    );
    const { patients, addPatients } = useDashboardStore(
        useShallow((state) => ({
            patients: state.patients,
            addPatients: state.addPatients,
        })),
    );
    const [open, setOpen] = React.useState<boolean>(false);
    const [updatePatient, setUpdatePatient] = React.useState<IPatient | null>(
        null,
    );

    const handleUpdate = (patient: IPatient) => {
        setUpdatePatient(patient);
        setOpen(true);
    };

    const handleDelete = useCallback(
        async (patient: IPatient) => {
            console.log("Delete user");
            console.log(patient);
            if (!patient) return;

            // Delete patient
            const res = await deletePatient(patient.key);
            if (res?.success) {
                const latestPatients = useDashboardStore.getState().patients;
                const updatedPatients = latestPatients.filter((p) => {
                    return p && p.key !== patient.key;
                });
                addPatients([...updatedPatients]);
                alert("Patient deleted successfully");
            }
        },
        [addPatients],
    );

    const renderCell = React.useCallback(
        (patient: IPatient, columnKey: React.Key) => {
            const cellValue = patient[columnKey as keyof IPatient];

            switch (columnKey) {
                case "name":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </div>
                    );
                case "age":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </div>
                    );
                case "weight":
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {cellValue} kg
                        </Chip>
                    );
                case "phone":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </div>
                    );
                case "address":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="relative flex justify-center items-center gap-2">
                            <Tooltip content="Prescription">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon className="size-5 text-secondary-700" />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit user">
                                <span
                                    onClick={() => handleUpdate(patient)}
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <EditIcon className="size-5 text-warning-500" />
                                </span>
                            </Tooltip>
                            <Tooltip
                                content="Delete user"
                                classNames={{
                                    content: "bg-danger-500 text-white",
                                }}
                            >
                                <span
                                    onClick={() => handleDelete(patient)}
                                    className="text-lg text-danger cursor-pointer active:opacity-50"
                                >
                                    <TrashIcon className="size-5" />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [handleDelete],
    );

    useEffect(() => {
        (async () => {
            const res = await getPatients();
            if (res?.success) {
                console.log("Patients fetched successfully");
                addPatients(res?.data);
            }
        })();
    }, [addPatients]);

    useEffect(() => {
        console.log("Patients:", patients);
        setFilteredPatients(patients);
    }, [patients]);

    useEffect(() => {
        if (!search) {
            setFilteredPatients(patients);
            return;
        }

        const searchValue = search.toLowerCase();
        const filtered = patients.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(searchValue),
            ),
        );

        setFilteredPatients(filtered);
    }, [search, patients]);

    return (
        <>
            <Modal
                className="p-5"
                size="lg"
                isOpen={open}
                onOpenChange={setOpen}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                {updatePatient
                                    ? "Update Patient"
                                    : "Add Patient"}
                            </ModalHeader>
                            <ModalBody>
                                <PatientForm patient={updatePatient} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-3xl font-bold mb-8">Patients</h1>
            <div className="flex justify-between gap-4">
                <Input
                    isClearable
                    type="search"
                    variant="flat"
                    placeholder="Search patients by name, phone, etc."
                    defaultValue=""
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => console.log("input cleared")}
                    className="max-w-xs mb-4"
                />
                <Button
                    onClick={() => {
                        setUpdatePatient(null);
                        setOpen(true);
                    }}
                    startContent={<PlusIcon />}
                    className="hover:bg-primary hover:text-white"
                    variant="solid"
                    color="primary"
                >
                    Add Patient
                </Button>
            </div>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={"center"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filteredPatients}>
                    {(item: IPatient) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
