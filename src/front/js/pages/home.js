import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css"; // Import login-specific styles if needed

export const Home = () => {
  const { actions } = useContext(Context);

  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Email and password must be entered");
    } else {
      fetch(`${process.env.BACKEND_URL}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((res) => res.json())
        .then((resAsJson) => {
          console.log("respons from backend", resAsJson);
          localStorage.setItem("jwt-token", resAsJson.token);
        })
        .catch((err) => {
          console.error("Something is wrong with API", err);
        });
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};
