const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passwordController = require("../controllers/passwordController");

// User Signup
router.post("/signup", authController.signup);

// User Login
router.post("/login", authController.login);

// Forgot Password — generates reset token and emails link
router.post("/forgot-password", passwordController.forgotPassword);

// Reset Password — verifies token and sets new password
router.post("/reset-password/:userId/:token", passwordController.resetPassword);

module.exports = router;
