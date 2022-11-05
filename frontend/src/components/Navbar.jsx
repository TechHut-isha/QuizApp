import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">
          <Link className="navbar-brand fw-bolder fs-4 mx-auto" to="/">QuizMania</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/Login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
              <i className="fa fa-sign-in me-2"></i>Login</Link>
            <Link to="/Register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
              <i className="fa fa-user-plus me-2"></i>Register</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
