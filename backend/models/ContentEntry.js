const mongoose = require("mongoose");

const contentEntrySchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: [
        "case-studies", "success-stories", "client-stories", "reviews",
        "services", "strategy", "products", "about", "careers", "site-settings",
      ],
      index: true,
    },
    key: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 250 },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
    version: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true, versionKey: false }
);

contentEntrySchema.index({ section: 1, key: 1 }, { unique: true });
contentEntrySchema.index({ section: 1, isActive: 1, sortOrder: 1 });

module.exports = mongoose.models.ContentEntry || mongoose.model("ContentEntry", contentEntrySchema);
