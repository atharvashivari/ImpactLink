import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus({ success: true, message: res.data.msg });
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatus({ success: false, message: error.response?.data?.msg || "Something went wrong" });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Get in Touch</h2>

      {/* Contact Form Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4>Send Us a Message</h4>
            {status && (
              <div className={`alert ${status.success ? "alert-success" : "alert-danger"}`} role="alert">
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
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
