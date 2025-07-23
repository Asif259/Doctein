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
            const authData = await authenticateUser();
            if (authData?.success) {
                login();
            }
            setLoading(false);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#23272f]">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-[#23272f] border border-[#2a2d34] flex flex-col items-center">
                <img src="/google.png" alt="google Logo" className="w-16 h-16 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Sign in to Dochub</h2>
                <p className="text-default-400 mb-6 text-center">Enter your credentials to access your account</p>
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
                        placeholder="Enter your email"
                        type="email"
                        label="Email"
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
                            placeholder="Enter your password"
                            label="Password"
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
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-primary hover:underline focus:outline-none"
                            onClick={handleForgetPassword}
                        >
                            Forgot your password?
                        </button>
                    </div>
                    <Button
                        type="submit"
                        radius="sm"
                        className="w-full bg-primary py-2 px-4 font-semibold text-white rounded-lg hover:bg-primary/90 transition"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <p className="mt-6 text-default-400 text-center">
                    Don&#39;t have an account?
                    <a href={`/auth`} className="text-primary hover:underline ml-1">Register</a>
                </p>
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
