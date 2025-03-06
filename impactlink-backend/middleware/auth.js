const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("⛔ No Authorization header or incorrect format");
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token
  console.log("🔑 Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Verified:", decoded);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.log("❌ Token Verification Failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
