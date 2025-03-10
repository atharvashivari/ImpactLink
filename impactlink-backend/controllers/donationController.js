const Donation = require("../models/Donation");

// Create a donation
exports.createDonation = async (req, res) => {
  try {
    const { campaign, donor, amount, paymentStatus } = req.body;

    if (!campaign || !donor) {
      return res.status(400).json({ error: "Campaign ID and Donor ID are required" });
    }

    const newDonation = new Donation({ campaign, donor, amount, paymentStatus });
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("campaign donor", "title name");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
