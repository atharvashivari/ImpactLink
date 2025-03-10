const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    backers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, amount: Number }],
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
    image: { type: String, required: true }, // Storing the image URL
    startDate: { type: Date, required: true }, // Add startDate
    endDate: { type: Date, required: true }, // Add endDate
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
