import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard/campaigns", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const toggleCampaignStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/campaigns/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      fetchCampaigns(); // Refresh the list
    } catch (error) {
      console.error("Error updating campaign", error);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      fetchCampaigns(); // Refresh the list
    } catch (error) {
      console.error("Error deleting campaign", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.title}</td>
              <td>{campaign.creator}</td>
              <td>{campaign.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => toggleCampaignStatus(campaign._id, campaign.isActive)}>
                  {campaign.isActive ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => deleteCampaign(campaign._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
