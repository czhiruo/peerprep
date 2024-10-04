import React, { useState } from 'react';
import { userLogin } from '../services/userService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(email, password)
      .then((token) => {
        console.log('Logged in successfully:', token);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-neutral flex flex-col justify-center items-center">
      <h2 className="w-full text-center text-white bg-[#1a1a1a] text-4xl font-bold mb-0 pt-3">
          Log In
      </h2>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col w-full bg-[#1a1a1a] gap-4 items-center">
        {/* Email Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent border-none items-center">
          <label className="label text-[#ffffff]">
            <span>Email or username</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b]"
            required
          />

        </div>
        {/* Password Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent border-none items-center">
          <label className="label text-[#ffffff]">
            <span>Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b]"
            required
          />
        </div>
        {/* Forgot Password */}
        <div className="text-right">
          <span className="text-[#90a9fd] cursor-pointer">Forgot password?</span>
        </div>
        {/* Sign Up */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-white">New to the app?</span>
          <span className="text-[#90a9fd] cursor-pointer">Sign up</span>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center w-full">
          <button type="submit" className="btn btn-primary w-full max-w-lg bg-[#282828] hover:bg-[#404040]">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;