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
        <div className="min-h-screen flex justify-center lg:justify-between items-center bg-default">
            <div className="lg:w-full lg:flex-1 lg:pl-28 p-8">
                <h2 className="text-2xl font-semibold text-white">Login</h2>
                <p className="text-default-300">
                    Enter your credentials to login
                </p>

                <form
                    className="mt-4 space-y-4 max-w-md"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">
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
                                label: "text-default-300",
                                input: ["placeholder:text-default-400"],
                                inputWrapper: [
                                    "bg-default-500",
                                    "hover:bg-default-300",
                                ],
                            }}
                        />
                    </div>
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
                                label: "text-default-300",
                                input: ["placeholder:text-default-400"],
                                inputWrapper: [
                                    "bg-default-500",
                                    "hover:bg-default-200",
                                ],
                            }}
                            endContent={
                                <Button
                                    className="focus:outline-none bg-default-500 hover:bg-default-200"
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

                    <div className="mb-4 mt-2 text-neutral">
                        <Link
                            className="text-neutral text-sm hover:underline hover:text-primary cursor-pointer"
                            onClick={handleForgetPassword}
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        radius="sm"
                        className="w-full bg-primary py-2 px-4"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="mt-4 text-neutral">
                    Don&#39;t have an account?
                    <a
                        href={`/auth`}
                        className="text-primary hover:underline ml-1"
                    >
                        Register
                    </a>
                </p>
            </div>

            <div className="hidden lg:flex relative flex-1 w-full bg-white h-full">
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
