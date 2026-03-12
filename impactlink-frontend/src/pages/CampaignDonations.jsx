import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { m } from "framer-motion";
import { gpuStyles } from "../utils/animations";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";

const CampaignDonations = () => {
  const { id } = useParams();
  const [donations, setDonations] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch Campaign details
      const campRes = await api.get(`/campaigns/${id}`);
      setCampaign(campRes.data);

      // Fetch Donations
      const donRes = await api.get(`/campaigns/${id}/donations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(donRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load donations. Make sure you are the creator of this campaign.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>;

  return (
    <PageTransition className="container py-5 mt-4 min-vh-100">
      <div className="mb-4">
        <Link to="/dashboard" className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 border-0 bg-light">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="custom-card p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
            <div>
              <h3 className="fw-bold text-dark mb-1">Donations Ledger</h3>
              <p className="text-muted mb-0">{campaign?.title}</p>
            </div>
            <div className="mt-3 mt-md-0 text-md-end">
              <h4 className="fw-bold text-success mb-1">₹{Number(campaign?.raisedAmount).toLocaleString() || 0}</h4>
              <p className="text-muted small mb-0">Total Raised</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th className="text-muted fw-medium border-0 pb-3">Date</th>
                  <th className="text-muted fw-medium border-0 pb-3">Donor</th>
                  <th className="text-muted fw-medium border-0 pb-3">Amount</th>
                  <th className="text-muted fw-medium border-0 pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((d, i) => (
                    <m.tr key={d._id} className="border-bottom" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={gpuStyles}>
                      <td className="py-3 text-muted">{new Date(d.date).toLocaleDateString()}</td>
                      <td className="py-3 text-dark fw-medium">
                        {d.donor?.name || "Anonymous"}
                        <br/><small className="text-muted fw-normal">{d.donor?.email}</small>
                      </td>
                      <td className="py-3 text-success fw-bold">₹{d.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`badge rounded-pill ${d.paymentStatus === 'Completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                          {d.paymentStatus}
                        </span>
                      </td>
                    </m.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      No donations have been made to this campaign yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default CampaignDonations;
