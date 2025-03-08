import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Donations = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You need to log in first!");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch campaign");

      const data = await response.json();
      setCampaign(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("❌ Please enter a valid donation amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/payments/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaignId,
          amount: amount * 100, // Convert to cents
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initialization failed.");
      }

      window.location.href = data.checkoutUrl; // Redirect to Stripe checkout
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!campaign) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3>{campaign.title}</h3>
          <p className="text-muted">{campaign.description}</p>

          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter donation amount"
          />

          <button className="btn btn-primary mt-3" onClick={handlePayment}>
            Donate Now
          </button>

          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Donations;
