import axios from "@/config/axios";
import { doctor } from "@/types/dashboard";

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
) => {
  try {
    const response = await axios.post(`/register`, {
      email,
      password,
      confirmPassword,
      role,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

// Login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

export const authenticateUser = async () => {
  try {
    const response = await axios.get(`/authenticate`);
    console.log("User authentication response", response.data);
    if (response.data.success) {
      return response.data;
    }
    return false;
  } catch (e) {
    return false;
  }
};

//Send OTP to the given email
export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(`/forgot-password/send-otp`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

// Verify OTP for the given email
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`/forgot-password/verify-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

//Activate user
export const activateUser = async (email: string) => {
  try {
    const response = await axios.post('/activate', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to activate user');
  }
};

//Reset password
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.post(`/forgot-password/reset-password`, {
      email,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

//Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`/profile`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

//logout
export const logoutUser = async () => {
  try {
    const response = await axios.post(`/logout`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

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

// TODO: don't use any data type unless you are forced to do
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

