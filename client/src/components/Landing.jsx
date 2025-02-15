import React from 'react';

function Landing({ user, setScreen, handleLogout }) {  // Add supabase and setUser as props
 
  return (
    <div>
      <h1>Welcome, {user.user_metadata?.username || user.email}!</h1>
      <p>You are now logged in.</p>
      <button onClick={() => setScreen('home')}>Go to Home</button>
      <button onClick={handleLogout}>Logout</button> {/* Add the logout button */}
    </div>
  );
}

export default Landing;