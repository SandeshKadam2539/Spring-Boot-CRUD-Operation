import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddUsers() {
    const [users, setUsers] = useState({
        name: "",
        username: "",
        email: ""
    });

    const navigate = useNavigate(); // ✅ Correct usage

    const { name, username, email } = users;

    const onInputChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:2222/api/user", users);
            alert("User added successfully!");
            setUsers({ name: "", username: "", email: "" }); // Reset form after success
            navigate("/"); // ✅ Correct function usage

        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Name:"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Username:"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Email Address:"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link 
                            to="/" 
                            className="btn btn-outline-danger mx-2" 
                            onClick={() => setUsers({ name: "", username: "", email: "" })}
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
