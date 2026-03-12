const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const logger = require('../utils/logger');
const { addEmailJob } = require('../queues/emailQueue');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order
exports.createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Amount must be greater than 0");
  }

  const options = {
    amount: amount * 100, // Razorpay works in paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  res.status(200).json(order);
});

// Verify payment and record donation
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, campaignId, amount } = req.body;

  // Verify Razorpay signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error("Payment verification failed — invalid signature");
  }

  // Cross-check Amount with Razorpay API (Phase 1 Fix)
  const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
  if (!razorpayOrder || razorpayOrder.amount !== amount * 100) {
    logger.error(`🚨 Amount mismatch detected for order ${razorpay_order_id}. Provided: ${amount}, Expected: ${razorpayOrder ? razorpayOrder.amount / 100 : "Not Found"}`);
    res.status(400);
    throw new Error("Payment verification failed — amount mismatch");
  }

  // Prevent Replay Attacks (SEC-01)
  const existingDonation = await Donation.findOne({ razorpayPaymentId: razorpay_payment_id });
  if (existingDonation) {
    res.status(400);
    throw new Error("Payment already processed");
  }

  // Prevent Cron Collisions (LOG-02) & Inactive Donations
  const campaignData = await Campaign.findById(campaignId);
  if (!campaignData || new Date() > new Date(campaignData.endDate)) {
    res.status(400);
    throw new Error("Campaign has ended, donations are no longer accepted.");
  }
  if (campaignData.status !== "active") {
    res.status(400);
    throw new Error("This campaign is currently inactive and cannot accept donations.");
  }

  // Mongoose ACID Transaction (LOG-01)
  const session = await mongoose.startSession();
  let finalDonation;

  try {
    session.startTransaction();

    // Create donation record inside session
    finalDonation = new Donation({
      campaign: campaignId,
      donor: req.user.id,
      amount: amount,
      paymentStatus: "Completed",
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id
    });
    await finalDonation.save({ session });

    // Update campaign raisedAmount inside session
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $inc: { raisedAmount: amount } },
      { session, new: true }
    );

    if (!updatedCampaign) {
      throw new Error("Campaign not found during update");
    }

    await session.commitTransaction();

    logger.info(`💰 Payment verified atomically: ₹${amount} for campaign ${campaignId} by user ${req.user.id}`);

    // Enqueue donation receipt email (async, non-blocking) outside of transaction block since it's just a queue trigger
    try {
      const donor = await User.findById(req.user.id).select('name email');
      if (donor?.email) {
        await addEmailJob('donationReceipt', {
          email: donor.email,
          donorName: donor.name,
          amount,
          campaignTitle: campaignData?.title || 'Campaign',
        });
      }
    } catch (emailErr) {
      logger.warn(`⚠️ Failed to queue donation receipt email: ${emailErr.message}`);
    }

    res.status(200).json({
      message: "Payment verified and donation recorded",
      donation: finalDonation,
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error(`🚨 Transaction Failed: Rolled back donation for ${razorpay_payment_id}`, { error: error.message, stack: error.stack });
    res.status(500);
    throw new Error("Financial transaction failed to process. Please contact support.");
  } finally {
    session.endSession();
  }
});