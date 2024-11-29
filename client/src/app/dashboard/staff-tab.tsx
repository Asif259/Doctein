"use client";

import React, { useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { staff } from "@/types/dashboard";
import StaffForm from "@/app/dashboard/staffs/staff-form";
import { useDashboardStore } from "@/store/dashboard-store";
import { getStaffs } from "@/api/dashboard/staffAPI";

function StaffTab() {
    const { staffs, addStaffs } = useDashboardStore((state) => state);

    useEffect(() => {
        (async () => {
            const res = await getStaffs();
            if (res?.success) {
                console.log("Patients fetched successfully");
                addStaffs(res.data);
            }
        })();
    }, [addStaffs]);

    return (
        <>
            <Card className="mt-4 p-4">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Add New Staff</h3>
                </CardHeader>
                <CardBody>
                    <StaffForm onClose={() => {}} />
                </CardBody>
            </Card>

            <Card className="mt-4 p-4">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Staff List</h3>
                </CardHeader>
                <CardBody>
                    <Table aria-label="Prescription list">
                        <TableHeader>
                            <TableColumn>Staff Name</TableColumn>
                            <TableColumn>Phone</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Address</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {staffs.map((staff: staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>{staff.name}</TableCell>
                                    <TableCell>{staff.phone}</TableCell>
                                    <TableCell>{staff.status}</TableCell>
                                    <TableCell>{staff.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
}

export default StaffTab;
