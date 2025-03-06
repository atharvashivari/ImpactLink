import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1: Brand Info */}
          <div className="col-md-6">
            <h5 className="fw-bold">ImpactLink</h5>
            <p>Empowering dreams through crowdfunding. Start your campaign today!</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-6">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/campaigns" className="text-light text-decoration-none">Explore Campaigns</Link></li>
              <li><Link to="/create-campaign" className="text-light text-decoration-none">Start a Campaign</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="text-center mt-3">
          <p className="mb-0">© {new Date().getFullYear()} CrowdFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
