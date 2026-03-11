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

// Get donations for a primary campaign (auth required, creator only)
router.get("/:id/donations", verifyToken, campaignController.getCampaignDonations);

// Update a campaign (auth required, creator only)
router.put("/:id", verifyToken, campaignController.updateCampaign);

// Delete a campaign (auth required, creator only)
router.delete("/:id", verifyToken, campaignController.deleteCampaign);

module.exports = router;

