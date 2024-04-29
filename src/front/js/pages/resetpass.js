import React, { useState } from "react";

export const ResetPass = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Here you can implement the logic for resetting the password
    // This function will be triggered when the user submits the OTP and wants to reset the password
    // For now, I'll just simulate a password change and set the passwordChanged state to true
    setPasswordChanged(true);
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
