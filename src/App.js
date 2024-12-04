import React, { useState, useCallback } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/FetchUsers';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchUsers = useCallback(async () => {
      try {
          const response = await axios.get('http://localhost:3001/users');
          setUsers(response.data);
      } catch (error) {
          console.error("Error fetching users", error);
      }
  }, []);

  return (
      <div className="App">
          <div className="container mt-4">
              <h1>User Management</h1>
              <UserForm userToEdit={userToEdit} fetchUsers={fetchUsers} />
              <UserList setUserToEdit={setUserToEdit} fetchUsers={fetchUsers} />
          </div>
      </div>
  );
}

export default App;