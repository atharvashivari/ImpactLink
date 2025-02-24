import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
