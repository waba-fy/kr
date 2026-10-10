const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    html: { type: String, default: "", select: false },
    text: { type: String, default: "", select: false },
    marketing: { type: Boolean, default: false },
    canResend: { type: Boolean, default: false },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    type: {
      type: String,
      enum: [
        "Consultation",
        "Newsletter",
        "General",
        "Career",
      ],
      default: "General",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Sent",
        "Failed",
      ],
      default: "Pending",
      index: true,
    },

    errorMessage: {
      type: String,
      default: "",
      maxlength: 3000,
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },

    messageId: { type: String, default: "", trim: true },
    trackingToken: { type: String, unique: true, sparse: true, index: true },
    openedAt: { type: Date, default: null, index: true },
    openCount: { type: Number, default: 0, min: 0 },
    lastOpenedAt: { type: Date, default: null },
    clickedAt: { type: Date, default: null, index: true },
    clickCount: { type: Number, default: 0, min: 0 },
    lastClickedAt: { type: Date, default: null },
    lastClickedUrl: { type: String, default: "", maxlength: 2000 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

emailLogSchema.index({
  type: 1,
  status: 1,
  createdAt: -1,
});

emailLogSchema.index({
  to: 1,
  createdAt: -1,
});

const EmailLog =
  mongoose.models.EmailLog ||
  mongoose.model(
    "EmailLog",
    emailLogSchema
  );

module.exports = EmailLog;
