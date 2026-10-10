const express = require("express");
const SystemSetting = require("../models/SystemSetting");
const Job = require("../models/Job");

const router = express.Router();

router.get("/site", async (_req, res) => {
  const setting = await SystemSetting.findOne({ key: "site" }).lean();
  const value = setting?.value || {};
  res.json({ success: true, data: value });
});

router.get("/jobs", async (_req, res) => {
  const jobs = await Job.find({ status: "Active" }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: jobs });
});

module.exports = router;
