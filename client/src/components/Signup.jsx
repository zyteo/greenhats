import React, { useState } from "react";

function Signup({ setScreen, supabase }) {
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password, // Send plain text password to Supabase
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        console.error("Supabase sign-up error:", error);
        alert(error.message); // Alert Supabase error message
      } else {
        console.log("Signup successful:", data);
        setScreen("login");
        alert("Signup successful!");
        setScreen("login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred."); // Alert general error
    }
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h1>Greenhats welcome you!</h1>
      {/* input email, username, password, confirm password with set states*/}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Signup;
