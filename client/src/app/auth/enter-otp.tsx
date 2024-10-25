"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOtp, activateUser, sendOtp } from "@/api/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function EnterOTP({email, from, onSuccess,}: { email?: string; from?: string; onSuccess: (email: string) => void; }) {
    const [resendTimer, setResendTimer] = useState<number>(120);
    const router = useRouter();

    // Function to handle OTP resend
    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Email is missing");
            return;
        }

        try {
            const response = await sendOtp(email);
            if (response.success) {
                toast.success("OTP resent successfully");
                setResendTimer(120); // Reset timer to 120 seconds
            }
        } catch (err: any) {
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formik = useFormik({
        initialValues: { otp: "" },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required("Please enter the OTP")
                .length(6, "OTP must be exactly 6 characters"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            if (!email) return;
            try {
                const response = await verifyOtp(email, values.otp);
                if (response.success) {
                    if (from === "register") {
                        await activateUser(email);
                        router.push("/auth/login");
                        toast.success("OTP verified successfully!");
                    }

                    if (from === "login") {
                        onSuccess(email);
                        toast.success("OTP verified successfully!");

                    }
                }
            } catch (err: any) {
                toast.error("Invalid OTP. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }

    });

    return (
        <div className="space-y-4">
            <p className="text-neutral">Enter the OTP sent to your email</p>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <Input
                    label="Enter Otp"
                    type="text"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.otp && formik.errors.otp && (
                    <p className="error-text">{formik.errors.otp}</p>
                )}

                <div className="flex justify-between mt-2">
                    <Button
                        type="submit"
                        className="submit-btn bg-primary text-white"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
                    </Button>
                    {resendTimer > 0 ? (
                        <p className="text-neutral">Resend OTP in {resendTimer}s</p>
                    ) : (
                        <Button
                            onClick={handleResendOtp}
                            className="resend-btn bg-primary text-white"
                        >
                            Resend OTP
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
