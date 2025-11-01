import React from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { IPatient } from "@/types/dashboard";
import { savePatient, updatePatient } from "@/api/dashboard/patientAPI";
import { useDashboardStore } from "@/store/dashboard-store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

function PatientForm({
    patient,
    isPrescription,
    onClose,
}: {
    patient?: IPatient | null;
    isPrescription?: boolean;
    onClose?: () => void;
}) {
    const router = useRouter();
    const { patients, addPatients } = useDashboardStore((state) => state);
    const formik = useFormik({
        initialValues: {
            id: 0,
            name: patient?.name || "",
            age: patient?.age || "",
            weight: patient?.weight || "",
            phone: patient?.phone || "",
            address: patient?.address || "",
            instant: patient?.instant || isPrescription || false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            age: Yup.number().required("Age is required"),
            weight: Yup.number().required("Weight is required"),
            phone: Yup.string().required("Phone is required"),
        }),
        onSubmit: async (values: IPatient) => {
            const { name, age, weight, phone, address, instant } = values;
            try {
                if (patient) {
                    const res = await updatePatient(patient?.key, {
                        ...patient,
                        name,
                        age,
                        weight,
                        phone,
                        address,
                    });
                    if (res?.success) {
                        const updatedPatients = patients.map((p) =>
                            p.key === patient.key ? res.data : p,
                        );
                        addPatients(updatedPatients);
                        toast.success("Patient updated successfully");
                        formik.resetForm();
                        if (onClose) {
                            onClose();
                        }
                        return;
                    }
                }
                const res = await savePatient({
                    id: patients.length ? patients.length + 1 : 1,
                    name,
                    age,
                    weight,
                    phone,
                    address,
                    instant,
                });
                if (res?.success) {
                    addPatients([...patients, res.data]);
                    toast.success("Patient saved successfully");
                    formik.resetForm();

                    // for instant patients redirect to prescriptions app on patient save
                    if (instant && res?.data?.appointmentId) {
                        router.push(
                            `/dashboard/prescription/${res.data.appointmentId}`,
                        );
                    } else if (onClose) {
                        onClose();
                    }
                }
            } catch (error) {
                console.error("Error saving patient:", error);
            }
        },
    });
    return (
        <form className="space-y-4 max-w-md" onSubmit={formik.handleSubmit}>
            <div>
                <Input
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    errorMessage={formik.errors.name}
                    label="Patient Name"
                    placeholder="patient name"
                    {...formik.getFieldProps("name")}
                />
            </div>
            <div>
                <Input
                    type="number"
                    isInvalid={formik.touched.age && !!formik.errors.age}
                    errorMessage={formik.errors.age}
                    label="Patient Age"
                    placeholder="patient age"
                    {...formik.getFieldProps("age")}
                />
            </div>
            <Input
                type="number"
                isInvalid={formik.touched.weight && !!formik.errors.weight}
                errorMessage={formik.errors.weight}
                label="Weight (kg)"
                placeholder="patient weight"
                {...formik.getFieldProps("weight")}
            />
            <Input
                isInvalid={formik.touched.phone && !!formik.errors.phone}
                errorMessage={formik.errors.phone}
                label="Phone"
                placeholder="phone number"
                {...formik.getFieldProps("phone")}
            />
            <Input
                label="Address"
                placeholder="patient address"
                {...formik.getFieldProps("address")}
            />
            <Button
                variant="solid"
                color="primary"
                className="mr-2"
                type="submit"
            >
                {!patient ? "Add Patient" : "Update Patient"}
            </Button>
            {!patient && (
                <Checkbox
                    color="warning"
                    name="instant"
                    isSelected={formik.values.instant}
                    onValueChange={(isSelected: boolean) => {
                        formik.setFieldValue("instant", isSelected);
                    }}
                >
                    <span className="text-sm">Instant?</span>
                </Checkbox>
            )}
        </form>
    );
}

export default PatientForm;
