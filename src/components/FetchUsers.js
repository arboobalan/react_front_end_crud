import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import axios from 'axios';

const App = ({setUserToEdit}) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    return (
        <div className="App">
            <UserList users={users} setUserToEdit={setUserToEdit} fetchUsers={fetchUsers} />
        </div>
    );
};

export default App;
