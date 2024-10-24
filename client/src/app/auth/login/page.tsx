"use client";
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authenticateUser, loginUser, getUserProfile, sendOtp} from "@/api/api";
import {useAuthStore} from "@/store/auth-store";
import React, {useEffect, useState} from "react";
import {Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Spinner} from "@nextui-org/react";
import toast from "react-hot-toast";
import {IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import ForgetPassword from "../enter-otp";

export default function Login() {
    const {login} = useAuthStore((state) => state);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [modalVisible, setModalVisible] = useState(false);

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
        <div className="min-h-screen flex justify-between items-center bg-dark-200">
            <div className="w-full flex-1 pl-28 p-8">
                <h2 className="text-2xl font-semibold text-white">Login</h2>
                <p className="text-neutral">Enter your credentials to login</p>

                {/* General error message display */}
                {formik.status?.message && !formik.status.success && (
                    <div className="text-red-500 mb-4">{formik.status.message}</div>
                )}
                {formik.status?.success && (
                    <div className="text-green-500 mb-4">Login successful!</div>
                )}

                <form className="mt-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-neutral">Email address</label>
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
                                    "bg-dark-300",
                                    "text-neutral",
                                    "placeholder:text-dark-50",
                                    "hover:bg-dark-100",
                                ],
                                inputWrapper: [
                                    "bg-dark-300",
                                    "hover:bg-dark-100",
                                    "group-data-[focus=true]:bg-dark-300",
                                ],
                            }}
                        />
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-neutral">Password</label>
                        <Input
                            placeholder="Enter your password"
                            {...formik.getFieldProps("password")}
                            isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                            errorMessage={
                                formik.touched.password && formik.errors.password ? formik.errors.email : undefined
                            }
                            classNames={{
                                input: [
                                    "bg-dark-300",
                                    "text-neutral",
                                    "placeholder:text-dark-50",
                                    "hover:bg-dark-100",
                                ],
                                inputWrapper: [
                                    "bg-dark-300",
                                    "hover:bg-dark-100",
                                    "group-data-[focus=true]:bg-dark-300",
                                ],
                            }}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                        aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />

                    </div>

                    {/* Forgot Password Link */}
                    <div className="mb-4 mt-2 text-neutral">
                        <a
                            href="/auth/forgot-password"
                            className="text-neutral hover:underline hover:text-primary"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 px-4 rounded-lg"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-neutral">
                    Don&#39;t have an account?
                    <a href={`/auth`} className="text-primary hover:underline ml-1">
                        Register
                    </a>
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

            <Modal
                className="p-5 bg-dark-200"
                size="md"
                closeButton
                aria-labelledby="modal-title"
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        <h3 className="text-white">Enter OTP</h3>
                    </ModalHeader>
                    <ModalBody>
                        <ForgetPassword onClose={() => setModalVisible(false)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
        ;
}
