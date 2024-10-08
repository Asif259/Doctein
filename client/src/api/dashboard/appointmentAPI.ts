import axios from "@/config/axios";

// Get all appointments
export const getAppointments = async () => {
  try {
    const response = await axios.get("/appointments/");
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Add a new appointment
export const saveAppointment = async (appointment: any) => {
  try {
    const response = await axios.post(`/appointments`, appointment);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Update an appointment by ID
export const updateAppointment = async (
  appointmentId: string | undefined,
  appointment: any,
) => {
  if (!appointmentId) return;
  try {
    const response = await axios.put(
      `/appointments/${appointmentId}`,
      appointment,
    );
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (appointmentId: string | undefined) => {
  if (!appointmentId) return;
  try {
    const response = await axios.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.data);
  }
};
