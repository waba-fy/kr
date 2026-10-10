const express = require("express");
const ContentEntry = require("../models/ContentEntry");

const router = express.Router();
const allowedSections = new Set([
  "case-studies", "success-stories", "client-stories", "reviews",
  "services", "strategy", "products", "about", "careers", "site-settings",
]);

router.get("/:section", async (req, res, next) => {
  try {
    if (!allowedSections.has(req.params.section)) {
      return res.status(404).json({ success: false, message: "Content section not found." });
    }
    const entries = await ContentEntry.find({ section: req.params.section, isActive: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .select("key title data sortOrder updatedAt")
      .lean();
    return res.json({ success: true, data: entries });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
