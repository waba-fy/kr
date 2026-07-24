const fs = require("fs");

const { sendResponse } = require("../utils/apiResponse");
const careerService = require("../services/careerService");

const allowedRoles = [
  "Digital Marketing Executive",
  "Frontend Developer",
  "Business Development Executive",
  "Internship",
  "Other",
];

const validateCareerApplication = (body = {}) => {
  const errors = {};

  const sanitizedData = {
    name: String(body.name || "").trim(),
    email: String(body.email || "")
      .trim()
      .toLowerCase(),
    phone: String(body.phone || "")
      .trim()
      .replace(/[^\d+]/g, ""),
    role: String(body.role || "").trim(),
    message: String(body.message || "").trim(),
    source: String(
      body.source || "Website Careers Page"
    ).trim(),
    pageUrl: String(body.pageUrl || "").trim(),
  };

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (sanitizedData.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (sanitizedData.name.length > 120) {
    errors.name =
      "Name cannot exceed 120 characters.";
  }

  if (!emailPattern.test(sanitizedData.email)) {
    errors.email =
      "Please enter a valid email address.";
  }

  if (
    sanitizedData.phone.replace(/\D/g, "").length < 7
  ) {
    errors.phone =
      "Please enter a valid phone number.";
  }

  if (!allowedRoles.includes(sanitizedData.role)) {
    errors.role =
      "Please select a valid role.";
  }

  if (sanitizedData.message.length > 3000) {
    errors.message =
      "Message cannot exceed 3000 characters.";
  }

  if (sanitizedData.pageUrl.length > 1000) {
    errors.pageUrl =
      "Page URL is too long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

const removeUploadedFile = (file) => {
  if (!file?.path) {
    return;
  }

  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    console.error(
      "Unable to remove uploaded resume:",
      error.message
    );
  }
};

exports.createCareerApplication = async (
  req,
  res
) => {
  try {
    const validation =
      validateCareerApplication(req.body);

    if (!validation.isValid) {
      removeUploadedFile(req.file);

      return sendResponse(
        res,
        400,
        false,
        "Please correct the highlighted fields.",
        null,
        validation.errors
      );
    }

    if (!req.file) {
      return sendResponse(
        res,
        400,
        false,
        "Please upload your CV or resume.",
        null,
        {
          resume: "Please upload your CV or resume.",
        }
      );
    }

    const result =
      await careerService.createCareerApplication(
        validation.sanitizedData,
        req.file,
        req
      );

    return sendResponse(
      res,
      201,
      true,
      "Your career application has been submitted successfully.",
      result
    );
  } catch (error) {
    console.error(
      "Create career application error:",
      error
    );

    if (error.name === "ValidationError") {
      removeUploadedFile(req.file);

      const errors = {};

      Object.entries(error.errors || {}).forEach(
        ([field, fieldError]) => {
          errors[field] = fieldError.message;
        }
      );

      return sendResponse(
        res,
        400,
        false,
        "Please correct the highlighted fields.",
        null,
        errors
      );
    }

    return sendResponse(
      res,
      error.statusCode || 500,
      false,
      error.statusCode
        ? error.message
        : "Unable to submit your career application."
    );
  }
};