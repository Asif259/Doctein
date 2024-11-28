import axios from "@/config/axios";
import { staff } from "@/types/dashboard";
import { AxiosError } from "axios";

// Add a new staff
export const saveStaff = async (staff: staff) => {
    try {
        const response = await axios.post(`/staffs`, staff);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get all staffs
export const getStaffs = async (query?: string) => {
    try {
        let url = `/staffs`;
        if (query) {
            url = `/staffs?search=${query}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Get a staff by ID
export const getStaffById = async (id: string) => {
    try {
        const response = await axios.get(`/staffs/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Update a staff by ID
export const updateStaff = async (staffId: string, data: staff) => {
    try {
        const res = await axios.put(`staffs/${staffId}`, data);
        return res.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};

// Delete a staff by ID
export const deleteStaff = async (id: string | undefined) => {
    if (!id) return;
    try {
        const response = await axios.delete(`/staffs/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
