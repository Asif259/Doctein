"use client";
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { useSearchParams } from "next/navigation"; 
import InputComponent from '../../../components/auth/input-component';
import PasswordComponent from '../../../components/auth/pass-component';
import { loginUser } from '../../../api/api';

export default function Login() {
  const searchParams = useSearchParams(); 
  const role = searchParams.get('role');
  const router = useRouter(); 

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return; 
    }

    try {
      const data = await loginUser(email, password); // Use the loginUser API function
      setSuccess(data.data);

      setEmail('');
      setPassword('');

      router.push('/dashboard');  // Redirect to dashboard after successful login

    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.'); // Handle error
    }
  };

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

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message display */}
          {success && <div className="text-green-500 mb-4">{success}</div>} {/* Success message display */}

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent 
                placeholder="Enter your email" 
                type="email"
                value={email} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              />
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
