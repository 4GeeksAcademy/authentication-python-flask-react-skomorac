import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailExists, setEmailExists] = useState(true); // State to track if email exists
  const [isOTPGenerated, setIsOTPGenerated] = useState(false); // State to track if OTP is generated
  const navigate = useNavigate();

  const generateOTP = () => {
    // Generate a random 4-digit OTP
    const newOTP = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOTP);
    setIsOTPGenerated(true); // Set the state to indicate OTP is generated
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/check-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const exists = data.exists;

        if (exists) {
          setEmailExists(true);
          generateOTP();
        } else {
          setEmailExists(false);
        }
      } else {
        // Handle server errors
        console.error("Server error:", response.statusText);
        setEmailExists(false);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/update-otp`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        // OTP successfully stored in the User table
        // Now you can navigate the user to the password reset page or perform any other action
      } else {
        // Handle server errors
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Forgot Password</h1>
      <p>
        Please type in your email and press Generate OTP. You will get a
        one-time access code to reset your password. Please remember the code
        and enter it when required after pressing submit. After that, you can
        enter your new password and login again.
      </p>
      <form onSubmit={handleOTP}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate OTP
        </button>
      </form>
      {!emailExists && (
        <div className="mt-3 text-danger">
          Email does not exist. Please enter a valid email address.
        </div>
      )}
      {otp && (
        <div className="mt-3">
          <p>One-time access code:</p>
          <h2>{otp}</h2>
          <p>Please remember this code for password reset.</p>
        </div>
      )}
      {isOTPGenerated && (
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Go to reset password
          </button>
        </div>
      )}
    </div>
  );
};
