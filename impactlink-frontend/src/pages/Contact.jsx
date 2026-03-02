import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus({ success: true, message: res.data.msg || "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatus({ success: false, message: error.response?.data?.msg || "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container py-5 mt-2">
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3 fw-medium">Contact Us</span>
        <h2 className="display-5 fw-bold mb-3">Get in Touch</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: "600px" }}>
          Have questions about starting a campaign or need help with a donation? Our team is here to help.
        </p>
      </div>

      <div className="row g-5">

        {/* Contact Details Section */}
        <div className="col-lg-5 order-2 order-lg-1">
          <div className="custom-card p-4 p-md-5 h-100 bg-primary text-white border-0">
            <h3 className="fw-bold mb-4">Contact Information</h3>
            <p className="mb-5 opacity-75">Fill out the form and our team will get back to you within 24 hours.</p>

            <div className="d-flex flex-column gap-4 mb-5">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-circle">
                  <Mail size={24} />
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Email</h6>
                  <p className="mb-0 opacity-75">support@impactlink.com</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-circle">
                  <Phone size={24} />
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Phone</h6>
                  <p className="mb-0 opacity-75">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-circle">
                  <MapPin size={24} />
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Headquarters</h6>
                  <p className="mb-0 opacity-75">123 Impact Way, Tech District<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h6 className="fw-bold mb-3 opacity-75">Connect with us</h6>
              <div className="d-flex gap-3">
                {/* Placeholder social icons */}
                <a href="#" className="text-white opacity-75 hover-opacity-100 transition-opacity">Twitter</a>
                <a href="#" className="text-white opacity-75 hover-opacity-100 transition-opacity">LinkedIn</a>
                <a href="#" className="text-white opacity-75 hover-opacity-100 transition-opacity">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-lg-7 order-1 order-lg-2">
          <div className="custom-card p-4 p-md-5">
            <h4 className="fw-bold mb-4">Send Us a Message</h4>

            {status && (
              <div className={`alert ${status.success ? "alert-success" : "alert-danger"} d-flex flex-column mb-4`} role="alert">
                <div className="fw-bold mb-1">{status.success ? 'Success!' : 'Error!'}</div>
                <div>{status.message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="label-custom">First Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-custom"
                    placeholder="Jane"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-custom">Last Name</label>
                  <input
                    type="text"
                    className="input-custom"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="label-custom">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="input-custom"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label-custom">Subject</label>
                <select className="input-custom form-select">
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="label-custom">Message</label>
                <textarea
                  name="message"
                  className="input-custom"
                  rows="5"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ resize: "vertical" }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
