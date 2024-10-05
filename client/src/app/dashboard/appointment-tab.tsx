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
import { useDashboardStore } from "@/store/dashboardStore";
import { useFormik } from "formik";
import { appointment } from "@/types/dashboard";

function AppointmentTab() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      patientName: "",
      date: "",
      time: "",
    },
    onSubmit: (values: appointment) => {
      console.log(values);
      addAppointment(values);
    },
  });
  const { appointments, addAppointment } = useDashboardStore((state) => state);
  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Appointment</h3>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <Input
              label="Patient Name"
              placeholder="Enter patient name"
              {...formik.getFieldProps("name")}
            />
            <Input label="Date" type="date" {...formik.getFieldProps("date")} />
            <Input label="Time" type="time" {...formik.getFieldProps("time")} />
            <Button color="primary" type="submit">
              Add Appointment
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Appointment List</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Appointment list">
            <TableHeader>
              <TableColumn>Patient Name</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Time</TableColumn>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default AppointmentTab;
