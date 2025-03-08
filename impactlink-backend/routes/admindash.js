const express = require("express");
const router = express.Router();
const { getAllCampaigns, updateCampaignStatus, deleteCampaign } = require("../controllers/admindashController");

// Define admin dashboard routes
router.get("/dashboard/campaigns", getAllCampaigns); // Now `/api/admin/dashboard/campaigns`
router.put("/dashboard/campaigns/:id/status", updateCampaignStatus);
router.delete("/dashboard/campaigns/:id", deleteCampaign);

module.exports = router;

router.get("/campaigns", (req, res) => {
    console.log("Admin campaigns route hit!");
    getAllCampaigns(req, res);
  });
  