const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/auth");


// Create a campaign
router.post("/", verifyToken, async (req, res) => {
    try {
      const { title, description, goalAmount, creator } = req.body;
      const newCampaign = new Campaign({ title, description, goalAmount, creator });
      await newCampaign.save();
      res.status(201).json(newCampaign);
    } catch (error) {
      res.status(500).json({ error: "Error creating campaign", details: error.message });
    }
  });


// Get all campaigns
router.get("/", verifyToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
