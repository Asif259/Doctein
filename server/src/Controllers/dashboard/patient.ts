import { Request, Response } from "express";
import { IUser } from "../../Models/userModel";
import Patient, { IPatient } from "../../Models/profile/patient";
import Appointment from "../../Models/dashboard/appointment";

const savePatient = async (req: Request, res: Response): Promise<any> => {
  const { name, age, weight, phone, address, user, instant, doctorId } =
    req.body as {
      name: string;
      age: string;
      weight: string;
      phone: string;
      address: string;
      instant: boolean;
      user: IUser;
      doctorId: string;
    };

  try {
    console.log("Doctor ID:", doctorId);
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    // create a patient
    const patient = new Patient({
      name,
      age,
      weight,
      phone,
      address,
    });
    const savedPatient = await patient.save();
    console.log("Patient saved:", savedPatient);

    // create an appointment
    const appointment = new Appointment({
      patientId: savedPatient._id,
      doctorId: doctorId,
      date: instant ? new Date() : null,
    });
    const savedAppointment = await appointment.save();
    console.log("Appointment saved:", savedAppointment);

    // filter response
    const response = {
      key: savedPatient._id,
      name: savedPatient.name,
      age: savedPatient.age,
      weight: savedPatient.weight,
      phone: savedPatient.phone,
      address: savedPatient.address,
      appointmentId: savedAppointment?._id,
    };
    if (!instant) delete response.appointmentId;

    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error("Error saving patient:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error saving patient" });
  }
};

const getPatients = async (req: Request, res: Response): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
  const { search } = req.query as {
    limit?: string;
    page?: string;
    search?: string;
  };
  try {
    console.log("Doctor ID:", doctorId);
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    let appointments = await Appointment.find({
      doctorId,
      patientId: { $ne: null },
    })
      .populate("patientId", "name age weight phone address")
      .select("patientId")
      .sort({ _id: -1 });
    if (!appointments)
      return res.status(404).json({ data: "Patients not found" });

    if (search) {
      appointments = appointments.filter((appointment) => {
        const patient = appointment.patientId as any;
        return (
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.phone.includes(search)
        );
      });
    }
    const response = appointments.map((appointment) => {
      const patientId = appointment.patientId as unknown as IPatient;
      return {
        key: patientId._id,
        name: patientId.name,
        age: patientId.age,
        weight: patientId.weight,
        phone: patientId.phone,
        address: patientId.address,
      };
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error getting patients:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error getting patients" });
  }
};

const getPatient = async (req: Request, res: Response): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
  const { patientId } = req.params as any;
  try {
    console.log("Doctor ID:", doctorId);
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const appointment = (await Appointment.findOne({
      doctorId,
      patientId,
    })
      .populate("patientId", "name age weight phone address")
      .select("patientId")
      .projection("name age weight phone address")
      .find({ patientId: { $ne: null } })) as any;
    if (!appointment)
      return res.status(404).json({ data: "Patient not found" });

    const patient = appointment?.patientId;
    const response = {
      key: patient._id as string,
      name: patient.name,
      age: patient.age,
      weight: patient.weight,
      phone: patient.phone,
      address: patient.address,
    };

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error getting patient:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error getting patient" });
  }
};

const updatePatient = async (req: Request, res: Response): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
  const { patientId } = req.params;
  const { name, age, weight, phone, address } = req.body as {
    name: string;
    age: string;
    weight: string;
    phone: string;
    address: string;
  };
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const patient = await Appointment.findOne({
      doctorId,
      patientId,
    }).populate("patientId");

    console.log("Patient:", patient);

    if (!patient) return res.status(404).json({ data: "Patient not found" });

    const updatedPatient = await Patient.findByIdAndUpdate(
      patient.patientId,
      {
        name,
        age,
        weight,
        phone,
        address,
      },
      { new: true },
    );
    if (!updatedPatient)
      return res.status(500).json({ data: "Error updating patient" });

    console.log("Updated patient:", updatedPatient);

    const response = {
      key: updatedPatient._id,
      name: updatedPatient.name,
      age: updatedPatient.age,
      weight: updatedPatient.weight,
      phone: updatedPatient.phone,
      address: updatedPatient.address,
    };

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error updating patient" });
  }
};

const deletePatient = async (req: Request, res: Response): Promise<any> => {
  const { user, doctorId } = req.body as { user: IUser; doctorId: string };
  const { patientId } = req.params;
  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const deletedAppointment = await Appointment.findOneAndDelete({
      doctorId,
      patientId,
    });
    if (!deletedAppointment)
      return res.status(404).json({ data: "Patient not found" });
    console.log("Deleted Appointment:", deletedAppointment);

    return res.status(200).json({ success: true, data: "Patient deleted" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error deleting patient" });
  }
};

export { savePatient, getPatients, getPatient, updatePatient, deletePatient };
