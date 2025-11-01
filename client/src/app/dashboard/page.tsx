"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Divider,
} from "@nextui-org/react";
import { Calendar, CalendarClockIcon, UserPlusIcon, Users } from "lucide-react";
import PatientTab from "@/app/dashboard/patient-tab";
import AppointmentTab from "@/app/dashboard/appointment-tab";
import StaffTab from "@/app/dashboard/staff-tab";
import { getDashboardMetrics } from "@/api/dashboard/dashboardAPI";

export default function Page() {
  const [dashboardCounts, setDashboardCounts] = React.useState({
    patients: 0,
    appointments: 0,
    upcomingAppointments: 0,
    staffs: 0,
  });
  const analytics = [
    {
      title: "Upcoming Appointments",
      count: dashboardCounts.upcomingAppointments,
      icon: <CalendarClockIcon className="h-4 w-4" />,
    },
    {
      title: "Total Appointments",
      count: dashboardCounts.appointments,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Total Patients",
      count: dashboardCounts.patients,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Total Staffs",
      count: dashboardCounts.staffs,
      icon: <UserPlusIcon className="h-4 w-4" />,
    },
  ];

  useEffect(() => {
    (async () => {
      // Fetch
      const res = await getDashboardMetrics();
      if (res?.success) {
        /*
        * totalAppointmentCount,
      upcomingAppointmentCount,
      patientsCount,
      * */
        setDashboardCounts({
          patients: res.data.patientsCount,
          appointments: res.data.totalAppointmentCount,
          upcomingAppointments: res.data.upcomingAppointmentCount,
          staffs: 0,
        });
      }
    })();
  }, []);

  return (
    <>
      {/* Main Content */}
      <h1 className="text-3xl text-secondary-900 font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {analytics.map((item, index) => (
          <Card
            key={index}
            className="bg-primary border-primary"
            classNames={{
              header: "text-white",
              body: "text-white",
            }}
          >
            <CardHeader className="flex justify-between items-center">
              <p className="text-sm">{item.title}</p>
              <p>{item.icon}</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-2xl font-bold">{item.count}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <Divider className="mb-4" />
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
