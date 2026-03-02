import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const Donations = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You need to log in to make a donation.");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load campaign details.");

      const data = await response.json();
      setCampaign(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    setProcessing(true);
    setMessage("");

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
      console.error("Payment error:", error);
      setMessage(error.message);
      setProcessing(false);
    }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="page-container py-5 mt-2 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            {/* Context Card */}
            {campaign && (
              <div className="custom-card mb-4 border-0 bg-white">
                <div className="d-flex align-items-center gap-3 p-3 border-bottom">
                  <img
                    src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=150&auto=format&fit=crop"}
                    alt="Campaign thumbnail"
                    className="rounded object-fit-cover"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div>
                    <p className="text-muted small mb-0 fw-medium">You are supporting</p>
                    <h6 className="fw-bold mb-0 text-dark line-clamp-1">{campaign.title}</h6>
                  </div>
                </div>
              </div>
            )}

            {/* Donation Form Card */}
            <div className="custom-card p-4 p-md-5 border-0 bg-white shadow-lg">
              <div className="text-center mb-4">
                <div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-3">
                  <Heart size={32} fill="currentColor" />
                </div>
                <h3 className="fw-bold">Make a Donation</h3>
                <p className="text-muted">Your contribution makes a difference.</p>
              </div>

              {message && (
                <div className="alert alert-warning mb-4 py-2 border-warning border-opacity-25" role="alert">
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="label-custom text-center w-100 mb-3 text-muted">Select an amount</label>
                <div className="d-flex gap-2 flex-wrap mb-3 justify-content-center">
                  {[10, 25, 50, 100].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      className={`btn ${Number(amount) === preset ? 'btn-primary' : 'btn-outline-custom text-dark'} flex-grow-1`}
                      onClick={() => setAmount(preset.toString())}
                      style={{ minWidth: "80px", borderRadius: "0.5rem" }}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className="position-relative mt-3">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fw-bold">$</span>
                  <input
                    type="number"
                    className="input-custom form-control-lg text-center fw-bold fs-4 ps-4"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Custom amount"
                    min="1"
                    step="1"
                  />
                </div>
              </div>

              <div className="alert bg-light border-0 rounded text-center small text-muted mb-4">
                <span className="fw-bold text-dark">ImpactLink Promise:</span> We guarantee that 100% of your donation will reach the campaign creator securely via Stripe.
              </div>

              <button
                className="btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={handlePayment}
                disabled={processing || !campaign}
              >
                {processing ? (
                  <><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</>
                ) : (
                  <span className="fw-bold fs-6">Donate ${amount || "0"}</span>
                )}
              </button>

              <div className="text-center mt-4 text-muted small">
                <p className="mb-0">Secured by <strong className="text-dark">Stripe</strong></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
