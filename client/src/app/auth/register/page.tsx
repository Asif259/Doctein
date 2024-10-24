'use client'

import { useState, useEffect  } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Input,
    Image,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
} from "@nextui-org/react";
import { registerUser, sendOtp } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import EnterOTP from "../enter-otp";

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
    const toggleConfirmVisibility = () => setConfirmIsVisible(!isConfirmVisible);

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
                    role as string
                );

                console.log("Response from registerUser:", response);

                if (!response.success) {
                    if (response.requireOtp === true) {
                        toast.success("User not active. OTP sent to your email");
                        setEmail(values.email);
                        await sendOtp(values.email);
                        setModalVisible(true);
                    } else {
                        console.log("User already exists or other error");
                        toast.error(response.data || "User already exists");
                    }
                } else {
                    console.log("Registration successful, opening OTP modal...");
                    toast.success("Registration successful! Please check your email for confirmation.");
                    setEmail(values.email);
                    await sendOtp(values.email);
                    setModalVisible(true);
                }
            } catch (err: any) {
                toast.error(err.message || "Registration failed. Please try again.");
                setErrors({ email: err.message });
            } finally {
                setSubmitting(false);
            }
        }

    });

    return (
        <div className="min-h-screen flex justify-between items-center bg-dark-200">
            <div className="w-full flex-1 pl-28 p-8">
                <h2 className="text-2xl font-semibold text-white">
                    Register as {role}
                </h2>
                <p className="mb-6 text-neutral">
                    Enter your credentials to register as a {role}
                </p>

                <form className="space-y-4 max-w-lg" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block mb-2 text-neutral">Email address</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            {...formik.getFieldProps("email")}
                            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                            errorMessage={
                                formik.touched.email && formik.errors.email
                                    ? formik.errors.email
                                    : undefined
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
                                formik.touched.password && formik.errors.password
                                    ? formik.errors.password
                                    : undefined
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
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
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

                    <div className="relative">
                        <label className="block mb-2 text-neutral">Confirm password</label>
                        <Input
                            placeholder="Re-enter your password"
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
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleConfirmVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isConfirmVisible ? (
                                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isConfirmVisible ? "text" : "password"}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out bg-primary"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6" style={{color: "#abb7c4"}}>
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
                        <EnterOTP email={email} from="register" onClose={() => setModalVisible(false)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}