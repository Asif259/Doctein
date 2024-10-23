import axios from "@/config/axios";
import { Prescription } from "@/types/prescription";

const savePrescription = async (prescription: Prescription) => {
  try {
    const res = await axios.post("/prescription", prescription);
    return res.data;
  } catch (error) {
    console.error("Error saving prescriptions:", error);
  }
};

const getPrescriptionById = async (appointmentId: string) => {
  try {
    const res = await axios.get(`/prescription/${appointmentId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
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
    console.error("Error updating prescriptions:", error);
  }
};

const deletePrescription = async (appointmentId: string) => {
  try {
    const res = await axios.delete(`/prescription/${appointmentId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting prescriptions:", error);
  }
};

const uploadPrescription = async (file: File, appointmentId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      `/prescription/upload/${appointmentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error uploading prescriptions:", error);
  }
};

export {
  savePrescription,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
  uploadPrescription,
};
