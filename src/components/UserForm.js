// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

const UserForm = ({ userToEdit, fetchUsers }) => {
    const [formData, setFormData] = useState({
        username: '',
        date_of_birth: '',
        email_id: '',
        address: '',
        mobile_number: '',
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                username: userToEdit.username,
                date_of_birth: userToEdit.date_of_birth,
                email_id: userToEdit.email_id,
                address: userToEdit.address,
                mobile_number: userToEdit.mobile_number,
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userToEdit) {
            try {
                await axios.put(`http://localhost:3001/users/${userToEdit._id}`, formData);
                fetchUsers();
            } catch (error) {
                console.error("Error updating user", error);
            }
        } else {
            try {
                await axios.post('http://localhost:3001/users', formData);
                fetchUsers();
            } catch (error) {
                console.error("Error creating user", error);
            }
        }
        
        setFormData({
            username: '',
            date_of_birth: '',
            email_id: '',
            address: '',
            mobile_number: '',
        });
    };

    const date = moment(formData.date_of_birth).format('YYYY-MM-DD')
    return (
        <div className="container mt-4">
            <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={date || null}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email_id" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email_id"
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile_number"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {userToEdit ? 'Update' : 'Create'} User
                </button>
            </form>
        </div>
    );
};

export default UserForm;
