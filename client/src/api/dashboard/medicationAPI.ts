import axios from "@/config/axios";
import { AxiosError } from "axios";

export const getMedication = async (search: string) => {
    try {
        const response = await axios.get(`/medication/search?search=${search}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

export const getMedicationById = async (id: string) => {
    try {
        const response = await axios.get(`/medication/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
