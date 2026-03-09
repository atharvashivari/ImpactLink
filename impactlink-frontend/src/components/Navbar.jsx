import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { gpuStyles, dropdownVariants } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { User, ChevronDown } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRole = user?.role || "user";

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
          <div className="rounded-circle" style={{ width: "24px", height: "24px", background: "#047857" }}></div>
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
                <Link className="nav-link fw-medium mx-2" to="/admin/dashboard" style={{ color: "#047857" }}>Admin Dashboard</Link>
              </li>
            )}
          </ul>

          <div className="d-flex ms-auto">
            {isAuthenticated ? (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-light dropdown-toggle border rounded-pill px-3 d-flex align-items-center gap-2"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User size={18} />
                  <span className="fw-medium">{user?.name?.split(" ")[0] || "Account"}</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <m.ul
                      className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 show"
                      style={{ borderRadius: "0.75rem" }}
                      initial={{ opacity: 0, scale: 0.92, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -5 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <li>
                        <Link className="dropdown-item py-2" to="/profile" onClick={() => setDropdownOpen(false)} style={{ color: "#1f2937" }}>Profile</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/dashboard" onClick={() => setDropdownOpen(false)} style={{ color: "#1f2937" }}>Dashboard</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/settings" onClick={() => setDropdownOpen(false)} style={{ color: "#1f2937" }}>Settings</Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger py-2" onClick={handleLogout}>Logout</button>
                      </li>
                    </m.ul>
                  )}
                </AnimatePresence>
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
