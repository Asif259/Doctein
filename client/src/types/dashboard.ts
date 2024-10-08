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
}

export interface staff {
  id: number;
  name: string;
  role: string;
}
