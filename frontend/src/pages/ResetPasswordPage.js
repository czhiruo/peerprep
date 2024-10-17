import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ".././index.css";
import { resetPassword } from "../services/userService"; 

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
          window.location.reload();
      }, 1000);  // 1 second
      return;
    }

    try {
      await resetPassword(token, password);
      setSuccess("Password reset successful. You can now log in.");
      setError(null);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // 1 second
    } catch (err) {
      console.log(err);
      setError("Failed to reset password. Please try again.");
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
          Password Reset
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Password Input */}
        <div className="form-control flex flex-col w-full max-w-lg bg-transparent no-border items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-lg bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
            placeholder="New Password"
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

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="btn btn-primary w-full max-w-lg bg-[#282828] hover:bg-[#404040]"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
