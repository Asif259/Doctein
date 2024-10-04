import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Function to register a new user
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
    throw new Error(error.response?.data?.data || 'Registration failed. Please try again.');
  }
};

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.data || 'Login failed. Please try again.');
  }
};

