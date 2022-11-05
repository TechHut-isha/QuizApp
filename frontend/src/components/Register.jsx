import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        email: "",
        role: "",
        password: ""
    });

    // Handle Inputs
    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    }

    // Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, role, password } = user;
        try {
            const body = JSON.stringify({
                username, email, role, password
            });
            const res = await axios.post('http://localhost:4000/users/signup', body, {
                headers: {
                    "Content-Type": "application/json",
                },

            });
            // console.log(res.headers);
            if (res.status === 422 || !res) {
                window.alert("Already Used Details")
            } else {
                // You need to Restart the Server for Proxy Works
                // Now Try Again
                window.alert("Registered Successfully");
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                        <h1 className="display-4 fw-bolder">Hello, Friend</h1>
                        <p className="lead text-center">Enter Your Details to Register</p>
                        <h5 className="mb-4">OR</h5>
                        <Link
                            to="/Login"
                            className="btn btn-outline-light rounded-pill pb-2 w-50"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="col-md-6 p-5">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="username"
                                    value={user.username}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputRole1" className="form-label">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputRole1"
                                    name="role"
                                    value={user.role}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    I Agree Terms and Conditions
                                </label>
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
