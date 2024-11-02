import axios from "@/config/axios";
import { doctor } from "@/types/dashboard";

//save doctor profile
export const saveDoctor = async (profileData: doctor) => {
    try {
      const response = await axios.post(`/doctors`, {
        ...profileData,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Error saving doctor profile:', error);
      throw error;
    }
  };
  
  //get doctors
  export const getDoctor = async () => { 
    try {
      const response = await axios.get(`/doctors`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error fetching doctor profile:', error);
      throw error;
    }
  };
  
  //update doctor
  export const updateDoctor = async (doctor: doctor) => {
    try {
      const response = await axios.put(`/doctors`, {...doctor, 
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Error updating doctor profile:", error);
    }
  };
  