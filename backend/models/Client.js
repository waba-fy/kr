const mongoose = require("mongoose");
const crypto = require("crypto");

const landingPageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  googleAnalyticsPropertyId: { type: String, trim: true, default: "" },
  googleMeasurementId: { type: String, trim: true, default: "" },
  isActive: { type: Boolean, default: true },
}, { _id: true });

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  domain: { type: String, required: true, lowercase: true, trim: true, index: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
  trackingKey: { type: String, unique: true, default: () => crypto.randomBytes(18).toString("hex") },
  landingPages: { type: [landingPageSchema], default: [] },
  integrations: {
    googleAdsCustomerId: { type: String, trim: true, default: "" },
    metaAdAccountId: { type: String, trim: true, default: "" },
  },
  contactName: { type: String, default: "", trim: true, maxlength: 120 },
  contactEmail: { type: String, default: "", trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, default: "", trim: true, maxlength: 30 },
  whatsapp: { type: String, default: "", trim: true, maxlength: 30 },
  address: { type: String, default: "", trim: true, maxlength: 500 },
  profileUpdatedAt: { type: Date, default: null },
  profileUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "ClientUser", default: null },
  logoUrl: { type: String, default: "", maxlength: 2800000 },
  notes: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.models.Client || mongoose.model("Client", clientSchema);
