import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css";

const CreateCampaign = () => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    startDate: "",
    endDate: "",
    imageUrl: "", // Changed from file to URL
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: campaign.title,
          description: campaign.description,
          goalAmount: parseFloat(campaign.goal),
          image: campaign.imageUrl,
          startDate: campaign.startDate, // Include startDate
          endDate: campaign.endDate, // Include endDate
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to create campaign.");
      }
  
      toast.success("Campaign created successfully!");
      navigate("/campaigns");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container my-5">
      <h2 className="text-center">Create a New Campaign</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
            {error && <p className="alert alert-danger">{error}</p>}
            
            <div className="mb-3">
              <label className="form-label">Campaign Title</label>
              <input type="text" name="title" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows="4" onChange={handleChange} required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Funding Goal (₹)</label>
              <input type="number" name="goal" className="form-control" step="0.01" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select name="category" className="form-select" onChange={handleChange} required>
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Social Cause">Social Cause</option>
              </select>
            </div>

            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <input type="date" name="startDate" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input type="date" name="endDate" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Campaign Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="form-control"
                placeholder="Enter image URL"
                onChange={handleChange}
                required
              />
            </div>

            {campaign.imageUrl && (
              <div className="mb-3 text-center">
                <h6>Image Preview:</h6>
                <img src={campaign.imageUrl} alt="Campaign Preview" className="img-fluid rounded" style={{ maxHeight: "200px" }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Creating..." : "Create Campaign"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
