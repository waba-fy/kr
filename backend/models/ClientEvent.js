const mongoose = require("mongoose");

const clientEventSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 80, index: true },
  pageUrl: { type: String, trim: true, default: "" },
  referrer: { type: String, trim: true, default: "" },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  sessionId: { type: String, trim: true, default: "" },
  ipAddress: { type: String, select: false, default: "" },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.models.ClientEvent || mongoose.model("ClientEvent", clientEventSchema);
