"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputComponent from "@/components/auth/input-component";
import { sendOtp } from "@/api/api";
import toast from "react-hot-toast";


export default function ForgotPassword({ onClose }: { onClose: () => void }) {

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await sendOtp(values.email);
        toast.success("OTP sent successfully!");
        console.log("OTP sent to:", values.email);
        onClose();
      } catch (error: any) {
        toast.error("Error sending OTP:", error)
        console.error("Error sending OTP:", error);
        setErrors({ email: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600">
          Enter your email address to receive a one-time password (OTP).
        </p>

        <form className="mt-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <InputComponent
              placeholder="Enter your email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-800 text-white py-2 px-4 rounded-lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
