const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Create an Admin (Temporary Route)
exports.createAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const newAdmin = new Admin({ username, password });
  await newAdmin.save();

  res.status(201).json({ message: "Admin created successfully" });
});

// Admin Login
exports.adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, message: "Login successful" });
});

// Get Admin Profile
exports.getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json(admin);
});
