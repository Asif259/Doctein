import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
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
import { appointment, patient } from "@/types/dashboard";
import { CalendarIcon, ClockIcon, NotebookPenIcon } from "lucide-react";
import { getPatients } from "@/api/dashboard/patientAPI";
import { getAppointments } from "@/api/dashboard/appointmentAPI";

function AppointmentTab() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      patientName: "",
      phone: "",
      date: "",
      time: "",
      note: "",
    },
    onSubmit: (values: appointment) => {
      console.log(values);
      // addAppointment(values);
    },
  });
  const { appointments, addAppointments } = useDashboardStore((state) => state);
  const [patients, setPatients] = React.useState<patient[]>([]);
  const [search, setSearch] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getAppointments();
      if (res?.success) {
        console.log("Appointment fetched successfully");
        addAppointments(res.data);
      }
    })();
  }, []);

  const handleSearch = async () => {
    const res = await getPatients(search);
    if (res?.success) {
      console.log("Patients fetched successfully");
      setPatients(res.data);
    }
  };

  useEffect(() => {
    if (!selectedPatient) return;
    const iterator = selectedPatient.values();
    console.log(iterator.next().value);
  }, [selectedPatient]);

  useEffect(() => {
    if (!search) setPatients([]);
  }, [search]);

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Appointment</h3>
        </CardHeader>
        <CardBody className="flex flex-row justify-evenly gap-5">
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
            />
            <Table
              selectionMode="single"
              onSelectionChange={(selected) => {
                setSelectedPatient(selected);
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
                {patients.map((patient) => (
                  <TableRow key={patient.key}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={handleSearch}
              className="bg-primary-700 text-white w-full"
            >
              Search
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <header>
              <h4 className="text-lg font-semibold">Select Date &amp; Time</h4>
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
                className="bg-secondary-600 text-secondary-100 w-full"
                type="submit"
              >
                Add Appointment
              </Button>
            </form>
          </div>
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
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.key}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.note}</TableCell>
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
