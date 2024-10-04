"use client";
import { useState } from 'react';  
import { useRouter } from 'next/navigation'; 
import { useSearchParams } from "next/navigation"; 
import Link from 'next/link'; 
import InputComponent from '../../../components/auth/input-component';
import PasswordComponent from '../../../components/auth/pass-component';
import axios from 'axios'; 

export default function Register() {
  const searchParams = useSearchParams(); 
  const role = searchParams.get('role');
  const router = useRouter();

  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState('');  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, letters and numbers
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/register', {
        email,
        password,
        confirmPassword,
        role,
      });
      console.log(response);

      setSuccess(response.data.data); 
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      router.push(`/auth/login?role=${role}`);

    } catch (err: any) {
      setError(err.response?.data?.data || 'Registration failed. Please try again.');
    }
  };

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

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message display */}
          {success && <div className="text-green-500 mb-4">{success}</div>} {/* Success message display */}

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent 
                placeholder="Enter your email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm password</label>
              <PasswordComponent 
                placeholder="Re-enter your password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">
              Register
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Already have an account? 
            <Link href={`/auth/login?role=${role}`} className="text-primary hover:underline ml-1">
              Login
            </Link>
          </p>
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
