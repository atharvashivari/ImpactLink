import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import api from "../utils/api";
import { fadeUp, heroStagger, staggerContainer, cardHover, buttonTap, gpuStyles } from "../utils/animations";
import SplitText from "../components/reactbits/SplitText";
import CountUp from "../components/reactbits/CountUp";
import FadeIn from "../components/reactbits/FadeIn";
import PageTransition from "../components/PageTransition";
import { Heart, Users, Target, ArrowRight } from "lucide-react";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get("/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <PageTransition className="w-100">
      {/* ─── Hero Section ─── */}
      <section className="full-width-section hero-section" style={{ marginTop: "-2rem" }}>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          alt="Community Impact"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>

        <m.div
          className="hero-content"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          style={gpuStyles}
        >
          <m.span
            className="badge gradient-badge rounded-pill px-3 py-2 mb-4 d-inline-block fs-6"
            variants={fadeUp}
            style={gpuStyles}
          >
            ImpactLink 2026
          </m.span>

          <m.h1 className="display-3 fw-bold mb-3" variants={fadeUp}>
            <SplitText
              text="Empower Change"
              splitBy="word"
              duration={0.5}
              stagger={0.12}
              from={{ opacity: 0, y: 40 }}
            />
          </m.h1>

          <m.p
            className="lead mx-auto mb-5"
            style={{ maxWidth: "600px", opacity: 0.85, ...gpuStyles }}
            variants={fadeUp}
          >
            Join a global community making a difference, one project at a time.
            Support ideas, charities, and innovations that matter.
          </m.p>

          <m.div
            className="d-flex justify-content-center gap-3 flex-wrap"
            variants={fadeUp}
          >
            <Link
              to="/create-campaign"
              className="px-4 py-3 fs-5 fw-semibold d-inline-flex align-items-center gap-2 text-decoration-none"
              style={{
                borderRadius: "var(--radius-lg)",
                background: "#ffffff",
                color: "#0f172a",
                border: "none",
              }}
            >
              Start a Campaign <ArrowRight size={20} />
            </Link>
            <Link
              to="/campaigns"
              className="px-4 py-3 fs-5 fw-medium text-decoration-none"
              style={{
                borderRadius: "var(--radius-lg)",
                background: "var(--primary-color)",
                color: "#ffffff",
                border: "none",
              }}
            >
              Discover
            </Link>
          </m.div>
        </m.div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="full-width-section py-5" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <m.div
            className="row g-4"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { end: 500, suffix: "+", label: "Campaigns Funded", dur: 2000 },
              { end: 12000, suffix: "+", label: "Donors Worldwide", dur: 2200 },
              { end: 2, prefix: "₹", suffix: "M", label: "Total Raised", dur: 2400 },
              { end: 45, suffix: "+", label: "Countries Reached", dur: 2000 },
            ].map((stat, i) => (
              <m.div className="col-6 col-md-3" key={i} variants={fadeUp} style={gpuStyles}>
                <div className="stat-card">
                  <div className="stat-number">
                    <CountUp end={stat.end} prefix={stat.prefix || ""} suffix={stat.suffix} duration={stat.dur} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ─── Featured Campaigns ─── */}
      <section className="container my-5 py-5">
        <FadeIn>
          <div className="text-center mb-5">
            <span className="badge gradient-badge rounded-pill px-3 py-2 mb-3 d-inline-block">Featured</span>
            <h2 className="fw-bold mb-2">Campaigns Making a Difference</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
              Discover projects that are changing lives. Your contribution matters.
            </p>
          </div>
        </FadeIn>

        <m.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {campaigns.length > 0 ? (
            campaigns.slice(0, 3).map((campaign) => {
              const raised = Number(campaign.raisedAmount) || 0;
              const goal = Number(campaign.goalAmount) || 1;
              const progress = Math.min((raised / goal) * 100, 100);

              return (
                <m.div className="col" key={campaign._id} variants={fadeUp} style={gpuStyles}>
                  <m.div
                    className="custom-card h-100 border-0 p-3 pt-4 card-hover-shadow"
                    {...cardHover}
                    style={gpuStyles}
                  >
                    <div className="position-relative mb-3">
                      <img
                        src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"}
                        className="img-fluid rounded w-100 object-fit-cover"
                        alt={campaign.title}
                        style={{ height: "200px", borderRadius: "var(--radius-lg)" }}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-white shadow-sm border px-2 py-1"
                        style={{ color: "var(--primary-color)", fontWeight: 600, fontSize: "0.7rem" }}>
                        {campaign.status ? campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1) : "Active"}
                      </span>
                    </div>
                    <div className="card-body px-1 py-2 d-flex flex-column">
                      <h5 className="fw-bold mb-2" style={{ color: "var(--text-dark)" }}>{campaign.title}</h5>
                      <p className="small mb-3" style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
                        {campaign.description?.substring(0, 80)}{campaign.description?.length > 80 ? "..." : ""}
                      </p>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="small fw-semibold" style={{ color: "var(--primary-color)" }}>₹{raised.toLocaleString()}</span>
                          <span className="small" style={{ color: "var(--text-light)" }}>of ₹{goal.toLocaleString()}</span>
                        </div>
                        <div className="progress mb-3" style={{ height: "6px" }}>
                          <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <Link to={`/campaign/${campaign._id}`} className="btn-outline-custom w-100 d-block text-center py-2">View Details</Link>
                      </div>
                    </div>
                  </m.div>
                </m.div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No featured campaigns available right now.</p>
            </div>
          )}
        </m.div>

        {campaigns.length > 3 && (
          <div className="text-center mt-5">
            <Link to="/campaigns" className="btn-primary-custom px-4 py-3 d-inline-flex align-items-center gap-2">
              View All Campaigns <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>

      {/* ─── How It Works ─── */}
      <section className="full-width-section py-5" style={{ background: "var(--bg-secondary)" }}>
        <div className="container py-4">
          <FadeIn>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-2">How ImpactLink Works</h2>
              <p className="text-muted">Three simple steps to make a difference</p>
            </div>
          </FadeIn>

          <m.div
            className="row g-4"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { icon: Target, title: "Create", desc: "Set up your campaign in minutes with a clear goal and story." },
              { icon: Users, title: "Share", desc: "Spread the word to your community and watch support grow." },
              { icon: Heart, title: "Impact", desc: "Receive funds and make your vision a reality." },
            ].map((step, i) => (
              <m.div className="col-md-4" key={i} variants={fadeUp} style={gpuStyles}>
                <m.div className="text-center p-4 card-hover-shadow" {...cardHover} style={gpuStyles}>
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{ width: "64px", height: "64px", background: "var(--primary-light)", color: "var(--primary-color)" }}>
                    <step.icon size={28} />
                  </div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </m.div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="full-width-section text-white text-center py-5"
        style={{ background: "#047857" }}>
        <div className="container py-4">
          <FadeIn>
            <h2 className="fw-bold mb-3" style={{ color: "white" }}>Ready to Make an Impact?</h2>
            <p className="lead mb-4" style={{ opacity: 0.85, color: "white" }}>Start your fundraising journey in minutes.</p>
            <Link to="/create-campaign" className="btn btn-light px-5 py-3 fw-semibold rounded-pill fs-5" style={{ color: "var(--primary-color)" }}>
              Start Now
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
