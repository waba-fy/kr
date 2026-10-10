const mongoose = require("mongoose");

const generatedReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    period: { from: { type: Date, required: true }, to: { type: Date, required: true } },
    snapshot: { type: mongoose.Schema.Types.Mixed, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.models.GeneratedReport || mongoose.model("GeneratedReport", generatedReportSchema);
