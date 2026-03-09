import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, cardHover, buttonTap, gpuStyles } from "../utils/animations";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/reactbits/FadeIn";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/campaigns");
        setCampaigns(response.data);
      } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    fetchCampaigns();
  }, []);

  const getSortedCampaigns = () => {
    let sorted = [...campaigns];
    if (filter === "trending") sorted.sort((a, b) => (Number(b.raisedAmount) || 0) - (Number(a.raisedAmount) || 0));
    else if (filter === "new") sorted.sort((a, b) => new Date(b.startDate || b.createdAt || Date.now()) - new Date(a.startDate || a.createdAt || Date.now()));
    else if (filter === "highest") sorted.sort((a, b) => (Number(b.goalAmount) || 0) - (Number(a.goalAmount) || 0));
    return sorted;
  };

  return (
    <PageTransition className="page-container py-5 mt-2">
      <FadeIn>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Featured Campaigns</h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "600px" }}>
            Discover and support innovative projects, urgent causes, and creative ideas from around the world.
          </p>
        </div>
      </FadeIn>

      {/* Filter Buttons */}
      <m.div className="d-flex justify-content-center flex-wrap gap-2 mb-5" variants={staggerContainer(0.06)} initial="hidden" animate="visible">
        {[
          { key: "all", label: "All Projects" },
          { key: "trending", label: "Trending" },
          { key: "new", label: "Newest" },
          { key: "highest", label: "Highest Goal" },
        ].map((btn) => (
          <m.button
            key={btn.key}
            className={`btn ${filter === btn.key ? "btn-primary-custom px-4" : "btn-outline-custom border-0 text-muted px-4"}`}
            onClick={() => setFilter(btn.key)}
            style={{ borderRadius: "50rem", backgroundColor: filter === btn.key ? "var(--primary-color)" : "transparent" }}
            variants={fadeUp}
            {...buttonTap}
          >
            {btn.label}
          </m.button>
        ))}
      </m.div>

      {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
      {error && <div className="alert alert-danger text-center max-w-md mx-auto">{error}</div>}

      {/* Campaign Grid */}
      {!loading && campaigns.length > 0 && (
        <m.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          key={filter}
        >
          {getSortedCampaigns().map((campaign) => {
            const raised = Number(campaign.raisedAmount) || 0;
            const goal = Number(campaign.goalAmount) || 1;
            const progress = Math.min((raised / goal) * 100, 100);

            return (
              <m.div className="col" key={campaign._id} variants={fadeUp} layout style={gpuStyles}>
                <m.div className="custom-card h-100 border-0 p-3 pt-4 card-hover-shadow" {...cardHover} style={gpuStyles}>
                  <div className="position-relative mb-3">
                    <img src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"} className="img-fluid rounded w-100 object-fit-cover" alt={campaign.title} style={{ height: "200px" }} />
                    <span className="position-absolute top-0 end-0 m-2 badge bg-white text-primary shadow-sm border">Campaign</span>
                  </div>
                  <div className="card-body px-1 py-2 d-flex flex-column">
                    <h5 className="fw-bold mb-2 text-dark">{campaign.title}</h5>
                    <p className="text-muted small mb-4" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{campaign.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-1 mt-auto">
                      <span className="text-muted small">Raised</span>
                      <span className="fw-bold text-primary">₹{raised.toLocaleString()}</span>
                    </div>
                    <div className="progress mb-2" style={{ height: "6px" }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted small">{Math.round(progress)}% of ₹{goal.toLocaleString()}</span>
                      <span className="text-muted small">{campaign.status || "Active"}</span>
                    </div>
                    <Link to={`/campaign/${campaign._id}`} className="btn-outline-custom w-100 d-block text-center mt-2">View Details</Link>
                  </div>
                </m.div>
              </m.div>
            );
          })}
        </m.div>
      )}

      {!loading && campaigns.length === 0 && !error && (
        <FadeIn>
          <div className="text-center py-5 mt-4">
            <h4 className="fw-bold text-dark mb-3">No campaigns found</h4>
            <p className="text-muted mb-4">We couldn't find any campaigns matching your criteria.</p>
            <Link to="/create-campaign" className="btn-primary-custom px-4 py-2">Start a Campaign</Link>
          </div>
        </FadeIn>
      )}
    </PageTransition>
  );
};

export default Campaigns;
