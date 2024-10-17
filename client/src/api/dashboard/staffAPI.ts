import axios from "@/config/axios";
import { staff } from "@/types/dashboard";

// Add a new staff
export const saveStaff = async (staff: staff) => {
    try {
        const response = await axios.post(`/staffs`, staff);
        return response.data;
    } catch (error: any) {
        // throw new Error(error.response?.data?.data);
    }
};

// Get all staffs
export const getstaffs = async (query?: string) => {
    try {
        let url = `/staffs`;
        if (query) {
            url = `/staffs?search=${query}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        // throw new Error(error.response?.data?.data);
    }
};

// Get a staff by ID
export const getStaffById = async (id: string) => {
    try {
        const response = await axios.get(`/staffs/${id}`);
        return response.data;
    } catch (error: any) {
        // throw new Error(error.response?.data?.data);
    }
};

// Update a staff by ID
export const updateStaff = async (
    id: string | undefined,
    staff: staff,
) => {
    if (!id) return;
    try {
        const response = await axios.put(`/staffs/${id}`, staff);
        return response.data;
    } catch (error: any) {
        // throw new Error(error.response?.data?.data);
    }
};

// Delete a staff by ID
export const deleteStaff = async (id: string | undefined) => {
    if (!id) return;
    try {
        const response = await axios.delete(`/staffs/${id}`);
        return response.data;
    } catch (error: any) {
        // throw new Error(error.response?.data?.data);
    }
};
