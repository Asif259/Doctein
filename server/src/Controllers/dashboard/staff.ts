import { Request, Response } from "express";
import Staff from "../../Models/profile/staff";
import Doctor from '../../Models/profile/doctor';

const saveStaff = async (req: Request, res: Response): Promise<any> => {
    const { name, phone, address, status, doctorId } = req.body as {
        name: string;
        phone: string;
        address: string;
        status: "active" | "inactive" | "vacation";
        doctorId: string;
    };

    if (!doctorId) {
        console.error("Doctor ID is missing or null");
        return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    try {
        const staff = new Staff({
            name,
            phone,
            address,
            status,
            doctorId,
        });
        const savedStaff = await staff.save();

        const response = {
            key: savedStaff._id,
            name: savedStaff.name,
            phone: savedStaff.phone,
            address: savedStaff.address,
            status: savedStaff.status,
            doctorId: savedStaff.doctorId,
        };

        return res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.error("Error saving staff:", error);
        return res.status(500).json({ success: false, data: "Error saving staff" });
    }
};

const getStaffs = async (req: Request, res: Response): Promise<any> => {
    const { doctorId } = req.body;

    if (!doctorId) {
        return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    try {
        const staffs = await Staff.find({ doctorId });

        if (!staffs.length) {
            return res.status(200).json({ success: true, data: [] });
        }

        const response = staffs.map(staff => ({
            key: staff._id,
            name: staff.name,
            phone: staff.phone,
            address: staff.address,
            status: staff.status,
            doctorId: staff.doctorId,
        }));

        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Error fetching staffs:", error);
        return res.status(500).json({ success: false, message: "Error fetching staffs" });
    }
};

const updateStaff = async (req: Request, res: Response): Promise<any> => {
    const { staffId } = req.params; // Assuming staffId is passed as a route parameter
    const { name, phone, address, status } = req.body as {
        name: string;
        phone: string;
        address: string;
        status: "active" | "inactive" | "vacation";
    };

    if (!staffId) {
        return res.status(400).json({ success: false, message: "Staff ID is required" });
    }

    try {
        // Find staff by ID and update the details
        const updatedStaff = await Staff.findByIdAndUpdate(
            staffId,
            { name, phone, address, status },
            { new: true } // Return the updated staff object
        );

        // If no staff found with the provided ID
        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        // Return the updated staff details
        const response = {
            key: updatedStaff._id,
            name: updatedStaff.name,
            phone: updatedStaff.phone,
            address: updatedStaff.address,
            status: updatedStaff.status,
            doctorId: updatedStaff.doctorId,
        };

        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ success: false, message: "Error updating staff" });
    }
};

export { saveStaff, getStaffs, updateStaff  };
