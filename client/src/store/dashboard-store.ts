import { create } from "zustand";
import { IAppointment, IPatient, staff } from "@/types/dashboard";
import { Prescription } from "@/types/prescription";

type Analytics = {
    upcomingAppointments: number;
    totalAppointments: number;
    totalPatients: number;
    totalStaffs: number;
};

interface DashboardState {
    isSidebarOpen: boolean;
    tabKey: string;
    patients: IPatient[];
    appointments: IAppointment[];
    isEditable: boolean;
    staffs: staff[];
    prescriptions: Prescription[];
    analytics: Analytics;
    toggleSidebar: () => void;
    setTabKey: (key: string) => void;
    addPatients: (newPatients: IPatient[]) => void;
    resetPatients: () => void;
    addAppointments: (newAppointments: IAppointment[]) => void;
    resetAppointments: () => void;
    addStaffs: (newStaff: staff[]) => void;
    resetStaff: () => void;
    addPrescriptions: (newPrescriptions: Prescription[]) => void;
    resetPrescriptions: () => void;
    setEditable: (isEditable: boolean) => void;
    setAnalytics: (analytics: Analytics) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
    isSidebarOpen: true,
    tabKey: "1",
    patients: [],
    appointments: [],
    staffs: [],
    prescriptions: [],
    isEditable: false,
    analytics: {
        totalAppointments: 0,
        totalPatients: 0,
        totalStaffs: 0,
        upcomingAppointments: 0,
    },
    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setTabKey: (key: string) => set({ tabKey: key }),
    addPatients: (newPatients: IPatient[]) => {
        set({ patients: newPatients });
        set((state: DashboardState) => {
            return {
                analytics: {
                    ...state.analytics,
                    totalPatients: newPatients.length,
                },
            };
        });
    },
    resetPatients: () => set({ patients: [] }),
    addAppointments: (newAppointment: IAppointment[]) =>
        set({ appointments: newAppointment }),
    resetAppointments: () => set({ appointments: [] }),
    addStaffs: (newStaffs: staff[]) => {
        set({ staffs: newStaffs });
        set((state) => ({
            analytics: {
                ...state.analytics,
                totalStaffs: newStaffs.length,
            },
        }));
    },
    resetStaff: () => set({ staffs: [] }),
    addPrescriptions: (newPrescriptions: Prescription[]) =>
        set({ prescriptions: [...newPrescriptions] }),
    resetPrescriptions: () => set({ prescriptions: [] }),
    setEditable: (isEditable: boolean) => set({ isEditable }),
    setAnalytics: (analytics: Analytics) =>
        set({
            analytics: {
                totalAppointments: analytics.totalAppointments,
                totalPatients: analytics.totalPatients,
                totalStaffs: analytics.totalStaffs,
                upcomingAppointments: analytics.upcomingAppointments,
            },
        }),
}));

export { useDashboardStore };
