import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { resetPassword } from "@/api/api";
import toast from "react-hot-toast";

export default function ResetPassword({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .matches(/[A-Za-z]/, "Password must contain letters")
                .matches(/\d/, "Password must contain numbers")
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <Input
                    label="New Password"
                    type="password"
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
                />
            </div>
            <div>
                <Input
                    label="Confirm New Password"
                    type="password"
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
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg"
                disabled={isSubmitting || !formik.isValid}
            >
                {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
        </form>
    );
}
