const mongoose = require("mongoose");

const consultationLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please enter a valid email address.",
      ],
      index: true,
    },

    countryCode: {
      type: String,
      default: "+91",
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    fullPhone: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    pageUrl: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "Website Consultation Popup",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Closed",
      ],
      default: "New",
    },

    notes: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

consultationLeadSchema.pre("validate", function () {
  this.countryCode = String(
    this.countryCode || "+91"
  ).trim();

  this.phone = String(this.phone || "")
    .replace(/\D/g, "")
    .trim();

  if (!this.fullPhone && this.phone) {
    this.fullPhone = `${this.countryCode}${this.phone}`;
  }
});

consultationLeadSchema.index({
  createdAt: -1,
});

module.exports =
  mongoose.models.ConsultationLead ||
  mongoose.model(
    "ConsultationLead",
    consultationLeadSchema
  );