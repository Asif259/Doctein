import { create } from "zustand";
import {
  Complaint,
  Diagnosis,
  History,
  Instructions,
  Investigation,
  Medication,
  Prescription,
  PrescriptionHeader,
} from "@/types/prescription";

interface Modal {
  type:
    | "medication"
    | "instruction"
    | "followUp"
    | "complaint"
    | "history"
    | "diagnosis"
    | "investigation";
  action: "add" | "edit" | "delete";
  id?: number;
}

interface PrescriptionState {
  isEditable: boolean;
  prescription: Prescription;
  prescriptionHeader: PrescriptionHeader | null;
  modal: Modal | null;
  modalOpen: boolean;
  setPrescription: (newPrescription: Prescription) => void;
  addMedication: (medication: Medication) => void;
  addInstruction: (instruction: Instructions) => void;
  addComplaint: (complaint: Complaint) => void;
  addHistory: (history: History) => void;
  addDiagnosis: (diagnosis: Diagnosis) => void;
  addInvestigation: (investigation: Investigation) => void;
  setFollowUpDate: (followUpDate: string) => void;
  setPrescriptionHeader: (newPrescriptionHeader: PrescriptionHeader) => void;
  setEditable: (isEditable: boolean) => void;
  setModal: (modal: Modal) => void;
  setModalOpen: (modalOpen: boolean) => void;
}

const usePrescriptionStore = create<PrescriptionState>((set) => ({
  prescription: {
    appointmentId: "",
    medications: [],
    instructions: [],
    complaints: [],
    history: [],
    diagnosisList: [],
    investigations: [],
    followUpDate: "",
    isEditable: false,
  },
  prescriptionHeader: null,
  isEditable: false,
  modal: null,
  modalOpen: false,
  setPrescription: (newPrescription: Prescription) =>
    set({ prescription: newPrescription }),
  // Prescription updates (Start)
  addMedication: (medication: Medication) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        medications: [...state.prescription?.medications, medication],
      },
    })),
  addInstruction: (instruction: Instructions) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        instructions: [...state.prescription?.instructions, instruction],
      },
    })),
  addComplaint: (complaint: Complaint) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        complaints: [...state.prescription?.complaints, complaint],
      },
    })),
  addHistory: (history: History) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        history: [...state.prescription.history, history],
      },
    })),
  addDiagnosis: (diagnosis: Diagnosis) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        diagnosisList: [...state.prescription?.diagnosisList, diagnosis],
      },
    })),
  addInvestigation: (investigation: Investigation) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        investigations: [...state.prescription?.investigations, investigation],
      },
    })),
  setFollowUpDate: (followUpDate: string) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        followUpDate,
      },
    })),
  // Prescription updates (Start)
  setPrescriptionHeader: (newPrescriptionHeader: PrescriptionHeader) =>
    set({ prescriptionHeader: newPrescriptionHeader }),
  setEditable: (isEditable: boolean) => set({ isEditable }),
  setModal: (modal: Modal) => set({ modal }),
  setModalOpen: (modalOpen: boolean) => set({ modalOpen }),
}));

export { usePrescriptionStore };
