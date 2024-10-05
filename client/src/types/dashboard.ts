export interface patient {
  id: number;
  name: string;
  age: number | string;
  condition: string;
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
