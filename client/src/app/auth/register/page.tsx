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
            .matches(/[A-Za-z]/, "Password must contain letters")
            .matches(/\d/, "Password must contain numbers")
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
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await registerUser(
                    values.email,
                    values.password,
                    values.confirmPassword,
                    role as string,
                );

                if (!response.success) {
                    if (response.requireOtp === true) {
                        toast.success(
                            "User not active. OTP sent to your email",
                        );
                        setEmail(values.email);
                        await sendOtp(values.email);
                        setModalVisible(true);
                    } else {
                        toast.error(response.data || "User already exists");
                        router.push("/auth/login");
                    }
                } else {
                    console.log(
                        "Registration successful, opening OTP modal...",
                    );
                    toast.success(
                        "Registration successful! Please check your email for confirmation.",
                    );
                    setEmail(values.email);
                    await sendOtp(values.email);
                    setModalVisible(true);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(
                        err.message || "Registration failed. Please try again.",
                    );
                    setErrors({ email: err.message });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#23272f]">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-[#23272f] border border-[#2a2d34] flex flex-col items-center">
                <img src="/google.png" alt="google Logo" className="w-16 h-16 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Register as {role}</h2>
                <p className="text-default-400 mb-6 text-center">Enter your credentials to register as a {role}</p>
                <button type="button" className="w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg bg-white hover:bg-gray-200 text-[#611f69] font-semibold transition">
                    <img src="/google.png" alt="google" className="w-6 h-6" />
                    <span>Continue with Google</span>
                </button>
                <div className="w-full flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px bg-[#35373e]" />
                    <span className="text-default-400 text-xs">or</span>
                    <div className="flex-1 h-px bg-[#35373e]" />
                </div>
                <form className="space-y-4 w-full" onSubmit={formik.handleSubmit}>
                    <GInput
                        label="Email address"
                        placeholder="Enter your email"
                        type="email"
                        {...formik.getFieldProps("email")}
                        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                        classNames={{
                            label: "text-default-300",
                            input: ["placeholder:text-default-400"],
                            inputWrapper: ["bg-[#18181b] border border-[#35373e] focus-within:border-primary"],
                        }}
                    />
                    <div className="relative">
                        <GInput
                            label="Password"
                            placeholder="Enter your password"
                            {...formik.getFieldProps("password")}
                            isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                            errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                            classNames={{
                                label: "text-default-300",
                                input: ["placeholder:text-default-400"],
                                inputWrapper: ["bg-[#18181b] border border-[#35373e] focus-within:border-primary"],
                            }}
                            endContent={
                                <Button
                                    className="focus:outline-none bg-transparent hover:bg-[#23272f]"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? (
                                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
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
                            isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                            classNames={{
                                label: "text-default-300",
                                input: ["placeholder:text-default-400"],
                                inputWrapper: ["bg-[#18181b] border border-[#35373e] focus-within:border-primary"],
                            }}
                            endContent={
                                <Button
                                    className="focus:outline-none bg-transparent hover:bg-[#23272f]"
                                    type="button"
                                    onClick={toggleConfirmVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isConfirmVisible ? (
                                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </Button>
                            }
                            type={isConfirmVisible ? "text" : "password"}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg bg-primary font-semibold text-white hover:bg-primary/90 transition"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </form>
                <p className="mt-6 text-default-400 text-center">
                    Already have an account?
                    <Link href={`/auth/login`} className="text-primary hover:underline ml-1">Login</Link>
                </p>
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
