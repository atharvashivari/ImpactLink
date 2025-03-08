const express = require("express");
const { createAdmin, adminLogin, getAdminProfile } = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth"); // To protect routes

const router = express.Router();

router.post("/createadmin", createAdmin); // One-time admin creation
router.post("/login", adminLogin);
router.get("/profile", authMiddleware, getAdminProfile); // Protected route

module.exports = router;
