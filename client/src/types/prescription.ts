export interface PrescriptionHeader {
  key: string;
  doctor: {
    name: string;
    degrees: string[];
    designation: string;
    specialization: string;
    email: string;
    phone: string[];
    bmdcNumber: string;
    digitalSignature: string;
  };
  patient: {
    name: string;
    age: number | string;
    weight: number | string;
    phone: string;
  };
  date: string;
  note: string;
  status: string;
}

export interface Prescription {
  id?: string;
  appointmentId: string;
  medications: Medication[] | [];
  instructions: Instructions[] | [];
  complaints: Complaint[] | [];
  history: History[] | [];
  diagnosisList: Diagnosis[] | [];
  investigations: Investigation[] | [];
  followUpDate: string;
  isEditable?: boolean;
}

export interface Medication {
  id: number;
  medicationId: string | null;
  medication: string;
  duration: string;
  frequency: string;
  note: string;
}

export interface Instructions {
  id: number;
  instruction: string;
}

export interface Complaint {
  id: number;
  complaint: string;
  duration: string;
  severity: string;
  description: string;
}

export interface History {
  id: number;
  diagnosis: string;
  description?: string;
  duration?: string;
}

export interface Diagnosis {
  id: number;
  name: string;
  description?: string;
  date?: string;
}

export interface Investigation {
  id: number;
  name: string;
  description?: string;
  date?: string;
}
