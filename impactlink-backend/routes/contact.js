const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Submit a query
router.post("/", contactController.submitQuery);

// Get all queries
router.get("/", contactController.getAllQueries);

module.exports = router;
