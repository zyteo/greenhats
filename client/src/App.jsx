import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qefnupgvpnahqpquyidh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZm51cGd2cG5haHFwcXV5aWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MTQ0MjUsImV4cCI6MjA1NTE5MDQyNX0.I570v0-o8fUX6N1_o8kh0z5ELeUKiG1cuLnJdY04Gcw";
const supabase = createClient(supabaseUrl, supabaseKey);

import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";

Home;
function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase logout error:", error);
        alert(error.message); // Or handle the error as you prefer
      } else {
        console.log("User logged out");
        setUser(null); // Clear the user state in App.jsx
        setScreen("home"); // Redirect to the login screen
        alert("Logged out successfully!");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An unexpected error occurred during logout.");
    }
  };

  return (
    <>
      <div>
        {screen === "home" && <Home setScreen={setScreen} />}
        {screen === "signup" && (
          <Signup setScreen={setScreen} supabase={supabase} />
        )}
        {screen === "login" && (
          <Login setScreen={setScreen} supabase={supabase} setUser={setUser} />
        )}

        {screen === "landing" && (
          <Landing
            user={user}
            supabase={supabase}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </>
  );
}

export default App;
