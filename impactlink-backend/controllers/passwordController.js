const asyncHandler = require('express-async-handler');
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const { sendPasswordResetEmail } = require("../utils/email");
const logger = require("../utils/logger");

/**
 * POST /api/auth/forgot-password
 * Generates a reset token, saves it, and emails a reset link.
 */
exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
        return res.json({ msg: "If an account with that email exists, a reset link has been sent." });
    }

    // Delete any existing tokens for this user
    await Token.deleteMany({ userId: user._id });

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing (so DB leak doesn't expose tokens)
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save hashed token to DB (expires in 1 hour via TTL index)
    await new Token({
        userId: user._id,
        token: hashedToken,
    }).save();

    // Build the reset URL (points to the frontend)
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password/${user._id}/${resetToken}`;

    // Send the email
    const emailResult = await sendPasswordResetEmail(user.email, resetUrl, user.name);

    logger.info(`📧 Password reset email sent to ${user.email}`);

    res.json({
        msg: "If an account with that email exists, a reset link has been sent.",
        ...(emailResult.previewUrl && { previewUrl: emailResult.previewUrl }),
    });
});

/**
 * POST /api/auth/reset-password/:userId/:token
 * Verifies the token and sets the new password.
 */
exports.resetPassword = asyncHandler(async (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;

    if (!password) {
        res.status(400);
        throw new Error("New password is required");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Hash the incoming token and find it in DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const tokenDoc = await Token.findOne({
        userId,
        token: hashedToken,
    });

    if (!tokenDoc) {
        res.status(400);
        throw new Error("Invalid or expired reset link. Please request a new one.");
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Set new password (pre-save hook will hash it)
    user.password = password;
    await user.save();

    // Delete the used token
    await Token.deleteMany({ userId });

    logger.info(`🔑 Password reset completed for user ${userId}`);

    res.json({ msg: "Password reset successfully! You can now log in." });
});
