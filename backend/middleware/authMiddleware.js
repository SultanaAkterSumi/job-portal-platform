const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ── Any logged-in user ──
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ── Only employer ──
const employerOnly = (req, res, next) => {
  if (req.user?.role !== "employer") {
    return res.status(403).json({ message: "Employer access only" });
  }
  next();
};

// ── Only jobseeker ──
const seekerOnly = (req, res, next) => {
  if (req.user?.role !== "jobseeker") {
    return res.status(403).json({ message: "Job seeker access only" });
  }
  next();
};

module.exports = { protect, employerOnly, seekerOnly };
