import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Sign Up</h3>

        <form>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>

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

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm your password" />
          </div>

          {/* Signup Button */}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
