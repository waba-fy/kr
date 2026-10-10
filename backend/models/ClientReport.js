const mongoose = require("mongoose");

const clientReportSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
  name: { type: String, required: true, trim: true },
  period: { from: { type: Date, required: true }, to: { type: Date, required: true } },
  snapshot: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft", index: true },
  summary: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.models.ClientReport || mongoose.model("ClientReport", clientReportSchema);
