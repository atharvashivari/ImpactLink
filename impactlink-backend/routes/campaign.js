const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const { verifyToken } = require("../middleware/auth");

// Create a campaign (auth required)
router.post("/", verifyToken, campaignController.createCampaign);

// Get all campaigns (public)
router.get("/", campaignController.getAllCampaigns);

// Get campaign details by ID (public)
router.get("/:id", campaignController.getCampaignById);

module.exports = router;
