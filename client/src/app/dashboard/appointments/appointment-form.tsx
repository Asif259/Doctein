import React, { useEffect } from "react";
import { useFormik } from "formik";
import { appointment, patient } from "@/types/dashboard";
import toast from "react-hot-toast";
import { extractDateAndTime, getDateString } from "@/utilities/timeZone";
import { createAppointment } from "@/api/dashboard/appointmentAPI";
import { useDashboardStore } from "@/store/dashboard-store";
import { getPatients } from "@/api/dashboard/patientAPI";
import {
    Button,
    Divider,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { CalendarIcon, ClockIcon, NotebookPenIcon } from "lucide-react";

function AppointmentForm({ appointment }: { appointment?: any }) {
    const formik = useFormik({
        initialValues: {
            id: 0,
            patientName: appointment?.patientName || "",
            phone: appointment?.phone || "",
            date: appointment?.date || "",
            time: appointment?.time || "",
            note: appointment?.note || "",
            status: appointment?.status || "upcoming",
        },
        onSubmit: async (values: appointment) => {
            if (!selectedPatient) {
                toast.error("Please select a patient");
                return;
            }
            if (!values.date || !values.time) {
                toast.error("Please select date and time");
                return;
            }
            const dateTime = getDateString(values.date, values.time);

            const res = await createAppointment({
                patientId: selectedPatient,
                date: dateTime,
                note: values.note || "",
            });
            if (res?.success) {
                if (res.data) {
                    const { date } = res.data;
                    const extractDate = extractDateAndTime(date);
                    addAppointments([
                        ...appointments,
                        {
                            ...res.data,
                            date: extractDate.date,
                            time: extractDate.time,
                        },
                    ]);
                }
                toast.success("Appointment created successfully");
            }
        },
    });
    const { appointments, addAppointments } = useDashboardStore(
        (state) => state,
    );
    const [patients, setPatients] = React.useState<patient[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [selectedPatient, setSelectedPatient] = React.useState<
        string | undefined
    >(appointment ? appointment.patientId : undefined);

    const handleSearch = async () => {
        if (!search) return;
        const res = await getPatients(search);
        if (res?.success) {
            console.log("Patients fetched successfully");
            setPatients(res.data);
        }
    };

    useEffect(() => {
        if (!search) {
            setPatients([]);
            setSelectedPatient(undefined);
        }
    }, [search]);

    return (
        <div className="flex flex-row justify-evenly gap-5">
            <div className="flex-1 space-y-4">
                <header>
                    <h4 className="text-lg font-semibold">Select Patient</h4>
                    <p className="text-sm text-gray-500">
                        Select a patient to create an appointment
                    </p>
                </header>
                <Divider />
                <Input
                    label="Search Patient"
                    placeholder="search by name or phone"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    endContent={
                        <Button
                            onClick={handleSearch}
                            className="bg-primary-700 text-white"
                        >
                            Search
                        </Button>
                    }
                />
                <Table
                    selectionMode="single"
                    onSelectionChange={(selected) => {
                        const set = new Set(selected);
                        const iterator = set.values();
                        setSelectedPatient(iterator.next().value?.toString());
                    }}
                    aria-label="Patient list"
                >
                    <TableHeader>
                        <TableColumn>Patient Name</TableColumn>
                        <TableColumn>Phone</TableColumn>
                        <TableColumn>Age</TableColumn>
                        <TableColumn>Weight</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {appointment ? (
                            <TableRow key={appointment.key}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell>{appointment.age}</TableCell>
                                <TableCell>{appointment.weight}</TableCell>
                            </TableRow>
                        ) : (
                            patients.map((patient) => (
                                <TableRow key={patient.key}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.weight}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1 space-y-4">
                <header>
                    <h4 className="text-lg font-semibold">
                        Select Date &amp; Time
                    </h4>
                    <p className="text-sm text-gray-500">
                        Select the date and time for the appointment
                    </p>
                </header>
                <Divider />
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <Input
                        startContent={<CalendarIcon size={20} />}
                        label="Date"
                        type="date"
                        {...formik.getFieldProps("date")}
                    />
                    <Input
                        startContent={<ClockIcon size={20} />}
                        label="Time"
                        type="time"
                        {...formik.getFieldProps("time")}
                    />
                    <Input
                        startContent={<NotebookPenIcon size={20} />}
                        label="Note"
                        placeholder="Enter note"
                        {...formik.getFieldProps("note")}
                    />
                    <Button
                        variant="bordered"
                        color="primary"
                        className="w-full hover:bg-primary hover:text-white"
                        type="submit"
                    >
                        {appointment ? "Update" : "Add"} Appointment
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm;
