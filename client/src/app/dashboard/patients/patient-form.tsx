import React from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { patient } from "@/types/dashboard";
import { savePatient, updatePatient } from "@/api/dashboard/patientAPI";
import { useDashboardStore } from "@/store/dashboard-store";
import toast from "react-hot-toast";

function PatientForm({ patient }: { patient?: patient | null }) {
  const { patients, addPatients } = useDashboardStore((state) => state);
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: patient?.name || "",
      age: patient?.age || "",
      weight: patient?.weight || "",
      phone: patient?.phone || "",
      address: patient?.address || "",
      instant: patient?.instant || false,
    },
    onSubmit: async (values: patient) => {
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
        }
      } catch (error) {
        console.error("Error saving patient:", error);
      }
    },
  });
  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <Input
        label="Patient Name"
        placeholder="patient name"
        {...formik.getFieldProps("name")}
      />
      <Input
        label="Patient Age"
        placeholder="patient age"
        {...formik.getFieldProps("age")}
      />
      <Input
        label="Weight (kg)"
        placeholder="patient weight"
        {...formik.getFieldProps("weight")}
      />
      <Input
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
        className="bg-secondary-600 text-secondary-100 mr-2"
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
          Instant?
        </Checkbox>
      )}
    </form>
  );
}

export default PatientForm;
