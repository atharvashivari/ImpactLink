const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

router.get("/", (req, res) => {
    res.json({ message: "Campaigns route is working!" });
  });
  
// Create a campaign
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
