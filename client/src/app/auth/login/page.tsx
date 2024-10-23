"use client";
import {useRouter, useSearchParams} from "next/navigation";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authenticateUser, loginUser, getUserProfile, sendOtp} from "@/api/api";
import {useAuthStore} from "@/store/auth-store";
import React, {useEffect, useState} from "react";
import {Input, Spinner} from "@nextui-org/react";
import toast from "react-hot-toast";
import {IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";


export default function Login() {
    const {login} = useAuthStore((state) => state);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        const checkAuthStatus = async () => {
            const authData = await authenticateUser();
            if (authData.success) {
                login();

                const userProfile = await getUserProfile();
                const {email, role: userRole, userId, active} = userProfile.data;

                if (!active) {
                    await sendOtp(email);
                    router.push(`/auth/enter-otp?email=${email}&from=register`);
                } else {
                    if (userRole === "doctor" && userId) {
                        router.push("/dashboard");
                    } else if (userRole === "doctor" && !userId) {
                        router.push("/profile");
                    } else if (userRole === "patient") {
                        router.push("/dashboard");
                    }
                }
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, [login, router]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .required("Password required"),
        }),
        onSubmit: async (values, {setSubmitting, setStatus}) => {
            try {
                const data = await loginUser(values.email, values.password);
                if (data.status === "success") {
                    toast.success("Login successful!");
                    setStatus({success: true});
                    login();

                    const userProfile = await getUserProfile();
                    const {email, role: userRole, userId, active} = userProfile.data;

                    if (!active) {
                        router.push(`/auth/enter-otp?email=${email}&from=register`);
                    } else {
                        if (userRole === "doctor" && userId) {
                            router.push("/dashboard");
                        } else if (userRole === "doctor" && !userId) {
                            router.push("/profile");
                        } else if (userRole === "patient") {
                            router.push("/dashboard");
                        }
                    }
                }
            } catch (err: any) {
                setStatus({
                    success: false,
                    message: err.message || "Login failed. Please try again.",
                });
                toast.error("Login failed. Please try again.");
            }
            setSubmitting(false);
        },
    });

    // Show loading spinner while checking user authentication
    if (loading) {
        return (
            <div className="flex h-dvh w-full justify-center items-center gap-4">
                <Spinner color="warning" size="lg"/>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-between items-center" style={{backgroundColor: "#1d2129"}}>
            <div className="w-full flex-1 pl-28 p-8">
                <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
                <p className="text-gray-600">Enter your credentials to login</p>

                {/* General error message display */}
                {formik.status?.message && !formik.status.success && (
                    <div className="text-red-500 mb-4">{formik.status.message}</div>
                )}
                {formik.status?.success && (
                    <div className="text-green-500 mb-4">Login successful!</div>
                )}

                <form className="mt-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email address</label>
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

                    {/* Forgot Password Link */}
                    <div className="mb-4 text-right">
                        <a
                            href="/auth/forgot-password"
                            className="text-primary-800 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-800 text-white py-2 px-4 rounded-lg"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-gray-600">
                    Don&#39;t have an account?
                    <a href={`/auth`} className="text-primary-800 hover:underline ml-1">
                        Register
                    </a>
                </p>
            </div>

            <div className="md:block w-full md:w-1/2 bg-primary-800 p-8 m-3 rounded-lg">
                <h2 className="text-2xl font-semibold text-white">
                    Welcome back, {role}
                </h2>
            </div>
        </div>
    )
        ;
}
