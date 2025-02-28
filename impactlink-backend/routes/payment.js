const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Process payment
router.post("/", async (req, res) => {
  try {
    const { userId, campaignId, amount, paymentMethod } = req.body;
    const payment = new Payment({ userId, campaignId, amount, paymentMethod });
    await payment.save();
    res.status(201).json({ msg: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
