"use client";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Card, CardBody, CardHeader, Avatar, Button, Chip} from "@nextui-org/react";
import {Plus, Minus} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {parsePhoneNumberFromString} from "libphonenumber-js";
import toast from "react-hot-toast";
import {
    saveDoctor,
    updateDoctor,
} from "@/api/dashboard/profileAPI";
import {doctor} from "@/types/dashboard";
import {useProfileStore} from "@/store/profile-store";
import GInput from "@/components/globals/GInput";
import GAutoComplete, {Item} from "@/components/globals/GAutoComplete";
import degrees from "@/data/degrees";
import specializations from "@/data/specializations.json";
import {useShallow} from "zustand/react/shallow";


const ProfileComponent = ({doctor, onProfileUpdate,}: {
    doctor: doctor | null; onProfileUpdate: (doctor: doctor) => void;
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const {addDoctor} = useProfileStore(
        useShallow((state) => ({
            addDoctor: state.addDoctor,
        })),
    );

    // Manage additional phone numbers
    const [additionalPhones, setAdditionalPhones] = useState<string[]>(
        doctor?.phone.slice(1) || [],
    );


    const formik = useFormik({
        initialValues: {
            name: doctor?.name || "",
            degrees: doctor?.degrees || [],
            designation: doctor?.designation || "",
            specialization: doctor?.specialization || "",
            phone: doctor?.phone ? [doctor.phone[0]] : [],
            bmdcNumber: doctor?.bmdcNumber || "",
            digitalSignature: doctor?.digitalSignature || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            degrees: Yup.array()
                .min(1, "At least one degree is required")
                .of(Yup.string().required("Degrees are required")),
            designation: Yup.string().required("Designation is required"),
            specialization: Yup.string().required("Specialization is required"),
            phone: Yup.array()
                .min(1, "At least one phone number is required")
                .of(
                    Yup.string()
                        .test(
                            "valid-phone",
                            "Phone number is not valid",
                            (value) => {
                                const phoneNumber = parsePhoneNumberFromString(value || "", "BD");
                                return phoneNumber ? phoneNumber.isValid() : false;
                            }
                        )
                        .required("Phone number is required")
                )
                .test("unique-phones", "Phone numbers must be unique", (phones) =>
                    phones ? new Set(phones).size === phones.length : true
                ),
            bmdcNumber: Yup.string().required("BMDC Number is required"),
            digitalSignature: Yup.string().required("Digital signature is required"),
        }),
        onSubmit: async (values: doctor) => {
            console.log(values);
            setLoading(true);

            // Merge additional phones with the primary phone
            const phoneNumbers = [...values.phone, ...additionalPhones];

            const {
                name,
                degrees,
                designation,
                specialization,
                bmdcNumber,
                digitalSignature,
            } = values;

            try {
                if (doctor) {
                    // Updating existing doctor profile
                    const res = await updateDoctor({
                        ...doctor,
                        name,
                        degrees,
                        designation,
                        specialization,
                        phone: phoneNumbers,
                        bmdcNumber,
                        digitalSignature,
                    });
                    if (res?.success) {
                        addDoctor(res.data);
                        toast.success("Profile updated successfully");
                        onProfileUpdate(doctor);
                    }
                } else {
                    // Creating new doctor profile
                    const res = await saveDoctor({
                        name,
                        degrees,
                        designation,
                        specialization,
                        phone: phoneNumbers,
                        bmdcNumber,
                        digitalSignature,
                    });
                    if (res?.success) {
                        addDoctor(res.data);
                        toast.success("Profile saved successfully");
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

    useEffect(() => {
        console.log(formik.values)
    }, [formik]);

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

    return (
        <Card className="h-[76dvh] w-full max-w-3xl mx-auto bg-default p-6 pb-0">
            <CardHeader className="flex flex-col items-center pb-0 pt-2">
                <Avatar
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    alt={formik.values.name}
                    className="text-large"
                    style={{height: "120px", width: "120px"}}
                    fallback={formik.values.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                />
            </CardHeader>
            <CardBody className="flex relative bg-default">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="flex space-x-14">
                        <div className="w-full space-y-6">
                            <GInput
                                label="Full Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!formik.errors.name && formik.touched.name
                                }
                                errorMessage={
                                    formik.touched.name && formik.errors.name
                                }

                            />
                            <GAutoComplete
                                items={degrees as unknown as Item[]}
                                label="Degrees"
                                name="degrees"
                                value={formik.values.degrees}
                                onSelectionChange={(selectedDegree) => {
                                    if (
                                        selectedDegree &&
                                        !formik.values.degrees.includes(
                                            selectedDegree as string,
                                        )
                                    ) {
                                        formik.setFieldValue("degrees", [
                                            ...formik.values.degrees,
                                            selectedDegree,
                                        ]);
                                    }
                                }}
                                onBlur={() => formik.setFieldTouched("degrees", true)}
                                isInvalid={!!formik.errors.degrees && formik.touched.degrees}
                                errorMessage={formik.touched.degrees && formik.errors.degrees}
                            />

                            {formik.values.degrees.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formik.values.degrees.map(
                                        (degree, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-1 bg-default px-2 py-1 rounded"
                                            >
                                                <Chip
                                                    onClick={() => {
                                                        formik.setFieldValue(
                                                            "degrees",
                                                            formik.values.degrees.filter(
                                                                (d) =>
                                                                    d !==
                                                                    degree,
                                                            ),
                                                        );
                                                    }}
                                                    className="bg-warning-500 text-black cursor-pointer">{degrees.find(d => d.key === degree)?.label || degree}
                                                </Chip>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            <GInput
                                label="Phone"
                                name="phone[0]"
                                value={formik.values.phone[0]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!formik.errors.phone &&
                                    formik.touched.phone
                                }
                                errorMessage={
                                    formik.touched.phone && formik.errors.phone
                                }
                                endContent={
                                    <Plus className="size-4 cursor-pointer" onClick={handleAddPhone}/>
                                }
                            />

                            {/* Additional Phones */}
                            {additionalPhones.map((phone, index) => (
                                <div
                                    key={index}
                                    className="flex items-center mb-4 "
                                >
                                    <GInput
                                        label={`Additional Phone ${index + 1}`}
                                        name={`phone[${index + 1}]`}
                                        value={phone}
                                        onChange={(e) =>
                                            handleAdditionalPhoneChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        isInvalid={
                                            !!formik.errors.phone &&
                                            formik.touched.phone
                                        }
                                        errorMessage={
                                            formik.touched.phone &&
                                            formik.errors.phone
                                        }
                                        endContent={
                                            <Minus className="size-4 text-danger cursor-pointer" onClick={() => {
                                                const updatedPhones =
                                                    additionalPhones.filter(
                                                        (_, i) => i !== index,
                                                    );
                                                setAdditionalPhones(updatedPhones);
                                            }}/>
                                        }
                                    />

                                </div>
                            ))}

                        </div>
                        <div className="w-full space-y-6">
                            <GInput
                                label="Designation"
                                name="designation"
                                value={formik.values.designation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!formik.errors.designation &&
                                    formik.touched.designation
                                }
                                errorMessage={
                                    formik.touched.designation &&
                                    formik.errors.designation
                                }
                            />

                            <GAutoComplete
                                items={specializations as unknown as Item[]}
                                label="Specialization"
                                name="specialization"
                                defaultInputValue={formik.values.specialization}
                                value={formik.values.specialization}
                                onSelectionChange={(selectedSpecialization) => {
                                    const sp = specializations.find(
                                        (s) => s.key === selectedSpecialization,
                                    )
                                    console.log(selectedSpecialization)
                                    if (sp) {
                                        formik.setFieldValue("specialization", sp.value);
                                    }
                                }}
                                isInvalid={
                                    !!formik.errors.specialization &&
                                    formik.touched.specialization
                                }
                                errorMessage={
                                    formik.touched.specialization &&
                                    formik.errors.specialization
                                }
                            />

                            <GInput
                                label="BMDC Number"
                                name="bmdcNumber"
                                value={formik.values.bmdcNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!formik.errors.bmdcNumber &&
                                    formik.touched.bmdcNumber
                                }
                                errorMessage={
                                    formik.touched.bmdcNumber &&
                                    formik.errors.bmdcNumber
                                }
                            />
                            <GInput
                                label="Digital Signature"
                                name="digitalSignature"
                                value={formik.values.digitalSignature}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!formik.errors.digitalSignature &&
                                    formik.touched.digitalSignature
                                }
                                errorMessage={
                                    formik.touched.digitalSignature &&
                                    formik.errors.digitalSignature
                                }
                            />
                        </div>
                    </div>

                    <div className="sticky bottom-0 pt-4 bg-default">
                        <Button radius="sm" type="submit" isLoading={loading} className="w-full bg-primary text-white">
                            {doctor ? "Update Profile" : "Save Profile"}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default ProfileComponent;