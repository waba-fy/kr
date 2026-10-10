const express = require("express");
const path = require("path");
const Admin = require("../models/Admin");
const ContentEntry = require("../models/ContentEntry");
const ConsultationLead = require("../models/ConsultationLead");
const Subscriber = require("../models/Subscriber");
const CareerApplication = require("../models/CareerApplication");
const EmailLog = require("../models/EmailLog");
const ActivityLog = require("../models/ActivityLog");
const SupportReport = require("../models/SupportReport");
const Job = require("../models/Job");
const SystemSetting = require("../models/SystemSetting");
const mailGateway = require("../config/mail");
const { encrypt } = require("../utils/encryption");
const GeneratedReport = require("../models/GeneratedReport");
const Client = require("../models/Client");
const { authenticateAdmin } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const { signAccessToken } = require("../utils/jwt");
const { validatePasswordStrength } = require("../utils/password");

const router = express.Router();
router.use("/auth", require("./passwordResetRoutes").createPasswordResetRouter("admin"));
const loginAttempts = new Map();
const loginThrottle = (req, res, next) => {
  const key = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const current = loginAttempts.get(key) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > current.resetAt) { current.count = 0; current.resetAt = now + 15 * 60 * 1000; }
  current.count += 1;
  loginAttempts.set(key, current);
  if (current.count > 10) return res.status(429).json({ success: false, message: "Too many login attempts. Please try again later." });
  return next();
};
const pageValues = (query) => ({
  page: Math.max(1, Number(query.page) || 1),
  limit: Math.min(100, Math.max(1, Number(query.limit) || 20)),
});
const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const audit = (req, action, module, targetId = "", details = {}) =>
  ActivityLog.create({
    admin: req.admin._id, action, module, targetId: String(targetId), details,
    ipAddress: String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim(),
  }).catch((error) => console.error("Activity log error:", error.message));

router.post("/auth/login", loginThrottle, async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }
  if (!admin.isActive) {
    return res.status(403).json({ success: false, message: "This admin account is inactive." });
  }
  admin.lastLoginAt = new Date();
  await admin.save({ validateBeforeSave: false });
  const safeAdmin = admin.toJSON();
  loginAttempts.delete(String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim());
  return res.json({ success: true, data: { token: signAccessToken(admin), admin: safeAdmin } });
});

router.use(authenticateAdmin);
router.get("/auth/me", (req, res) => res.json({ success: true, data: req.admin }));

router.get("/dashboard", async (_req, res) => {
  const [leads, subscribers, applications, reports, jobs, content, admins, sent, opened, clicked, clientTotal, clientActive, clientInactive, pageRows] = await Promise.all([
    ConsultationLead.countDocuments(), Subscriber.countDocuments(), CareerApplication.countDocuments(),
    SupportReport.countDocuments(),
    Job.countDocuments({ status: "Active" }),
    ContentEntry.countDocuments(), Admin.countDocuments({ isActive: true }), EmailLog.countDocuments({ status: "Sent" }),
    EmailLog.countDocuments({ openedAt: { $ne: null } }), EmailLog.countDocuments({ clickedAt: { $ne: null } }),
    Client.countDocuments(), Client.countDocuments({ status: "Active" }), Client.countDocuments({ status: "Inactive" }),
    Client.aggregate([{ $project: { count: { $size: { $ifNull: ["$landingPages", []] } } } }, { $group: { _id: null, total: { $sum: "$count" } } }]),
  ]);
  const [ticketCount, templateCount, unsubscribedCount, pendingInvoiceCount] = await Promise.all([
    require("../models/SupportTicket").countDocuments(), require("../models/MarketingTemplate").countDocuments(), Subscriber.countDocuments({ status: "Unsubscribed" }), require("../models/Invoice").countDocuments({ status: "Pending" }),
  ]);
  res.json({ success: true, data: { ticketCount, templateCount, unsubscribedCount, pendingInvoiceCount, leads, subscribers, applications, reports, jobs, content, admins, clients: { total: clientTotal, active: clientActive, inactive: clientInactive, landingPages: pageRows[0]?.total || 0 }, emails: { sent, opened, clicked } } });
});

router.get("/admins", requireRole("Super Admin"), async (_req, res) => {
  const items = await Admin.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});
