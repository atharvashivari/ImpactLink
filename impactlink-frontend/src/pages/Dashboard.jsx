import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myContributions, setMyContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in first!");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        setMyCampaigns(Array.isArray(data.myCampaigns) ? data.myCampaigns : []);
        setMyContributions(Array.isArray(data.myContributions) ? data.myContributions : []);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError("Unable to load dashboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <div className="container my-5 text-center"><h4>Loading...</h4></div>;
  if (error) return <div className="container my-5 text-center text-danger"><h4>{error}</h4></div>;

  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard</h2>

      {/* Fundraiser Section */}
      <div className="row my-4">
        <div className="col-md-6">
          <h4>My Campaigns</h4>
          {myCampaigns.length > 0 ? (
            <div className="list-group">
              {myCampaigns.map((campaign, index) => (
                <div key={index} className="list-group-item">
                  <h5>{campaign.title}</h5>
                  <p>Raised: ₹{campaign.raisedAmount} / Goal: ₹{campaign.goal}</p>
                  <span className={`badge ${campaign.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                    {campaign.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No campaigns created yet.</p>
          )}
        </div>

        {/* Backer Section */}
        <div className="col-md-6">
          <h4>My Contributions</h4>
          {myContributions.length > 0 ? (
            <div className="list-group">
              {myContributions.map((contribution, index) => (
                <div key={index} className="list-group-item">
                  <h5>{contribution.title}</h5>
                  <p>Amount: ₹{contribution.amount}</p>
                  <small className="text-muted">Date: {new Date(contribution.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">You haven't contributed to any campaigns yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
