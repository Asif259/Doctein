"use client";
import { useSearchParams, useRouter } from 'next/navigation'; 
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import InputComponent from '@/components/auth/input-component';
import { verifyOtp, activateUser } from '@/api/api'; 

export default function EnterOTP() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');  
  const from = searchParams.get('from'); 

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 6 characters long'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (email) {
          await verifyOtp(email, values.otp); 
          console.log("OTP verified:", values.otp);
      
          if (from === "register") {
            await activateUser(email); 
            //console.log("User activated");
            router.push(`/auth/login`); 
          } else {
            router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
          }
      
        } else {
          throw new Error("Email is missing");
        }
      } catch (error) {
        const err = error as { response?: { data?: { data?: string } } };
        setErrors({ otp: err.response?.data?.data || 'Failed to verify OTP. Please try again.' });
        console.error("Error verifying OTP:", err);
      } finally {
        setSubmitting(false);
      }
    },
    
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Enter OTP
        </h2>
        <p className="text-gray-600">
          An OTP has been sent to {email}. Please enter it below.
        </p>

        <form className="mt-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <InputComponent 
              placeholder="Enter OTP" 
              type="text" 
              {...formik.getFieldProps('otp')} 
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div className="text-red-500">{formik.errors.otp}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
