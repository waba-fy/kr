const express = require("express");
const Client = require("../models/Client");
const ClientUser = require("../models/ClientUser");
const ClientAnalyticsDaily = require("../models/ClientAnalyticsDaily");
const ClientEvent = require("../models/ClientEvent");
const ClientReport = require("../models/ClientReport");
const { signClientToken } = require("../utils/jwt");
const { authenticateClient } = require("../middleware/clientAuthMiddleware");

const router = express.Router();
router.use("/auth", require("./passwordResetRoutes").createPasswordResetRouter("client"));
const safeDomain = (value = "") => String(value).toLowerCase().replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
const activePages = (client) => (client.landingPages || []).filter((page) => page.isActive !== false);
const allowedDomains = (client) => new Set([client.domain, ...activePages(client).map((page) => safeDomain(page.url))].filter(Boolean));
const clientView = (client) => ({ ...client.toObject(), landingPages: activePages(client) });
const dateRange = (query) => {
  const to = query.to ? new Date(`${query.to}T23:59:59.999Z`) : new Date();
  const from = query.from ? new Date(`${query.from}T00:00:00.000Z`) : new Date(to.getTime() - 30 * 86400000);
  return { from, to };
};
const sumMetrics = (rows) => rows.reduce((totals, row) => {
  Object.entries(row.metrics || {}).forEach(([key, value]) => { totals[key] = (totals[key] || 0) + Number(value || 0); });
  return totals;
}, {});

router.post("/auth/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const user = await ClientUser.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(String(req.body.password || "")))) return res.status(401).json({ success: false, message: "Invalid email or password." });
  const client = await Client.findById(user.client);
  if (!user.isActive || !client || client.status !== "Active") return res.status(403).json({ success: false, message: "This client account is inactive." });
  user.lastLoginAt = new Date(); await user.save({ validateBeforeSave: false });
  res.json({ success: true, data: { token: signClientToken(user), user: user.toJSON(), client: clientView(client) } });
});

router.get("/tracker.js", async (req, res) => {
  const client = await Client.findOne({ trackingKey: String(req.query.key || ""), status: "Active" }).select("trackingKey domain");
  if (!client) return res.status(404).type("text/javascript").send("console.warn('KeyRoutes tracker: invalid client key');");
  const endpoint = `${req.protocol}://${req.get("host")}/api/client/events/collect`;
  const script = `(function(){var key=${JSON.stringify(client.trackingKey)},endpoint=${JSON.stringify(endpoint)};var sid=sessionStorage.getItem('kr_sid')||((crypto.randomUUID&&crypto.randomUUID())||(Date.now()+'-'+Math.random()));sessionStorage.setItem('kr_sid',sid);function send(name,metadata){var body=JSON.stringify({trackingKey:key,domain:location.hostname,name:name,pageUrl:location.href,referrer:document.referrer,sessionId:sid,metadata:metadata||{}});if(navigator.sendBeacon){navigator.sendBeacon(endpoint,new Blob([body],{type:'application/json'}));}else{fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true});}}send('page_view');document.addEventListener('click',function(e){var a=e.target.closest('a,button,[data-kr-event]');if(!a)return;var custom=a.getAttribute('data-kr-event'),href=a.getAttribute('href')||'';var name=custom||(href.indexOf('wa.me')>-1||href.indexOf('whatsapp')>-1?'whatsapp_click':href.indexOf('tel:')===0?'phone_click':href.indexOf('mailto:')===0?'email_click':'click');send(name,{text:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,120),href:href});});document.addEventListener('submit',function(e){send(e.target.getAttribute('data-kr-event')||'form_submit',{formId:e.target.id||'',formName:e.target.getAttribute('name')||''});});window.KeyRoutesTrack=send;}());`;
  res.set("Cache-Control", "public, max-age=300").type("text/javascript").send(script);
});

router.post("/events/collect", async (req, res) => {
  const domain = safeDomain(req.body.domain || req.headers.origin || req.headers.referer);
  const query = req.body.trackingKey ? { trackingKey: req.body.trackingKey } : { domain };
  const client = await Client.findOne({ ...query, status: "Active" });
  if (!client) return res.status(404).json({ success: false, message: "Tracking client was not found." });
  const domains = allowedDomains(client);
  if (domain && ![...domains].some((allowed) => domain === allowed || domain.endsWith(`.${allowed}`))) return res.status(403).json({ success: false, message: "Tracking domain does not match this client." });
  await ClientEvent.create({ client: client._id, name: String(req.body.name || "page_view"), pageUrl: String(req.body.pageUrl || ""), referrer: String(req.body.referrer || ""), metadata: req.body.metadata || {}, sessionId: String(req.body.sessionId || ""), ipAddress: String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim() });
  res.status(202).json({ success: true });
});

