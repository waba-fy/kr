const { sendResponse } = require("../utils/apiResponse");
const subscriberService = require("../services/subscriberService");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

exports.subscribe = async (req, res) => {
  try {
    const body = req.body || {};

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const pageUrl = String(body.pageUrl || "")
      .trim()
      .slice(0, 500);

    if (!emailPattern.test(email)) {
      return sendResponse(
        res,
        400,
        false,
        "Please enter a valid email address.",
        null,
        {
          email: "Please enter a valid email address.",
        }
      );
    }

    const result = await subscriberService.subscribe(
      {
        email,
        source: "Newsletter Form",
        consentSource: "Website Footer",
        pageUrl,
      },
      req
    );

    return sendResponse(
      res,
      result.alreadySubscribed ? 200 : 201,
      true,
      result.alreadySubscribed
        ? "You are already subscribed to the KeyRoutes newsletter."
        : "Thank you for subscribing to the KeyRoutes newsletter.",
      result.subscriber
    );
  } catch (error) {
    console.error(
      "Newsletter subscription error:",
      error
    );

    if (error.name === "ValidationError") {
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
        : "Unable to complete your subscription. Please try again."
    );
  }
};