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
  id: number;
  patientId: number;
  date: string;
  symptoms: string;
  diagnosis: string;
  medicines?: Medication[];
  advice?: Advice[];
  followUp?: FollowUp[];
  complaints?: Complaint[];
  history?: History[];
  diagnosisList?: Diagnosis[];
  investigations?: Investigation[];
  isEditable?: boolean;
}

export interface Medication {
  id: number;
  type: string;
  name: string;
  dosage: string;
  duration: string;
  note: string;
}

export interface Advice {
  id: number;
  advice: string;
}

export interface FollowUp {
  id: number;
  followUp: string;
}

export interface Complaint {
  id: number;
  name: string;
  description?: string;
  duration?: string;
}

export interface History {
  id: number;
  name: string;
  description?: string;
  duration?: string;
}

export interface Diagnosis {
  id: number;
  name: string;
  description?: string;
}

export interface Investigation {
  id: number;
  name: string;
  description?: string;
}
