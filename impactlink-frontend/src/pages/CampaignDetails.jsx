import React from "react";
import { useParams } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    title: "Save the Rainforest",
    category: "Environment",
    image: "https://onetreeplanted.org/cdn/shop/articles/amazon_rainforest_mist_1350x.png?v=1680706265",
    goal: 50000,
    raised: 35000,
    description: "Support our mission to save the rainforest and protect biodiversity.",
  },
  {
    id: 2,
    title: "Tech for Kids",
    category: "Education",
    image: "https://tech.analyticsinsight.net/wp-content/uploads/2023/11/Top-10-Outstanding-Tech-Gadgets-for-Kids-in-2023.jpg",
    goal: 20000,
    raised: 10500,
    description: "Help provide technology and educational tools to underprivileged children.",
  },
  {
    id: 3,
    title: "Disaster Relief Fund",
    category: "Charity",
    image: "https://images-platform.99static.com/L2QgE5sy_j_sv5xbpoik9jHHdL8=/500x500/top/smart/99designs-contests-attachments/12/12841/attachment_12841638",
    goal: 100000,
    raised: 70000,
    description: "Provide immediate aid and relief to communities affected by disasters.",
  },
];

const CampaignDetails = () => {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === Number(id));

  if (!campaign) return <h2 className="text-center mt-5">Campaign Not Found</h2>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={campaign.image} alt={campaign.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <div className="progress my-3">
            <div
              className="progress-bar bg-success"
              style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
            >
              {((campaign.raised / campaign.goal) * 100).toFixed(0)}%
            </div>
          </div>
          <p>
            Raised: ₹{campaign.raised.toLocaleString()} / Goal: ₹{campaign.goal.toLocaleString()}
          </p>
          <button className="btn btn-primary">Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
