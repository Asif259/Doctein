import { create } from "zustand";
import { appointment, patient, staff } from "@/types/dashboard";
import { Prescription } from "@/types/prescription";

interface DashboardState {
  isSidebarOpen: boolean;
  tabKey: string;
  patients: patient[];
  appointments: appointment[];
  isEditable: boolean;
  staffs: staff[];
  prescriptions: Prescription[];
  toggleSidebar: () => void;
  setTabKey: (key: string) => void;
  addPatients: (newPatients: patient[]) => void;
  addAppointments: (newAppointments: appointment[]) => void;
  addStaffs: (newStaff: staff[]) => void;
  addPrescriptions: (newPrescriptions: Prescription[]) => void;
  setEditable: (isEditable: boolean) => void;
}

const useDashboardStore = create<DashboardState>((set) => {
  return ({
    isSidebarOpen: true,
    tabKey: "1",
    patients: [],
    appointments: [],
    staffs: [],
    prescriptions: [],
    isEditable: false,
    toggleSidebar: () =>
        set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
    setTabKey: (key: string) => set({tabKey: key}),
    addPatients: (newPatients: patient[]) => set({patients: newPatients}),
    addAppointments: (newAppointment: appointment[]) =>
        set({appointments: newAppointment}),
    addStaffs: (newStaffs: staff[]) =>set({staffs: newStaffs}),
    addPrescriptions: (newPrescriptions: Prescription[]) =>
        set({prescriptions: [...newPrescriptions]}),
    setEditable: (isEditable: boolean) => set({isEditable}),
  });
});

export { useDashboardStore };
