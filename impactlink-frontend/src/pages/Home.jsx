import React, { useEffect, useState } from "react";
import api from "../utils/api";
import SplitText from "../components/reactbits/SplitText";
import CountUp from "../components/reactbits/CountUp";
import FadeIn from "../components/reactbits/FadeIn";
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
    <div className="w-100">
      {/* ─── Hero Section ─── */}
      <section className="full-width-section hero-section" style={{ marginTop: "-2rem" }}>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          alt="Community Impact"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="badge gradient-badge rounded-pill px-3 py-2 mb-4 d-inline-block fs-6">
            ImpactLink 2026
          </span>

          <h1 className="display-3 fw-bold mb-3">
            <SplitText
              text="Empower Change"
              splitBy="word"
              duration={0.8}
              stagger={0.15}
              from={{ opacity: 0, y: 60 }}
            />
          </h1>

          <p className="lead mx-auto mb-5" style={{ maxWidth: "600px", opacity: 0.85 }}>
            Join a global community making a difference, one project at a time.
            Support ideas, charities, and innovations that matter.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="/create-campaign"
              className="btn btn-light text-dark px-4 py-3 fs-5 fw-semibold d-inline-flex align-items-center gap-2"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              Start a Campaign <ArrowRight size={20} />
            </a>
            <a
              href="/campaigns"
              className="btn btn-outline-light px-4 py-3 fs-5"
              style={{ borderRadius: "var(--radius-lg)", borderWidth: "2px" }}
            >
              Discover
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="full-width-section py-5" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <FadeIn delay={0}>
                <div className="stat-card">
                  <div className="stat-number">
                    <CountUp end={500} suffix="+" duration={2000} />
                  </div>
                  <div className="stat-label">Campaigns Funded</div>
                </div>
              </FadeIn>
            </div>
            <div className="col-6 col-md-3">
              <FadeIn delay={0.1}>
                <div className="stat-card">
                  <div className="stat-number">
                    <CountUp end={12000} prefix="" suffix="+" duration={2200} />
                  </div>
                  <div className="stat-label">Donors Worldwide</div>
                </div>
              </FadeIn>
            </div>
            <div className="col-6 col-md-3">
              <FadeIn delay={0.2}>
                <div className="stat-card">
                  <div className="stat-number">
                    <CountUp end={2} prefix="$" suffix="M" duration={2400} />
                  </div>
                  <div className="stat-label">Total Raised</div>
                </div>
              </FadeIn>
            </div>
            <div className="col-6 col-md-3">
              <FadeIn delay={0.3}>
                <div className="stat-card">
                  <div className="stat-number">
                    <CountUp end={45} suffix="+" duration={2000} />
                  </div>
                  <div className="stat-label">Countries Reached</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Campaigns ─── */}
      <section className="container my-5 py-5">
        <FadeIn>
          <div className="text-center mb-5">
            <span className="badge gradient-badge rounded-pill px-3 py-2 mb-3 d-inline-block">
              Featured
            </span>
            <h2 className="fw-bold mb-2">Campaigns Making a Difference</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
              Discover projects that are changing lives. Your contribution matters.
            </p>
          </div>
        </FadeIn>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {campaigns.length > 0 ? (
            campaigns.slice(0, 3).map((campaign, index) => {
              const raised = Number(campaign.raisedAmount) || 0;
              const goal = Number(campaign.goalAmount) || 1;
              const progress = Math.min((raised / goal) * 100, 100);

              return (
                <div className="col" key={campaign._id}>
                  <FadeIn delay={index * 0.1}>
                    <div className="custom-card h-100 border-0 p-3 pt-4">
                      <div className="position-relative mb-3">
                        <img
                          src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"}
                          className="img-fluid rounded w-100 object-fit-cover"
                          alt={campaign.title}
                          style={{ height: "200px", borderRadius: "var(--radius-lg)" }}
                        />
                        <span className="position-absolute top-0 end-0 m-2 badge bg-white shadow-sm border px-2 py-1"
                          style={{ color: "var(--primary-color)", fontWeight: 600, fontSize: "0.7rem" }}>
                          {campaign.status === "active" ? "Active" : campaign.status}
                        </span>
                      </div>
                      <div className="card-body px-1 py-2 d-flex flex-column">
                        <h5 className="fw-bold mb-2" style={{ color: "var(--text-dark)" }}>{campaign.title}</h5>
                        <p className="small mb-3" style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
                          {campaign.description?.substring(0, 80)}
                          {campaign.description?.length > 80 ? "..." : ""}
                        </p>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="small fw-semibold" style={{ color: "var(--primary-color)" }}>
                              ₹{raised.toLocaleString()}
                            </span>
                            <span className="small" style={{ color: "var(--text-light)" }}>
                              of ₹{goal.toLocaleString()}
                            </span>
                          </div>
                          <div className="progress mb-3" style={{ height: "6px" }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}></div>
                          </div>
                          <a href={`/campaign/${campaign._id}`} className="btn-outline-custom w-100 d-block text-center py-2">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No featured campaigns available right now.</p>
            </div>
          )}
        </div>

        {campaigns.length > 3 && (
          <div className="text-center mt-5">
            <a href="/campaigns" className="btn-primary-custom px-4 py-3 d-inline-flex align-items-center gap-2">
              View All Campaigns <ArrowRight size={18} />
            </a>
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

          <div className="row g-4">
            {[
              { icon: Target, title: "Create", desc: "Set up your campaign in minutes with a clear goal and story." },
              { icon: Users, title: "Share", desc: "Spread the word to your community and watch support grow." },
              { icon: Heart, title: "Impact", desc: "Receive funds and make your vision a reality." },
            ].map((step, i) => (
              <div className="col-md-4" key={i}>
                <FadeIn delay={i * 0.15}>
                  <div className="text-center p-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "64px", height: "64px",
                        background: "var(--primary-light)",
                        color: "var(--primary-color)"
                      }}>
                      <step.icon size={28} />
                    </div>
                    <h5 className="fw-bold mb-2">{step.title}</h5>
                    <p className="text-muted small mb-0">{step.desc}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="full-width-section text-white text-center py-5"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)" }}>
        <div className="container py-4">
          <FadeIn>
            <h2 className="fw-bold mb-3" style={{ color: "white" }}>Ready to Make an Impact?</h2>
            <p className="lead mb-4" style={{ opacity: 0.85, color: "white" }}>
              Start your fundraising journey in minutes.
            </p>
            <a href="/create-campaign"
              className="btn btn-light px-5 py-3 fw-semibold rounded-pill fs-5"
              style={{ color: "var(--primary-color)" }}>
              Start Now
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
