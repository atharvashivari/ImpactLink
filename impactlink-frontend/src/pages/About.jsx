import React from "react";
import { m } from "framer-motion";
import { fadeUp, staggerContainer, cardHover, buttonTap, gpuStyles } from "../utils/animations";
import FadeIn from "../components/reactbits/FadeIn";
import PageTransition from "../components/PageTransition";

const About = () => {
  return (
    <PageTransition className="w-100">
      {/* Hero Section */}
      <section className="full-width-section bg-dark text-white d-flex align-items-center position-relative" style={{ height: "450px", marginTop: "-2rem" }}>
        <div className="position-absolute w-100 h-100"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", opacity: "0.3" }}
        ></div>
        <div className="container position-relative text-center z-1">
          <m.div variants={staggerContainer(0.15)} initial="hidden" animate="visible">
            <m.h1 className="display-4 fw-bold mb-3" variants={fadeUp} style={gpuStyles}>Our Mission</m.h1>
            <m.p className="lead mx-auto" style={{ maxWidth: "700px", ...gpuStyles }} variants={fadeUp}>
              Empowering innovators, creators, and dreamers to bring their ideas to life through community-driven funding.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <FadeIn direction="left">
              <h2 className="fw-bold mb-4">What We Do</h2>
              <p className="lead text-muted mb-4">ImpactLink connects people with big ideas to those who believe in them.</p>
              <p className="text-muted mb-4">
                Whether it's funding a grassroots startup, supporting a critical social cause, or bringing an innovative product to market, we provide the platform, tools, and community to make crowdfunding transparent, efficient, and successful.
              </p>
              <m.ul className="list-unstyled mb-0 d-flex flex-column gap-3 text-muted" variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <m.li className="d-flex align-items-center gap-2" variants={fadeUp} style={gpuStyles}><span className="text-primary fw-bold">✓</span> Zero platform fees on donations</m.li>
                <m.li className="d-flex align-items-center gap-2" variants={fadeUp} style={gpuStyles}><span className="text-primary fw-bold">✓</span> Secure, encrypted transactions</m.li>
                <m.li className="d-flex align-items-center gap-2" variants={fadeUp} style={gpuStyles}><span className="text-primary fw-bold">✓</span> 24/7 dedicated support team</m.li>
              </m.ul>
            </FadeIn>
          </div>
          <div className="col-lg-6">
            <FadeIn direction="right">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="img-fluid rounded-4 shadow-lg" alt="Team collaborating" />
                <m.div className="position-absolute bottom-0 start-0 translate-middle-x mb-5 ms-3 bg-white p-4 rounded-4 shadow d-none d-md-block" style={{ maxWidth: "200px", ...gpuStyles }}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <h3 className="fw-bold text-primary mb-0">$50M+</h3>
                  <p className="text-muted small mb-0">Funds Raised Globally</p>
                </m.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <FadeIn>
            <div className="text-center mb-5">
              <h2 className="fw-bold">Our Core Values</h2>
              <p className="text-muted">The principles that guide everything we do.</p>
            </div>
          </FadeIn>

          <m.div className="row g-4 text-center" variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: "Trust & Transparency", desc: "We believe in complete openness. Every campaign is vetted, and every transaction is secure and verifiable." },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Community First", desc: "Our platform is built for the community, by the community. We prioritize the needs of our creators and backers." },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m8 14 4-4 4 4" /></svg>, title: "Global Impact", desc: "We strive to break down geographical barriers, allowing anyone, anywhere to fund or be funded for life-changing ideas." },
            ].map((value, i) => (
              <m.div className="col-md-4" key={i} variants={fadeUp} style={gpuStyles}>
                <m.div className="custom-card p-5 h-100 border-0 bg-white card-hover-shadow" {...cardHover} style={gpuStyles}>
                  <div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-4">{value.icon}</div>
                  <h5 className="fw-bold mb-3">{value.title}</h5>
                  <p className="text-muted mb-0">{value.desc}</p>
                </m.div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container my-5 py-5 text-center">
        <FadeIn>
          <h2 className="fw-bold mb-4">Ready to make a difference?</h2>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: "600px" }}>Join thousands of creators and backers who are changing the world every day.</p>
          <div className="d-flex justify-content-center gap-3">
            <m.a href="/create-campaign" className="btn-primary-custom px-4 py-2 fs-5" {...buttonTap}>Start a Campaign</m.a>
            <m.a href="/campaigns" className="btn-outline-custom px-4 py-2 fs-5" {...buttonTap}>Explore Projects</m.a>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
};

export default About;
