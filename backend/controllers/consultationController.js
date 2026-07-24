const { sendResponse } = require("../utils/apiResponse");
const consultationService = require("../services/consultationService");

const validateConsultationLead = (body = {}) => {
  const errors = {};

  const sanitizedData = {
    name: String(body.name || "").trim(),
    email: String(body.email || "")
      .trim()
      .toLowerCase(),
    countryCode: String(body.countryCode || "+91").trim(),
    phone: String(body.phone || "")
      .trim()
      .replace(/[^\d]/g, ""),
    company: String(body.company || "").trim(),
    service: String(body.service || "").trim(),
    message: String(body.message || "").trim(),
    source: String(
      body.source || "Website Consultation Popup"
    ).trim(),
    pageUrl: String(body.pageUrl || "").trim(),
    fullPhone: String(
      body.fullPhone ||
        `${body.countryCode || "+91"}${body.phone || ""}`
    ).trim(),
  };

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!sanitizedData.name) {
    errors.name = "Name is required.";
  }

  if (!emailRegex.test(sanitizedData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (sanitizedData.phone.length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!sanitizedData.service) {
    errors.service = "Please select a service.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

exports.createConsultationLead = async (req, res) => {
  try {
    const validation = validateConsultationLead(req.body);

    if (!validation.isValid) {
      return sendResponse(
        res,
        400,
        false,
        "Please correct the highlighted fields.",
        null,
        validation.errors
      );
    }

    const result =
      await consultationService.createConsultation(
        validation.sanitizedData,
        req
      );

    return sendResponse(
      res,
      201,
      true,
      "Consultation request submitted successfully.",
      result
    );
  } catch (error) {
    console.error(
      "Create consultation error:",
      error
    );

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return sendResponse(
        res,
        400,
        false,
        "Validation failed.",
        null,
        errors
      );
    }

    return sendResponse(
      res,
      error.statusCode || 500,
      false,
      error.message ||
        "Unable to submit your consultation request."
    );
  }
};