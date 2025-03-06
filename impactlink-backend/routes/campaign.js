const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const verifyToken = require("../middleware/auth");

// Create a campaign
router.post("/", verifyToken, campaignController.createCampaign);

// Get all campaigns
router.get("/", verifyToken, campaignController.getAllCampaigns);

// Get campaign details by ID
router.get("/:id", verifyToken, campaignController.getCampaignById);

module.exports = router;
