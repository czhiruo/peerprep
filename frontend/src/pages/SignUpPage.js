import React, { useState } from 'react';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for sign up (e.g., API call)
    console.log('Signing up with:', { email, username, password, confirmPassword });
  };

  return (
    <div className="h-screen w-full bg-[#1a1a1a] flex flex-col justify-center items-center">

      {/* Sign Up Form Section */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex-grow flex flex-col justify-start items-center gap-[20px]">
        <div className="text-center text-white text-[40px] font-bold">Sign Up</div>
        
        {/* Email Field */}
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>

        {/* Username Field */}
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="w-full h-[60px] px-5 py-2.5 rounded-[20px] border border-[#5b5b5b] flex flex-col justify-center items-start">
          <label className="text-[#5b5b5b] text-base" htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
            required
          />
        </div>

        {/* Already have an account? */}
        <div className="flex justify-center items-center gap-2.5">
          <div className="text-white text-base font-medium">Already have an account?</div>
          <div className="text-[#90a9fd] text-base font-medium cursor-pointer">Log in</div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-[60px] bg-[#282828] rounded-[20px] flex justify-center items-center"
        >
          <div className="text-white text-xl font-semibold">Sign Up</div>
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
