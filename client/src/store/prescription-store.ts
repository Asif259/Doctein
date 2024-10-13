import { create } from "zustand";
import { Prescription, PrescriptionHeader } from "@/types/prescription";

interface Modal {
  type: string;
  title: string;
  id: number;
}

interface PrescriptionState {
  isEditable: boolean;
  prescription: Prescription | null;
  prescriptionHeader: PrescriptionHeader | null;
  modal: Modal;
  modalOpen: boolean;
  setPrescription: (newPrescription: Prescription) => void;
  setPrescriptionHeader: (newPrescriptionHeader: PrescriptionHeader) => void;
  setEditable: (isEditable: boolean) => void;
  setModal: (modal: Modal) => void;
  setModalOpen: (modalOpen: boolean) => void;
}

const usePrescriptionStore = create<PrescriptionState>((set) => ({
  prescription: null,
  prescriptionHeader: null,
  isEditable: false,
  modal: { type: "", title: "", id: 0 },
  modalOpen: false,
  setPrescription: (newPrescription: Prescription) =>
    set({ prescription: newPrescription }),
  setPrescriptionHeader: (newPrescriptionHeader: PrescriptionHeader) =>
    set({ prescriptionHeader: newPrescriptionHeader }),
  setEditable: (isEditable: boolean) => set({ isEditable }),
  setModal: (modal: Modal) => set({ modal }),
  setModalOpen: (modalOpen: boolean) => set({ modalOpen }),
}));

export { usePrescriptionStore };
