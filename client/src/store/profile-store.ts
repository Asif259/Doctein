import { create } from "zustand";
import { doctor } from "@/types/dashboard";

interface profiledState {
  Doctor: doctor | null; 
  addDoctor: (newDoctor: doctor | null) => void; 
  onProfileUpdate: (doctor: doctor) => void;
}

const useProfileStore = create<profiledState>((set) => ({
  Doctor: null, 
  addDoctor: (newDoctor: doctor | null) => set({ Doctor: newDoctor }),
  
  onProfileUpdate: (updatedDoctor: doctor) => {
    set((state) => ({
      Doctor: { ...state.Doctor, ...updatedDoctor }
    }));
  }
}));

export { useProfileStore };
