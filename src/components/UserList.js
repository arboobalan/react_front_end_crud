import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ users,setUserToEdit, fetchUsers}) => {
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Users List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email_id}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => setUserToEdit(user)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;