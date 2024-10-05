import { create } from "zustand";
import { appointment, patient, staff } from "@/types/dashboard";

interface DashboardState {
  isSidebarOpen: boolean;
  tabKey: string;
  patients: patient[];
  appointments: appointment[];
  staffs: staff[];
  toggleSidebar: () => void;
  setTabKey: (key: string) => void;
  addPatient: (newPatient: patient) => void;
  addAppointment: (newAppointment: appointment) => void;
  addStaff: (newStaff: staff) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: true,
  tabKey: "1",
  patients: [],
  appointments: [],
  staffs: [],
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTabKey: (key: string) => set({ tabKey: key }),
  addPatient: (newPatient: patient) =>
    set((state) => ({ patients: [...state.patients, newPatient] })),
  addAppointment: (newAppointment: appointment) =>
    set((state) => ({ appointments: [...state.appointments, newAppointment] })),
  addStaff: (newStaff: staff) =>
    set((state) => ({ staffs: [...state.staffs, newStaff] })),
}));

export { useDashboardStore };
