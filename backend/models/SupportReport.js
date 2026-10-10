const mongoose = require("mongoose");

const supportReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    issueType: { type: String, required: true, trim: true },
    issueTypeCode: { type: String, required: true, trim: true, index: true },
    pageUrl: { type: String, default: "", maxlength: 2000 },
    description: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: ["New", "In Progress", "Resolved", "Closed"], default: "New", index: true },
    notes: { type: String, default: "", maxlength: 3000 },
    emailStatus: { admin: { type: Boolean, default: false }, customer: { type: Boolean, default: false } },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.models.SupportReport || mongoose.model("SupportReport", supportReportSchema);
