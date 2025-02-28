const express = require("express");
const router = express.Router();
const Query = require("../models/Query");

// Submit a query
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const query = new Query({ name, email, message });
    await query.save();
    res.status(201).json({ msg: "Query submitted successfully", query });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all queries
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
