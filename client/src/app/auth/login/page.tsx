"use client";
import { useSearchParams } from "next/navigation"; 
import InputComponent from '../../../components/auth/input-component';
import PasswordComponent from '../../../components/auth/pass-component';

export default function Login() {
  const searchParams = useSearchParams(); 
  const role = searchParams.get('role');

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
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent 
              placeholder="Enter your email" 
              type="email"
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent placeholder="Enter your password" />
            </div>

            {/* Forgot Password Link */}
            <div className="mb-4 text-right">
              <a href="/auth/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </a>
            </div>

            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Don't have an account? 
            <a href={`/auth/register?role=${role}`} className="text-primary hover:underline ml-1">
              Register
            </a>
          </p>
        </div>

        <div className="md:block w-full md:w-1/2 bg-primary p-8 m-3 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">
            Welcome back, {role}
          </h2>
        </div>
      </div>
    </div>
  );
}
