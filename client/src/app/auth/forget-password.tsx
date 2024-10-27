"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { sendOtp } from "@/api/api";
import toast from "react-hot-toast";
import React from "react";


export default function ForgotPassword({ onSuccess }: { onSuccess: (email: string) => void; }) {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await sendOtp(values.email);

                if (response?.success) {
                    toast.success("OTP sent successfully!");
                    onSuccess(values.email);
                } else {
                    toast.error(response.data || "Failed to send OTP. Please try again.");
                    setErrors({ email: response.data || "Error sending OTP." });
                }
            } catch (error: any) {
                toast.error(`Error sending OTP: ${error.message}`);
                setErrors({ email: error.message });
            } finally {
                setSubmitting(false);
            }
        },

    });


    return (
        <div className="space-y-4">
            <p className="text-gray-600">
                Enter your email address to receive a one-time password (OTP).
            </p>

            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <Input
                        label="Enter your email"
                        type="email"
                        {...formik.getFieldProps("email")}
                        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500">{formik.errors.email}</p>
                    ) : null}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary-800 text-white py-2 px-4 rounded-lg"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
            </form>
        </div>
    );
}