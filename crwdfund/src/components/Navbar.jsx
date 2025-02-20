import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
        ImpactLink
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/campaigns">Campaigns</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/create-campaign">Start a Campaign</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex ms-3">
            <Link className="btn btn-outline-light me-2 fs-5" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary fs-5" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
