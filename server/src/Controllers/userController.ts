import { Request, Response } from "express";
import { IUser } from "../Models/userModel";

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
    };

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error fetching user profile" });
  }
};
