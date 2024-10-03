import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for login (e.g., API call)
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-center items-center">

      {/* Login Form Section */}
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-start items-center gap-[30px]">
        <div className="text-center text-white text-[40px] font-bold">
          Log In
        </div>
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="email">
            Email or username
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="text-[#90a9fd] text-base font-medium cursor-pointer">
          Forgot password?
        </div>

        {/* Sign Up Section */}
        <div className="flex justify-center items-center gap-2">
          <div className="text-white text-base font-medium">New to the app?</div>
          <div className="text-[#90a9fd] text-base font-medium cursor-pointer">Sign up</div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-[60px] bg-[#282828] rounded-[20px] flex justify-center items-center"
        >
          <div className="text-white text-xl font-semibold">Log In</div>
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
