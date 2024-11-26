import { Request, Response } from "express";
import Appointment from "../../Models/dashboard/appointment";
import { IUser } from "../../Models/userModel";
import Patient from "../../Models/profile/patient";
import Doctor from "../../Models/profile/doctor";

const saveAppointment = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { user: IUser; doctorId: string };
  const { patientId, date, note } = req.body as {
    patientId: string;
    date: string;
    note: string;
  };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ data: "Patient not found" });

    const appointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      note,
    });
    await appointment.save();
    const response = {
      key: appointment._id,
      patientName: patient.name,
      phone: patient.phone,
      date: appointment.date,
      note: appointment.note,
      status: appointment.status,
    };
    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error saving appointment" });
  }
};

const getAppointments = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointments = await Appointment.find({
      doctorId,
      date: {
        $ne: null,
      },
    })
      .populate("patientId", "name phone status")
      .select("patientId date note status");
    console.log("Appointments:", appointments);

    const response = appointments.map((appointment) => {
      const patient = appointment.patientId as any;
      const date = appointment.date;
      return {
        key: appointment._id,
        patientName: patient.name,
        phone: patient.phone,
        date: date,
        note: appointment.note,
        status: appointment.status,
      };
    });
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching appointments" });
  }
};

const getAppointmentByPatientId = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { patientId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointments = await Appointment.find({
      doctorId,
      patientId,
      date: {
        $ne: null,
      },
    })
      .populate("patientId", "name phone")
      .populate("prescriptionId", "snapshot")
      .select("patientId prescriptionId date note status");

    const response = appointments.map((appointment) => {
      const patient = appointment.patientId as any;
      const snapshot = appointment.prescriptionId as any;
      console.log("Appointment:", appointment);
      const date = appointment.date;
      return {
        key: appointment._id,
        patientName: patient.name,
        phone: patient.phone,
        date: date,
        note: appointment.note,
        status: appointment.status,
        snapshot: snapshot?.snapshot,
      };
    });
    // console.log("Response:", response);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching appointments" });
  }
};

const getAppointmentById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
  const { appointmentId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    console.log("User:", user);
    const doctor = await Doctor.findById(user.userId);
    if (!doctor) return res.status(404).json({ data: "Doctor not found" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ data: "Appointment not found" });

    const patient = await Patient.findById(appointment.patientId);
    if (!patient) return res.status(404).json({ data: "Patient not found" });

    const appointments = await Appointment.find({
      patientId: appointment.patientId,
      date: {
        $ne: null,
      },
    }).select("_id date note status");

    const response = {
      key: appointment._id,
      doctor: {
        name: doctor.name,
        degrees: doctor.degrees,
        designation: doctor.designation,
        specialization: doctor.specialization,
        email: user.email,
        phone: doctor.phone,
        bmdcNumber: doctor.bmdcNumber,
        digitalSignature: doctor.digitalSignature,
      },
      patient: {
        name: patient.name,
        age: patient.age,
        weight: patient.weight,
        phone: patient.phone,
        history: appointments,
      },
      date: appointment.date,
      note: appointment.note,
      status: appointment.status,
    };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching appointment" });
  }
};

const updateAppointment = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params;
  const { date, note, status } = req.body as {
    date: string;
    note?: string;
    status?: string;
  };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ data: "Appointment not found" });

    appointment.date = new Date(date);
    if (note) appointment.note = note;
    if (status) appointment.status = status;
    await appointment.save();

    const response = {
      key: appointment._id,
      patientId: appointment.patientId,
      date: appointment.date,
      note: appointment.note,
      status: appointment.status,
    };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error updating appointment" });
  }
};

const deleteAppointment = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment)
      return res.status(404).json({ data: "Appointment not found" });

    return res.status(200).json({ success: true, data: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error deleting appointment" });
  }
};

const updateAppointmentStatus = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params;
  const { status } = req.body as { status: string };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ data: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    const response = {
      key: appointment._id,
      patientId: appointment.patientId,
      date: appointment.date,
      note: appointment.note,
      status: appointment.status,
    };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error updating appointment status" });
  }
};
export {
  saveAppointment,
  getAppointments,
  getAppointmentByPatientId,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
};
