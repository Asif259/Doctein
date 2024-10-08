import { Request, Response } from 'express';
import Doctor from '../../Models/profile/doctor';
import User from '../../Models/userModel';

export const saveDoctor = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Received data:", req.body); 
    const doctorData = req.body;

    if (!doctorData.email) {
      return res.status(400).json({ success: false, data: "Missing email" });
    }

    const savedDoctor = await Doctor.create(doctorData);

    const user = await User.findOneAndUpdate(
      { email: doctorData.email }, 
      { userId: savedDoctor._id },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ success: false, data: "User not found" });
    }

    return res.status(201).json({
      success: true,
      doctor: savedDoctor,
      updatedUser: user
    });
  } catch (error: any) {
    console.error("Error saving doctor:", error);
    return res.status(500).json({ success: false, data: "Server error", error: error.message });
  }
};
