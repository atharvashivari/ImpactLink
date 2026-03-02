import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-white border-top py-5 mt-auto">
      <div className="container">
        <div className="row gy-4">
          {/* Column 1: Brand Info */}
          <div className="col-md-6">
            <h5 className="fw-bold text-dark d-flex align-items-center gap-2">
              <div className="bg-primary rounded-circle" style={{ width: "20px", height: "20px" }}></div>
              ImpactLink
            </h5>
            <p className="text-muted mt-3 pe-md-5">
              Empowering global change. Join a global community making a difference, one project at a time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-6">
            <h5 className="fw-bold text-dark mb-3">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/" className="text-muted text-decoration-none hover-primary">Home</Link></li>
              <li><Link to="/campaigns" className="text-muted text-decoration-none hover-primary">Discover</Link></li>
              <li><Link to="/create-campaign" className="text-muted text-decoration-none hover-primary">Start a Campaign</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none hover-primary">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="text-center mt-5 pt-4 border-top">
          <p className="text-muted mb-0 small">© {new Date().getFullYear()} ImpactLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
