import { Request, Response } from "express";
import Staff from "../../Models/profile/staff";

const saveStaff = async (req: Request, res: Response): Promise<any> => {
    const { name, phone, address, status, doctorId } = req.body as {
        name: string;
        phone: string;
        address: string;
        status: "active" | "inactive" | "vacation";
        doctorId: string;
    };

    // Ensure doctorId is not null
    if (!doctorId) {
        return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    try {
        const staff = new Staff({
            name,
            phone,
            address,
            status,
            doctorId: doctorId, // Ensure correct field name 'doctorID'
        });
        const savedStaff = await staff.save();

        // Response formatting
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


export { saveStaff };
