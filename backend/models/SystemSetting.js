const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, default: {} },
    encryptedValue: { type: String, default: "", select: false },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.models.SystemSetting || mongoose.model("SystemSetting", systemSettingSchema);
