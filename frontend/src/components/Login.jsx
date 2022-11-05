import React, { useState } from "react";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Login = () => {

    const navigate = useNavigate()
    const [student, setStudent] = useState(false);
    const [admin, setAdmin] = useState(false);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // Handle Input
    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setUser({ ...user, [name]: value })
    }

    // Handle Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email,password } = user;
        try {
            const body = JSON.stringify({
                email, password
            });
            const res = await axios.post('http://localhost:4000/users/login', body, {
                headers: {
                    "Content-Type": "application/json",
                },

            });
            console.log(res.headers.authorization);
            localStorage.setItem('token',res.headers.authorization);
            const decodedtoken = jwtDecode(res.headers.authorization);
            const _id = decodedtoken._id;
            const getUser = await axios.get(`http://localhost:4000/users/${_id}`);
            console.log(getUser.data);
            const userRole = getUser.data.role;
            if (userRole.toLowerCase() === 'student') {
                console.log(userRole.toLowerCase());
                setStudent(true);
            }else if(userRole.toLowerCase() === 'admin'){
                setAdmin(true);
            }
            if (res.status === 400 || !res) {
                window.alert("Invalid Credentials")
            } else {
                window.alert("Login Successfull");
                if(student){
                    navigate('/Studentpage');
                }if(admin){
                    navigate('/AdminPage');
                }
            }
        } catch (error) {
            window.alert("Invalid Credentials")
        }
    }
    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <Link
                            to="/register"
                            className="btn btn-outline-light rounded-pill pb-2 w-50"
                        >
                            Register
                        </Link>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
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
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                                Login
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
