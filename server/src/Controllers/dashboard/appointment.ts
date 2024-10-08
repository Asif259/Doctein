import { Request, Response } from "express";
import Appointment from "../../Models/dashboard/appointment";
import { IUser } from "../../Models/userModel";
import Patient from "../../Models/profile/patient";

const saveAppointment = async (req: Request, res: Response): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
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
      patientId: appointment.patientId,
      date: appointment.date,
      note: appointment.note,
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
      .populate("patientId", "name phone")
      .select("patientId date note");
    console.log("Appointments:", appointments);

    const response = appointments.map((appointment) => {
      const patient = appointment.patientId as any;
      const date = appointment.date as Date;
      const time = date?.toLocaleTimeString();
      return {
        key: appointment._id,
        patientName: patient.name,
        phone: patient.phone,
        date: date,
        time: time,
        note: appointment.note,
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

const updateAppointment = async (req: Request, res: Response): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };
  const { appointmentId } = req.params;
  const { date, note } = req.body as {
    appointmentId: string;
    date: string;
    note: string;
  };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ data: "Appointment not found" });

    appointment.date = new Date(date);
    appointment.note = note;
    await appointment.save();

    const response = {
      key: appointment._id,
      patientId: appointment.patientId,
      date: appointment.date,
      note: appointment.note,
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

export {
  saveAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
