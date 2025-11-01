"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { sendOtp } from "@/api/api";
import toast from "react-hot-toast";
import React from "react";
import { Mail } from "lucide-react";
import GInput from "@/components/globals/GInput";

export default function ForgotPassword({
    onSuccess,
}: {
    onSuccess: (email: string) => void;
}) {
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
                    toast.error(
                        response.data ||
                            "Failed to send OTP. Please try again.",
                    );
                    setErrors({ email: response.data || "Error sending OTP." });
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Error sending OTP: ${error.message}`);
                    setErrors({ email: error.message });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full mb-4">
                <Mail className="w-8 h-8 text-primary" />
            </div>
            
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                    Reset Your Password
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Enter your email address and we&apos;ll send you a one-time password (OTP) to reset your password.
                </p>
            </div>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <GInput
                    placeholder="Enter your email address"
                    type="email"
                    label="Email Address"
                    {...formik.getFieldProps("email")}
                    isInvalid={
                        formik.touched.email && Boolean(formik.errors.email)
                    }
                    errorMessage={
                        formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : undefined
                    }
                    classNames={{
                        label: "!text-black font-medium",
                        input: ["placeholder:text-gray-400"],
                        inputWrapper: ["bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white"],
                    }}
                />

                <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white font-semibold py-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
            </form>
        </div>
    );
}
