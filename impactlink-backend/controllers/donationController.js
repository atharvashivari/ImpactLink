const asyncHandler = require('express-async-handler');
const Donation = require("../models/Donation");

// Create a donation
exports.createDonation = asyncHandler(async (req, res) => {
  const { campaign, amount, paymentStatus } = req.body;
  const donor = req.user.id;

  if (!campaign) {
    res.status(400);
    throw new Error("Campaign ID is required");
  }

  const newDonation = new Donation({ campaign, donor, amount, paymentStatus });
  await newDonation.save();
  res.status(201).json(newDonation);
});

// Get all donations
exports.getAllDonations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  const donations = await Donation.find()
    .skip(skip)
    .limit(limit)
    .populate("campaign donor", "title name");
  res.json(donations);
});
