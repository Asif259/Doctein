import {Request, Response} from 'express';
import Doctor from '../../Models/profile/doctor';
import User from '../../Models/userModel';

export const saveDoctor = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Received data:", req.body);
        const { name, degrees, designation, specialization, phone, bmdcNumber, digitalSignature } = req.body;
        const doctor = new Doctor({
            name,
            degrees,
            designation,
            specialization,
            phone,
            bmdcNumber,
            digitalSignature,
        });
        const { email } = req.body.user;

        if (!email) {
            return res.status(400).json({ success: false, data: "Missing email" });
        }

        const savedDoctor = await Doctor.create(doctor);

        if (!savedDoctor) {
            return res.status(500).json({ success: false, data: "Error saving doctor" });
        }

        const user = await User.findOneAndUpdate(
            { email: email },
            { userId: savedDoctor._id },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, data: "User not found" });
        }

        const response = {
            key: savedDoctor._id,
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
        return res.status(500).json({ success: false, data: "Server error", error: error.message });
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
    const { user, name, degrees, designation, specialization, phone, bmdcNumber, digitalSignature } = req.body;

    console.log(req.body);

    try {
        if (!user.userId) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            user.userId,
            {
                name,
                degrees,
                designation,
                specialization,
                phone,
                bmdcNumber,
                digitalSignature,
            },
            { new: true }
        );
        console.log("Updated doctor:", updatedDoctor);

        if (!updatedDoctor) {
            return res.status(500).json({ message: "Error updating doctor profile" });
        }

        const response = {
            key: updatedDoctor._id,
            name: updatedDoctor.name,
            degrees: updatedDoctor.degrees,
            designation: updatedDoctor.designation,
            specialization: updatedDoctor.specialization,
            phone: updatedDoctor.phone,
            bmdcNumber: updatedDoctor.bmdcNumber,
            digitalSignature: updatedDoctor.digitalSignature,
        };

        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Error updating doctor:", error);
        return res.status(500).json({ success: false, message: "Error updating doctor profile" });
    }
};














