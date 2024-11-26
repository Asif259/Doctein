import axios from "@/config/axios";

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
        return error.response?.data;
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
        return error.response?.data;
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
        const response = await axios.post(`/forgot-password/send-otp`, {
            email,
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data;
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
        console.log(error);
        return error.response?.data;
    }
};

//Activate user
export const activateUser = async (email: string) => {
    try {
        const response = await axios.post("/activate", { email });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response?.data?.message || "Failed to activate user";
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
        console.log(error);
        return error.response?.data?.data || "Failed to reset password";
    }
};

//Get user profile
export const getUserProfile = async () => {
    try {
        const response = await axios.get(`/profile`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        // throw new Error(error.response?.data?.data);
    }
};

//logout
export const logoutUser = async () => {
    try {
        const response = await axios.get(`/logout`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        // throw new Error(error.response?.data?.data);
    }
};
