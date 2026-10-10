const mongoose = require("mongoose");

const clientAnalyticsDailySchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
  date: { type: Date, required: true, index: true },
  source: { type: String, enum: ["google-analytics", "google-ads", "meta", "website", "manual"], required: true },
  landingPageUrl: { type: String, trim: true, default: "", index: true },
  metrics: {
    users: { type: Number, default: 0 }, sessions: { type: Number, default: 0 }, pageViews: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }, impressions: { type: Number, default: 0 }, leads: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }, spend: { type: Number, default: 0 }, revenue: { type: Number, default: 0 },
  },
}, { timestamps: true, versionKey: false });

clientAnalyticsDailySchema.index({ client: 1, date: 1, source: 1, landingPageUrl: 1 }, { unique: true });
module.exports = mongoose.models.ClientAnalyticsDaily || mongoose.model("ClientAnalyticsDaily", clientAnalyticsDailySchema);
