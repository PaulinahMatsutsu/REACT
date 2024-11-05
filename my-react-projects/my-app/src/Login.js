import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Login = ({ users, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();

    // Check for correct username and password
    const user = users.find(user => user.userName === username && user.password === password);
    
    if (user) {
      // Call onLogin function passed from App.js
      onLogin(user);
      navigate("/product-management"); // Redirect after successful login
    } else {
      setErrorMessage("Invalid username or password!"); // Set error message in state
    }
  };

  return (
    <div className="login-container">
      <img src="aa.png" alt="Cafe Logo"></img>
      <h2>LOGIN</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditional rendering of error message */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login; // exporting Login component