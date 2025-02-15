import React, { useState } from 'react';

function Signup({setScreen}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track signup success

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Basic client-side validation (you should also have server-side validation)
    if (!username) {
      setError('Username is required.');
      return;
    }
    if (password.length < 6) { // Example password length validation
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate API call (replace with your actual API call)
    fetch('/api/signup', { // Replace with your signup API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
          return response.json().then(err => {throw new Error(err.message)}); // Throw error with message from server
        }
        return response.json();
      })
      .then(data => {
        // Handle successful signup
        console.log('Signup successful:', data);
        setSuccess(true);  // Set success to true
        setError('');      // Clear any previous errors
        setUsername('');   // Clear form fields
        setPassword('');
        setConfirmPassword('');
      })
      .catch(err => {
        // Handle errors from the API call
        console.error('Signup error:', err);
        setError(err.message || 'An error occurred during signup.'); // Display error message from server or a general message
      });
  };


  if (success) {
    return (
      <div>
        <h2>Signup Successful!</h2>
        <p>Your account has been created.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Make username required
        /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make password required
        /><br /><br />

        <label htmlFor="confirmPassword">Confirm Password:</label><br />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required // Make confirm password required
        /><br /><br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;