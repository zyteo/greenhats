import { useState } from "react";

import "./App.css";
import Home from "./components/home";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <div>
        {/* if screen is home, show home */}
        {screen === "home" && <Home />}
      </div>
    </>
  );
}

export default App;
