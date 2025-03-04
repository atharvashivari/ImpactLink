const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Access Denied" });

    try {
        const tokenWithoutBearer = token.split(" ")[1]; // Remove 'Bearer'
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token" });
    }
};

module.exports = verifyToken;
