import { Request, Response } from "express";

import Prescription, {
  IPrescription,
} from "../../Models/dashboard/prescription";
import Appointment from "../../Models/dashboard/appointment";

const addPrescription = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const {
    appointmentId,
    snapshot,
    medications,
    instructions,
    complaints,
    history,
    diagnosisList,
    investigations,
    followUpDate,
  } = req.body as IPrescription;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const prescription = await Prescription.findOneAndUpdate(
      {
        appointmentId,
      },
      {
        ...(snapshot && { snapshot }),
        ...(medications && { medications }),
        ...(instructions && { instructions }),
        ...(complaints && { complaints }),
        ...(history && { history }),
        ...(diagnosisList && { diagnosisList }),
        ...(investigations && { investigations }),
        ...(followUpDate && { followUpDate }),
      },
      {
        new: true,
        upsert: true,
      },
    );

    // change the status of the appointment upcoming -> completed
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "completed",
      },
      { new: true },
    );
    console.log("Updated Appointment:", updatedAppointment);

    const response = {
      id: prescription._id,
      appointmentId: prescription.appointmentId,
      snapshot: prescription.snapshot,
      medications: prescription.medications,
      instructions: prescription.instructions,
      complaints: prescription.complaints,
      history: prescription.history,
      diagnosisList: prescription.diagnosisList,
      investigations: prescription.investigations,
      followUpDate: prescription.followUpDate,
    };
    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error("Error adding prescriptions:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error adding prescriptions" });
  }
};

const updatePrescription = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { prescriptionId } = req.params;
  const {
    appointmentId,
    snapshot,
    medications,
    instructions,
    complaints,
    history,
    diagnosisList,
    investigations,
    followUpDate,
  } = req.body as IPrescription;

  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const updatedPrescription = {
      appointmentId,
      ...(snapshot && { snapshot }),
      ...(medications && { medications }),
      ...(instructions && { instructions }),
      ...(complaints && { complaints }),
      ...(history && { history }),
      ...(diagnosisList && { diagnosisList }),
      ...(investigations && { investigations }),
      ...(followUpDate && { followUpDate }),
    };

    const prescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      updatedPrescription,
      { new: true },
    ).select("-__v -updatedAt -createdAt");
    if (!prescription)
      return res.status(404).json({ data: "Prescription not found" });

    const response = {
      id: prescription._id,
      appointmentId: prescription.appointmentId,
      snapshot: prescription.snapshot,
      medications: prescription.medications,
      instructions: prescription.instructions,
      complaints: prescription.complaints,
      history: prescription.history,
      diagnosisList: prescription.diagnosisList,
      investigations: prescription.investigations,
      followUpDate: prescription.followUpDate,
    };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error updating prescriptions:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error updating prescriptions" });
  }
};

const getPrescriptions = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params as { appointmentId: string };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const prescriptions = await Prescription.find({
      appointmentId,
    }).select("-__v -updatedAt -createdAt");

    const response = prescriptions.map((prescription) => ({
      id: prescription._id,
      appointmentId: prescription.appointmentId,
      snapshot: prescription.snapshot,
      medications: prescription.medications,
      instructions: prescription.instructions,
      complaints: prescription.complaints,
      history: prescription.history,
      diagnosisList: prescription.diagnosisList,
      investigations: prescription.investigations,
      followUpDate: prescription.followUpDate,
    }));
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching prescriptions" });
  }
};

const getPrescriptionById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const prescription = await Prescription.findOne({
      appointmentId,
    }).select("-__v -updatedAt -createdAt");
    if (!prescription)
      return res.status(404).json({ data: "Prescription not found" });

    const response = {
      id: prescription._id,
      appointmentId: prescription.appointmentId,
      snapshot: prescription.snapshot,
      medications: prescription.medications,
      instructions: prescription.instructions,
      complaints: prescription.complaints,
      history: prescription.history,
      diagnosisList: prescription.diagnosisList,
      investigations: prescription.investigations,
      followUpDate: prescription.followUpDate,
    };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching prescriptions" });
  }
};

const deletePrescription = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { prescriptionId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const prescription = await Prescription.findByIdAndDelete(prescriptionId);
    if (!prescription)
      return res.status(404).json({ data: "Prescription not found" });
    return res
      .status(200)
      .json({ success: true, data: "Prescription deleted" });
  } catch (error) {
    console.error("Error deleting prescriptions:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error deleting prescriptions" });
  }
};

const uploadPrescription = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { appointmentId } = req.params as { appointmentId: string };
  try {
    if (!req.file) return res.status(400).send("No files were uploaded.");

    // Save the file path to the database
    const prescription = await Prescription.findOneAndUpdate(
      { appointmentId },
      {
        snapshot: req.file.path,
      },
      { new: true, upsert: true },
    );
    // change the status of the appointment upcoming -> completed and add prescriptionId
    await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescriptionId: prescription._id, status: "completed" },
      { new: true },
    );
    return res.status(201).json({ success: true, data: req.file.path });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error uploading file" });
  }
};

export {
  addPrescription,
  updatePrescription,
  getPrescriptionById,
  deletePrescription,
  uploadPrescription,
};
