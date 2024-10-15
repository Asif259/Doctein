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
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { appointment, patient } from "@/types/dashboard";
import { getAppointmentByPatientId } from "@/api/dashboard/appointmentAPI";
import toast from "react-hot-toast";
import { extractDateAndTime } from "@/utilities/timeZone";
import Link from "next/link";
import { getPatients } from "@/api/dashboard/patientAPI";
import { useRouter } from "next/navigation";
import DragAndDropInput from "@/app/dashboard/prescription/dnd-input";

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
    React.useState<string>("");
  const [appointments, addAppointments] = useState<appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = React.useState<
    appointment[]
  >([]);
  const { patients, addPatients } = useDashboardStore((state) => state);
  const [filteredPatients, setFilteredPatients] = useState<patient[]>(patients);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
  }, [selectedPatient]);

  useEffect(() => {
    console.log("Selected Appointment:", selectedAppointment);
  }, [selectedAppointment]);

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
  }, [search]);

  useEffect(() => {
    (async () => {
      // Fetch patients
      const res = await getPatients();
      if (res?.success) {
        if (res.data) {
          addPatients(res.data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  useEffect(() => {
    console.log("Appointments:", appointments);
    setFilteredAppointments(appointments);
  }, [appointments]);

  const handleUploadSnapshot = (appointmentId: string | undefined) => {
    setIsModalOpen(true);
    // toast.success("Snapshot uploaded successfully");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add Snapshot</ModalHeader>
              <ModalBody>
                <DragAndDropInput />
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
        <Link href="/dashboard/prescription/add" target="_blank">
          <Button
            startContent={<PlusIcon />}
            variant="solid"
            className="bg-secondary-600 text-secondary-100"
          >
            Add Prescription
          </Button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0">
        <div className="flex-1">
          <Table
            selectionMode="single"
            onSelectionChange={(key) => {
              const set = new Set(key);
              setSelectedPatient(set.values().next().value as string);
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
                    <Chip color="success">{patient.age}</Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex-1">
          {selectedPatient ? (
            <Table
              selectionMode="single"
              onSelectionChange={(key) => {
                const set = new Set(key);
                setSelectedAppointment(set.values().next().value as string);
              }}
              classNames={{
                base: "h-full",
                wrapper: "lg:rounded-l-none h-full",
              }}
              aria-label="Example table with custom cells"
            >
              <TableHeader columns={appointmentCols}>
                {(column) => (
                  <TableColumn key={column.uid} align={"center"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.key}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Chip color="success">{appointment.status}</Chip>
                    </TableCell>
                    <TableCell className="flex flex-row gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="solid"
                        className="bg-secondary-600 text-secondary-100"
                        onClick={() => handleUploadSnapshot(appointment.key)}
                      >
                        Add Snapshot
                      </Button>
                      <Button
                        size="sm"
                        variant="solid"
                        className="bg-secondary-600 text-secondary-100"
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
