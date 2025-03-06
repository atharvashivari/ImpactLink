import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Donations = () => {
  const { campaignId } = useParams(); // This should correctly grab campaignId from the URL
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Campaign ID from URL:", campaignId);  // Debugging log
    fetchCampaign();
  }, [campaignId]);  // Ensure the effect runs whenever campaignId changes

  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token"); // Make sure to retrieve the token from localStorage
      if (!token) {
        setMessage("You need to log in first!");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Ensure the token is being sent properly
        },
      });

      if (!response.ok) throw new Error("Failed to fetch campaign");

      const data = await response.json();
      setCampaign(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You need to log in first!");
        return;
      }

      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaign: campaignId,
          donor: "USER_ID", // Replace with actual user ID from auth
          amount,
          paymentStatus: "Pending", // Change this once payment is processed
        }),
      });

      if (!response.ok) throw new Error("Failed to process donation");

      setMessage("Donation successful! Thank you for your support.");
      setAmount("");
    } catch (error) {
      setMessage("Error processing donation. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h3>{campaign.title}</h3>
              <p>By: {campaign.creator.name}</p>
              <p className="text-muted">{campaign.description}</p>

              <div className="mt-3">
                <label className="form-label">Enter Donation Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button className="btn btn-primary mt-3" onClick={handleDonate} disabled={loading}>
                {loading ? "Processing..." : "Donate Now"}
              </button>

              {message && <p className="mt-3 text-success">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
