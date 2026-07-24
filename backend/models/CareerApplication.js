const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters."],
      maxlength: [120, "Name cannot exceed 120 characters."],
    },

    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email address cannot exceed 150 characters."],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please enter a valid email address.",
      ],
      index: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters."],
    },

    role: {
      type: String,
      required: [true, "Role is required."],
      trim: true,
      enum: {
        values: [
          "Digital Marketing Executive",
          "Frontend Developer",
          "Business Development Executive",
          "Internship",
          "Other",
        ],
        message: "Please select a valid role.",
      },
      index: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [3000, "Message cannot exceed 3000 characters."],
    },

    resumeOriginalName: {
      type: String,
      required: [true, "Resume filename is required."],
      trim: true,
      maxlength: [255, "Resume filename is too long."],
    },

    resumeStoredName: {
      type: String,
      required: [true, "Stored resume filename is required."],
      trim: true,
      maxlength: [255, "Stored resume filename is too long."],
    },

    resumePath: {
      type: String,
      required: [true, "Resume path is required."],
      trim: true,
      maxlength: [1000, "Resume path is too long."],
    },

    resumeMimeType: {
      type: String,
      required: [true, "Resume file type is required."],
      trim: true,
      enum: {
        values: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        message: "Unsupported resume file type.",
      },
    },

    resumeSize: {
      type: Number,
      required: [true, "Resume file size is required."],
      min: [1, "Resume file cannot be empty."],
    },

    status: {
      type: String,
      enum: {
        values: [
          "New",
          "Reviewed",
          "Shortlisted",
          "Interview",
          "Rejected",
          "Hired",
        ],
        message: "Invalid application status.",
      },
      default: "New",
      index: true,
    },

    source: {
      type: String,
      trim: true,
      default: "Website Careers Page",
      maxlength: [120, "Source cannot exceed 120 characters."],
    },

    pageUrl: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Page URL is too long."],
    },

    ipAddress: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "IP address is too long."],
    },

    userAgent: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "User-agent value is too long."],
    },

    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [3000, "Notes cannot exceed 3000 characters."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

careerApplicationSchema.index({
  status: 1,
  role: 1,
  createdAt: -1,
});

careerApplicationSchema.index({
  createdAt: -1,
});

const CareerApplication =
  mongoose.models.CareerApplication ||
  mongoose.model(
    "CareerApplication",
    careerApplicationSchema
  );

module.exports = CareerApplication;