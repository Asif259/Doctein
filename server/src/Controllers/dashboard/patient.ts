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

    // create a prescription
    // const prescription = new Prescription({
    //   patientId: savedPatient._id,
    //   doctorId: doctorId,
    //   date: new Date(),
    // });

    // filter response
    const response = {
      key: savedPatient._id,
      name: savedPatient.name,
      age: savedPatient.age,
      weight: savedPatient.weight,
      phone: savedPatient.phone,
      address: savedPatient.address,
    };

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
  try {
    console.log("Doctor ID:", doctorId);
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const patients = await Appointment.find({
      doctorId,
    })
      .limit(10)
      .populate("patientId", "name age weight phone address")
      .select("patientId")
      .sort({ _id: -1 });

    console.log("Patients:", patients);

    const response = patients.map((patient) => {
      const patientId = patient.patientId as unknown as IPatient;
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

    const patient = await Appointment.findOne({
      doctorId,
      patientId,
    })
      .populate("patientId", "name age weight phone address")
      .select("patientId");

    console.log("Patient:", patient);

    const response = {
      // key: patient._id,
      // name: patient.name,
      // age: patient.age,
      // weight: patient.weight,
      // phone: patient.phone,
      // address: patient.address,
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
    console.log("Doctor ID:", doctorId);
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const patient = await Appointment.findOne({
      doctorId,
      patientId,
    }).populate("patientId");

    console.log("Patient:", patient);

    if (!patient) return res.status(404).json({ data: "Patient not found" });

    const deletedPatient = await Patient.findByIdAndDelete(patient.patientId);

    console.log("Deleted patient:", deletedPatient);

    return res.status(200).json({ success: true, data: "Patient deleted" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error deleting patient" });
  }
};

export { savePatient, getPatients, getPatient, updatePatient, deletePatient };
