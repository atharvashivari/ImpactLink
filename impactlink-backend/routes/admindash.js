const express = require("express");
const router = express.Router();
const { getAllCampaigns, updateCampaignStatus, deleteCampaign } = require("../controllers/admindashController");
const { verifyToken } = require("../middleware/auth");

// All admin dashboard routes require authentication
router.get("/campaigns", verifyToken, getAllCampaigns);
router.put("/campaigns/:id/status", verifyToken, updateCampaignStatus);
router.delete("/campaigns/:id", verifyToken, deleteCampaign);

module.exports = router;