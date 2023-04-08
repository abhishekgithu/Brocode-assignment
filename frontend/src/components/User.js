import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import "../App.css";

function User() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: "",
        age: "",
        email: "",
        contactNumber: "",
        role: "",
        location: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                const response = await axios.put(
                    `${baseURL}/users/${editUserId}`,
                    user
                );
                setUsers((prevState) =>
                    prevState.map((u) => (u._id === editUserId ? response.data : u))
                );
                setEditMode(false);
                setEditUserId(null);
            } else {
                const response = await axios.post(`${baseURL}/users`, user);
                setUsers((prevState) => [...prevState, response.data]);
            }
            setUser({
                name: "",
                age: "",
                email: "",
                contactNumber: "",
                role: "",
                location: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (user) => {
        setUser(user);
        setEditMode(true);
        setEditUserId(user._id);
    };
    console.log(users);

    const handleDeleteClick = async (userId) => {
        try {
            await axios.delete(`${baseURL}/users/${userId}`);
            setUsers((prevState) => prevState.filter((u) => u._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">{editMode ? "Edit User" : "Add User"}</h2>
                <form onSubmit={handleUserSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={user.name}
                            onChange={handleUserChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={user.age}
                            onChange={handleUserChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleUserChange}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                            type="text"
                            name="contactNumber"
                            id="contactNumber"
                            value={user.contactNumber}
                            onChange={handleUserChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={user.role}
                            onChange={handleUserChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={user.location}
                            onChange={handleUserChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        {editMode ? "Update User" : "Add User"}
                    </button>
                </form>
            </div>
            <div className="user-container">
                <h2 className="user-title">User List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Role</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.contactNumber}</td>
                                <td>{user.role}</td>
                                {/* <td>{user.location.city}</td> */}
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;


