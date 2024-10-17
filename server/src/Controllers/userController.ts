import { Request, Response } from "express";
import { IUser } from "../Models/userModel";
import Appointment from "../Models/dashboard/appointment";

export const getDashboard = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { doctorId } = req.body as { doctorId: string };

  try {
    if (!doctorId) return res.status(403).json({ data: "Unauthorized" });

    const totalAppointmentCount = await Appointment.countDocuments({
      doctorId,
      date: { $ne: null },
    });
    const upcomingAppointmentCount = await Appointment.countDocuments({
      doctorId,
      date: { $ne: null },
      status: "upcoming",
    });
    const patientsCount = await Appointment.distinct("patientId", {
      doctorId,
    }).countDocuments();

    const response = {
      totalAppointmentCount,
      upcomingAppointmentCount,
      patientsCount,
    };

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching dashboard data" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const user = req.body.user as IUser;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, data: "User not authenticated" });
    }

    const response = {
      email: user.email,
      role: user.role,
      userId: user.userId,
      active: user.active,
    };

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching user profile" });
  }
};
