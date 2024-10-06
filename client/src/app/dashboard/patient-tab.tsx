import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useDashboardStore } from "@/store/dashboardStore";
import { patient } from "@/types/dashboard";

function PatientTab() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      age: "",
      phone: "",
      address: "",
    },
    onSubmit: (values: patient) => {
      console.log(values);
      addPatient(values);
    },
  });
  const { patients, addPatient } = useDashboardStore((state) => state);

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Patient</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <Input
              label="Patient Name"
              placeholder="Enter patient name"
              {...formik.getFieldProps("name")}
            />
            <Input
              label="Patient Age"
              placeholder="Enter patient age"
              {...formik.getFieldProps("age")}
            />
            <Input
              label="Phone"
              placeholder="phone number"
              {...formik.getFieldProps("phone")}
            />
            <Input
              label="Address"
              placeholder="patient address"
              {...formik.getFieldProps("address")}
            />
            <Button
              className="bg-secondary-600 text-secondary-100"
              type="submit"
            >
              Add Patient
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Patient List</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Patient list">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Age</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Address</TableColumn>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default PatientTab;
