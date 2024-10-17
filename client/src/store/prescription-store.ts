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
  id?: number;
}

interface PrescriptionState {
  isEditable: boolean;
  prescription: Prescription;
  prescriptionHeader: PrescriptionHeader | null;
  modal: Modal | null;
  modalOpen: boolean;
  setPrescription: (newPrescription: Prescription) => void;
  resetPrescription: () => void;
  addMedication: (medication: Medication) => void;
  addInstruction: (instruction: Instructions) => void;
  addComplaint: (complaint: Complaint) => void;
  addHistory: (history: History) => void;
  addDiagnosis: (diagnosis: Diagnosis) => void;
  addInvestigation: (investigation: Investigation) => void;
  updateMedication: (medication: Medication) => void;
  updateInstruction: (instruction: Instructions) => void;
  updateComplaint: (complaint: Complaint) => void;
  updateHistory: (history: History) => void;
  updateDiagnosis: (diagnosis: Diagnosis) => void;
  updateInvestigation: (investigation: Investigation) => void;
  deleteMedication: (id: number) => void;
  deleteInstruction: (id: number) => void;
  deleteComplaint: (id: number) => void;
  deleteHistory: (id: number) => void;
  deleteDiagnosis: (id: number) => void;
  deleteInvestigation: (id: number) => void;
  setFollowUpDate: (followUpDate: string) => void;
  setPrescriptionHeader: (newPrescriptionHeader: PrescriptionHeader) => void;
  setEditable: (isEditable: boolean) => void;
  setModal: (modal: Modal) => void;
  setModalOpen: (modalOpen: boolean) => void;
}

const initialPrescription: Prescription = {
  appointmentId: "",
  medications: [],
  instructions: [],
  complaints: [],
  history: [],
  diagnosisList: [],
  investigations: [],
  followUpDate: "",
  isEditable: false,
};

const usePrescriptionStore = create<PrescriptionState>((set) => ({
  prescription: initialPrescription,
  prescriptionHeader: null,
  isEditable: false,
  modal: null,
  modalOpen: false,
  setPrescription: (newPrescription: Prescription) =>
    set({ prescription: newPrescription }),
  resetPrescription: () => set({ prescription: initialPrescription }),
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
  updateMedication: (medication: Medication) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        medications: state.prescription.medications.map((m) =>
          m.id === medication.id ? medication : m,
        ),
      },
    })),
  updateInstruction: (instruction: Instructions) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        instructions: state.prescription.instructions.map((i) =>
          i.id === instruction.id ? instruction : i,
        ),
      },
    })),
  updateComplaint: (complaint: Complaint) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        complaints: state.prescription.complaints.map((c) =>
          c.id === complaint.id ? complaint : c,
        ),
      },
    })),
  updateHistory: (history: History) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        history: state.prescription.history.map((h) =>
          h.id === history.id ? history : h,
        ),
      },
    })),
  updateDiagnosis: (diagnosis: Diagnosis) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        diagnosisList: state.prescription.diagnosisList.map((d) =>
          d.id === diagnosis.id ? diagnosis : d,
        ),
      },
    })),
  updateInvestigation: (investigation: Investigation) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        investigations: state.prescription.investigations.map((i) =>
          i.id === investigation.id ? investigation : i,
        ),
      },
    })),
  deleteMedication: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        medications: state.prescription.medications.filter((m) => m.id !== id),
      },
    })),
  deleteInstruction: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        instructions: state.prescription.instructions.filter(
          (i) => i.id !== id,
        ),
      },
    })),
  deleteComplaint: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        complaints: state.prescription.complaints.filter((c) => c.id !== id),
      },
    })),
  deleteHistory: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        history: state.prescription.history.filter((h) => h.id !== id),
      },
    })),
  deleteDiagnosis: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        diagnosisList: state.prescription.diagnosisList.filter(
          (d) => d.id !== id,
        ),
      },
    })),
  deleteInvestigation: (id: number) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        investigations: state.prescription.investigations.filter(
          (i) => i.id !== id,
        ),
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