router.post("/admins", requireRole("Super Admin"), async (req, res) => {
  const validation = validatePasswordStrength(req.body?.password);
  if (!validation.isValid) return res.status(400).json({ success: false, message: validation.message });
  const admin = await Admin.create({
    name: req.body.name, email: String(req.body.email || "").toLowerCase(), password: req.body.password,
    phone: req.body.phone || "", role: req.body.role === "Super Admin" ? "Super Admin" : "Admin",
    permissions: req.body.permissions || [], createdBy: req.admin._id,
  });
  await audit(req, "create", "admins", admin._id);
  res.status(201).json({ success: true, data: admin });
});
router.patch("/admins/:id", requireRole("Super Admin"), async (req, res) => {
  if (String(req.params.id) === String(req.admin._id) && req.body.isActive === false) {
    return res.status(400).json({ success: false, message: "You cannot disable your own account." });
  }
  const allowed = ["name", "phone", "role", "permissions", "isActive"];
  const update = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.includes(key)));
  const admin = await Admin.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!admin) return res.status(404).json({ success: false, message: "Admin not found." });
  await audit(req, "update", "admins", admin._id, update);
  res.json({ success: true, data: admin });
});

router.get("/content", async (req, res) => {
  const query = req.query.section ? { section: req.query.section } : {};
  const items = await ContentEntry.find(query).sort({ section: 1, sortOrder: 1, createdAt: 1 }).lean();
  res.json({ success: true, data: items });
});
router.post("/content", async (req, res) => {
  const item = await ContentEntry.create({ ...req.body, createdBy: req.admin._id, updatedBy: req.admin._id });
  await audit(req, "create", "content", item._id, { section: item.section, key: item.key });
  res.status(201).json({ success: true, data: item });
});
router.patch("/content/:id", async (req, res) => {
  const current = await ContentEntry.findById(req.params.id);
  if (!current) return res.status(404).json({ success: false, message: "Content item not found." });
  ["title", "data", "isActive", "sortOrder"].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) current[key] = req.body[key];
  });
  current.version += 1;
  current.updatedBy = req.admin._id;
  await current.save();
  await audit(req, "update", "content", current._id, { section: current.section, key: current.key });
  res.json({ success: true, data: current });
});

router.get("/jobs/manage", async (_req, res) => {
  const items = await Job.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});
router.post("/jobs/manage", async (req, res) => {
  const item = await Job.create({ ...req.body, createdBy: req.admin._id, updatedBy: req.admin._id, publishedAt: req.body.status === "Active" ? new Date() : null });
  await audit(req, "create", "jobs", item._id);
  res.status(201).json({ success: true, data: item });
});
router.patch("/jobs/manage/:id", async (req, res) => {
  const allowed = ["title", "department", "location", "employmentType", "workMode", "summary", "description", "skills", "openings", "applicationDeadline", "contactEmail", "status", "isFeatured", "displayOrder"];
  const update = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.includes(key)));
  if (update.status === "Active") update.publishedAt = new Date();
  const item = await Job.findByIdAndUpdate(req.params.id, { ...update, updatedBy: req.admin._id }, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: "Job not found." });
  await audit(req, "update", "jobs", item._id, update);
  res.json({ success: true, data: item });
});

