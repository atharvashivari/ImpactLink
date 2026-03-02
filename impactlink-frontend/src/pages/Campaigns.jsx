import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please log in to view campaigns.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/campaigns", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          throw new Error("Unauthorized: Your session may have expired. Please log in again.");
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.msg || "Failed to fetch campaigns"}`);
        }

        const data = await response.json();
        console.log("✅ Campaigns Fetched:", data);
        setCampaigns(data);
      } catch (err) {
        console.error("⛔ Fetch Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Sorting Function
  const getSortedCampaigns = () => {
    let sortedCampaigns = [...campaigns];

    if (filter === "trending") {
      sortedCampaigns.sort((a, b) => (Number(b.raisedAmount) || 0) - (Number(a.raisedAmount) || 0));
    } else if (filter === "new") {
      sortedCampaigns.sort((a, b) => new Date(b.startDate || b.createdAt || Date.now()) - new Date(a.startDate || a.createdAt || Date.now()));
    } else if (filter === "highest") {
      sortedCampaigns.sort((a, b) => (Number(b.goalAmount) || 0) - (Number(a.goalAmount) || 0));
    }

    return sortedCampaigns;
  };

  return (
    <div className="page-container py-5 mt-2">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3">Featured Campaigns</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: "600px" }}>
          Discover and support innovative projects, urgent causes, and creative ideas from around the world.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        <button
          className={`btn ${filter === "all" ? "btn-primary-custom px-4" : "btn-outline-custom border-0 text-muted px-4"}`}
          onClick={() => setFilter("all")}
          style={{ borderRadius: "50rem", backgroundColor: filter === "all" ? "var(--primary-color)" : "transparent" }}
        >
          All Projects
        </button>
        <button
          className={`btn ${filter === "trending" ? "btn-primary-custom px-4" : "btn-outline-custom border-0 text-muted px-4"}`}
          onClick={() => setFilter("trending")}
          style={{ borderRadius: "50rem", backgroundColor: filter === "trending" ? "var(--primary-color)" : "transparent" }}
        >
          Trending
        </button>
        <button
          className={`btn ${filter === "new" ? "btn-primary-custom px-4" : "btn-outline-custom border-0 text-muted px-4"}`}
          onClick={() => setFilter("new")}
          style={{ borderRadius: "50rem", backgroundColor: filter === "new" ? "var(--primary-color)" : "transparent" }}
        >
          Newest
        </button>
        <button
          className={`btn ${filter === "highest" ? "btn-primary-custom px-4" : "btn-outline-custom border-0 text-muted px-4"}`}
          onClick={() => setFilter("highest")}
          style={{ borderRadius: "50rem", backgroundColor: filter === "highest" ? "var(--primary-color)" : "transparent" }}
        >
          Highest Goal
        </button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
      {error && <div className="alert alert-danger text-center max-w-md mx-auto">{error}</div>}

      {/* Campaign Grid */}
      {!loading && campaigns.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {getSortedCampaigns().map((campaign) => {
            const raised = Number(campaign.raisedAmount) || 0;
            const goal = Number(campaign.goalAmount) || 1;
            const progress = Math.min((raised / goal) * 100, 100);

            return (
              <div className="col" key={campaign._id}>
                <div className="custom-card h-100 border-0 p-3 pt-4">
                  <div className="position-relative mb-3">
                    <img
                      src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"}
                      className="img-fluid rounded w-100 object-fit-cover"
                      alt={campaign.title}
                      style={{ height: "200px" }}
                    />
                    <span className="position-absolute top-0 end-0 m-2 badge bg-white text-primary shadow-sm border">
                      Campaign
                    </span>
                  </div>
                  <div className="card-body px-1 py-2 d-flex flex-column">
                    <h5 className="fw-bold mb-2 text-dark">{campaign.title}</h5>
                    <p className="text-muted small mb-4 line-clamp-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {campaign.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-1 mt-auto">
                      <span className="text-muted small">Raised</span>
                      <span className="fw-bold text-primary">${raised.toLocaleString()}</span>
                    </div>
                    <div className="progress mb-2" style={{ height: "6px" }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted small">{Math.round(progress)}% of ${goal.toLocaleString()}</span>
                      <span className="text-muted small">{campaign.status || "Active"}</span>
                    </div>

                    <Link to={`/campaign/${campaign._id}`} className="btn-outline-custom w-100 d-block text-center mt-2">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* No Campaigns Message */}
      {!loading && campaigns.length === 0 && !error && (
        <div className="text-center py-5 mt-4">
          <h4 className="fw-bold text-dark mb-3">No campaigns found</h4>
          <p className="text-muted mb-4">We couldn't find any campaigns matching your criteria.</p>
          <Link to="/create-campaign" className="btn-primary-custom px-4 py-2">Start a Campaign</Link>
        </div>
      )}

    </div>
  );
};

export default Campaigns;
