import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import { Heart } from "lucide-react";
import { fadeUp, scaleIn, buttonTap, gpuStyles } from "../utils/animations";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/reactbits/FadeIn";

const Donations = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("warning");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => { fetchCampaign(); }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setMessage("You need to log in to make a donation."); setLoading(false); return; }
      const response = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load campaign details.");
      setCampaign(await response.json());
    } catch (error) { setMessage(error.message); } finally { setLoading(false); }
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) { setMessage("Please enter a valid donation amount."); setMessageType("warning"); return; }
    setProcessing(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(amount), currency: "INR" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment initialization failed.");

      // Open Razorpay checkout with UPI support
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SLE7mvITAOsDDj",
        amount: data.amount,
        currency: data.currency,
        name: "ImpactLink",
        description: campaign?.title || "Donation",
        order_id: data.id,
        handler: async function (razorpayResponse) {
          // Verify payment on backend and record donation
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                campaignId,
                amount: Number(amount),
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setMessageType("success");
              setMessage("Payment successful! Thank you for your generous donation. 🎉");
              // Refresh campaign data to show updated raisedAmount
              fetchCampaign();
              setAmount("");
            } else {
              setMessageType("warning");
              setMessage(verifyData.message || "Payment recorded but verification issue occurred.");
            }
          } catch (err) {
            setMessageType("warning");
            setMessage("Payment may have succeeded but verification failed. Please contact support.");
          }
        },
        prefill: {},
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        theme: { color: "#4f46e5" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setMessageType("danger");
        setMessage("Payment failed: " + (response.error?.description || "Please try again."));
      });
      rzp.open();
    } catch (error) { console.error("Payment error:", error); setMessage(error.message); setMessageType("danger"); } finally { setProcessing(false); }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>;

  return (
    <PageTransition className="page-container py-5 mt-2 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            {/* Context Card */}
            {campaign && (
              <FadeIn>
                <div className="custom-card mb-4 border-0 bg-white">
                  <div className="d-flex align-items-center gap-3 p-3 border-bottom">
                    <img src={campaign.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=150&auto=format&fit=crop"} alt="Campaign thumbnail" className="rounded object-fit-cover" style={{ width: "60px", height: "60px" }} />
                    <div>
                      <p className="text-muted small mb-0 fw-medium">You are supporting</p>
                      <h6 className="fw-bold mb-0 text-dark line-clamp-1">{campaign.title}</h6>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Donation Form Card */}
            <FadeIn delay={0.1}>
              <m.div className="custom-card p-4 p-md-5 border-0 bg-white shadow-lg" variants={scaleIn} initial="hidden" animate="visible" style={gpuStyles}>
                <div className="text-center mb-4">
                  <m.div
                    className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 250, damping: 20 }}
                    style={gpuStyles}
                  >
                    <Heart size={32} fill="currentColor" />
                  </m.div>
                  <h3 className="fw-bold">Make a Donation</h3>
                  <p className="text-muted">Your contribution makes a difference.</p>
                </div>

                {message && (
                  <m.div className={`alert alert-${messageType} mb-4 py-2 border-${messageType} border-opacity-25`} role="alert" variants={fadeUp} initial="hidden" animate="visible" style={gpuStyles}>
                    {message}
                  </m.div>
                )}

                <div className="mb-4">
                  <label className="label-custom text-center w-100 mb-3 text-muted">Select an amount</label>
                  <div className="d-flex gap-2 flex-wrap mb-3 justify-content-center">
                    {[100, 500, 1000, 5000].map(preset => (
                      <m.button
                        key={preset}
                        type="button"
                        className={`btn ${Number(amount) === preset ? 'btn-primary' : 'btn-outline-custom text-dark'} flex-grow-1`}
                        onClick={() => setAmount(preset.toString())}
                        style={{ minWidth: "80px", borderRadius: "0.5rem" }}
                        {...buttonTap}
                      >
                        ₹{preset.toLocaleString()}
                      </m.button>
                    ))}
                  </div>
                  <div className="position-relative mt-3">
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fw-bold">₹</span>
                    <input type="number" className="input-custom form-control-lg text-center fw-bold fs-4 ps-4" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Custom amount" min="1" step="1" />
                  </div>
                </div>

                <div className="alert bg-light border-0 rounded text-center small text-muted mb-4">
                  <span className="fw-bold text-dark">ImpactLink Promise:</span> 100% of your donation reaches the campaign creator securely via Razorpay. UPI, cards, netbanking and wallets accepted.
                </div>

                <m.button className="btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2" onClick={handlePayment} disabled={processing || !campaign} {...buttonTap}>
                  {processing ? <><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</> : <span className="fw-bold fs-6">Donate ₹{amount || "0"}</span>}
                </m.button>

                <div className="text-center mt-4 text-muted small">
                  <p className="mb-0">Secured by <strong className="text-dark">Razorpay</strong> · UPI · Cards · Netbanking</p>
                </div>
              </m.div>
            </FadeIn>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Donations;
