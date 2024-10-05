"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Divider,
} from "@nextui-org/react";
import { Calendar, Pill, Users } from "lucide-react";
import PatientTab from "@/app/dashboard/patient-tab";
import AppointmentTab from "@/app/dashboard/appointment-tab";
import StaffTab from "@/app/dashboard/staff-tab";
import { useDashboardStore } from "@/store/dashboardStore";

export default function Page() {
  const { patients, appointments, staffs } = useDashboardStore(
    (state) => state,
  );
  const analytics = [
    {
      title: "Upcoming Appointments",
      count: appointments.length,
      icon: <Calendar className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Total Appointments",
      count: appointments.length,
      icon: <Calendar className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Total Patients",
      count: patients.length,
      icon: <Users className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Total Staffs",
      count: staffs.length,
      icon: <Pill className="h-4 w-4 text-gray-400" />,
    },
  ];

  return (
    <>
      {/* Main Content */}
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
          <PatientTab />
        </Tab>
        <Tab key="appointments" title="Appointments">
          <AppointmentTab />
        </Tab>
        <Tab key="staff" title="Staff">
          <StaffTab />
        </Tab>
      </Tabs>
    </>
  );
}
