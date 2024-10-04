"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use router for navigation
import InputComponent from '../../../components/auth/input-component';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();  // Initialize router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP sent to: ", email);

    router.push(`/auth/enter-otp?email=${email}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600">
          Enter your email address to receive a one-time password (OTP).
        </p>
        <form className="mt-4" onSubmit={handleSubmit}>
  <div className="mb-4">
    <InputComponent 
      placeholder="Enter your email" 
      type="email" 
      value={email}  
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  // Correctly passing onChange
    />
  </div>
  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
    Send OTP
  </button>
</form>

      </div>
    </div>
  );
}
