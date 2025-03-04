const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/auth");

// Process payment
router.post("/", verifyToken , async (req, res) => {
  try {
    const { userId, campaignId, amount, paymentMethod } = req.body;
    const payment = new Payment({ userId, campaignId, amount, paymentMethod });
    await payment.save();
    res.status(201).json({ msg: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        console.log("Fetching payments...");
        const payments = await Payment.find().populate("campaign donor", "title name");
        console.log("Payments found:", payments);
        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error.message);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

module.exports = router;
