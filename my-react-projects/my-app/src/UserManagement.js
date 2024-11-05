import React, { useState } from "react";
import './App.css';

const UserManagement = ({ users, setUsers }) => {
  const [user, setUser] = useState({ name: "", role: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddUser = () => {
    if (user.name && user.role) {
      const newUser = { userName: user.name, userROLE: user.role };

      let updatedUsers;
      if (editIndex !== null) {
      
        updatedUsers = users.map((u, index) => (index === editIndex ? newUser : u));
      } else {
        
        updatedUsers = [...users, newUser];
      }

      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      clearInputs();
    } else {
      alert("PLEASE FILL ALL USER DETAILS.");
    }
  };

  const clearInputs = () => {
    setUser({ name: "", role: "" });
    setEditIndex(null); // Reset the editing index
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setUser({ name: userToEdit.userName, role: userToEdit.userROLE });
    setEditIndex(index);
  };

  return (
    <div>
      <h2>USER MANAGEMENT</h2>
      <input type="text" placeholder="Username" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
      <input type="text" placeholder="Role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
      <button onClick={handleAddUser}>{editIndex !== null ? "Update User" : "Add User"}</button>

      <table border="1">
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{u.userName}</td>
              <td>{u.userROLE}</td>
              <td>
                <button onClick={() => handleEditUser(index)}>Edit</button>
                <button onClick={() => handleDeleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;