const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign"); // Ensure the path is correct
const authMiddleware = require("../middleware/auth"); // Ensure authentication middleware is applied

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's campaigns from the database
    const myCampaigns = await Campaign.find({ creator: userId });

    // Since there's no Contribution model, return an empty array for contributions
    const myContributions = [];

    res.json({ myCampaigns, myContributions });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
