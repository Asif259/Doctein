import React, {useEffect} from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { ShieldCheck, ShieldBan, TicketsPlane } from 'lucide-react';
import { useFormik } from "formik";
import { staff, StatusOption } from "@/types/dashboard";
import { saveStaff, updateStaff } from "@/api/dashboard/staffAPI";
import { useDashboardStore } from "@/store/dashboard-store";
import toast from "react-hot-toast";


function StaffForm({staff, onClose}: {
    staff?: staff | null;
    onClose: () => void;
}) {
    const { staffs, addStaffs } = useDashboardStore((state) => state);

    const statusOptions: StatusOption[] = [
        { key: "active", value: "active", startContent: <ShieldCheck />, children: "Active" },
        { key: "inactive", value: "inactive", startContent: <ShieldBan />, children: "Inactive" },
        { key: "vacation", value: "vacation", startContent: <TicketsPlane />, children: "Vacation" }
    ];

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: staff?.name || "",
            phone: staff?.phone || "",
            address: staff?.address || "",
            status: staff?.status || " ",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const { name, phone, address, status } = values;
            try {
                if (staff && staff.key) {
                    const res = await updateStaff(staff.key, { name, phone, address, status });
                    if (res?.success) {
                        const updatedStaffs = staffs.map((p) =>
                            p.key === staff.key ? res.data : p
                        );
                        addStaffs(updatedStaffs);
                        toast.success("Staff updated successfully");
                        onClose();
                        return;
                    }
                } else {
                    const res = await saveStaff({ name, phone, address, status });
                    if (res?.success) {
                        addStaffs([...staffs, res.data]);
                        toast.success("Staff saved successfully");
                        onClose();
                    }
                }
            } catch (error) {
                console.error("Error saving staff:", error);
            }
        },
    });

    useEffect(() => {
        console.log(staff);
    }, [staff]);

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
            <Select
                label="Status"
                placeholder="Select status"
                aria-label="Staff Status"
                onChange={(event) => {
                    const selectedValue = event.target.value;
                    formik.setFieldValue("status", selectedValue);
                }}
            >
                {statusOptions.map((option) => (
                    <SelectItem
                        key={option.key}
                        startContent={option.startContent}
                        value={formik.values.status}
                    >
                        {option.children}
                    </SelectItem>
                ))}
            </Select>

            <Button className="bg-secondary-600 text-secondary-100 mr-2" type="submit">
                {!staff ? "Add Staff" : "Update Staff"}
            </Button>
        </form>
    );
}

export default StaffForm;
