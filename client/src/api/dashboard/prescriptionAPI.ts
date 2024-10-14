import axios from "@/config/axios";
import { Prescription } from "@/types/prescription";

const savePrescription = async (prescription: Prescription) => {
  try {
    const res = await axios.post("/prescription", prescription);
    return res.data;
  } catch (error) {
    console.error("Error saving prescription:", error);
  }
};

const getPrescriptionById = async (appointmentId: string) => {
  try {
    const res = await axios.get(`/prescription/${appointmentId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching prescription:", error);
  }
};

const updatePrescription = async (prescription: Prescription) => {
  try {
    const res = await axios.put(
      `/prescription/${prescription.id}`,
      prescription,
    );
    return res.data;
  } catch (error) {
    console.error("Error updating prescription:", error);
  }
};

const deletePrescription = async (appointmentId: string) => {
  try {
    const res = await axios.delete(`/prescription/${appointmentId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting prescription:", error);
  }
};

export {
  savePrescription,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
};
