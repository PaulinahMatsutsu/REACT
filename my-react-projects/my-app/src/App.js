import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'; // importing css for styling

import Login from "./Login";
import SignUp from "./Sign-Up"; 
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import Dashboard from "./Dashboard";
import Home from "./Home"; // Import Home component

const App = () => {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]); 

  const handleLogin = (user) => {
    setCurrentUser(user);
    window.location.href = "/"; // Redirect to the home page after login
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div>
        {/*Heading1 for application*/}
        <h1><marquee>WELCOME TO WINGS CAFE INVENTORY</marquee></h1>
        
        <nav>
          {currentUser ? (
            <>
              <button onClick={() => window.location.href='/'}>HOME</button> {/* Home button added for logged-in user */}
              <button onClick={() => window.location.href='/dashboard'}>DASHBOARD</button>
              <button onClick={() => window.location.href='/product-management'}>PRODUCT MANAGEMENT</button>
              <button onClick={() => window.location.href='/user-management'}>USER MANAGEMENT</button>
              <button onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <>
              <button onClick={() => window.location.href='/login'}>LOGIN</button>
              <button onClick={() => window.location.href='/signup'}>SIGN UP</button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} /> {/* Set home page as the default route */}
          <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp users={users} setUsers={setUsers} />} />
          <Route path="/product-management" element={currentUser ? <ProductManagement products={products} setProducts={setProducts} /> : <Navigate to="/login" />} />
          <Route path="/user-management" element={currentUser ? <UserManagement users={users} setUsers={setUsers} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard products={products} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; // exporting App component