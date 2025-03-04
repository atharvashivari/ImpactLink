const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true }, // ✅ Ensure `ref: "Campaign"`
    transactionId: { type: String, required: true },
    status: { type: String, enum: ["success", "pending", "failed"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
