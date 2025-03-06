const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", DonationSchema);
