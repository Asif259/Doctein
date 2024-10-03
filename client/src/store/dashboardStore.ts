import { create } from "zustand";

interface DashboardState {
  isSidebarOpen: boolean;
  tabKey: string;
  toggleSidebar: () => void;
  setTabKey: (key: string) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: true,
  tabKey: "1",
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTabKey: (key: string) => set({ tabKey: key }),
}));

export { useDashboardStore };
