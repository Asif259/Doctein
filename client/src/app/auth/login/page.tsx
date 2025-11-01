"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    authenticateUser,
    loginUser,
    getUserProfile,
    sendOtp,
} from "@/api/api";
import { useAuthStore } from "@/store/auth-store";
import React, { useEffect, useState } from "react";
import { Image, Button, Spinner, Link } from "@nextui-org/react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ForgetPassword from "../forget-password";
import EnterOtp from "../enter-otp";
import CustomModal from "../customModal";
import ResetPassword from "../reset-password";
import GInput from "@/components/globals/GInput";

export default function Login() {
    const { login } = useAuthStore((state) => state);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentModal, setCurrentModal] = useState<
        "forgetPassword" | "enterOtp" | "resetPassword" | "login"
    >("forgetPassword");
    const [email, setEmail] = useState("");
    const [from, setFrom] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const authData = await authenticateUser();
                if (authData?.success) {
                    login();
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [login]);

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
                .min(6, "Password must be at least 6 characters long")
                .required("Password required"),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                setLoading(true);
                const loginResponse = await loginUser(
                    values.email,
                    values.password,
                );

                if (loginResponse?.status === "success") {
                    const userProfile = await getUserProfile();

                    if (!userProfile || !userProfile.data) {
                        toast.error(
                            "Failed to get user profile. Please try again.",
                        );
                        setStatus({
                            success: false,
                            message: "Failed to get user profile.",
                        });
                        return;
                    }

                    const {
                        email,
                        role: userRole,
                        userId,
                        active,
                    } = userProfile.data;

                    if (!active) {
                        toast.success(
                            "User is not verified! Please verify your account.",
                        );
                        setEmail(email);
                        const response = await sendOtp(values.email);

                        if (response?.success) {
                            setCurrentModal("enterOtp");
                            setFrom("login");
                            setModalVisible(true);
                            toast.success("OTP sent successfully!");
                        } else {
                            setStatus({
                                email: response.data || "Error sending OTP.",
                            });
                            toast.error(
                                response.data ||
                                    "Failed to send OTP. Please try again.",
                            );
                        }
                    } else {
                        if (userRole === "doctor" && userId) {
                            router.push("/dashboard");
                        } else if (userRole === "doctor" && !userId) {
                            router.push("/profile");
                        } else if (userRole === "patient") {
                            // router.push("/dashboard");
                            toast.error(
                                "Patient dashboard is not available yet.",
                            );
                            return;
                        }

                        toast.success("Login successful!");
                        setStatus({ success: true });
                        login();
                    }
                } else {
                    toast.error("Invalid email or password.");
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Login failed:", err.message);
                }
                setStatus({
                    success: false,
                    message: "Login failed. Please try again.",
                });
                toast.error("Login failed. Please try again.");
            } finally {
                setSubmitting(false);
                setLoading(false);
            }
        },
    });

    const handleForgetPassword = () => {
        setCurrentModal("forgetPassword");
        setModalVisible(true);
    };

    if (loading) {
        return (
            <div className="flex h-dvh w-full justify-center items-center gap-4">
                <Spinner color="warning" size="lg" />
            </div>
        );
    }

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
                            <NextLink href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
                                Doctein
                            </NextLink>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600 text-center">
                            Sign in to your account to continue
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
                            placeholder="Enter your email"
                            type="email"
                            label="Email"
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
                                placeholder="Enter your password"
                                label="Password"
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
                                    label: "text-black font-medium",
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
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-primary hover:text-primary/80 hover:underline focus:outline-none font-medium transition-colors"
                                onClick={handleForgetPassword}
                            >
                                Forgot your password?
                            </button>
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-primary text-white font-semibold py-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                    <p className="mt-6 text-gray-600 text-center">
                        Don&#39;t have an account?{" "}
                        <a
                            href={`/auth`}
                            className="text-primary font-semibold hover:text-primary/80 hover:underline ml-1 transition-colors"
                        >
                            Create Account
                        </a>
                    </p>
                </div>
            </div>
            <CustomModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                title={
                    currentModal === "forgetPassword"
                        ? "Reset Password"
                        : currentModal === "enterOtp"
                          ? "Enter OTP"
                          : currentModal === "resetPassword"
                            ? "Reset Your Password"
                            : ""
                }
            >
                <div>
                    {currentModal === "forgetPassword" ? (
                        <ForgetPassword
                            onSuccess={(email) => {
                                setEmail(email);
                                setCurrentModal("enterOtp");
                                setModalVisible(true);
                            }}
                        />
                    ) : currentModal === "enterOtp" ? (
                        <EnterOtp
                            email={email}
                            from={from === "login" ? "login" : "forgetPassword"}
                            onSuccess={() => {
                                if (from === "login") {
                                    setModalVisible(false);
                                } else {
                                    setEmail(email);
                                    setCurrentModal("resetPassword");
                                    setModalVisible(true);
                                }
                            }}
                        />
                    ) : currentModal === "resetPassword" ? (
                        <ResetPassword
                            email={email}
                            onSuccess={() => {
                                setModalVisible(false);
                            }}
                        />
                    ) : null}
                </div>
            </CustomModal>
        </div>
    );
}
