const express = require("express");
const router = express.Router();
const { getAllCampaigns, updateCampaignStatus, deleteCampaign, getAllUsers, getAllDonations } = require("../controllers/admindashController");
const { verifyToken } = require("../middleware/auth");

// All admin dashboard routes require authentication
router.get("/campaigns", verifyToken, getAllCampaigns);
router.put("/campaigns/:id/status", verifyToken, updateCampaignStatus);
router.delete("/campaigns/:id", verifyToken, deleteCampaign);

router.get("/users", verifyToken, getAllUsers);
router.get("/donations", verifyToken, getAllDonations);

module.exports = router;