const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, default: "", trim: true },
    location: { type: String, default: "Hyderabad / Remote", trim: true },
    employmentType: { type: String, default: "Full Time", trim: true },
    workMode: { type: String, default: "Hybrid", trim: true },
    summary: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    skills: [{ type: String, trim: true }],
    openings: { type: Number, default: 1, min: 1 },
    applicationDeadline: { type: Date, default: null },
    contactEmail: { type: String, default: "", trim: true },
    status: { type: String, enum: ["Draft", "Active", "Closed"], default: "Draft", index: true },
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    slug: { type: String, trim: true, index: true },
    publishedAt: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true, versionKey: false, strict: false }
);

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
