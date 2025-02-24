import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Campaigns = () => {
  // Placeholder data for campaigns
  const campaigns = [
    {
      id: 1,
      title: "Save the Rainforest",
      category: "Environment",
      image: "https://onetreeplanted.org/cdn/shop/articles/amazon_rainforest_mist_1350x.png?v=1680706265",
      goal: "$50,000",
      raised: "$35,000",
    },
    {
      id: 2,
      title: "Tech for Kids",
      category: "Education",
      image: "https://tech.analyticsinsight.net/wp-content/uploads/2023/11/Top-10-Outstanding-Tech-Gadgets-for-Kids-in-2023.jpg",
      goal: "$20,000",
      raised: "$10,500",
    },
    {
      id: 3,
      title: "Disaster Relief Fund",
      category: "Charity",
      image: "https://images-platform.99static.com/L2QgE5sy_j_sv5xbpoik9jHHdL8=/500x500/top/smart/99designs-contests-attachments/12/12841/attachment_12841638",
      goal: "$100,000",
      raised: "$70,000",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Explore Campaigns</h2>

      {/* Filter Options */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-outline-primary me-2">Trending</button>
        <button className="btn btn-outline-primary me-2">New</button>
        <button className="btn btn-outline-primary">Highest Funded</button>
      </div>

      {/* Campaign Grid */}
      <div className="row">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 d-flex flex-column">
              <img 
                src={campaign.image} 
                className="card-img-top" 
                alt={campaign.title} 
                style={{ height: "200px", objectFit: "cover" }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{campaign.title}</h5>
                <p className="text-muted">{campaign.category}</p>
                <p>
                  <strong>Goal:</strong> {campaign.goal}
                  <br />
                  <strong>Raised:</strong> {campaign.raised}
                </p>
                <div className="mt-auto">
                    <Link to={`/campaign/${campaign.id}`}>
                    <button className="btn btn-primary w-100">View Campaign</button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Button */}
      <div className="text-center mt-4">
        <a href="/create-campaign"><button className="btn btn-success">Create New Campaign</button></a>
      </div>
    </div>
  );
};

export default Campaigns;
