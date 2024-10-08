import { Request, Response } from "express";
import User from "../Models/userModel";

export const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.body.user;

        if (!user) {
            return res.status(401).json({ success: false, data: "User not authenticated" });
        }

        const userProfile = await User.findById(user._id);

        if (!userProfile) {
            return res.status(404).json({ success: false, data: "User not found" });
        }

        const response = {
            success: true,
            data: {
                email: userProfile.email,
                role: userProfile.role,
                userId: userProfile.userId,
            }
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ success: false, data: "Error fetching user profile" });
    }
};
