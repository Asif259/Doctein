"use client";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordComponent from "../../../components/auth/pass-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "@/api/api";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Za-z]/, "Password must contain letters")
      .matches(/\d/, "Password must contain numbers")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await resetPassword(email as string, values.newPassword);
        console.log("New password set for:", email);
        router.push(`/auth/login`);
      } catch (err: any) {
        setErrors({ confirmPassword: err.message });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
        <p className="text-gray-600">
          Reset your password for the account associated with {email}.
        </p>

        {formik.errors.confirmPassword && (
          <div className="text-red-500 mb-4">
            {formik.errors.confirmPassword}
          </div>
        )}

        <form className="mt-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <PasswordComponent
              name="newPassword"
              placeholder="Enter your new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500">{formik.errors.newPassword}</div>
            )}
          </div>

          <div className="mb-4">
            <PasswordComponent
              name="confirmPassword"
              placeholder="Re-enter your new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg"
            disabled={formik.isSubmitting}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
