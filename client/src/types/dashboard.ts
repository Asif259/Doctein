export interface patient {
  id: number;
  key?: string;
  name: string;
  age: number | string;
  weight: number | string;
  phone: string;
  address: string;
  instant?: boolean;
}

export interface appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
}

export interface staff {
  id: number;
  name: string;
  role: string;
}