router.get("/settings/manage", requireRole("Super Admin"), async (_req, res) => {
  const [site, email] = await Promise.all([
    SystemSetting.findOne({ key: "site" }).lean(),
    SystemSetting.findOne({ key: "email" }).lean(),
  ]);
  const mailDefaults = await mailGateway.getMailConfig();
  res.json({ success: true, data: {
    site: site?.value || {},
    email: { smtpHost: email?.value?.smtpHost || mailDefaults.host || "", smtpPort: email?.value?.smtpPort || mailDefaults.port || 465, smtpSecure: email?.value?.smtpSecure ?? mailDefaults.secure, smtpUser: email?.value?.smtpUser || mailDefaults.user || "", fromName: email?.value?.fromName || mailDefaults.fromName || "", fromEmail: email?.value?.fromEmail || mailDefaults.fromEmail || "", adminEmail: email?.value?.adminEmail || mailDefaults.adminEmail || "", passwordConfigured: Boolean(process.env.SMTP_PASS || email) },
  }});
});
router.patch("/settings/site", requireRole("Super Admin"), async (req, res) => {
  const allowed = [
    "companyName", "legalName", "websiteUrl", "supportEmail", "phone", "whatsapp",
    "address", "city", "region", "postalCode", "country", "facebook", "instagram",
    "linkedin", "youtube", "x", "defaultTitle", "defaultDescription", "defaultOgImage",
    "googleTagManagerId", "googleAnalyticsId", "searchConsoleVerification", "robotsIndex",
  ];
  const value = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.includes(key)).map(([key, item]) => [key, typeof item === "boolean" ? item : String(item || "").trim()]));
  const setting = await SystemSetting.findOneAndUpdate({ key: "site" }, { value, updatedBy: req.admin._id }, { new: true, upsert: true, runValidators: true });
  await audit(req, "update", "site-settings", setting._id, value);
  res.json({ success: true, data: setting.value });
});
router.patch("/settings/email", requireRole("Super Admin"), async (req, res) => {
  const value = {
    smtpHost: String(req.body.smtpHost || "").trim(), smtpPort: Number(req.body.smtpPort || 465),
    smtpSecure: Boolean(req.body.smtpSecure), smtpUser: String(req.body.smtpUser || "").trim(),
    fromName: String(req.body.fromName || "KeyRoutes").trim(), fromEmail: String(req.body.fromEmail || "").trim().toLowerCase(),
    adminEmail: String(req.body.adminEmail || "").trim().toLowerCase(),
  };
  const update = { value, updatedBy: req.admin._id };
  if (req.body.smtpPassword) update.encryptedValue = encrypt(req.body.smtpPassword);
  const setting = await SystemSetting.findOneAndUpdate({ key: "email" }, update, { new: true, upsert: true, runValidators: true });
  await audit(req, "update", "email-settings", setting._id, { ...value, smtpPassword: req.body.smtpPassword ? "changed" : "unchanged" });
  res.json({ success: true, data: { ...setting.value, passwordConfigured: true } });
});

