const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Verify Token
router.post("/verify", (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, msg: "Invalid token" });
  }
});

module.exports = router;
