"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input, Button, Image } from "@nextui-org/react";
import { registerUser, sendOtp } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import EnterOTP from "../enter-otp";
import CustomModal from "@/app/auth/customModal";
import GInput from "@/components/globals/GInput";

export default function Register() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setConfirmIsVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!role) {
            router.push("/auth");
        }
    }, [role, router]);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () =>
        setConfirmIsVisible(!isConfirmVisible);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Please enter a valid email"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/[A-Za-z]/, "Password must contain at least one letter")
            .matches(/\d/, "Password must contain at least one number")
            .required("Enter your password"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Re-enter your password"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await registerUser(
                    values.email,
                    values.password,
                    values.confirmPassword,
                    role as string,
                );

                if (!response) {
                    toast.error("No response from server. Please try again.");
                    return;
                }

                if (!response.success) {
                    if (response.requireOtp === true) {
                        toast.success(
                            "User not active. OTP sent to your email",
                        );
                        setEmail(values.email);
                        await sendOtp(values.email);
                        setModalVisible(true);
                    } else {
                        // Show error but don't redirect for validation errors
                        const errorMessage =
                            response.data ||
                            response.message ||
                            "Registration failed";
                        toast.error(errorMessage);

                        // Only redirect if user already exists
                        if (
                            errorMessage
                                .toLowerCase()
                                .includes("already exists") ||
                            errorMessage
                                .toLowerCase()
                                .includes("user exists") ||
                            errorMessage.toLowerCase().includes("email already")
                        ) {
                            // Wait a bit before redirecting to show the error
                            setTimeout(() => {
                                router.push("/auth/login");
                            }, 2000);
                        } else {
                            // For validation errors from server, show them on the form
                            if (response.data) {
                                // Check if it's a password error
                                if (
                                    errorMessage
                                        .toLowerCase()
                                        .includes("password")
                                ) {
                                    setErrors({ password: response.data });
                                } else {
                                    setErrors({ email: response.data });
                                }
                            }
                        }
                    }
                } else {
                    toast.success(
                        "Registration successful! Please check your email for confirmation.",
                    );
                    setEmail(values.email);
                    await sendOtp(values.email);
                    setModalVisible(true);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    const errorMessage =
                        err.message || "Registration failed. Please try again.";
                    toast.error(errorMessage);
                    // Try to set error on appropriate field
                    if (errorMessage.toLowerCase().includes("password")) {
                        setErrors({ password: errorMessage });
                    } else {
                        setErrors({ email: errorMessage });
                    }
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary/5 relative overflow-hidden py-12 px-4">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-10">
                    {/* Logo and Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-primary rounded-lg shadow-lg">
                                <img
                                    src="/Logo.png"
                                    alt="Doctein Logo"
                                    className="w-6 h-6"
                                />
                            </div>
                            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
                                Doctein
                            </Link>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600 text-center">
                            Register as a{" "}
                            <span className="font-semibold text-primary capitalize">
                                {role}
                            </span>{" "}
                            to get started
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 mb-6 rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:shadow-md text-gray-700 font-semibold transition-all duration-200"
                    >
                        <img
                            src="/Logo.png"
                            alt="google"
                            className="w-5 h-5"
                        />
                        <span>Continue with Google</span>
                    </button>

                    <div className="w-full flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-500 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <form
                        className="space-y-4 w-full"
                        onSubmit={formik.handleSubmit}
                    >
                        <GInput
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
                            {...formik.getFieldProps("email")}
                            isInvalid={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            errorMessage={
                                formik.touched.email && formik.errors.email
                                    ? formik.errors.email
                                    : undefined
                            }
                            classNames={{
                                label: "!text-black font-medium",
                                input: ["placeholder:text-gray-400"],
                                inputWrapper: [
                                    "bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white",
                                ],
                            }}
                        />
                        <div className="relative">
                            <GInput
                                label="Password"
                                placeholder="Enter your password"
                                {...formik.getFieldProps("password")}
                                isInvalid={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                errorMessage={
                                    formik.touched.password &&
                                    formik.errors.password
                                        ? formik.errors.password
                                        : undefined
                                }
                                classNames={{
                                    label: "!text-black font-medium",
                                    input: ["placeholder:text-gray-400"],
                                    inputWrapper: [
                                        "bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white",
                                    ],
                                }}
                                endContent={
                                    <Button
                                        className="focus:outline-none bg-transparent hover:bg-gray-100"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? (
                                            <IoEyeOutline className="text-xl text-gray-400 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffOutline className="text-xl text-gray-400 pointer-events-none" />
                                        )}
                                    </Button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                        </div>
                        <div className="relative">
                            <GInput
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                {...formik.getFieldProps("confirmPassword")}
                                isInvalid={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                errorMessage={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
                                        ? formik.errors.confirmPassword
                                        : undefined
                                }
                                classNames={{
                                    label: "!text-black font-medium",
                                    input: ["placeholder:text-gray-400"],
                                    inputWrapper: [
                                        "bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white",
                                    ],
                                }}
                                endContent={
                                    <Button
                                        className="focus:outline-none bg-transparent hover:bg-gray-100"
                                        type="button"
                                        onClick={toggleConfirmVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isConfirmVisible ? (
                                            <IoEyeOutline className="text-xl text-gray-400 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffOutline className="text-xl text-gray-400 pointer-events-none" />
                                        )}
                                    </Button>
                                }
                                type={isConfirmVisible ? "text" : "password"}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-primary text-white font-semibold py-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                                formik.isSubmitting ||
                                (formik.touched.password &&
                                    formik.touched.confirmPassword &&
                                    !formik.isValid)
                            }
                        >
                            {formik.isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>
                    </form>
                    <p className="mt-6 text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link
                            href={`/auth/login`}
                            className="text-primary font-semibold hover:text-primary/80 hover:underline ml-1 transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
            <CustomModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                title={"Enter OTP"}
            >
                <EnterOTP
                    email={email}
                    from="register"
                    onSuccess={() => setModalVisible(false)}
                />
            </CustomModal>
        </div>
    );
}
