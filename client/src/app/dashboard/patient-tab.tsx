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
import { getPatients } from "@/api/dashboard/patientAPI";
import PatientForm from "@/app/dashboard/patients/patient-form";
import { useDashboardStore } from "@/store/dashboard-store";

function PatientTab() {
    const { patients, addPatients } = useDashboardStore((state) => state);

    useEffect(() => {
        (async () => {
            const res = await getPatients();
            if (res?.success) {
                console.log("Patients fetched successfully");
                addPatients(res.data);
            }
        })();
    }, []);

    return (
        <>
            <Card className="mt-4 p-4">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Add New Patient</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                    <PatientForm />
                </CardBody>
            </Card>

            <Card className="mt-4 p-4">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Patient List</h3>
                </CardHeader>
                <CardBody>
                    <Table aria-label="Patient list">
                        <TableHeader>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Age</TableColumn>
                            <TableColumn>Weight</TableColumn>
                            <TableColumn>Phone</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {patients.map((patient, key) => (
                                <TableRow key={key}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.weight}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
}

export default PatientTab;
