import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { m } from "framer-motion";
import { fadeUp, gpuStyles, staggerContainer } from "../utils/animations";
import { LayoutDashboard, Users, Database, Settings, LogOut, CheckCircle, XCircle, Trash2, Edit2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import PageTransition from "../components/PageTransition";

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/admin/dashboard/campaigns", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const toggleCampaignStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "cancelled" : "active";
      await api.put(
        `/admin/dashboard/campaigns/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign", error);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this campaign?")) {
        await api.delete(`/admin/dashboard/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        fetchCampaigns();
      }
    } catch (error) {
      console.error("Error deleting campaign", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Mock data for charts
  const donationData = [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 5000 },
    { name: "Apr", amount: 4500 },
    { name: "May", amount: 6000 },
    { name: "Jun", amount: 8000 },
  ];

  const activeInactiveData = [
    { name: "Active", value: campaigns.filter(c => c.status === "active").length },
    { name: "Inactive", value: campaigns.filter(c => c.status !== "active").length },
  ];

  const COLORS = ["#047857", "#dc3545"];

  return (
    <PageTransition className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-auto col-md-3 col-lg-2 bg-white border-end min-vh-100 py-4 custom-sidebar">
          <div className="d-flex flex-column h-100 px-3">
            <h5 className="fw-bold mb-4 text-dark px-2 d-none d-md-block">ImpactLink</h5>

            <ul className="nav flex-column mb-auto">
              <li className="nav-item mb-2">
                <Link to="/admin/admindashboard" className="nav-link active rounded d-flex align-items-center gap-2" style={{ backgroundColor: "#D1FAE5", color: "#047857" }}>
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
                <Link to="/admin/donations" className="nav-link text-muted rounded d-flex align-items-center gap-2 hover-bg-light">
                  <Database size={20} />
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
            <h2 className="fw-bold m-0">Admin Dashboard</h2>
          </div>

          {/* Top Charts Row */}
          <m.div className="row g-4 mb-4" variants={staggerContainer()} initial="hidden" animate="visible">
            <m.div className="col-lg-6" variants={fadeUp}>
              <div className="custom-card p-4 h-100">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <h6 className="text-muted fw-bold mb-1">Total Donations</h6>
                    <h3 className="fw-bold mb-0">₹255,980</h3>
                  </div>
                </div>
                <div style={{ height: "200px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donationData}>
                      <XAxis dataKey="name" stroke="#047857" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#047857" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                      <Tooltip cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="amount" fill="#047857" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </m.div>

            <m.div className="col-lg-3" variants={fadeUp}>
              <div className="custom-card p-4 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <h6 className="text-muted fw-bold mb-3 w-100 text-start">Campaign Status</h6>
                <div style={{ width: "160px", height: "160px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={activeInactiveData} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                        {activeInactiveData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="d-flex justify-content-around w-100 mt-3">
                  <small><span className="d-inline-block rounded-circle me-1" style={{ width: 8, height: 8, backgroundColor: COLORS[0] }}></span> Active ({activeInactiveData[0].value})</small>
                  <small><span className="d-inline-block rounded-circle me-1" style={{ width: 8, height: 8, backgroundColor: COLORS[1] }}></span> Inactive ({activeInactiveData[1].value})</small>
                </div>
              </div>
            </m.div>

            <m.div className="col-lg-3" variants={fadeUp}>
              <div className="custom-card p-4 h-100">
                <h6 className="text-muted fw-bold mb-3">User Statistics</h6>
                <div className="mb-4">
                  <p className="text-muted small mb-1">Total Sponsors</p>
                  <h4 className="fw-bold">2,035</h4>
                </div>
                <div className="mb-4">
                  <p className="text-muted small mb-1">Total Users</p>
                  <h4 className="fw-bold">230,200</h4>
                </div>
                <div>
                  <p className="text-muted small mb-1">Estimated Traffic</p>
                  <h4 className="fw-bold">456</h4>
                </div>
              </div>
            </m.div>
          </m.div>

          {/* Table Row */}
          <div className="row">
            <div className="col-12">
              <div className="custom-card p-4">
                <h5 className="fw-bold mb-4">Manage Campaigns</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-muted fw-medium pb-2 border-0">Title</th>
                        <th className="text-muted fw-medium pb-2 border-0">Creator</th>
                        <th className="text-muted fw-medium pb-2 border-0">Status</th>
                        <th className="text-muted fw-medium pb-2 border-0 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.length > 0 ? (
                        campaigns.map((camp, idx) => (
                          <m.tr key={camp._id} className="border-bottom border-light" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                            <td className="py-3 text-dark fw-medium">{camp.title}</td>
                            <td className="py-3 text-muted">{camp.creator || "Unknown"}</td>
                            <td className="py-3">
                              <span className={`badge rounded-pill ${camp.status === "active" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                {camp.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="py-3 text-end">
                              <Link
                                to={`/edit-campaign/${camp._id}`}
                                className="btn btn-sm btn-outline-primary me-2"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </Link>
                              <button
                                className={`btn btn-sm ${camp.status === "active" ? "btn-outline-warning" : "btn-outline-success"} me-2`}
                                onClick={() => toggleCampaignStatus(camp._id, camp.status)}
                                title={camp.status === "active" ? "Deactivate" : "Activate"}
                              >
                                {camp.status === "active" ? <XCircle size={16} /> : <CheckCircle size={16} />}
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteCampaign(camp._id)}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </m.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted">
                            No campaigns found.
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

export default AdminDashboard;
