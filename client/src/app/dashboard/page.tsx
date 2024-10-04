"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tab,
  Tabs,
  Divider,
} from "@nextui-org/react";
import { Calendar, Pill, Users } from "lucide-react";

// Mock data
const initialPatients: patient[] = [
  { id: 1, name: "John Doe", age: 35, condition: "Hypertension" },
  { id: 2, name: "Jane Smith", age: 28, condition: "Diabetes" },
];

interface patient {
  id: number;
  name: string;
  age: number;
  condition: string;
}

const initialAppointments: appointment[] = [
  { id: 1, patientName: "John Doe", date: "2023-06-15", time: "10:00 AM" },
  { id: 2, patientName: "Jane Smith", date: "2023-06-16", time: "2:00 PM" },
];

interface appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
}

interface prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
}
const initialPrescriptions: prescription[] = [
  {
    id: 1,
    patientName: "John Doe",
    medication: "Lisinopril",
    dosage: "10mg daily",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    medication: "Metformin",
    dosage: "500mg twice daily",
  },
];

export default function Page() {
  const [patients, setPatients] = useState<patient[]>(initialPatients);
  const [appointments, setAppointments] =
    useState<appointment[]>(initialAppointments);
  const [prescriptions, setPrescriptions] =
    useState<prescription[]>(initialPrescriptions);
  const [newPatient, setNewPatient] = useState<patient>({
    id: patients.length + 1,
    name: "",
    age: 20,
    condition: "",
  });
  const [newAppointment, setNewAppointment] = useState({
    id: appointments.length + 1,
    patientName: "",
    date: "",
    time: "",
  });
  const [newPrescription, setNewPrescription] = useState({
    id: prescriptions.length + 1,
    patientName: "",
    medication: "",
    dosage: "",
  });

  const addPatient = () => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
    // setNewPatient({id: , name: "", age: "", condition: "" });
  };

  const addAppointment = () => {
    setAppointments([
      ...appointments,
      { ...newAppointment, id: appointments.length + 1 },
    ]);
    setNewAppointment((prevState) => ({
      id: prevState.id + 1,
      patientName: "",
      date: "",
      time: "",
    }));
  };

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { ...newPrescription, id: prescriptions.length + 1 },
    ]);
    setNewPrescription((prevState) => ({
      id: prevState.id + 1,
      patientName: "",
      medication: "",
      dosage: "",
    }));
  };

  const analytics = [
    {
      title: "Total Patients",
      count: patients.length,
      icon: <Users className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Total Appointments",
      count: appointments.length,
      icon: <Calendar className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Active Prescriptions",
      count: prescriptions.length,
      icon: <Pill className="h-4 w-4 text-gray-400" />,
    },
  ];

  return (
    <div className="flex bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {analytics.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex justify-between items-center">
                <p className="text-sm">{item.title}</p>
                {item.icon}
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-2xl font-bold">{item.count}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Tabs aria-label="Dashboard tabs">
          <Tab key="patients" title="Patients">
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-semibold">Add New Patient</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Enter patient name"
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, name: e.target.value })
                  }
                />
                <Input
                  label="Age"
                  placeholder="Enter patient age"
                  value={newPatient.age as unknown as string}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      age: parseInt(e.target.value),
                    })
                  }
                />
                <Input
                  label="Condition"
                  placeholder="Enter patient condition"
                  value={newPatient.condition}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, condition: e.target.value })
                  }
                />
                <Button color="primary" onClick={addPatient}>
                  Add Patient
                </Button>
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
                    <TableColumn>Condition</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="appointments" title="Appointments">
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-semibold">Add New Appointment</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Patient Name"
                  placeholder="Enter patient name"
                  value={newAppointment.patientName}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      patientName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                />
                <Input
                  label="Time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                />
                <Button color="primary" onClick={addAppointment}>
                  Add Appointment
                </Button>
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
          </Tab>

          <Tab key="prescriptions" title="Prescriptions">
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-semibold">Add New Prescription</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Patient Name"
                  placeholder="Enter patient name"
                  value={newPrescription.patientName}
                  onChange={(e) =>
                    setNewPrescription({
                      ...newPrescription,
                      patientName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Medication"
                  placeholder="Enter medication name"
                  value={newPrescription.medication}
                  onChange={(e) =>
                    setNewPrescription({
                      ...newPrescription,
                      medication: e.target.value,
                    })
                  }
                />
                <Input
                  label="Dosage"
                  placeholder="Enter dosage"
                  value={newPrescription.dosage}
                  onChange={(e) =>
                    setNewPrescription({
                      ...newPrescription,
                      dosage: e.target.value,
                    })
                  }
                />
                <Button color="primary" onClick={addPrescription}>
                  Add Prescription
                </Button>
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
                    {prescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell>{prescription.patientName}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </main>
    </div>
  );
}
