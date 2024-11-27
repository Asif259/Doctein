import {Request, Response} from 'express';
import Doctor from '../../Models/profile/doctor';
import User from '../../Models/userModel';
import Prescription from "../../Models/dashboard/prescription";
import fs from "node:fs";
import Appointment from "../../Models/dashboard/appointment";
import doctor from "../../Models/profile/doctor";

export const saveDoctor = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Received data:", req.body);
        const {
            profileImage,
            name,
            degrees,
            designation,
            specialization,
            phone,
            bmdcNumber,
            digitalSignature
        } = req.body;
        const doctor = new Doctor({
            profileImage,
            name,
            degrees,
            designation,
            specialization,
            phone,
            bmdcNumber,
            digitalSignature,
        });
        const {email} = req.body.user;

        if (!email) {
            return res.status(400).json({success: false, data: "Missing email"});
        }

        const savedDoctor = await Doctor.create(doctor);

        if (!savedDoctor) {
            return res.status(500).json({success: false, data: "Error saving doctor"});
        }

        const user = await User.findOneAndUpdate(
            {email: email},
            {userId: savedDoctor._id},
            {new: true}
        );

        if (!user) {
            return res.status(404).json({success: false, data: "User not found"});
        }

        const response = {
            key: savedDoctor._id,
            profileImage: savedDoctor.profileImage,
            name: savedDoctor.name,
            degrees: savedDoctor.degrees,
            designation: savedDoctor.designation,
            specialization: savedDoctor.specialization,
            phone: savedDoctor.phone,
            digitalSignature: savedDoctor.digitalSignature,
        };
        return res.status(201).json({
            success: true,
            doctor: response,
            updatedUser: user
        });
    } catch (error: any) {
        console.error("Error saving doctor:", error);
        return res.status(500).json({success: false, data: "Server error", error: error.message});
    }
};


export const getDoctor = async (req: Request, res: Response): Promise<any> => {
    try {
        const {email} = req.body.user;

        const doctor = await User.findOne({
            email: email,
            role: "doctor",
        }).populate('userId');

        if (!doctor) {
            return res.status(404).json({message: "Doctor not found"});
        }

        const doctorProfile = await Doctor.findOne({_id: doctor.userId});

        if (!doctorProfile) {
            return res.status(404).json({message: "Doctor profile not found"});
        }

        return res.status(200).json({doctorProfile, email});
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};


export const updateDoctor = async (req: Request, res: Response): Promise<any> => {
    const {
        user,
        profileImage,
        name,
        degrees,
        designation,
        specialization,
        phone,
        bmdcNumber,
        digitalSignature
    } = req.body;

    console.log(req.body);

    try {
        if (!user.userId) {
            return res.status(404).json({message: "Doctor not found"});
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            user.userId,
            {
                profileImage,
                name,
                degrees,
                designation,
                specialization,
                phone,
                bmdcNumber,
                digitalSignature,
            },
            {new: true}
        );
        console.log("Updated doctor:", updatedDoctor);

        if (!updatedDoctor) {
            return res.status(500).json({message: "Error updating doctor profile"});
        }

        const response = {
            key: updatedDoctor._id,
            profileImage: updatedDoctor.profileImage,
            name: updatedDoctor.name,
            degrees: updatedDoctor.degrees,
            designation: updatedDoctor.designation,
            specialization: updatedDoctor.specialization,
            phone: updatedDoctor.phone,
            bmdcNumber: updatedDoctor.bmdcNumber,
            digitalSignature: updatedDoctor.digitalSignature,
        };

        return res.status(200).json({success: true, data: response});
    } catch (error) {
        console.error("Error updating doctor:", error);
        return res.status(500).json({success: false, message: "Error updating doctor profile"});
    }
};

export const uploadProfileImage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    const {user} = req.body;
    try {
        if (!req.file) return res.status(400).send("No files were uploaded.");

        const doctor = await Doctor.findOne({_id: user.userId}).exec();
        console.log("Doctors:", doctor);

        // Update the image if it already exists and delete the previous image
        if (!doctor) {
            return res.status(404).json({success: false, data: "Doctor not found"});
        }
        const prevImage = doctor.profileImage;
        if (prevImage) {
            // Delete the previous snapshot
            const path = `uploads${prevImage}`;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
            });
        }
        doctor.profileImage = `\\doctors\\${req.file.filename}`;
        await doctor.save();


        return res.status(201).json({success: true, data: doctor.profileImage});
    } catch (error) {
        console.error("Error uploading file:", error);
        return res
            .status(500)
            .json({success: false, data: "Error uploading file"});
    }
};













