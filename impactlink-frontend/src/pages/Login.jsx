import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { m } from "framer-motion";
import { scaleIn, fadeUp, buttonTap, gpuStyles } from "../utils/animations";
import api from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";

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
    <PageTransition className="auth-container">
      <m.div className="auth-card" variants={scaleIn} initial="hidden" animate="visible" style={gpuStyles}>
        <h3 className="text-center fw-bold mb-4">User Login</h3>

        {error && (
          <m.div className="alert alert-danger py-2" variants={fadeUp} initial="hidden" animate="visible" style={gpuStyles}>
            {error}
          </m.div>
        )}

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
            <Link to="/forgot-password" className="text-primary small fw-medium text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <m.button
            type="submit"
            className="btn-primary-custom w-100 mt-2"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Logging in..." : "Login"}
          </m.button>
        </form>

        <p className="text-center text-muted small mt-4 pt-3 border-top">
          Don't have an account? <Link to="/signup" className="text-primary fw-medium">Sign Up</Link>
        </p>
      </m.div>
    </PageTransition>
  );
};

export default Login;
