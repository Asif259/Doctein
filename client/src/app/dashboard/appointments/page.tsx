"use client";

import React, { useCallback, useEffect } from "react";
import {
    Button,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { IAppointment } from "@/types/dashboard";
import {
    changeAppointmentStatus,
    deleteAppointment,
    getAppointments,
} from "@/api/dashboard/appointmentAPI";
import toast from "react-hot-toast";
import AppointmentForm from "@/app/dashboard/appointments/appointment-form";
import { useShallow } from "zustand/react/shallow";
import moment from "moment";

const columns = [
    { name: "PATIENT NAME", uid: "patientName" },
    { name: "PHONE", uid: "phone" },
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "time" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export default function Page() {
    const [search, setSearch] = React.useState("");
    const [filteredAppointments, setFilteredAppointments] = React.useState<
        IAppointment[]
    >([]);
    const { appointments, addAppointments } = useDashboardStore(
        useShallow((state) => ({
            appointments: state.appointments,
            addAppointments: state.addAppointments,
        })),
    );
    const [open, setOpen] = React.useState<boolean>(false);
    const [updateAppointment, setUpdateAppointment] =
        React.useState<IAppointment | null>(null);

    const handleUpdate = (appointment: IAppointment) => {
        setUpdateAppointment(appointment);
        setOpen(true);
    };

    const handleDelete = useCallback(
        async (appointment: IAppointment) => {
            console.log("Delete Appointment");
            console.log(appointment);
            if (!appointment) return;

            // Delete patient
            const res = await deleteAppointment(appointment.key);
            if (res?.success) {
                const latestAppointments =
                    useDashboardStore.getState().appointments;
                const updatedAppointments = latestAppointments.filter((app) => {
                    return app && app.key !== appointment.key;
                });
                addAppointments([...updatedAppointments]);
                toast.success("Appointment deleted successfully");
            }
        },
        [addAppointments],
    );

    const handleStatusChange = useCallback(
        async (
            e: React.ChangeEvent<HTMLSelectElement>,
            key: string | undefined,
        ) => {
            const status = e.target.value as
                | "upcoming"
                | "completed"
                | "cancelled";

            // Change appointment status
            const res = await changeAppointmentStatus(key, status);
            if (res?.success) {
                const latestAppointments =
                    useDashboardStore.getState().appointments;
                const updatedAppointments = latestAppointments.map((app) => {
                    if (app && app.key === updateAppointment?.key) {
                        return { ...app, status };
                    }
                    return app;
                });
                addAppointments([...updatedAppointments]);
                toast.success("Appointment status updated successfully");
            } else {
                toast.error("Failed to update appointment status");
            }
        },
        [updateAppointment?.key, addAppointments],
    );

    const renderCell = React.useCallback(
        (appointment: IAppointment, columnKey: React.Key) => {
            const cellValue:
                | number
                | undefined
                | string
                | "upcoming"
                | "completed"
                | "cancelled"
                | "" = appointment[columnKey as keyof IAppointment];

            switch (columnKey) {
                case "patientName":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </div>
                    );
                case "date":
                    return (
                        <Chip className="flex flex-col">
                            <p className="text-bold text-sm capitalize">
                                {cellValue}
                            </p>
                        </Chip>
                    );
                case "time":
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "status":
                    return (
                        <Select
                            aria-label="Appointment Status"
                            onChange={(e) =>
                                handleStatusChange(e, appointment.key)
                            }
                            defaultSelectedKeys={
                                cellValue ? [cellValue] : ["upcoming"]
                            }
                        >
                            <SelectItem key="upcoming" value="upcoming">
                                Upcoming
                            </SelectItem>
                            <SelectItem key="completed" value="completed">
                                Completed
                            </SelectItem>
                            <SelectItem key="cancelled" value="cancelled">
                                Cancelled
                            </SelectItem>
                        </Select>
                    );
                case "actions":
                    return (
                        <div className="relative flex justify-center items-center gap-2">
                            <Tooltip content="Prescription">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon className="size-5 text-secondary-700" />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit Appointment">
                                <span
                                    onClick={() => handleUpdate(appointment)}
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <EditIcon className="size-5 text-warning-500" />
                                </span>
                            </Tooltip>
                            <Tooltip
                                content="Delete Appointment"
                                classNames={{
                                    content: "bg-danger-500 text-white",
                                }}
                            >
                                <span
                                    onClick={() => handleDelete(appointment)}
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
        [handleDelete, handleStatusChange],
    );

    useEffect(() => {
        if (!search) {
            setFilteredAppointments(appointments);
            return;
        }

        const searchValue = search.toLowerCase();
        const filtered = appointments.filter((appointment) =>
            Object.values(appointment).some((value) =>
                String(value).toLowerCase().includes(searchValue),
            ),
        );

        setFilteredAppointments(filtered);
    }, [search, appointments]);

    useEffect(() => {
        (async () => {
            // Fetch appointments
            const res = await getAppointments();
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
    }, [addAppointments]);

    useEffect(() => {
        console.log("Appointments:", appointments);
        setFilteredAppointments(appointments);
    }, [appointments]);

    return (
        <>
            <Modal
                className="p-5"
                size="5xl"
                isOpen={open}
                onOpenChange={setOpen}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Add Appointment</ModalHeader>
                            <ModalBody>
                                <AppointmentForm
                                    appointment={
                                        updateAppointment
                                            ? updateAppointment
                                            : undefined
                                    }
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-3xl font-bold mb-8">Appointments</h1>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <Input
                    isClearable
                    type="search"
                    variant="flat"
                    placeholder="Search appointments by name, phone, etc."
                    defaultValue=""
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch("")}
                    className="max-w-xs "
                />
                <div className="flex gap-4 items-center">
                    <Select
                        placeholder="Sort by status"
                        variant="flat"
                        onChange={(e) =>
                            console.log("Sort by:", e.target.value)
                        }
                        className="w-32 shadow-sm"
                    >
                        <SelectItem key="upcoming" value="upcoming">
                            Upcoming
                        </SelectItem>
                        <SelectItem key="completed" value="completed">
                            Completed
                        </SelectItem>
                        <SelectItem key="cancelled" value="cancelled">
                            Cancelled
                        </SelectItem>
                    </Select>
                    <Select
                        placeholder="Sort by"
                        variant="flat"
                        onChange={(e) =>
                            console.log("Sort by:", e.target.value)
                        }
                        className="w-32 shadow-sm"
                    >
                        <SelectItem key="date" value="date">
                            Date
                        </SelectItem>
                        <SelectItem key="time" value="time">
                            Time
                        </SelectItem>
                    </Select>
                </div>
                <Button
                    startContent={<PlusIcon />}
                    variant="solid"
                    color="primary"
                    className="shadow-md hover:bg-primary hover:text-white"
                    onClick={() => {
                        setUpdateAppointment(null);
                        setOpen(true);
                    }}
                >
                    Add Appointment
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
                <TableBody items={filteredAppointments}>
                    {(item) => (
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
