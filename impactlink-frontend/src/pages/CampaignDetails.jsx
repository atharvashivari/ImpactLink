import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/campaigns/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch campaign");

        setCampaign(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;
  if (!campaign) return <h2 className="text-center mt-5">Campaign Not Found</h2>;

  const raised = Number(campaign.raisedAmount) || 0;
  const goal = Number(campaign.goalAmount) || 1;
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="full-width-section bg-dark text-white d-flex align-items-end position-relative" style={{ height: "450px", marginTop: "-2rem" }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url('${campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="position-absolute w-100 h-100" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))" }}></div>
        </div>

        <div className="container position-relative z-1 pb-5">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <span className="badge bg-primary rounded-pill px-3 py-2 mb-3 d-inline-block">Campaign</span>
              <h1 className="display-4 fw-bold mb-2">{campaign.title}</h1>
              <p className="lead mb-0 text-white-50">Join a global community making a difference, one project at a time.</p>
            </div>

            {/* Desktop Quick Stats overlaid on Hero */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="card bg-white text-dark border-0 shadow rounded-4 p-4 mb-n5 position-relative" style={{ bottom: "-40px" }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <img src="https://ui-avatars.com/api/?name=Campaign+Creator&background=random" className="rounded-circle" width="48" alt="Creator" />
                  <div>
                    <p className="text-muted small mb-0">Created by</p>
                    <h6 className="fw-bold mb-0">{campaign.creator || "Anonymous"}</h6>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <h3 className="fw-bold text-primary mb-0">${raised.toLocaleString()}</h3>
                    <span className="text-muted small mb-1">of ${goal.toLocaleString()}</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <a href={`/donate/${campaign._id}`} className="btn-primary-custom w-100 text-center">Donate Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mt-5 pt-4 pb-5">
        <div className="row g-5">

          {/* Mobile Quick Stats (Visible only on small screens) */}
          <div className="col-12 d-lg-none mb-4">
            <div className="custom-card p-4">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-end mb-2">
                  <h3 className="fw-bold text-primary mb-0">${raised.toLocaleString()}</h3>
                  <span className="text-muted small mb-1">of ${goal.toLocaleString()}</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <a href={`/donate/${campaign._id}`} className="btn-primary-custom w-100 text-center">Donate Now</a>
            </div>
          </div>

          <div className="col-lg-8">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4 border-bottom-0 gap-3">
              <li className="nav-item">
                <button className="nav-link text-dark fw-bold border-0 bg-transparent px-0 border-bottom border-primary border-3" style={{ borderRadius: 0 }}>Description</button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-muted fw-medium border-0 bg-transparent px-0 hover-primary">Updates</button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-muted fw-medium border-0 bg-transparent px-0 hover-primary">Comments</button>
              </li>
            </ul>

            <div className="mb-5">
              <h4 className="fw-bold mb-3">About this campaign</h4>
              <p className="text-muted" style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
                {campaign.description}
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="custom-card p-4 mb-4">
              <h5 className="fw-bold mb-4">Campaign Details</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                <li className="d-flex justify-content-between align-items-center pb-3 border-bottom border-light">
                  <span className="text-muted">Status</span>
                  <span className={`badge rounded-pill ${campaign.status === 'Completed' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                    {campaign.status || 'Active'}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center pb-3 border-bottom border-light">
                  <span className="text-muted">Start Date</span>
                  <span className="fw-medium text-dark">{new Date(campaign.startDate || Date.now()).toLocaleDateString()}</span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">End Date</span>
                  <span className="fw-medium text-dark">{new Date(campaign.endDate || Date.now() + 86400000 * 30).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CampaignDetails;