router.use(authenticateClient);
router.use("/branding", require("./clientBrandingRoutes").createClientBrandingRouter());
router.get("/me", (req, res) => res.json({ success: true, data: { user: req.clientUser, client: clientView(req.client) } }));
router.get("/dashboard", async (req, res) => {
  const { from, to } = dateRange(req.query);
  const requestedDomain = req.query.domain && req.query.domain !== "all" ? safeDomain(req.query.domain) : "";
  const pagePattern = requestedDomain ? new RegExp(`^https?://(www\\.)?${requestedDomain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/|$)`, "i") : null;
  const analyticsMatch = { client: req.client._id, date: { $gte: from, $lte: to }, ...(pagePattern ? { landingPageUrl: pagePattern } : {}) };
  const eventMatch = { client: req.client._id, createdAt: { $gte: from, $lte: to }, ...(pagePattern ? { pageUrl: pagePattern } : {}) };
  const [analytics, events, eventGroups, reports, latestEvent] = await Promise.all([
    ClientAnalyticsDaily.find(analyticsMatch).sort({ date: 1 }).lean(),
    ClientEvent.countDocuments(eventMatch),
    ClientEvent.aggregate([{ $match: eventMatch }, { $group: { _id: "$name", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 20 }]),
    ClientReport.countDocuments({ client: req.client._id, status: "Published" }),
    ClientEvent.findOne(eventMatch).sort({ createdAt: -1 }).select("createdAt").lean(),
  ]);
  const bySource = {};
  analytics.forEach((row) => { bySource[row.source] = bySource[row.source] || []; bySource[row.source].push(row); });
  const pageAnalytics = {};
  analytics.forEach((row) => { const key = row.landingPageUrl || "Unassigned / client total"; pageAnalytics[key] = pageAnalytics[key] || []; pageAnalytics[key].push(row); });
  const pageEventGroups = await ClientEvent.aggregate([{ $match: eventMatch }, { $project: { name: 1, pageUrl: 1, domain: { $regexFind: { input: "$pageUrl", regex: /^https?:\/\/([^/]+)/i } } } }, { $group: { _id: { domain: { $arrayElemAt: ["$domain.captures", 0] }, name: "$name" }, count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
  const domains = {};
  pageEventGroups.forEach((row) => { const domain = String(row._id.domain || "Unknown").replace(/^www\./, ""); domains[domain] = domains[domain] || { totalEvents: 0, events: {} }; domains[domain].totalEvents += row.count; domains[domain].events[row._id.name] = row.count; });
  const latestBySource = Object.fromEntries(Object.entries(bySource).map(([source, rows]) => [source, rows.reduce((latest, row) => !latest || new Date(row.updatedAt) > new Date(latest) ? row.updatedAt : latest, null)]));
  const gaConfigured = activePages(req.client).some((page) => page.googleAnalyticsPropertyId && page.googleMeasurementId);
  const integrationStatus = {
    "google-analytics": { configured: gaConfigured, connected: Boolean(bySource["google-analytics"]?.length), lastSyncAt: latestBySource["google-analytics"] || null },
    "google-ads": { configured: Boolean(req.client.integrations?.googleAdsCustomerId), connected: Boolean(bySource["google-ads"]?.length), lastSyncAt: latestBySource["google-ads"] || null },
    meta: { configured: Boolean(req.client.integrations?.metaAdAccountId), connected: Boolean(bySource.meta?.length), lastSyncAt: latestBySource.meta || null },
    website: { configured: true, connected: events > 0, lastSyncAt: latestEvent?.createdAt || null },
  };
  res.json({ success: true, data: { selectedDomain: requestedDomain || "all", period: { from, to }, totals: { ...sumMetrics(analytics), websiteEvents: events, publishedReports: reports }, sources: Object.fromEntries(Object.entries(bySource).map(([source, rows]) => [source, sumMetrics(rows)])), integrationStatus, pageMetrics: Object.fromEntries(Object.entries(pageAnalytics).map(([url, rows]) => [url, sumMetrics(rows)])), domainEvents: domains, events: eventGroups.map((row) => ({ name: row._id, count: row.count })), timeline: analytics, landingPages: activePages(req.client), integrations: req.client.integrations } });
});
router.get("/reports", async (req, res) => {
  const items = await ClientReport.find({ client: req.client._id, status: "Published" }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

module.exports = router;
