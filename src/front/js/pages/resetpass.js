import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ResetPass = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { store, actions } = useContext(Context);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Fetch email from the global store
      const email = store.email;

      // Check if OTP and email are provided
      if (!otp || !email) {
        alert("OTP and email are required.");
        return;
      }

      // Call the API to check if the OTP is valid for the provided email
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/check-email-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          // OTP and email are valid, set the passwordChanged state to true
          setPasswordChanged(true);
        } else {
          // OTP is invalid or email does not exist
          alert("Invalid OTP or email does not exist.");
        }
      } else {
        // Handle other response statuses
        alert("Invalid OTP. Please enter valid OTP");
      }
    } catch (error) {
      console.error("Error checking OTP:", error);
      alert("An error occurred while checking OTP. Please try again later.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Check if the new password and repeat password match
    if (newPassword !== repeatPassword) {
      alert("New password and repeat password do not match.");
      return;
    }

    // Here you can implement the logic for changing the password
    // This function will be triggered when the user submits the form with new password and repeat password
    // For now, I'll just log the new password
    console.log("New password:", newPassword);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Reset Password</h1>
      {!passwordChanged ? (
        <>
          <p>
            Please enter the OTP you received on your email to reset your
            password.
          </p>
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </>
      ) : (
        <>
          <p>Enter your new password:</p>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPass;
