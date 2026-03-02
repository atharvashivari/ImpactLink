const Campaign = require("../models/Campaign");

// Create a campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, image, startDate, endDate, razorpayKey } = req.body;
    const creator = req.user.id; // Extract user ID from token

    // Validate required fields
    if (!title || !description || !goalAmount || !image || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required (title, description, goalAmount, image, startDate, endDate)" });
    }

    // Validate date order
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: "Start date must be before end date" });
    }

    // Validate goal amount
    if (goalAmount <= 0) {
      return res.status(400).json({ error: "Goal amount must be greater than 0" });
    }

    const newCampaign = new Campaign({
      title: title.trim(),
      description: description.trim(),
      goalAmount,
      raisedAmount: 0,
      creator,
      image: image.trim(),
      startDate,
      endDate,
      ...(razorpayKey && { razorpayKey }),
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: "Error creating campaign", details: error.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name email"); // Populates creator details
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get campaign details by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("creator", "name email");

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
