import { useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qefnupgvpnahqpquyidh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
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
