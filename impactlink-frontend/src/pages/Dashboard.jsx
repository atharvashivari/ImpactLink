import React from "react";

const Dashboard = () => {
  // Mock Data (Replace with API data later)
  const myCampaigns = [
    { title: "Help Build a School", raised: 50000, goal: 100000, status: "Active" },
    { title: "AI Startup Funding", raised: 80000, goal: 80000, status: "Completed" },
  ];

  const myContributions = [
    { title: "Cancer Treatment Fund", amount: 5000, date: "Jan 12, 2024" },
    { title: "Tech for Rural India", amount: 2000, date: "Feb 5, 2024" },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard</h2>

      {/* Fundraiser Section */}
      <div className="row my-4">
        <div className="col-md-6">
          <h4>My Campaigns</h4>
          <div className="list-group">
            {myCampaigns.map((campaign, index) => (
              <div key={index} className="list-group-item">
                <h5>{campaign.title}</h5>
                <p>Raised: ₹{campaign.raised} / Goal: ₹{campaign.goal}</p>
                <span className={`badge ${campaign.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Backer Section */}
        <div className="col-md-6">
          <h4>My Contributions</h4>
          <div className="list-group">
            {myContributions.map((contribution, index) => (
              <div key={index} className="list-group-item">
                <h5>{contribution.title}</h5>
                <p>Amount: ₹{contribution.amount}</p>
                <small className="text-muted">Date: {contribution.date}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
