"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import toast from "react-hot-toast";
import { saveDoctorProfile, updateDoctorProfile } from "@/api/api";
import { doctor } from "@/types/dashboard";
import { useProfileStore } from "@/store/profileStore";

interface ProfileComponentProps {
  doctor: doctor | null;
}

function ProfileComponent({ doctor }: ProfileComponentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { Doctor, addDoctor } = useProfileStore((state) => state);

  const formik = useFormik({
    initialValues: {
      name: doctor?.name || "",
      degrees: doctor?.degrees || [""],
      designation: doctor?.designation || "",
      specialization: doctor?.specialization || "",
      phone: doctor?.phone || [""],
      bmdcNumber: doctor?.bmdcNumber || "",
      digitalSignature: doctor?.digitalSignature || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      degrees: Yup.array().of(Yup.string().required("Degrees are required")),
      designation: Yup.string().required("Designation is required"),
      specialization: Yup.string().required("Specialization is required"),
      phone: Yup.array().of(
        Yup.string()
          .test("valid-phone", "Phone number is not valid", (value) => {
            const phoneNumber = parsePhoneNumberFromString(value || "", "US");
            return phoneNumber ? phoneNumber.isValid() : false;
          })
          .required("Phone number is required")
      ),
      bmdcNumber: Yup.string().required("BMDC Number is required"),
      digitalSignature: Yup.string().required("Digital signature is required"),
    }),
    onSubmit: async (values: doctor) => {
      setLoading(true); 
      const { name, degrees, designation, specialization, phone, bmdcNumber, digitalSignature } = values;

      try {
        if (doctor) {
          const res = await updateDoctorProfile({
            ...doctor,
            name,
            degrees,
            designation,
            specialization,
            phone,
            bmdcNumber,
            digitalSignature,
          });
          if (res?.success) {
            if (Doctor) {
              addDoctor(Doctor);
              toast.success("Doctor updated successfully");
              router.refresh();
              
            }
          }
        } else {
          const res = await saveDoctorProfile({
            name,
            degrees,
            designation,
            specialization,
            phone,
            bmdcNumber,
            digitalSignature,
          });
          if (res?.success) {
            addDoctor(res.data);
            toast.success("Doctor saved successfully");
            router.push(`/dashboard/profile`);
          }
        }
      } catch (error) {
        console.error("Error saving Doctor:", error);
      } finally {
        setLoading(false); 
      }
    },
  });

  const [additionalPhones, setAdditionalPhones] = useState<string[]>(doctor?.phone.slice(1) || []);

  const handleAdditionalPhoneChange = (index: number, value: string) => {
    const updatedPhones = [...additionalPhones];
    updatedPhones[index] = value;
    setAdditionalPhones(updatedPhones);
  };

  const handleAddPhone = () => {
    if (additionalPhones.length < 9) {
      setAdditionalPhones([...additionalPhones, ""]);
    } else {
      toast.error("You can add up to 10 phone numbers only!");
    }
  };

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center gap-4">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <Card className="h-[80dvh] w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center pb-0 pt-6">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt={formik.values.name}
          className="w-20 h-20 text-large"
          fallback={formik.values.name.split(" ").map((n) => n[0]).join("")}
        />
        <h2 className="text-2xl font-bold mt-4 text-slate-900">Profile</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-6 relative p-9">
        <form className="space-y-4 overflow-y-auto" >
          <Input
            label="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name && formik.touched.name}
            errorMessage={formik.touched.name && formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          />
          <Input
            label="Degrees"
            name="degrees"
            value={formik.values.degrees.join(", ")}
            onChange={(e) => {
              const degreesArray = e.target.value.split(",").map((degree) => degree.trim());
              formik.setFieldValue("degrees", degreesArray);
            }}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.degrees && formik.touched.degrees}
            errorMessage={formik.touched.degrees && formik.errors.degrees && (
              <span style={{ color: "red" }}>{formik.errors.degrees}</span>
            )}
          />
          <Input
            label="Designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.designation && formik.touched.designation}
            errorMessage={formik.touched.designation && formik.errors.designation && (
              <span style={{ color: "red" }}>{formik.errors.designation}</span>
            )}
          />
          <Input
            label="Specialization"
            name="specialization"
            value={formik.values.specialization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.specialization && formik.touched.specialization}
            errorMessage={formik.touched.specialization && formik.errors.specialization && (
              <span style={{ color: "red" }}>{formik.errors.specialization}</span>
            )}
          />
          <Input
            label="Primary Phone"
            name="phone[0]"  //  manage the phone array
            value={formik.values.phone[0]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.phone && formik.touched.phone}
            errorMessage={formik.touched.phone && formik.errors.phone && (
              <span style={{ color: "red" }}>{formik.errors.phone}</span>
            )}
          />

          {/* Additional Phones */}
          {additionalPhones.map((phone, index) => (
            <div key={index} className="flex items-center mb-4">
              <Input
                label={`Additional Phone ${index + 1}`}
                name={`phone[${index + 1}]`} 
                value={phone}
                onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                isInvalid={!!formik.errors.phone}
              />
              <Button
                type="button"
                onClick={() => {
                  const updatedPhones = additionalPhones.filter((_, i) => i !== index);
                  setAdditionalPhones(updatedPhones);
                }}
                className="ml-2 text-red-500"
              >
                X
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddPhone}
            className="mb-4 bg-primary-600 text-white"
          >
            Add additional phone
          </Button>
          <Input
            label="BMDC Number"
            name="bmdcNumber"
            value={formik.values.bmdcNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.bmdcNumber && formik.touched.bmdcNumber}
            errorMessage={formik.touched.bmdcNumber && formik.errors.bmdcNumber && (
              <span style={{ color: "red" }}>{formik.errors.bmdcNumber}</span>
            )}
          />
          <Input
            label="Digital Signature"
            name="digitalSignature"
            value={formik.values.digitalSignature}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.digitalSignature && formik.touched.digitalSignature}
            errorMessage={formik.touched.digitalSignature && formik.errors.digitalSignature && (
              <span style={{ color: "red" }}>{formik.errors.digitalSignature}</span>
            )}
          />
          
        </form>
        <div className="sticky bottom-0 bg-white pt-4">
            <Button
              type="button"
              onClick={formik.handleSubmit}
              isLoading={loading}
              className="w-full bg-primary-600 text-white"
            >
              Save Profile
            </Button>
          </div>
      </CardBody>
    </Card>
  );
}

export default ProfileComponent;
