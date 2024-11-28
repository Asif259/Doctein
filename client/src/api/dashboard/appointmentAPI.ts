import axios from "@/config/axios";
import { AxiosError } from "axios";
import { IAppointment } from "@/types/dashboard";

// Get all appointments
export const getAppointments = async () => {
    try {
        const response = await axios.get("/appointments/");
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get an appointment by patient ID
export const getAppointmentByPatientId = async (patientId: string) => {
    try {
        const response = await axios.get(`/appointments/patient/${patientId}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get an appointment by ID
export const getAppointmentById = async (appointmentId: string | undefined) => {
    if (!appointmentId) return;
    try {
        const response = await axios.get(`/appointments/${appointmentId}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Add a new appointment
export const createAppointment = async (appointment: {
    patientId: string;
    date: string;
    note: string;
}) => {
    try {
        const response = await axios.post(`/appointments`, appointment);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Update an appointment by ID
export const updateAppointment = async (
    appointmentId: string | undefined,
    appointment: IAppointment,
) => {
    if (!appointmentId) return;
    try {
        const response = await axios.put(
            `/appointments/${appointmentId}`,
            appointment,
        );
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Delete an appointment by ID
export const deleteAppointment = async (appointmentId: string | undefined) => {
    if (!appointmentId) return;
    try {
        const response = await axios.delete(`/appointments/${appointmentId}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Change Appointment Status
export const changeAppointmentStatus = async (
    appointmentId: string | undefined,
    status: "upcoming" | "completed" | "cancelled",
) => {
    if (!appointmentId) return;
    try {
        const response = await axios.put(
            `/appointments/status/${appointmentId}`,
            {
                status,
            },
        );
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
