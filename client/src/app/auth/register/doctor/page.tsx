import InputComponent from '../../../../components/auth/input-component'; 
import PasswordComponent from '../../../../components/auth/pass-component'; 


export default function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-10/12 bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Get Started Now</h2>
          <p className="text-gray-600">Enter your credentials to access your account</p>
          <div className="mt-6">
            <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google" className="w-5 h-5 mr-2"/>
              Log in with Google
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/152/152752.png" alt="Apple" className="w-5 h-5 mr-2"/>
              Log in with Apple
            </button>
          </div>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <InputComponent placeholder="Enter your email" type="email" />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700">Password</label>
              <PasswordComponent placeholder="Enter your password"/>
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700">Confirm password</label>
              <PasswordComponent placeholder="Re-enter your password"/>
            </div>
            <div className="mb-4">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="ml-2 text-gray-700">I agree to the <a href="#" className="text-blue-500">Terms & Privacy</a></label>
            </div>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg">Register</button>
          </form>
          <p className="mt-4 text-center text-gray-600">Have an account? <a href="#" className="text-blue-500">Sign in</a></p>
        </div>

        {/* Right Section - Dashboard Preview */}
        <div className="md:block w-full md:w-1/2 bg-primary p-8 m-3 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">The simplest way to manage your workforce</h2>
          <p className="text-gray-200">Enter your credentials to access your account</p>

          {/* Logos if needed*/}
          <div className="flex justify-between items-center mt-8">
            <img src="/wechat.png" alt="WeChat" className="w-16"/>
            <img src="/booking.png" alt="Booking.com" className="w-16"/>
            <img src="/google.png" alt="Google" className="w-16"/>
            <img src="/spotify.png" alt="Spotify" className="w-16"/>
          </div>
        </div>
      </div>
    </div>
  );
}
