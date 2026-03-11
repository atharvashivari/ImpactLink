const asyncHandler = require('express-async-handler');
const Query = require("../models/Contact");

// Handle submitting a new query
exports.submitQuery = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const query = new Query({ name, email, message });
  await query.save();
  res.status(201).json({ msg: "Query submitted successfully", query });
});

// Fetch all queries
exports.getAllQueries = asyncHandler(async (req, res) => {
  const queries = await Query.find();
  res.json(queries);
});
