import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Register a new user
export const registerUser = async (email: string, password: string, confirmPassword: string, role: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
      confirmPassword,
      role,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data );
  }
};

// Login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};


//Send OTP to the given email
export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password/send-otp`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data );
  }
};

// Verify OTP for the given email
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password/verify-otp`, { email, otp });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

//Reset password
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password/reset-password`, {
      email,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data);
  }
};

