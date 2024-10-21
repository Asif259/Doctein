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
export const getStaffs = async (query?: string) => {
    try {
        let url = `/staffs`;
        if (query) {
            url = `/staffs?search=${query}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error: unknown) {
        // throw new Error(error.response?.data?.data);
    }
};

// Get a staff by ID
export const getStaffById = async (id: string) => {
    try {
        const response = await axios.get(`/staffs/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.log(error)
        // throw new Error(error.response?.data?.data);
    }
};

// Update a staff by ID
export const updateStaff = async (staffId: string, data: staff) => {
    try {
        const res = await axios.put(`staffs/${staffId}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating staff:", error);
        throw error;
    }
};


// Delete a staff by ID
export const deleteStaff = async (id: string | undefined) => {
    if (!id) return;
    try {
        const response = await axios.delete(`/staffs/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting staff:", error);
        throw error;
    }
};
