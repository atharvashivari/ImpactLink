const Campaign = require("../models/Campaign");

// Create a campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, image, startDate, endDate, category } = req.body;
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
      ...(category && { category: category.trim() }),
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

// Update a campaign (creator only)
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    // Verify ownership
    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only edit your own campaigns" });
    }

    const { title, description, goalAmount, image, startDate, endDate, category } = req.body;

    // Validate date order if both provided
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: "Start date must be before end date" });
    }

    // Validate goal amount if provided
    if (goalAmount !== undefined && goalAmount <= 0) {
      return res.status(400).json({ error: "Goal amount must be greater than 0" });
    }

    // Update only allowed fields
    if (title) campaign.title = title.trim();
    if (description) campaign.description = description.trim();
    if (goalAmount) campaign.goalAmount = goalAmount;
    if (image) campaign.image = image.trim();
    if (startDate) campaign.startDate = startDate;
    if (endDate) campaign.endDate = endDate;
    if (category) campaign.category = category.trim();

    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Error updating campaign", details: error.message });
  }
};

// Delete a campaign (creator only)
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    // Verify ownership
    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own campaigns" });
    }

    // Prevent deleting campaigns that have received donations
    if ((campaign.raisedAmount || 0) > 0) {
      return res.status(400).json({ error: "Cannot delete a campaign that has received donations. Contact support for help." });
    }

    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting campaign", details: error.message });
  }
};

