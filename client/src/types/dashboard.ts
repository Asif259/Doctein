import React from "react";

export interface IPatient {
    id?: number;
    key?: string;
    name: string;
    age: number | string;
    weight: number | string;
    phone: string;
    address: string;
    instant?: boolean;
}

export interface IAppointment {
    id?: number;
    key?: string;
    patientName?: string;
    phone?: string;
    date: string;
    time: string;
    note?: string;
    snapshot?: string;
    status: "upcoming" | "completed" | "cancelled" | "";
}

export interface staff {
    id?: number;
    key?: string;
    name: string;
    role?: string;
    phone: string;
    address: string;
    status: "active" | "inactive" | "vacation";
}

export interface doctor {
    key?: string;
    name: string;
    degrees: string[];
    designation: string;
    specialization: string;
    phone: string[];
    bmdcNumber: string;
    digitalSignature?: string;
}

export type StatusOption = {
    key: string;
    value: string;
    startContent?: React.ReactNode;
    children: React.ReactNode;
};
