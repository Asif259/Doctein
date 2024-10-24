'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { verifyOtp, activateUser, sendOtp } from '@/api/api';
import { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

export default function EnterOTP({ email, from, onClose }: { email: string, from: string, onClose: () => void }) {
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
        setResendTimer(120); // Reset timer to 120 seconds
      }
    } catch (err: any) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  useEffect(() => {
    // Decrement the timer every second
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string()
          .required('Please enter the OTP')
          .min(6, 'OTP must be exactly 6 characters')
          .max(6, 'OTP must be exactly 6 characters'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await verifyOtp(email, values.otp);
        if (response.success) {
          if (from === 'register') {
            await activateUser(email);
          }
          toast.success('OTP verified successfully!');
          setSubmitting(false);
          onClose();
        }
      } catch (err: any) {
        toast.error("Invalid OTP. Please try again.");
        setSubmitting(false);
      }
    }
  });

  return (
      <div className="space-y-4">
        <p className="text-neutral">Enter the OTP sent to your email</p>

        <form onSubmit={formik.handleSubmit}>
          <Input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          {formik.touched.otp && formik.errors.otp && (
              <p className="error-text">{formik.errors.otp}</p>
          )}

          <div className="flex justify-between mt-2" >
            <Button
                type="submit"
                className="submit-btn bg-primary text-white"
                disabled={formik.isSubmitting || resendTimer > 0}
            >
              {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
            {resendTimer > 0 ? (
                <p className="text-neutral">Resend OTP in {resendTimer}s</p>
            ) : (
                <Button onClick={handleResendOtp} className="resend-btn bg-primary text-white">
                  Resend OTP
                </Button>
            )}
          </div>
        </form>


      </div>
  );
}
