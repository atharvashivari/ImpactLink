const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Signup
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  let user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  user = new User({ name: name.trim(), email: email.toLowerCase().trim(), password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(201).json({
    msg: "User registered successfully",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

// User Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});
