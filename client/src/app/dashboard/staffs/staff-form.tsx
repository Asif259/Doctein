import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { staff } from "@/types/dashboard";
import { saveStaff, updateStaff } from "@/api/dashboard/staffAPI";
import { useDashboardStore } from "@/store/dashboard-store";
import toast from "react-hot-toast";

function StaffForm({ staff }: { staff?: staff | null }) {
    const { staffs, addStaff } = useDashboardStore((state) => state);

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: staff?.name || "",
            phone: staff?.phone || "",
            address: staff?.address || "",
            status: staff?.status || "",
        },
        onSubmit: async (values) => {
            const { name, phone, address, status } = values;

            try {
                if (staff) {
                    const res = await updateStaff(staff?.id, {
                        ...staff,
                        name,
                        phone,
                        address,
                        status,
                    });
                    if (res?.success) {
                        const updatedStaffs = staffs.map((p) =>
                            p.id === staff.id ? res.data : p
                        );
                        addStaff(updatedStaffs);
                        toast.success("Staff updated successfully");
                        return;
                    }
                } else {
                    const res = await saveStaff({
                        id: staffs.length ? staffs.length + 1 : 1,
                        name,
                        phone,
                        address,
                        status,
                    });
                    if (res?.success) {
                        addStaff([...staffs, res.data]);
                        toast.success("Staff saved successfully");
                    }
                }
            } catch (error) {
                console.error("Error saving staff:", error);
            }
        },
    });

    return (
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <Input
                label="Staff Name"
                placeholder="Enter staff name"
                {...formik.getFieldProps("name")}
            />
            <Input
                label="Phone"
                placeholder="Enter staff phone number"
                {...formik.getFieldProps("phone")}
            />
            <Input
                label="Address"
                placeholder="Enter staff address"
                {...formik.getFieldProps("address")}
            />
            <Input
                label="Status"
                placeholder="Enter staff status (active, inactive, vacation)"
                {...formik.getFieldProps("status")}
            />
            <Button
                className="bg-secondary-600 text-secondary-100 mr-2"
                type="submit"
            >
                {!staff ? "Add Staff" : "Update Staff"}
            </Button>
        </form>
    );
}

export default StaffForm;
