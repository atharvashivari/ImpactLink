import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      login(response.data.token, response.data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-center fw-bold mb-4">User Login</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="label-custom">Email</label>
            <input
              type="email"
              className="input-custom"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label-custom">Password</label>
            <input
              type="password"
              className="input-custom"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mb-3">
            <a href="/forgot-password" className="text-primary small fw-medium text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn-primary-custom w-100 mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 pt-3 border-top">
          Don't have an account? <a href="/signup" className="text-primary fw-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
