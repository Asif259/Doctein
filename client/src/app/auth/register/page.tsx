"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import InputComponent from "@/components/auth/input-component";
import PasswordComponent from "@/components/auth/pass-component";
import { registerUser } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Za-z]/, "Password must contain letters")
      .matches(/\d/, "Password must contain numbers")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await registerUser(
          values.email,
          values.password,
          values.confirmPassword,
          role as string,
        );
        setSubmitting(false);
        router.push(`/auth/login`); // Redirect to login page on success
      } catch (err: any) {
        setErrors({ email: err.message });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-10/12 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Register as {role}
          </h2>
          <p className="text-gray-600">
            Enter your credentials to register as a {role}
          </p>

          {/* Error and Success message displays */}
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 mb-4">{formik.errors.email}</div>
          )}

          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent
                placeholder="Enter your email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm password</label>
              <PasswordComponent
                placeholder="Re-enter your password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg"
              disabled={formik.isSubmitting}
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Already have an account?
            <Link
              href={`/auth/login?role=${role}`}
              className="text-primary hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="md:block w-full md:w-1/2 bg-primary p-8 m-3 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">Welcome, {role}</h2>
        </div>
      </div>
    </div>
  );
}
