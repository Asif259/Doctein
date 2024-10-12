"use client";
import { useSearchParams, useRouter } from 'next/navigation'; 
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import InputComponent from '@/components/auth/input-component';
import { verifyOtp, sendOtp, activateUser } from '@/api/api'; 
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from 'react';

export default function EnterOTP() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');  
  const from = searchParams.get('from'); 
  const [resendTimer, setResendTimer] = useState<number>(120); // Timer starts at 120 seconds

  // Function to handle OTP resend
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing");
      return;
    }

    try {
      const response = await sendOtp(email);

      if (response.success) {
        toast.success("OTP resent successfully");
        setResendTimer(120); // Reset countdown for 2 minutes (120 seconds)
      }
    } catch (error: any) {
      if (error.response?.data?.remainingTime) {
        setResendTimer(Math.ceil(error.response.data.remainingTime / 1000));
      } else {
        toast.error("Error resending OTP");
      }
    }
  };

  // Countdown logic for resend timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [resendTimer]);

  // Function to format the timer into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
      if (!email) {
        toast.error("Email is missing");
        return;
      }

      try {
        await verifyOtp(email, values.otp); 
        toast.success("OTP verified");
      
        if (from === "register") {
          await activateUser(email); 
          router.push(`/auth/login`); 
        } else {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
        }
      
      } catch (error) {
        const err = error as { response?: { data?: { data?: string } } };
        setErrors({ otp: err.response?.data?.data || 'Failed to verify OTP. Please try again' });
        toast.error("Failed to verify OTP. Please try again");
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
            className="w-full bg-primary-800 text-white py-2 px-4 rounded-lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-4 text-center">
          {resendTimer > 0 ? (
            <p className="text-gray-500">Resend OTP in {formatTime(resendTimer)}</p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline"
              disabled={formik.isSubmitting}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
}
