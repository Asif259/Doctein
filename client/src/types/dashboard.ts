export interface patient {
  id?: number;
  key?: string;
  name: string;
  age: number | string;
  weight: number | string;
  phone: string;
  address: string;
  instant?: boolean;
}

export interface appointment {
  id?: number;
  key?: string;
  patientName: string;
  phone: string;
  date: string;
  time: string;
  note?: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface staff {
  id: number;
  name: string;
  role: string;
}

export interface doctor {
  [x: string]: any;
  key?: string;
  name: string;
  degrees: string[]; 
  designation: string;
  specialization: string;
  phone: string[];
  bmdcNumber: string; 
  digitalSignature?: string;
}