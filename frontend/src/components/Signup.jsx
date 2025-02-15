import React, { useState } from "react";

function Signup({ setScreen }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Basic client-side validation (you should also have server-side validation)
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (password.length < 6) {
      // Example password length validation
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (success) {
      return (
        <div>
          <h2>Signup Successful!</h2>
          <p>Your account has been created.</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Make username required
          />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Make email required
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Make password required
          />
          <br />
          <br />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required // Make confirm password required
          />
          <br />
          <br />

          <button type="submit">Create Account</button>
        </form>
      </div>
    );
  };
}

export default Signup;
