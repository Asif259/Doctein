import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { resetPassword } from "@/api/api";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import GInput from "@/components/globals/GInput";

export default function ResetPassword({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setConfirmIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setConfirmIsVisible(!isConfirmVisible);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .matches(/[A-Za-z]/, "Password must contain at least one letter")
                .matches(/\d/, "Password must contain at least one number")
                .required("Enter your password"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Re-enter your password"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const response = await resetPassword(email, values.password);
                if (response.success) {
                    toast.success("Password reset successfully!");
                    onSuccess();
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full mb-4">
                <Lock className="w-8 h-8 text-primary" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                    Create New Password
                </h3>
                <p className="text-gray-600 text-sm">
                    Your new password must be different from your previous password.
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <GInput
                    label="New Password"
                    placeholder="Enter your new password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    errorMessage={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : undefined
                    }
                    classNames={{
                        label: "!text-black font-medium",
                        input: ["placeholder:text-gray-400"],
                        inputWrapper: ["bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white"],
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
                
                <GInput
                    label="Confirm New Password"
                    placeholder="Re-enter your new password"
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
                        inputWrapper: ["bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:bg-white"],
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

                <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white font-semibold py-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting || !formik.isValid}
                >
                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
}
