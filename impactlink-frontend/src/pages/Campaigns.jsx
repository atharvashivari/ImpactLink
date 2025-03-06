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
      sortedCampaigns.sort((a, b) => b.raisedAmount - a.raisedAmount);
    } else if (filter === "new") {
      sortedCampaigns.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (filter === "highest") {
      sortedCampaigns.sort((a, b) => b.goalAmount - a.goalAmount);
    }

    return sortedCampaigns;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Explore Campaigns</h2>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("trending")}>
          Trending
        </button>
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("new")}>
          New
        </button>
        <button className="btn btn-outline-primary" onClick={() => setFilter("highest")}>
          Highest Funded
        </button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Loading campaigns...</p>}
      {error && <p className="alert alert-danger text-center">{error}</p>}

      {/* Campaign Grid */}
      {!loading && campaigns.length > 0 && (
        <div className="row">
          {getSortedCampaigns().map((campaign) => (
            <div key={campaign._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 d-flex flex-column">
                <img
                  src={campaign.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={campaign.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{campaign.title}</h5>
                  <p className="text-muted">{campaign.description}</p>
                  <p>
                    <strong>Goal:</strong> ${campaign.goalAmount}
                    <br />
                    <strong>Raised:</strong> ${campaign.raisedAmount}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/campaign/${campaign._id}`}>
                      <button className="btn btn-primary w-100">View Campaign</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Campaigns Message */}
      {!loading && campaigns.length === 0 && !error && (
        <p className="text-center mt-4">No campaigns available.</p>
      )}

      {/* Create Campaign Button */}
      <div className="text-center mt-4">
        <Link to="/create-campaign">
          <button className="btn btn-success">Create New Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Campaigns;
