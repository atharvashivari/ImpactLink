import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors

    try {
      const response = await api.post("/auth/signup", formData);

      login(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.msg || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-center fw-bold mb-4">Create an Account</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label-custom">Name</label>
            <input
              type="text"
              name="name"
              className="input-custom"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="label-custom">Email</label>
            <input
              type="email"
              name="email"
              className="input-custom"
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="label-custom">Password</label>
            <input
              type="password"
              name="password"
              className="input-custom"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary-custom w-100 mt-2">Sign Up</button>
        </form>

        <p className="text-center text-muted small mt-4 pt-3 border-top">
          Already have an account? <a href="/login" className="text-primary fw-medium">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
