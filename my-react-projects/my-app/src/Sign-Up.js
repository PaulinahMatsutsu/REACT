
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const SignUp = ({ users, setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Checking if the username already exists
    const existingUser = users.find(user => user.userName === username);
    if (existingUser) {
      alert("Username already exists. Please choose another.");
      return;
    }

    // Create new user object
    const newUser = { userName: username, password: password };
    
    // Update users array in state and local storage
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Redirecting to login page after sign up
    alert("Sign up successful! Please log in.");
    navigate('/login'); 
  };

  return (
    <div className="signup-container">
      <img src="aa.png" alt="Cafe Logo"></img>
      <h2>SIGN UP</h2>
      
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;// exporting SignUp component