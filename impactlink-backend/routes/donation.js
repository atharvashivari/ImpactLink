const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const verifyToken = require("../middleware/auth");

// Create a donation
router.post("/", verifyToken, donationController.createDonation);

// Get all donations
router.get("/", verifyToken, donationController.getAllDonations);

module.exports = router;
