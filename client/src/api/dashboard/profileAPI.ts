import axios from "@/config/axios";
import { doctor } from "@/types/dashboard";

//save doctor profile
export const saveDoctorProfile = async (profileData: doctor) => {
    try {
      const response = await axios.post(`/doctors`, {
        ...profileData,
      });
      return response.data;
    } catch (error) {
      console.error('Error saving doctor profile:', error);
      throw error;
    }
  };
  
  //get doctors
  export const getDoctor = async () => { 
    try {
      const response = await axios.get(`/doctors`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  };
  
  //update doctor
  export const updateDoctorProfile = async ( doctor: doctor) => {
    try {
      const response = await axios.put(`/doctors`, {...doctor, 
      });
      return response.data;
    } catch (error: any) {
      console.error("Error updating doctor profile:", error);
      throw new Error(error.response?.data?.message || "Error updating doctor profile");
    }
  };
  