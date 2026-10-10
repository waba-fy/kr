const express = require("express");
const Client = require("../models/Client");
const ClientUser = require("../models/ClientUser");
const ClientAnalyticsDaily = require("../models/ClientAnalyticsDaily");
const ClientEvent = require("../models/ClientEvent");
const ClientReport = require("../models/ClientReport");
const { authenticateAdmin } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const { validatePasswordStrength } = require("../utils/password");

const router = express.Router();
router.use(authenticateAdmin, requireRole("Super Admin"));
const normalizeDomain = (value = "") => String(value).trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
const slugify = (value = "") => String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const range = (body) => {
  const to = body.to ? new Date(`${body.to}T23:59:59.999Z`) : new Date();
  const from = body.from ? new Date(`${body.from}T00:00:00.000Z`) : new Date(to.getTime() - 30 * 86400000);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) throw new Error("Please select a valid date range.");
  return { from, to };
};
const sumMetrics = (rows) => rows.reduce((totals, row) => { Object.entries(row.metrics || {}).forEach(([key, value]) => { totals[key] = (totals[key] || 0) + Number(value || 0); }); return totals; }, {});

router.get("/", async (_req, res) => {
  const items = await Client.find().sort({ createdAt: -1 }).lean();
  const userCounts = await ClientUser.aggregate([{ $group: { _id: "$client", count: { $sum: 1 } } }]);
  const counts = Object.fromEntries(userCounts.map((row) => [String(row._id), row.count]));
  res.json({ success: true, data: items.map((item) => ({ ...item, userCount: counts[String(item._id)] || 0 })) });
});
router.post("/", async (req, res) => {
  const name = String(req.body.name || "").trim(); const domain = normalizeDomain(req.body.domain);
  if (!name || !domain) return res.status(400).json({ success: false, message: "Client name and domain are required." });
  const item = await Client.create({ name, domain, slug: slugify(req.body.slug || name), status: req.body.status || "Active", landingPages: req.body.landingPages || [], integrations: req.body.integrations || {}, notes: req.body.notes || "", createdBy: req.admin._id });
  res.status(201).json({ success: true, data: item });
});
router.get("/:id", async (req, res) => {
  const [client, users, analytics, events, reports] = await Promise.all([Client.findById(req.params.id).lean(), ClientUser.find({ client: req.params.id }).lean(), ClientAnalyticsDaily.find({ client: req.params.id }).sort({ date: -1 }).limit(100).lean(), ClientEvent.find({ client: req.params.id }).sort({ createdAt: -1 }).limit(100).lean(), ClientReport.find({ client: req.params.id }).sort({ createdAt: -1 }).lean()]);
  if (!client) return res.status(404).json({ success: false, message: "Client not found." });
  res.json({ success: true, data: { client, users, analytics, events, reports } });
});
router.patch("/:id", async (req, res) => {
  const allowed = ["name", "status", "landingPages", "integrations", "notes"];
  const update = Object.fromEntries(allowed.filter((key) => req.body[key] !== undefined).map((key) => [key, req.body[key]]));
  if (req.body.domain !== undefined) update.domain = normalizeDomain(req.body.domain);
  const item = await Client.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: "Client not found." });
  res.json({ success: true, data: item });
});
router.post("/:id/users", async (req, res) => {
  const validation = validatePasswordStrength(req.body.password);
  if (!validation.isValid) return res.status(400).json({ success: false, message: validation.message });
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ success: false, message: "Client not found." });
  const user = await ClientUser.create({ client: client._id, name: req.body.name, email: req.body.email, password: req.body.password, isActive: true });
  res.status(201).json({ success: true, data: user });
});
router.patch("/:id/users/:userId", async (req, res) => {
  const user = await ClientUser.findOneAndUpdate({ _id: req.params.userId, client: req.params.id }, { isActive: Boolean(req.body.isActive) }, { new: true });
  if (!user) return res.status(404).json({ success: false, message: "Client user not found." });
  res.json({ success: true, data: user });
});
router.post("/:id/analytics", async (req, res) => {
  const client = await Client.findById(req.params.id); if (!client) return res.status(404).json({ success: false, message: "Client not found." });
  const source = req.body.source; const date = new Date(`${req.body.date}T00:00:00.000Z`);
  const landingPageUrl = String(req.body.landingPageUrl || "").trim();
  const item = await ClientAnalyticsDaily.findOneAndUpdate({ client: client._id, date, source, landingPageUrl }, { $set: { metrics: req.body.metrics || {} } }, { new: true, upsert: true, runValidators: true });
  res.json({ success: true, data: item });
});
router.post("/:id/reports/generate", async (req, res) => {
  let dates; try { dates = range(req.body); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
  const client = await Client.findById(req.params.id); if (!client) return res.status(404).json({ success: false, message: "Client not found." });
  const [analytics, eventGroups, eventPageGroups] = await Promise.all([ClientAnalyticsDaily.find({ client: client._id, date: { $gte: dates.from, $lte: dates.to } }).lean(), ClientEvent.aggregate([{ $match: { client: client._id, createdAt: { $gte: dates.from, $lte: dates.to } } }, { $group: { _id: "$name", count: { $sum: 1 } } }, { $sort: { count: -1 } }]), ClientEvent.aggregate([{ $match: { client: client._id, createdAt: { $gte: dates.from, $lte: dates.to } } }, { $group: { _id: "$pageUrl", count: { $sum: 1 } } }, { $sort: { count: -1 } }])]);
  const sources = {}; analytics.forEach((row) => { sources[row.source] = sources[row.source] || []; sources[row.source].push(row); });
  const pageMetrics = {};
  analytics.forEach((row) => { const key = row.landingPageUrl || "Unassigned / client total"; pageMetrics[key] = pageMetrics[key] || []; pageMetrics[key].push(row); });
  const snapshot = { generatedAt: new Date(), client: { name: client.name, domain: client.domain }, totals: { ...sumMetrics(analytics), websiteEvents: eventPageGroups.reduce((total, row) => total + row.count, 0) }, sources: Object.fromEntries(Object.entries(sources).map(([key, rows]) => [key, sumMetrics(rows)])), pageMetrics: Object.fromEntries(Object.entries(pageMetrics).map(([key, rows]) => [key, sumMetrics(rows)])), pageEvents: Object.fromEntries(eventPageGroups.map((row) => [row._id || "Unknown page", row.count])), events: eventGroups.map((row) => ({ name: row._id, count: row.count })), landingPages: client.landingPages };
  const report = await ClientReport.create({ client: client._id, name: req.body.name || `${client.name} performance report`, period: dates, snapshot, summary: req.body.summary || "", status: req.body.status === "Published" ? "Published" : "Draft", createdBy: req.admin._id });
  res.status(201).json({ success: true, data: report });
});
router.patch("/:id/reports/:reportId", async (req, res) => {
  const report = await ClientReport.findOneAndUpdate({ _id: req.params.reportId, client: req.params.id }, { status: req.body.status === "Published" ? "Published" : "Draft" }, { new: true });
  if (!report) return res.status(404).json({ success: false, message: "Client report not found." });
  res.json({ success: true, data: report });
});

module.exports = router;
