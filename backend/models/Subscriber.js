const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please enter a valid email address.",
      ],
    },

    name: {
      type: String,
      trim: true,
      default: "",
      maxlength: [120, "Name cannot exceed 120 characters."],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [30, "Phone number cannot exceed 30 characters."],
    },

    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: [150, "Company name cannot exceed 150 characters."],
    },

    source: {
      type: String,
      enum: [
        "Website",
        "Newsletter Form",
        "Contact Form",
        "Manual",
        "Import",
        "Other",
      ],
      default: "Newsletter Form",
      index: true,
    },

    pageUrl: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Page URL cannot exceed 500 characters."],
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Unsubscribed",
        "Blocked",
        "Pending",
      ],
      default: "Active",
      index: true,
    },

    consentGiven: {
      type: Boolean,
      default: true,
    },

    consentSource: {
      type: String,
      trim: true,
      default: "Website Footer",
    },

    consentAt: {
      type: Date,
      default: Date.now,
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    unsubscribedAt: {
      type: Date,
      default: null,
    },

    ipAddress: {
      type: String,
      trim: true,
      default: "",
    },

    userAgent: {
      type: String,
      trim: true,
      default: "",
    },

    lastEmailSentAt: {
      type: Date,
      default: null,
    },

    totalEmailsSent: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalEmailsOpened: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalLinksClicked: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Notes cannot exceed 2000 characters."],
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
subscriberSchema.index({
  status: 1,
  source: 1,
  subscribedAt: -1,
});

/*
|--------------------------------------------------------------------------
| Automatically handle unsubscribe dates
|--------------------------------------------------------------------------
*/

subscriberSchema.pre("save", function () {
  if (!this.isModified("status")) {
    return;
  }

  if (this.status === "Unsubscribed") {
    this.unsubscribedAt =
      this.unsubscribedAt || new Date();
  } else {
    this.unsubscribedAt = null;
  }
});

/*
|--------------------------------------------------------------------------
| Remove internal fields
|--------------------------------------------------------------------------
*/

subscriberSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret._id;
    return ret;
  },
});

const Subscriber =
  mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;