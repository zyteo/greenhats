import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Set loading to true

    // Basic client-side validation (you should also have server-side validation)
    if (!email) {
      setError("Email is required.");
      setLoading(false); // Stop loading
      return;
    }
    if (!password) {
      setError("Password is required.");
      setLoading(false); // Stop loading
      return;
    }

    // Simulate API call (replace with your actual API call)
    fetch("/api/login", {
      // Replace with your login API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login
        console.log("Login successful:", data);

        // Store the token (e.g., in localStorage or a cookie)
        localStorage.setItem("token", data.token); // Example: storing a JWT

        // Redirect or update state as needed (e.g., redirect to a protected page)
        // Example using react-router-dom:
        // window.location.href = "/dashboard"; // Simple redirect
        // Or if you are using react-router-dom v6:
        // useNavigate().push('/dashboard')
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError(err.message || "Invalid email or password.");
      })
      .finally(() => {
        setLoading(false); // Stop loading, regardless of success or failure
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          required
        />
        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"} {/* Show loading message */}
        </button>
      </form>
    </div>
  );
}

export default Login;
