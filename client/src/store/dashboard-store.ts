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
  resetPatients: () => void;
  addAppointments: (newAppointments: appointment[]) => void;
  resetAppointments: () => void;
  addStaffs: (newStaff: staff[]) => void;
  resetStaff: () => void;
  addPrescriptions: (newPrescriptions: Prescription[]) => void;
  resetPrescriptions: () => void;
  setEditable: (isEditable: boolean) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: true,
  tabKey: "1",
  patients: [],
  appointments: [],
  staffs: [],
  prescriptions: [],
  isEditable: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTabKey: (key: string) => set({ tabKey: key }),
  addPatients: (newPatients: patient[]) => set({ patients: newPatients }),
  resetPatients: () => set({ patients: [] }),
  addAppointments: (newAppointment: appointment[]) =>
    set({ appointments: newAppointment }),
  resetAppointments: () => set({ appointments: [] }),
  addStaffs: (newStaffs: staff[]) =>set({ staffs: newStaffs }),
  resetStaff: () => set({ staffs: [] }),
  addPrescriptions: (newPrescriptions: Prescription[]) =>
    set({ prescriptions: [...newPrescriptions] }),
  resetPrescriptions: () => set({ prescriptions: [] }),
  setEditable: (isEditable: boolean) => set({ isEditable }),
}));

export { useDashboardStore };
