import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import User from "../Models/userModel";

dotenv.config();

// get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        // Access the user from req.user set by your authentication middleware
        const user = req.body.user;

        if (!user) {
            return res.status(401).json({ success: false, data: "User not authenticated" });
        }

        // Exclude sensitive fields like password
        const userProfile = await User.findById(user._id).select("-password");

        if (!userProfile) {
            return res.status(404).json({ success: false, data: "User not found" });
        }

        return res.status(200).json({ success: true, data: userProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ success: false, data: "Error fetching user profile" });
    }
};