const statusCounts = async (Model, match) => {
  const rows = await Model.aggregate([{ $match: match }, { $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
  return Object.fromEntries(rows.map((row) => [row._id || "Unknown", row.count]));
};

router.get("/reports/generated", async (_req, res) => {
  const items = await GeneratedReport.find().populate("createdBy", "name email").sort({ createdAt: -1 }).limit(100).lean();
  res.json({ success: true, data: items });
});
router.post("/reports/generate", async (req, res) => {
  const to = req.body.to ? new Date(`${req.body.to}T23:59:59.999Z`) : new Date();
  const from = req.body.from ? new Date(`${req.body.from}T00:00:00.000Z`) : new Date(to.getTime() - 30 * 86400000);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) return res.status(400).json({ success: false, message: "Please select a valid report date range." });
  const created = { createdAt: { $gte: from, $lte: to } };
  const [leadStatuses, subscriberStatuses, careerStatuses, supportStatuses, emailsSent, emailsOpened, emailsClicked, contentActive, jobsActive] = await Promise.all([
    statusCounts(ConsultationLead, created), statusCounts(Subscriber, created), statusCounts(CareerApplication, created), statusCounts(SupportReport, created),
    EmailLog.countDocuments({ ...created, status: "Sent" }), EmailLog.countDocuments({ ...created, openedAt: { $ne: null } }), EmailLog.countDocuments({ ...created, clickedAt: { $ne: null } }),
    ContentEntry.countDocuments({ isActive: true }), Job.countDocuments({ status: "Active" }),
  ]);
  const sum = (values) => Object.values(values).reduce((total, value) => total + value, 0);
  const snapshot = {
    generatedAt: new Date(), period: { from, to },
    totals: { leads: sum(leadStatuses), subscribers: sum(subscriberStatuses), careerApplications: sum(careerStatuses), supportReports: sum(supportStatuses), emailsSent, emailsOpened, emailsClicked, activeContent: contentActive, activeJobs: jobsActive },
    breakdowns: { leads: leadStatuses, subscribers: subscriberStatuses, careers: careerStatuses, supportReports: supportStatuses },
    rates: { leadConversion: sum(leadStatuses) ? Number((((leadStatuses.Converted || 0) / sum(leadStatuses)) * 100).toFixed(2)) : 0, emailOpen: emailsSent ? Number(((emailsOpened / emailsSent) * 100).toFixed(2)) : 0, emailClick: emailsSent ? Number(((emailsClicked / emailsSent) * 100).toFixed(2)) : 0 },
  };
  let saved = null;
  const reportName = typeof req.body.name === "string" ? req.body.name.trim() : "";
  if (reportName.length > 200) return res.status(400).json({ success: false, message: "Report name must be at most 200 characters." });
  if (req.body.save) saved = await GeneratedReport.create({ name: reportName || `Management Report ${from.toISOString().slice(0,10)} to ${to.toISOString().slice(0,10)}`, period: { from, to }, snapshot, createdBy: req.admin._id });
  await audit(req, req.body.save ? "generate-and-save" : "generate", "management-reports", saved?._id || "", { from, to });
  res.status(req.body.save ? 201 : 200).json({ success: true, data: snapshot, saved });
});
router.delete("/reports/generated/:id", requireRole("Super Admin"), async (req, res) => {
  const item = await GeneratedReport.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Saved report not found." });
  await audit(req, "delete", "management-reports", item._id);
  res.json({ success: true, message: "Saved report deleted." });
});
router.post("/settings/email/test", requireRole("Super Admin"), async (_req, res) => {
  await mailGateway.verify();
  res.json({ success: true, message: "SMTP connection verified successfully." });
});

const resources = {
  leads: { model: ConsultationLead, search: ["name", "email", "phone", "company"], statuses: ["New", "Contacted", "Qualified", "Converted", "Closed"] },
  subscribers: { model: Subscriber, search: ["name", "email", "company"], statuses: ["Active", "Unsubscribed", "Blocked", "Pending"] },
  careers: { model: CareerApplication, search: ["name", "email", "phone", "role"], statuses: ["New", "Reviewed", "Shortlisted", "Interview", "Rejected", "Hired"] },
  reports: { model: SupportReport, search: ["name", "email", "issueType", "description"], statuses: ["New", "In Progress", "Resolved", "Closed"] },
};

router.get("/:resource", async (req, res, next) => {
  if (!resources[req.params.resource]) return next();
  const config = resources[req.params.resource];
  const { page, limit } = pageValues(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "i");
    query.$or = config.search.map((field) => ({ [field]: regex }));
  }
  const [items, total] = await Promise.all([
    config.model.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    config.model.countDocuments(query),
  ]);
  res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});
router.patch("/:resource/:id", async (req, res, next) => {
  if (!resources[req.params.resource]) return next();
  const config = resources[req.params.resource];
  const update = {};
  if (req.body.status) {
    if (!config.statuses.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid status." });
    update.status = req.body.status;
  }
  if (typeof req.body.notes === "string") update.notes = req.body.notes;
  if (req.params.resource === "subscribers" && update.status) {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: "Record not found." });
    const Preference = require("../models/MarketingPreference");
    if (update.status === "Active" && await Preference.exists({ email: subscriber.email, unsubscribedAt: { $ne: null } })) return res.status(409).json({ success: false, message: "This recipient opted out of marketing. Their preference cannot be overridden here." });
    if (update.status === "Unsubscribed") {
      await require("../services/marketingPreferences").unsubscribeUrl(subscriber.email);
      await Preference.updateOne({ email: subscriber.email }, { $set: { unsubscribedAt: new Date() } });
      update.unsubscribedAt = new Date(); update.consentGiven = false;
    }
  }
  const item = await config.model.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: "Record not found." });
  await audit(req, "update", req.params.resource, item._id, update);
  res.json({ success: true, data: item });
});
router.delete("/:resource/:id", requireRole("Super Admin"), async (req, res, next) => {
  if (!["leads", "subscribers", "reports"].includes(req.params.resource)) return next();
  const item = await resources[req.params.resource].model.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Record not found." });
  await audit(req, "delete", req.params.resource, item._id, { email: item.email });
  res.json({ success: true, message: "Record permanently deleted." });
});

router.get("/emails/logs", async (req, res) => {
  const { page, limit } = pageValues(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.type) query.type = req.query.type;
  const [items, total] = await Promise.all([
    EmailLog.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    EmailLog.countDocuments(query),
  ]);
  res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});
router.get("/activity", requireRole("Super Admin"), async (_req, res) => {
  const items = await ActivityLog.find().populate("admin", "name email").sort({ createdAt: -1 }).limit(200).lean();
  res.json({ success: true, data: items });
});
router.get("/careers/:id/resume", async (req, res) => {
  const item = await CareerApplication.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ success: false, message: "Application not found." });
  const absolute = path.resolve(item.resumePath);
  res.download(absolute, item.resumeOriginalName);
});

module.exports = router;
