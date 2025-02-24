import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  // Mock Data (Just for frontend display)
  const campaigns = [
    { id: 1, title: "Education Fund", status: "Pending" },
    { id: 2, title: "Disaster Relief", status: "Approved" },
    { id: 3, title: "Animal Shelter Support", status: "Suspended" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Campaigns Table */}
      <div className="card p-3 shadow-sm">
        <h4>Manage Campaigns</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.title}</td>
                <td>
                  <span
                    className={
                      campaign.status === "Approved"
                        ? "badge bg-success"
                        : campaign.status === "Pending"
                        ? "badge bg-warning"
                        : "badge bg-danger"
                    }
                  >
                    {campaign.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Approve</button>
                  <button className="btn btn-danger btn-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donation Stats Placeholder */}
      <div className="card p-3 shadow-sm mt-4">
        <h4>Donation Overview</h4>
        <p className="mt-2">Total Donations Collected: <strong>$120,000</strong></p>
      </div>
    </div>
  );
};

export default AdminDashboard;
