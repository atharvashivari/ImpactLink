import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { m } from "framer-motion";
import { gpuStyles } from "../utils/animations";
import { LayoutDashboard, Users, Database, LogOut, FileText } from "lucide-react";
import PageTransition from "../components/PageTransition";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get("/admin/dashboard/donations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setDonations(res.data);
    } catch (error) {
      console.error("Error fetching donations", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <PageTransition className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-lg-2 bg-white border-end min-vh-100 py-4 custom-sidebar">
          <div className="d-flex flex-column h-100 px-3">
            <h5 className="fw-bold mb-4 text-dark px-2 d-none d-md-block">ImpactLink</h5>

            <ul className="nav flex-column mb-auto">
              <li className="nav-item mb-2">
                <Link to="/admin/admindashboard" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <LayoutDashboard size={20} />
                  <span className="d-none d-md-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/admindashboard" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <Database size={20} />
                  <span className="d-none d-md-inline">Campaigns</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/users" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <Users size={20} />
                  <span className="d-none d-md-inline">Users</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/donations" className="nav-link active rounded d-flex align-items-center gap-2" style={{ backgroundColor: "#D1FAE5", color: "#047857" }}>
                  <FileText size={20} />
                  <span className="d-none d-md-inline">Donations</span>
                </Link>
              </li>
            </ul>

            <button className="btn btn-light mt-auto d-flex align-items-center gap-2 text-danger border-0 justify-content-md-start justify-content-center"
              onClick={handleLogout}>
              <LogOut size={20} />
              <span className="d-none d-md-inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col p-4 p-md-5 overflow-auto" style={{ maxHeight: "100vh" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">Platform Donations</h2>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="custom-card p-4">
                <h5 className="fw-bold mb-4">All Donations</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-muted fw-medium pb-2 border-0">Date</th>
                        <th className="text-muted fw-medium pb-2 border-0">Donor</th>
                        <th className="text-muted fw-medium pb-2 border-0">Campaign</th>
                        <th className="text-muted fw-medium pb-2 border-0">Amount</th>
                        <th className="text-muted fw-medium pb-2 border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length > 0 ? (
                        donations.map((donation, idx) => (
                          <m.tr key={donation._id} className="border-bottom border-light" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} style={gpuStyles}>
                            <td className="py-3 text-muted">{new Date(donation.date).toLocaleDateString()}</td>
                            <td className="py-3 text-dark fw-medium">
                              {donation.donor?.name || "Anonymous"}
                              <br/><small className="text-muted">{donation.donor?.email}</small>
                            </td>
                            <td className="py-3 text-muted">{donation.campaign?.title || "Unknown Campaign"}</td>
                            <td className="py-3 text-success fw-bold">₹{donation.amount?.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`badge rounded-pill ${donation.paymentStatus === 'Completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                {donation.paymentStatus}
                              </span>
                            </td>
                          </m.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            No donations found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDonations;
