"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOtp, activateUser, sendOtp } from "@/api/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Shield, Clock } from "lucide-react";
import GInput from "@/components/globals/GInput";

export default function EnterOTP({
    email,
    from,
    onSuccess,
}: {
    email?: string;
    from?: string;
    onSuccess: (email: string) => void;
}) {
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
        } catch {
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formik = useFormik({
        initialValues: { otp: "" },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required("OTP is required")
                .matches(/^[0-9]+$/, "OTP must be only digits")
                .min(6, "OTP must be exactly 6 digits")
                .max(6, "OTP must be exactly 6 digits"),
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

                    if (from === "forgetPassword") {
                        onSuccess(email);
                        toast.success("OTP verified successfully!");
                    }

                    if (from === "login") {
                        await activateUser(email);
                        onSuccess(email);
                        toast.success("OTP verified successfully!");
                    }
                }
            } catch {
                toast.error("Invalid OTP. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                    Enter Verification Code
                </h3>
                <p className="text-gray-600 text-sm">
                    We&apos;ve sent a 6-digit code to{" "}
                    <span className="font-semibold text-gray-900">{email}</span>
                </p>
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <GInput
                    placeholder="000000"
                    type="text"
                    label="OTP Code"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.otp && Boolean(formik.errors.otp)}
                    errorMessage={
                        formik.touched.otp && formik.errors.otp
                            ? formik.errors.otp
                            : undefined
                    }
                    classNames={{
                        label: "!text-black font-medium",
                        input: [
                            "placeholder:text-gray-400 text-center text-2xl font-bold tracking-widest",
                            "placeholder:tracking-widest",
                        ],
                        inputWrapper: [
                            "bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white",
                        ],
                    }}
                    maxLength={6}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, "");
                        formik.handleChange(e);
                    }}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:flex-1 bg-primary text-white font-semibold py-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
                    </Button>
                    
                    {resendTimer > 0 ? (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Resend in {formatTime(resendTimer)}</span>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleResendOtp}
                            variant="bordered"
                            className="w-full sm:w-auto border-2 border-primary text-primary font-semibold px-6 py-6 rounded-xl hover:bg-primary/10 transition-all duration-200"
                        >
                            Resend OTP
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
