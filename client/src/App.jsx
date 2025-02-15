import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qefnupgvpnahqpquyidh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZm51cGd2cG5haHFwcXV5aWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MTQ0MjUsImV4cCI6MjA1NTE5MDQyNX0.I570v0-o8fUX6N1_o8kh0z5ELeUKiG1cuLnJdY04Gcw";
const supabase = createClient(supabaseUrl, supabaseKey);

import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";

Home;
function App() {
  const [screen, setScreen] = useState("home");
  return (
    <>
      <div>
        {screen === "home" && <Home setScreen={setScreen} />}
        {screen === "signup" && (
          <Signup setScreen={setScreen} supabase={supabase} />
        )}
      </div>
    </>
  );
}

export default App;
