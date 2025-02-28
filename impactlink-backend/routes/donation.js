const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Make a donation
router.post("/", async (req, res) => {
  try {
    const { campaignId, userId, amount } = req.body;
    const donation = new Donation({ campaignId, userId, amount });
    await donation.save();
    res.status(201).json({ msg: "Donation successful", donation });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get donations for a campaign
router.get("/:campaignId", async (req, res) => {
  try {
    const donations = await Donation.find({ campaignId: req.params.campaignId });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
