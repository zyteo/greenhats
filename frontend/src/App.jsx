import { useState } from "react";

import "./App.css";
import Home from "./components/home";
import Signup from "./components/signup";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <div>
        {/* if screen is home, show home */}
        {screen === "home" && <Home setScreen={setScreen} />}

        {/* if screen is signup, show signup */}
        {screen === "signup" && <Signup setScreen={setScreen} />}
      </div>
    </>
  );
}

export default App;
