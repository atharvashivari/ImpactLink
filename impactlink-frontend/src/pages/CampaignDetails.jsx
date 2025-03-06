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

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={campaign.image} alt={campaign.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <p>
            <strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}
          </p>
          <div className="progress my-3">
            <div
              className="progress-bar bg-success"
              style={{ width: `${(campaign.raisedAmount / campaign.goalAmount) * 100}%` }}
            >
              {((campaign.raisedAmount / campaign.goalAmount) * 100).toFixed(0)}%
            </div>
          </div>
          <p>
            Raised: ₹{campaign.raisedAmount.toLocaleString()} / Goal: ₹{campaign.goalAmount.toLocaleString()}
          </p>
          <a href={`/donate/${campaign._id}`} className="btn btn-primary">Donate Now</a>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
