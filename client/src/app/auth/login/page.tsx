"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation
import InputComponent from "@/components/auth/input-component";
import PasswordComponent from "@/components/auth/pass-component";
import { loginUser } from "@/api/api";

export default function Login() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is equired"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const data = await loginUser(values.email, values.password);
        if (data.status === "success") {
          setStatus({ success: true });
          router.push("/dashboard"); // Redirect to dashboard after login
        }
      } catch (err: any) {
        setStatus({
          success: false,
          message: err.message || "Login failed. Please try again.",
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-10/12 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Login as {role}
          </h2>
          <p className="text-gray-600">
            Enter your credentials to login as a {role}
          </p>

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
              <InputComponent
                placeholder="Enter your email"
                type="email"
                {...formik.getFieldProps("email")} // Spread Formik props
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent
                placeholder="Enter your password"
                {...formik.getFieldProps("password")} // Spread Formik props
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
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
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Don't have an account?
            <a
              href={`/auth/register?role=${role}`}
              className="text-primary-800 hover:underline ml-1"
            >
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
    </div>
  );
}
