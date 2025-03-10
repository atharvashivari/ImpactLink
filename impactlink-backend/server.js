require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse form data

// Import routes
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaign");
const donationRoutes = require("./routes/donation");
const paymentRoutes = require("./routes/payment");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/admin");
const admindashRoutes = require("./routes/admindash");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/dashboard", admindashRoutes);


// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect("mongodb+srv://shivariatharva:h2D!mBGsR_GN4uV@impactlink.098zc.mongodb.net/impactlink", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`✅ Connected to MongoDB`);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(`❌ Error connecting to MongoDB: ${err}`));

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

// Example of protecting a route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ msg: "Protected data" });
});

app.use("*", (req, res) => {
    console.log(`404 Not Found: ${req.originalUrl}`);
    res.status(404).json({ error: "Not Found" });
  });


  
  