"use client";
import { useSearchParams } from "next/navigation"; 

import InputComponent from '../../../components/auth/input-component';
import PasswordComponent from '../../../components/auth/pass-component';

export default function Register() {
  const searchParams = useSearchParams(); 
  const role = searchParams.get('role');

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
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent placeholder="Enter your email" type="email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent placeholder="Enter your password" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm password</label>
              <PasswordComponent placeholder="Re-enter your password" />
            </div>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
              Register
            </button>
          </form>
        </div>

        <div className="md:block w-full md:w-1/2 bg-primary p-8 m-3 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">
            Welcome, {role}
          </h2>
        </div>
      </div>
    </div>
  );
}
