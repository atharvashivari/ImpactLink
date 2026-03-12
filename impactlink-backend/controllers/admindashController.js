const asyncHandler = require('express-async-handler');
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const Donation = require("../models/Donation");

// Get all campaigns
const getAllCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find().limit(100);
  res.json(campaigns);
});

// Update campaign status
const updateCampaignStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true });

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  res.json({ message: "Campaign status updated", campaign });
});

// Delete campaign
const deleteCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findByIdAndDelete(id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  res.json({ message: "Campaign deleted successfully" });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  // Exclude passwords
  const users = await User.find().select("-password").sort({ createdAt: -1 }).limit(100);
  res.json(users);
});

// Get all donations
const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find()
    .populate("campaign", "title goalAmount raisedAmount")
    .populate("donor", "name email")
    .sort({ date: -1 })
    .limit(100);
  res.json(donations);
});

module.exports = { getAllCampaigns, updateCampaignStatus, deleteCampaign, getAllUsers, getAllDonations };
