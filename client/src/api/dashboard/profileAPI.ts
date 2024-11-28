import axios from "@/config/axios";
import { doctor } from "@/types/dashboard";
import { AxiosError } from "axios";

//save doctor profile
export const saveDoctor = async (profileData: doctor) => {
    try {
        const response = await axios.post(`/doctors`, {
            ...profileData,
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

//get doctors
export const getDoctor = async () => {
    try {
        const response = await axios.get(`/doctors`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

//update doctor
export const updateDoctor = async (doctor: doctor) => {
    try {
        const response = await axios.put(`/doctors`, { ...doctor });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
