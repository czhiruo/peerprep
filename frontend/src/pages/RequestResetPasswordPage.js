import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '.././index.css';
import { requestPasswordReset } from '../services/userService';


function RequestResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null); // Track success
  const [error, setError] = useState(null); // Track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Requesting password reset for:', email);
      await requestPasswordReset(email);
      setSuccess("Email to reset password has been sent.");
      setError(null);
    } catch (err) {
      setError("Something went wrong. Please try again."); 
      setSuccess(null);
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
      <form
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col w-full max-w-lg bg-[#1a1a1a] gap-10 items-center pt-5"
      >
        <h2 className="self-stretch text-center text-white text-4xl font-bold leading-tight">
          Reset your password
        </h2>
        <p className="w-full text-white text-sm font-medium text-center">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        {success && (<p className="text-green-500 text-center">{success}</p>)}
        {error && (<p className="text-red-500 text-center">{error}</p>)}

        {/* email */}
        <div className="form-control w-full bg-transparent no-border">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="Email"
            required
          />
        </div>

        {/* submit button */}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="btn btn-primary w-full max-w-lg bg-[#282828] hover:bg-[#404040]"
          >
            Reset Password
          </button>
        </div>

        <div className="text-center">
          <span className=" text-[#ffffff] cursor-pointer hover:text-[#b0c4de] transition-colors">
            <Link to="/" className="no-underline text-inherit">
              Back
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default RequestResetPasswordPage;
