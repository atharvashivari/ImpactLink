import React from "react";

const About = () => {
  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="full-width-section bg-dark text-white d-flex align-items-center position-relative" style={{ height: "450px", marginTop: "-2rem" }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.3"
          }}
        ></div>
        <div className="container position-relative text-center z-1">
          <h1 className="display-4 fw-bold mb-3">Our Mission</h1>
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            Empowering innovators, creators, and dreamers to bring their ideas to life through community-driven funding.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">What We Do</h2>
            <p className="lead text-muted mb-4">
              ImpactLink connects people with big ideas to those who believe in them.
            </p>
            <p className="text-muted mb-4">
              Whether it's funding a grassroots startup, supporting a critical social cause, or bringing an innovative product to market, we provide the platform, tools, and community to make crowdfunding transparent, efficient, and successful.
            </p>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3 text-muted">
              <li className="d-flex align-items-center gap-2"><span className="text-primary fw-bold">✓</span> Zero platform fees on donations</li>
              <li className="d-flex align-items-center gap-2"><span className="text-primary fw-bold">✓</span> Secure, encrypted transactions</li>
              <li className="d-flex align-items-center gap-2"><span className="text-primary fw-bold">✓</span> 24/7 dedicated support team</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="img-fluid rounded-4 shadow-lg" alt="Team collaborating" />
              <div className="position-absolute bottom-0 start-0 translate-middle-x mb-5 ms-3 bg-white p-4 rounded-4 shadow d-none d-md-block" style={{ maxWidth: "200px" }}>
                <h3 className="fw-bold text-primary mb-0">$50M+</h3>
                <p className="text-muted small mb-0">Funds Raised Globally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Core Values</h2>
            <p className="text-muted">The principles that guide everything we do.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="custom-card p-5 h-100 border-0 bg-white hover-up transition-all">
                <div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h5 className="fw-bold mb-3">Trust & Transparency</h5>
                <p className="text-muted mb-0">We believe in complete openness. Every campaign is vetted, and every transaction is secure and verifiable.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="custom-card p-5 h-100 border-0 bg-white hover-up transition-all">
                <div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h5 className="fw-bold mb-3">Community First</h5>
                <p className="text-muted mb-0">Our platform is built for the community, by the community. We prioritize the needs of our creators and backers above all else.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="custom-card p-5 h-100 border-0 bg-white hover-up transition-all">
                <div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2l-.81-4.63a5.5 5.5 0 0 0-3.16-4.32l-1.12-.53a1.18 1.18 0 0 0-1.08.06l-4.59 2.94a1 1 0 0 1-1.08-.12L5 5.5A7 7 0 0 0 3 13a7 7 0 0 0 14 0c0-1.68-.58-3.21-1.54-4.42" /></svg>
                </div>
                <h5 className="fw-bold mb-3">Global Impact</h5>
                <p className="text-muted mb-0">We strive to break down geographical barriers, allowing anyone, anywhere to fund or be funded for life-changing ideas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container my-5 py-5 text-center">
        <h2 className="fw-bold mb-4">Ready to make a difference?</h2>
        <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: "600px" }}>
          Join thousands of creators and backers who are changing the world every day.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/create-campaign" className="btn-primary-custom px-4 py-2 fs-5">Start a Campaign</a>
          <a href="/campaigns" className="btn-outline-custom px-4 py-2 fs-5">Explore Projects</a>
        </div>
      </section>
    </div>
  );
};

export default About;
