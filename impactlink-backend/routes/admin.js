const express = require("express");
const { createAdmin, adminLogin, getAdminProfile } = require("../controllers/adminController");
const { verifyToken: authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/createadmin", authMiddleware, createAdmin); // Protected — requires existing admin token
router.post("/login", adminLogin);
router.get("/profile", authMiddleware, getAdminProfile);

module.exports = router;
