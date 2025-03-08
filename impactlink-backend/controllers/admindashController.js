const Campaign = require("../models/Campaign");

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
};

// Update campaign status
const updateCampaignStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const campaign = await Campaign.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.json({ message: "Campaign status updated", campaign });
  } catch (error) {
    res.status(500).json({ message: "Error updating campaign status" });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign" });
  }
};

module.exports = { getAllCampaigns, updateCampaignStatus, deleteCampaign };
