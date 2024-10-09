import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDashboardStore } from "@/store/dashboardStore";
import { appointment } from "@/types/dashboard";
import { getAppointments } from "@/api/dashboard/appointmentAPI";
import { extractDateAndTime } from "@/utilities/timeZone";
import AppointmentForm from "@/app/dashboard/appointments/appointment-form";

function AppointmentTab() {
  const { appointments, addAppointments } = useDashboardStore((state) => state);

  useEffect(() => {
    (async () => {
      const res = await getAppointments();
      if (res?.success) {
        if (!res.data) return;
        console.log("Appointment fetched successfully");
        addAppointments(
          res.data.map((appointment: appointment) => {
            const { date } = appointment;
            const extractDate = extractDateAndTime(date);
            return {
              ...appointment,
              date: extractDate.date,
              time: extractDate.time,
            };
          }),
        );
      }
    })();
  }, []);

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Appointment</h3>
        </CardHeader>
        <CardBody>
          <AppointmentForm />
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
              <TableColumn>Phone</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Time</TableColumn>
              <TableColumn>Note</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.key}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>
                    <Chip>{appointment.date}</Chip>
                  </TableCell>
                  <TableCell>
                    <Chip>{appointment.time}</Chip>
                  </TableCell>
                  <TableCell>{appointment.note}</TableCell>
                  <TableCell>
                    <Chip>{appointment.status.toUpperCase()}</Chip>
                  </TableCell>
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
