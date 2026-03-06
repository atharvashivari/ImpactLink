const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Razorpay Order Error", error: error.message });
  }
};

// Verify payment and record donation
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, campaignId, amount } = req.body;

    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed — invalid signature" });
    }

    // Create donation record
    const donation = new Donation({
      campaign: campaignId,
      donor: req.user.id,
      amount: amount,
      paymentStatus: "Completed",
    });
    await donation.save();

    // Update campaign raisedAmount
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raisedAmount: amount },
    });

    res.status(200).json({
      message: "Payment verified and donation recorded",
      donation,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Payment verification error", error: error.message });
  }
};