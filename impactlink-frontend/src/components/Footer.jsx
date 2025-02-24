import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1: Brand Info */}
          <div className="col-md-4">
            <h5 className="fw-bold">ImpactLink</h5>
            <p>Empowering dreams through crowdfunding. Start your campaign today!</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/campaigns" className="text-light text-decoration-none">Explore Campaigns</Link></li>
              <li><Link to="/create-campaign" className="text-light text-decoration-none">Start a Campaign</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaFacebook className="fs-4" /> Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-info">
                <FaTwitter className="fs-4" /> Twitter
              </a>
            </div>
            <div className="d-flex gap-3 mt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-danger">
                <FaInstagram className="fs-4" /> Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaLinkedin className="fs-4" /> LinkedIn
              </a>
            </div>
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
