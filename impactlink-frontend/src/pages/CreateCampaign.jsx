import React, { useState } from "react";

const CreateCampaign = () => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCampaign({ ...campaign, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign Created:", campaign);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Create a New Campaign</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
            
            {/* Campaign Title */}
            <div className="mb-3">
              <label className="form-label">Campaign Title</label>
              <input type="text" name="title" className="form-control" onChange={handleChange} required />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows="4" onChange={handleChange} required></textarea>
            </div>

            {/* Goal Amount */}
            <div className="mb-3">
              <label className="form-label">Funding Goal (₹)</label>
              <input type="number" name="goal" className="form-control" onChange={handleChange} required />
            </div>

            {/* Category Selection */}
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

            {/* Timeline */}
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

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Campaign Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            </div>

            {/* Preview */}
            {campaign.image && (
              <div className="mb-3 text-center">
                <h6>Image Preview:</h6>
                <img src={campaign.image} alt="Campaign Preview" className="img-fluid rounded" style={{ maxHeight: "200px" }} />
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Create Campaign</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
