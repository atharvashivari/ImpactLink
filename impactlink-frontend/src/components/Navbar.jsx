import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRole = localStorage.getItem("userRole") || "user";

  // Logout function
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
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
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          {/* Placeholder for logo icon */}
          <div className="bg-primary rounded-circle" style={{ width: "24px", height: "24px" }}></div>
          <span className="text-dark">ImpactLink</span>
        </Link>

        <button
          className="navbar-toggler border-0"
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium mx-2" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium mx-2" to="/campaigns">Discover</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium mx-2" to="/create-campaign">Start a Campaign</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium mx-2" to="/about">About Us</Link>
            </li>
            {userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-primary fw-medium mx-2" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}
          </ul>

          <div className="d-flex ms-auto">
            {isAuthenticated ? (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-light dropdown-toggle border rounded-pill px-4"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Account
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 show" style={{ borderRadius: "0.75rem" }}>
                    <li>
                      <Link className="dropdown-item py-2" to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger py-2" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link className="btn btn-primary-custom rounded-pill px-4 shadow-sm" to="/login">Login/Signup</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
