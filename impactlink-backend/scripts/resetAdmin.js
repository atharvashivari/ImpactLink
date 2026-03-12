/**
 * Admin Password Reset Script
 * Usage: node scripts/resetAdmin.js <username> <newPassword>
 * 
 * Example: node scripts/resetAdmin.js admin MyNewPassword123
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function resetAdminPassword() {
    const [, , username, newPassword] = process.argv;

    if (!username || !newPassword) {
        console.error('Usage: node scripts/resetAdmin.js <username> <newPassword>');
        process.exit(1);
    }

    if (newPassword.length < 6) {
        console.error('Error: Password must be at least 6 characters.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const Admin = require('../models/Admin');

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            // If no admin exists, create one
            console.log(`No admin found with username "${username}". Creating new admin...`);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const newAdmin = new Admin({ username, password: hashedPassword });
            await newAdmin.save();
            console.log(`✅ Admin "${username}" created successfully!`);
        } else {
            // Reset existing admin's password
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(newPassword, salt);
            // Use updateOne to skip the pre-save hook (which would double-hash)
            await Admin.updateOne({ _id: admin._id }, { password: admin.password });
            console.log(`✅ Password for admin "${username}" has been reset successfully!`);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit(0);
    }
}

resetAdminPassword();
