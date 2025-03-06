const Query = require("../models/Contact");

// Handle submitting a new query
exports.submitQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const query = new Query({ name, email, message });
    await query.save();
    res.status(201).json({ msg: "Query submitted successfully", query });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Fetch all queries
exports.getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
