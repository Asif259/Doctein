"use client";

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
import { staff } from "@/types/dashboard";
import { useDashboardStore } from "@/store/dashboard-store";

function StaffTab() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      role: "",
    },
    onSubmit: (values: staff) => {
      console.log(values);
      addStaff(values);
    },
  });
  const { staffs, addStaff } = useDashboardStore((state) => state);
  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Prescription</h3>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <Input
              label="Patient Name"
              placeholder="Enter patient name"
              {...formik.getFieldProps("name")}
            />
            <Input
              label="Medication"
              placeholder="Enter medication name"
              {...formik.getFieldProps("medication")}
            />
            <Input
              label="Dosage"
              placeholder="Enter dosage"
              {...formik.getFieldProps("dosage")}
            />
            <Button color="primary" type="submit">
              Add Staff
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Prescription List</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Prescription list">
            <TableHeader>
              <TableColumn>Patient Name</TableColumn>
              <TableColumn>Medication</TableColumn>
              <TableColumn>Dosage</TableColumn>
            </TableHeader>
            <TableBody>
              {staffs.map((staff: staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default StaffTab;
