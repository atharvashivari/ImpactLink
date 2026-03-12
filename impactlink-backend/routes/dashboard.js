const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");
const { verifyToken: authMiddleware } = require("../middleware/auth");

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's campaigns from the database
    const myCampaigns = await Campaign.find({ creator: userId });

    // Fetch user's donations with campaign details
    const myContributions = await Donation.find({ donor: userId, paymentStatus: "Completed" })
      .populate("campaign", "title image")
      .sort({ date: -1 });

    res.json({ myCampaigns, myContributions });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
