const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

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