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
  medicines: Medication[] | [];
  instructions: Instructions[] | [];
  complaints: Complaint[] | [];
  history: History[] | [];
  diagnosisList: Diagnosis[] | [];
  investigations: Investigation[] | [];
  followUpDate: string;
  isEditable?: boolean;
}

export interface Medication {
  id: string;
  type: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  note: string;
}

export interface Instructions {
  id: string;
  instruction: string;
}

export interface Complaint {
  id: string;
  complaint: string;
  duration: string;
  severity: string;
  description: string;
}

export interface History {
  id: string;
  diagnosis: string;
  description?: string;
  duration?: string;
}

export interface Diagnosis {
  id: string;
  name: string;
  description?: string;
  date?: string;
}

export interface Investigation {
  id: string;
  name: string;
  description?: string;
  date?: string;
}
