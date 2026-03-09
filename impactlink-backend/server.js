const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

// ─── Security Middleware ───────────────────────────────────────
app.use(helmet()); // Sets various HTTP security headers
app.use(mongoSanitize()); // Prevents NoSQL injection attacks

// CORS — allow multiple possible frontend origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(express.urlencoded({ extended: true }));

// Rate limiter — general (100 requests per 15 min per IP)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// Stricter rate limiter for auth routes (15 requests per 15 min)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again after 15 minutes." },
});

// ─── Import Routes ─────────────────────────────────────────────
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaign");
const donationRoutes = require("./routes/donation");
const paymentRoutes = require("./routes/payment");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/admin");
const admindashRoutes = require("./routes/admindash");
const userRoutes = require("./routes/user");

// ─── Use Routes ────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", generalLimiter, donationRoutes);
app.use("/api/payments", generalLimiter, paymentRoutes);
app.use("/api/contact", generalLimiter, contactRoutes);
app.use("/api", generalLimiter, dashboardRoutes);
app.use("/api/admin", generalLimiter, adminRoutes);
app.use("/api/admin/dashboard", generalLimiter, admindashRoutes);
app.use("/api/user", generalLimiter, userRoutes);

// ─── 404 Catch-all ─────────────────────────────────────────────
app.use("*", (req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: "Not Found" });
});

// ─── MongoDB Connection ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB`);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(`❌ Error connecting to MongoDB: ${err}`));
