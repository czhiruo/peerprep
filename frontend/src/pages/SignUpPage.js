import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userService';
import '.././index.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for sign up (e.g., API call)
    console.log('Signing up with:', { email, username, password });

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      // DO SOMETHING TO UI HERE
      return;
    }

    createUser(username, email, password)
      .then((user) => {
        // DO SOMETHING TO UI HERE
        console.log('Signed up successfully:', user);
      })
      .catch((error) => {
        // DO SOMETHING TO UI HERE
        console.error('Sign up failed:', error);
      });
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-neutral flex flex-col justify-center items-center">

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col w-full bg-[#1a1a1a] gap-3 pt-3 items-center">
        <h2 className="w-full text-center text-white text-4xl font-bold">
            Sign Up
        </h2>
        {/* Email Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent no-border items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="Email"
            required
          />
        </div>

        {/* Username Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent no-border items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="Username"
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent no-border items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="Password"
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent no-border items-center">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="Confirm Password"
            required
          />
        </div>

        {/* Already have an account? */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-white">Already have an account?</span>
          <span className="text-[#90a9fd] cursor-pointer hover:text-[#b0c4de] transition-colors">
            <Link to="/" className='no-underline text-inherit'>
              Log In
            </Link>
          </span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center w-full">
          <button type="submit" className="btn btn-primary w-full max-w-lg bg-[#282828] hover:bg-[#404040]">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
