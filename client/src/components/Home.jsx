import React from "react";

function Home({ setScreen }) {
  const handleSignup = () => {
    setScreen("signup");
  };
  const handleLogin = () => {
    setScreen("login");
  };
  return (
    <div>
      <h1>Greenhats welcome you!</h1>
      <button onClick={handleSignup}>Sign up</button>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Home;
