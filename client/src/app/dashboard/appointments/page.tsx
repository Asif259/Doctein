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
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { appointment } from "@/types/dashboard";
import {
  deleteAppointment,
  getAppointments,
} from "@/api/dashboard/appointmentAPI";
import toast from "react-hot-toast";
import { extractDateAndTime } from "@/utilities/timeZone";
import AppointmentForm from "@/app/dashboard/appointments/appointment-form";

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
    appointment[]
  >([]);
  const { appointments, addAppointments } = useDashboardStore((state) => state);
  const [open, setOpen] = React.useState<boolean>(false);
  const [updateAppointment, setUpdateAppointment] =
    React.useState<appointment | null>(null);

  const handleUpdate = (appointment: appointment) => {
    setUpdateAppointment(appointment);
    setOpen(true);
  };

  const handleDelete = useCallback(
    async (appointment: appointment) => {
      console.log("Delete Appointment");
      console.log(appointment);
      if (!appointment) return;

      // Delete patient
      const res = await deleteAppointment(appointment.key);
      if (res?.success) {
        const latestAppointments = useDashboardStore.getState().appointments;
        const updatedAppointments = latestAppointments.filter((app) => {
          return app && app.key !== appointment.key;
        });
        addAppointments([...updatedAppointments]);
        toast.success("Appointment deleted successfully");
      }
    },
    [addAppointments],
  );

  const renderCell = React.useCallback(
    (appointment: appointment, columnKey: React.Key) => {
      const cellValue = appointment[columnKey as keyof appointment];

      switch (columnKey) {
        case "patientName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "date":
          return (
            <Chip className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
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
            <Chip className="capitalize" size="sm" variant="flat">
              {cellValue}
            </Chip>
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
    [handleDelete],
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
  }, [search]);

  useEffect(() => {
    (async () => {
      // Fetch appointments
      const res = await getAppointments();
      if (res?.success) {
        if (res.data) {
          const appointments = res.data.map((appointment: appointment) => {
            const { date } = appointment;
            const extractDate = extractDateAndTime(date);
            return {
              ...appointment,
              date: extractDate.date,
              time: extractDate.time,
            };
          });
          console.log(appointments);
          addAppointments(appointments);
        }
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Appointments:", appointments);
    setFilteredAppointments(appointments);
  }, [appointments]);

  return (
    <>
      <Modal className="p-5" size="5xl" isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add Appointment</ModalHeader>
              <ModalBody>
                <AppointmentForm appointment={updateAppointment} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="text-3xl font-bold mb-8">Appointments</h1>
      <div className="flex justify-between gap-4">
        <Input
          isClearable
          type="search"
          variant="flat"
          placeholder="Search appointments by name, phone, etc."
          defaultValue=""
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => console.log("input cleared")}
          className="max-w-xs mb-4"
        />
        <Button
          startContent={<PlusIcon />}
          variant="solid"
          className="bg-secondary-600 text-secondary-100"
          onClick={() => setOpen(true)}
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
