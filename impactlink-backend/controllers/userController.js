const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, bio, phone, avatar } = req.body;

        // Only allow updating specific fields
        const updates = {};
        if (name !== undefined) updates.name = name.trim();
        if (bio !== undefined) updates.bio = bio.trim();
        if (phone !== undefined) updates.phone = phone.trim();
        if (avatar !== undefined) updates.avatar = avatar.trim();

        if (updates.name !== undefined && updates.name.length === 0) {
            return res.status(400).json({ error: "Name cannot be empty" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ msg: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current password and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: "New password must be at least 6 characters" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

        // Set new password (pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        res.json({ msg: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Update user settings
exports.updateSettings = async (req, res) => {
    try {
        const { emailNotifications, darkMode } = req.body;

        const settings = {};
        if (emailNotifications !== undefined) settings["settings.emailNotifications"] = emailNotifications;
        if (darkMode !== undefined) settings["settings.darkMode"] = darkMode;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: settings },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ msg: "Settings updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required to delete your account" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

        await User.findByIdAndDelete(req.user.id);
        res.json({ msg: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
