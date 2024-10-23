"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input, Image } from "@nextui-org/react";
import { registerUser, sendOtp } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Register() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Formik validation schema
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

    // Formik form handling
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await registerUser(
                    values.email,
                    values.password,
                    values.confirmPassword,
                    role as string
                );
                setSubmitting(false);

                toast.success("Registration successful! Please check your email for OTP.");

                await sendOtp(values.email);
                router.push(`/auth/enter-otp?email=${values.email}&from=register`);
            } catch (err: any) {
                toast.error(err.message || "Registration failed. Please try again.");
                setErrors({ email: err.message });
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex justify-between items-center" style={{ backgroundColor: "#1d2129" }}>
            <div className="w-full flex-1 pl-28 p-8">
                <h2 className="text-2xl font-semibold" style={{ color: "#ffffff" }}>
                    Register as {role}
                </h2>
                <p className="mb-6" style={{ color: "#abb8c4" }}>
                    Enter your credentials to register as a {role}
                </p>

                <form className="space-y-4 max-w-lg" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block mb-2" style={{ color: "#abb7c4" }}>Email address</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            {...formik.getFieldProps("email")}
                            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                            errorMessage={
                                formik.touched.email && formik.errors.email ? formik.errors.email : undefined
                            }
                            classNames={{
                                input: [
                                    "bg-[#1a1d21]",
                                    "text-[#e2e2e3]",
                                    "placeholder:text-[#e2e2e3]",
                                    "hover:bg-[#21252a]",
                                ],
                                inputWrapper: [
                                    "bg-[#1a1d21]",
                                    "hover:bg-[#21252a]",
                                    "group-data-[focus=true]:bg-[#1a1d21]",
                                ],
                            }}

                        />

                    </div>

                    <div className="relative">
                        <label className="block mb-2" style={{color: "#abb7c4"}}>Password</label>
                        <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                            errorMessage={
                                formik.touched.password && formik.errors.password ? formik.errors.email : undefined
                            }
                            classNames={{
                                input: [
                                    "bg-transparent",
                                    "text-white/90",
                                    "placeholder:text-default-700/50 ",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "bg-default-200/50",
                                    "hover:bg-primary-200/70",
                                    "group-data-[focus=true]:bg-default-200/50",
                                ],
                            }}
                        />
                        <div
                            className="absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOffOutline size={20}/> : <IoEyeOutline size={20}/>}
                        </div>

                    </div>

                    <div className="relative">
                        <label className="block mb-2" style={{color: "#abb7c4"}}>Confirm password</label>
                        <Input
                            placeholder="Re-enter your password"
                            type={showConfirmPassword ? "text" : "password"}
                            {...formik.getFieldProps("confirmPassword")}
                            isInvalid={
                                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                            }
                            errorMessage={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                                    ? formik.errors.confirmPassword
                                    : undefined
                            }
                            classNames={{
                                input: [
                                    "bg-transparent",
                                    "text-white/90",
                                    "placeholder:text-default-700/50 ",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "bg-default-200/50",
                                    "hover:bg-default-200/70",
                                    "group-data-[focus=true]:bg-default-200/50",
                                ],
                            }}
                        />
                        <div
                            className="absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer text-white"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
                        style={{ backgroundColor: "#24ae7c" }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6" style={{ color: "#abb7c4" }}>
                    Already have an account?
                    <Link href={`/auth/login?role=${role}`} className="text-[#24ae7c] hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </div>

            <div className="relative flex-1 w-full bg-white h-full">
                <Image
                    classNames={{
                        wrapper: "w-full max-w-xl p-0",
                        img: "w-full p-0",
                    }}
                    alt="NextUI hero Image"
                    src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg"
                    height={720}
                />
            </div>
        </div>
    );
}
