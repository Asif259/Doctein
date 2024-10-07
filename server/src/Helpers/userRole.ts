import { IUser } from "../Models/userModel";
import Staff from "../Models/profile/staff";

export const getDoctorId = async (user: IUser): Promise<string | null> => {
  let doctorId = null;

  // Check if the user is a doctor/staff
  if (!["doctor", "staff"].includes(user.role)) return null;

  // Get the doctorId from either the doctor or staff collection
  if (user.role === "doctor") doctorId = user._id as string;
  else if (user.role === "staff") {
    const staff = await Staff.findOne({ userId: user._id });
    if (staff) doctorId = staff.doctorId as string;
  }

  return doctorId;
};
