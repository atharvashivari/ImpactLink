import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Get in Touch</h2>

      {/* Contact Form Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4>Send Us a Message</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Type your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> support@crowdfund.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Crowdfund Street, New York, NY</p>

            {/* Social Media Links */}
            <div className="mt-3">
              <h5>Follow Us</h5>
              <a href="#" className="btn btn-outline-dark me-2">Facebook</a>
              <a href="#" className="btn btn-outline-dark me-2">Twitter</a>
              <a href="#" className="btn btn-outline-dark">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
