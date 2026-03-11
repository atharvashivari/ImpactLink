const asyncHandler = require('express-async-handler');
const User = require("../models/User");

// Get user profile
exports.getProfile = asyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
        return res.json({ _id: req.user.id, name: "Admin (Platform)", email: "admin@impactlink.com", role: "admin", avatar: "" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json(user);
});

// Update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
        res.status(403);
        throw new Error("Admins cannot update their profile via this user portal");
    }

    const { name, bio, phone, avatar } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (bio !== undefined) updates.bio = bio.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (avatar !== undefined) updates.avatar = avatar.trim();

    if (updates.name !== undefined && updates.name.length === 0) {
        res.status(400);
        throw new Error("Name cannot be empty");
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json({ msg: "Profile updated successfully", user });
});

// Change password
exports.changePassword = asyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
        res.status(403);
        throw new Error("Admins cannot change their password via this user portal");
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error("Current password and new password are required");
    }

    if (newPassword.length < 6) {
        res.status(400);
        throw new Error("New password must be at least 6 characters");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        res.status(400);
        throw new Error("Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    res.json({ msg: "Password changed successfully" });
});

// Update user settings
exports.updateSettings = asyncHandler(async (req, res) => {
    const { emailNotifications, darkMode } = req.body;

    const settings = {};
    if (emailNotifications !== undefined) settings["settings.emailNotifications"] = emailNotifications;
    if (darkMode !== undefined) settings["settings.darkMode"] = darkMode;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: settings },
        { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json({ msg: "Settings updated successfully", user });
});

// Delete user account
exports.deleteAccount = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
        res.status(400);
        throw new Error("Password is required to delete your account");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Incorrect password");
    }

    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: "Account deleted successfully" });
});
