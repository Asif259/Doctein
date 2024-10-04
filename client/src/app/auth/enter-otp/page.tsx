"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';  // Use search params and router
import InputComponent from '../../../components/auth/input-component';

export default function EnterOTP() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');  

  const [otp, setOtp] = useState('');  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP entered: ", otp);

    
    router.push('/auth/reset-password'); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Enter OTP
        </h2>
        <p className="text-gray-600">
          An OTP has been sent to {email}. Please enter it below.
        </p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputComponent 
              placeholder="Enter OTP" 
              type="text" 
              value={otp} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)} 
            />
          </div>
          <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
