import React, { useState } from "react";

function Login({ setScreen, setUser, supabase }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(error.message); // Use alert for errors
      } else {
        console.log("Login successful:", data.user);
        setUser(data.user); // Set the user state in App.jsx
        setScreen("landing"); // Redirect to home or another appropriate page
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An unexpected error occurred."); // Use alert for general errors
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setScreen("signup")}>Go to Signup</button>
    </div>
  );
}

export default Login;
