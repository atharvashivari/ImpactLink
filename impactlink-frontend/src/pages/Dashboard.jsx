import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { m } from "framer-motion";
import { fadeUp, gpuStyles, staggerContainer } from "../utils/animations";
import { LayoutDashboard, User, List, Settings, LogOut } from "lucide-react";
import PageTransition from "../components/PageTransition";

const Dashboard = () => {
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myContributions, setMyContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch data.");

        const data = await response.json();
        setMyCampaigns(Array.isArray(data.myCampaigns) ? data.myCampaigns : []);
        setMyContributions(Array.isArray(data.myContributions) ? data.myContributions : []);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>;

  // Calculate totals
  const totalRaised = myCampaigns.reduce((sum, camp) => sum + (Number(camp.raisedAmount) || 0), 0);
  const totalDonated = myContributions.reduce((sum, cont) => sum + (Number(cont.amount) || 0), 0);

  return (
    <PageTransition className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-auto col-md-3 col-lg-2 bg-white border-end min-vh-100 py-4 custom-sidebar">
          <div className="d-flex flex-column h-100 px-3">
            <h5 className="fw-bold mb-4 text-dark px-2 d-none d-md-block">ImpactLink</h5>

            <ul className="nav flex-column mb-auto">
              <li className="nav-item mb-2">
                <Link to="/dashboard" className="nav-link active rounded d-flex align-items-center gap-2" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
                  <LayoutDashboard size={20} />
                  <span className="d-none d-md-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/profile" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <User size={20} />
                  <span className="d-none d-md-inline">Account</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/campaigns" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <List size={20} />
                  <span className="d-none d-md-inline">Discover</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <Settings size={20} />
                  <span className="d-none d-md-inline">Settings</span>
                </a>
              </li>
            </ul>

            <button className="btn btn-light mt-auto d-flex align-items-center gap-2 text-danger border-0 justify-content-md-start justify-content-center"
              onClick={() => { localStorage.clear(); navigate('/'); }}>
              <LogOut size={20} />
              <span className="d-none d-md-inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col p-4 p-md-5 overflow-auto" style={{ maxHeight: "100vh" }}>

          <m.div
            className="d-flex justify-content-between align-items-center mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="fw-bold m-0">Dashboard</h2>
            <Link to="/create-campaign" className="btn-primary-custom d-flex align-items-center gap-2">
              <span>+</span> New Campaign
            </Link>
          </m.div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Top Stats Cards */}
          <m.div
            className="row g-4 mb-5"
            variants={staggerContainer()}
            initial="hidden"
            animate="visible"
          >
            <m.div className="col-md-4" variants={fadeUp}>
              <div className="custom-card p-4 h-100">
                <p className="text-muted mb-1 fw-medium">My Campaigns</p>
                <h3 className="fw-bold mb-0">{myCampaigns.length}</h3>
                <small className="text-success mt-2 d-block">Active fundraising</small>
              </div>
            </m.div>
            <m.div className="col-md-4" variants={fadeUp}>
              <div className="custom-card p-4 h-100">
                <p className="text-muted mb-1 fw-medium">Total Raised</p>
                <h3 className="fw-bold mb-0 text-success">₹{totalRaised.toLocaleString()}</h3>
                <small className="text-muted mt-2 d-block">Across all campaigns</small>
              </div>
            </m.div>
            <m.div className="col-md-4" variants={fadeUp}>
              <div className="custom-card p-4 h-100">
                <p className="text-muted mb-1 fw-medium">My Donations</p>
                <h3 className="fw-bold mb-0">₹{totalDonated.toLocaleString()}</h3>
                <small className="text-muted mt-2 d-block">{myContributions.length} contributions made</small>
              </div>
            </m.div>
          </m.div>

          <div className="row g-4">
            {/* Left Column: My Campaigns */}
            <div className="col-lg-7">
              <m.div
                className="custom-card p-4 h-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold m-0">My Campaigns</h5>
                </div>

                {myCampaigns.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle">
                      <thead className="border-bottom">
                        <tr>
                          <th className="text-muted fw-medium pb-3">Campaign</th>
                          <th className="text-muted fw-medium pb-3">Raised</th>
                          <th className="text-muted fw-medium pb-3">Goal</th>
                          <th className="text-muted fw-medium pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myCampaigns.map((camp, idx) => (
                          <m.tr
                            key={idx}
                            className="border-bottom"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                          >
                            <td className="py-3">
                              <p className="mb-0 fw-medium text-dark">{camp.title}</p>
                            </td>
                            <td className="py-3 fw-medium">₹{(Number(camp.raisedAmount) || 0).toLocaleString()}</td>
                            <td className="py-3 text-muted">₹{(Number(camp.goal) || 0).toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`badge rounded-pill ${camp.status === 'Completed' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                                {camp.status || 'Active'}
                              </span>
                            </td>
                          </m.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted mb-3">You haven't created any campaigns yet.</p>
                    <Link to="/create-campaign" className="btn-outline-custom">Create your first campaign</Link>
                  </div>
                )}
              </m.div>
            </div>

            {/* Right Column: Contributions */}
            <div className="col-lg-5">
              <m.div
                className="custom-card p-4 h-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h5 className="fw-bold mb-4">Recent Contributions</h5>
                {myContributions.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {myContributions.map((cont, idx) => (
                      <m.li
                        key={idx}
                        className="d-flex align-items-center justify-content-between py-3 border-bottom"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                      >
                        <div>
                          <p className="mb-0 fw-medium text-dark">{cont.campaign?.title || 'Campaign Donation'}</p>
                          <small className="text-muted">{new Date(cont.date || Date.now()).toLocaleDateString()}</small>
                        </div>
                        <div className="fw-bold text-success">
                          +₹{(Number(cont.amount) || 0).toLocaleString()}
                        </div>
                      </m.li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No contributions yet.</p>
                  </div>
                )}
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
