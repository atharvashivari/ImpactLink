import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRole = localStorage.getItem("userRole") || "user";

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setDropdownOpen(false); // Close dropdown after logout
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">ImpactLink</Link>

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
            {userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link fs-5 text-warning" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}
          </ul>

          <div className="d-flex ms-3">
            {isAuthenticated ? (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-outline-light dropdown-toggle fs-5"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Account
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/dashboard">My Campaigns</Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2 fs-5" to="/login">Login</Link>
                <Link className="btn btn-primary fs-5" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
