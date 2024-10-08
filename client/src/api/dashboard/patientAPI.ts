import axios from "@/config/axios";
import { patient } from "@/types/dashboard";

// Add a new patient
export const savePatient = async (patient: patient) => {
  try {
    const response = await axios.post(`/patients`, patient);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
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
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Get a patient by ID
export const getPatientById = async (id: string) => {
  try {
    const response = await axios.get(`/patients/${id}`);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Update a patient by ID
export const updatePatient = async (
  id: string | undefined,
  patient: patient,
) => {
  if (!id) return;
  try {
    const response = await axios.put(`/patients/${id}`, patient);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Delete a patient by ID
export const deletePatient = async (id: string | undefined) => {
  if (!id) return;
  try {
    const response = await axios.delete(`/patients/${id}`);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};
