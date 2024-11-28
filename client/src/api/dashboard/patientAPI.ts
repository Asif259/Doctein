import axios from "@/config/axios";
import { IPatient } from "@/types/dashboard";
import { AxiosError } from "axios";

// Add a new patient
export const savePatient = async (patient: IPatient) => {
    try {
        const response = await axios.post(`/patients`, patient);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get all patients
export const getPatients = async (query?: string) => {
    try {
        let url = `/patients`;
        if (query) {
            url = `/patients?search=${query}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get a patient by ID
export const getPatientById = async (id: string) => {
    try {
        const response = await axios.get(`/patients/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Update a patient by ID
export const updatePatient = async (
    id: string | undefined,
    patient: IPatient,
) => {
    if (!id) return;
    try {
        const response = await axios.put(`/patients/${id}`, patient);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Delete a patient by ID
export const deletePatient = async (id: string | undefined) => {
    if (!id) return;
    try {
        const response = await axios.delete(`/patients/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
