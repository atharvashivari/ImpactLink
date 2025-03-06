import React, { useEffect, useState } from "react";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }

      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section
        className="hero text-center text-white d-flex align-items-center justify-content-center"
        style={{
          height: "80vh",
          backgroundImage:
            "url('https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content">
          <h1>Empower Change Through Crowdfunding</h1>
          <p className="lead">Support ideas, charities, and innovations that matter.</p>
          <a href="/campaigns" className="btn btn-primary btn-lg">
            Explore Campaigns
          </a>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="campaigns my-5">
        <h2 className="text-center mb-4">Featured Campaigns</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div className="col" key={campaign._id}>
                <div className="card h-100 shadow-sm">
                  <img src={campaign.image} className="card-img-top" alt={campaign.title} style={{ height: "200px", objectFit: "cover" }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{campaign.title}</h5>
                    <p className="card-text flex-grow-1">{campaign.description.substring(0, 80)}...</p>
                    <a href={`/campaign/${campaign._id}`} className="btn btn-outline-primary mt-auto">
                      View Campaign
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No campaigns available.</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action text-center my-5 p-5 text-white" style={{ background: "#007bff" }}>
        <h2>Start Your Campaign Today</h2>
        <p>Join thousands of users making a difference.</p>
        <a href="/create-campaign" className="btn btn-light btn-lg">
          Create Campaign
        </a>
      </section>
    </div>
  );
};

export default Home;
