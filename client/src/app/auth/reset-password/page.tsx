"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';  // Use search params and router
import InputComponent from '../../../components/auth/input-component';
import PasswordComponent from '../../../components/auth/pass-component';  // Assuming this is your password input component

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');  // Get email from query params

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Add logic to update the password via backend API
    console.log("New password set for:", email);

    // After successful password reset, redirect to login
    router.push(`/auth/login?email=${email}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-10/12 md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reset Password
        </h2>
        <p className="text-gray-600">
          Reset your password for the account associated with {email}.
        </p>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <PasswordComponent
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <PasswordComponent
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
