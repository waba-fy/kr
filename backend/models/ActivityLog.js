const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true, index: true },
    action: { type: String, required: true, trim: true },
    module: { type: String, required: true, trim: true, index: true },
    targetId: { type: String, default: "" },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
