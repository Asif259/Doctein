import { create } from "zustand";
import { Prescription } from "@/types/prescription";

interface Modal {
  type: string;
  title: string;
  id: number;
}

interface PrescriptionState {
  isEditable: boolean;
  prescriptions: Prescription[];
  modal: Modal;
  modalOpen: boolean;
  addPrescriptions: (newPrescriptions: Prescription[]) => void;
  setEditable: (isEditable: boolean) => void;
  setModal: (modal: Modal) => void;
  setModalOpen: (modalOpen: boolean) => void;
}

const usePrescriptionStore = create<PrescriptionState>((set) => ({
  prescriptions: [],
  isEditable: false,
  modal: { type: "", title: "", id: 0 },
  modalOpen: false,
  addPrescriptions: (newPrescriptions: Prescription[]) =>
    set({ prescriptions: [...newPrescriptions] }),
  setEditable: (isEditable: boolean) => set({ isEditable }),
  setModal: (modal: Modal) => set({ modal }),
  setModalOpen: (modalOpen: boolean) => set({ modalOpen }),
}));

export { usePrescriptionStore };
