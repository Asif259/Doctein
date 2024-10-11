import { create } from "zustand";
import { doctor } from "@/types/dashboard";

interface profiledState {
  Doctor: doctor | null; 
  addDoctor: (newDoctor: doctor | null) => void; 
}

const useProfileStore = create<profiledState>((set) => ({
  Doctor: null, 
  addDoctor: (doctor: doctor | null) => set({ Doctor: doctor }),
}));

export { useProfileStore };
