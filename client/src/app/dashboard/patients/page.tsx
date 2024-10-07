"use client";

import React, { useEffect } from "react";
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
import { patient } from "@/types/dashboard";
import { useDashboardStore } from "@/store/dashboardStore";
import PatientForm from "@/app/dashboard/patient-form";

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
  const [filteredPatients, setFilteredPatients] = React.useState<patient[]>([]);
  const { patients, addPatients } = useDashboardStore((state) => state);
  const [open, setOpen] = React.useState<boolean>(false);
  const [updatePatient, setUpdatePatient] = React.useState<patient | null>(
    null,
  );

  const renderCell = React.useCallback(
    (patient: patient, columnKey: React.Key) => {
      const cellValue = patient[columnKey as keyof patient];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "age":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
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
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "address":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Prescription">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon className="size-5" />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span
                  onClick={() => handleUpdate(patient)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon className="size-5" />
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
    [],
  );

  const handleUpdate = (patient: patient) => {
    setUpdatePatient(patient);
    setOpen(true);
  };

  const handleDelete = async (patient: patient) => {
    console.log("Delete user");
    console.log(patient);
    if (!patient) return;

    // Delete patient
    const res = await deletePatient(patient.key);
    if (res?.success) {
      const updatedPatients = patients.filter((p) => p.key !== patient.key);
      addPatients(updatedPatients);
      console.log("Patient deleted successfully");
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getPatients();
      if (res?.success) {
        console.log("Patients fetched successfully");
        addPatients(res?.data);
      }
    })();
  }, []);

  useEffect(() => {
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
  }, [search]);

  return (
    <>
      <Modal className="p-5" size="lg" isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add Patient</ModalHeader>
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
          variant="bordered"
          placeholder="Search patients by name, email, etc."
          defaultValue=""
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => console.log("input cleared")}
          className="max-w-xs mb-4"
        />
        <Button
          onClick={() => setOpen(true)}
          startContent={<PlusIcon />}
          color="primary"
          variant="solid"
        >
          Add Patient
        </Button>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredPatients}>
          {(item: any) => (
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
