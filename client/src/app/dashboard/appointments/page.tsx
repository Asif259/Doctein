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
  ChipProps,
  Input,
  Button,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { appointment } from "@/types/dashboard";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "PATIENT NAME", uid: "patientName" },
  { name: "PHONE", uid: "phone" },
  { name: "DATE", uid: "date" },
  { name: "TIME", uid: "time" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    key: "1",
    patientName: "Tony Reichert",
    phone: "1234567890",
    date: "2024/05/03",
    time: "10:00 AM",
    status: "upcoming",
  },
];

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [filteredAppointments, setFilteredAppointments] =
    React.useState<appointment[]>(users);
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
      // const res = await deletePatient(patient.key);
      if (res?.success) {
        const latestAppointments = useDashboardStore.getState().appointments;
        const updatedAppointments = latestAppointments.filter((app) => {
          return app && app.key !== appointment.key;
        });
        addAppointments([...updatedAppointments]);
        alert("Appointment deleted successfully");
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
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "time":
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              // color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
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
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchValue),
      ),
    );

    setFilteredAppointments(filtered);
  }, [search]);

  return (
    <>
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
