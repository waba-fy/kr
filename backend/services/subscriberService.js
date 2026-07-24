const Subscriber = require("../models/Subscriber");

const emailService = require("./emailService");
const emailLogService = require("./emailLogService");

const {
  newsletterAdminTemplate,
  newsletterClientTemplate,
} = require("../utils/emailTemplates");

const normalizeEmail = (value = "") =>
  String(value).trim().toLowerCase();

const getClientIp = (req) => {
  const forwardedFor = req?.headers?.["x-forwarded-for"];

  if (forwardedFor) {
    return String(forwardedFor)
      .split(",")[0]
      .trim();
  }

  return (
    req?.socket?.remoteAddress ||
    req?.connection?.remoteAddress ||
    ""
  );
};

const createEmailLog = async ({
  to,
  subject,
  status,
  errorMessage = "",
}) => {
  try {
    await emailLogService.createLog({
      to,
      subject,
      type: "Newsletter",
      status,
      errorMessage,
    });
  } catch (error) {
    console.error(
      "Newsletter email log error:",
      error.message
    );
  }
};

const sendNewsletterEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const result = await emailService.sendEmail({
      to,
      subject,
      html,
    });

    await createEmailLog({
      to,
      subject,
      status: "Sent",
    });

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error(
      `Newsletter email failed for ${to}:`,
      error.message
    );

    await createEmailLog({
      to,
      subject,
      status: "Failed",
      errorMessage:
        error.originalError?.message ||
        error.message ||
        "Unknown email error",
    });

    return {
      success: false,
      error,
    };
  }
};

exports.subscribe = async (data, req) => {
  const email = normalizeEmail(data.email);

  if (!email) {
    const error = new Error(
      "Email address is required."
    );
    error.statusCode = 400;
    throw error;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(email)) {
    const error = new Error(
      "Please enter a valid email address."
    );
    error.statusCode = 400;
    throw error;
  }

  const existingSubscriber =
    await Subscriber.findOne({ email });

  if (
    existingSubscriber &&
    existingSubscriber.status === "Active"
  ) {
    return {
      subscriber: existingSubscriber,
      alreadySubscribed: true,
    };
  }

  const clientIp = getClientIp(req);
  const userAgent =
    req?.headers?.["user-agent"] || "";

  let subscriber;

  if (existingSubscriber) {
    existingSubscriber.status = "Active";
    existingSubscriber.source =
      data.source || "Newsletter Form";
    existingSubscriber.consentGiven = true;
    existingSubscriber.consentSource =
      data.consentSource || "Website Footer";
    existingSubscriber.consentAt =
      new Date();
    existingSubscriber.pageUrl =
      data.pageUrl ||
      existingSubscriber.pageUrl ||
      "";
    existingSubscriber.ipAddress =
      clientIp;
    existingSubscriber.userAgent =
      userAgent;
    existingSubscriber.subscribedAt =
      new Date();
    existingSubscriber.unsubscribedAt =
      null;

    subscriber =
      await existingSubscriber.save();
  } else {
    try {
      subscriber = await Subscriber.create({
        email,
        name: String(
          data.name || ""
        ).trim(),
        status: "Active",
        source:
          data.source || "Newsletter Form",
        consentGiven: true,
        consentSource:
          data.consentSource ||
          "Website Footer",
        consentAt: new Date(),
        pageUrl: String(
          data.pageUrl || ""
        ).trim(),
        ipAddress: clientIp,
        userAgent,
        subscribedAt: new Date(),
        totalEmailsSent: 0,
        totalEmailsOpened: 0,
        totalLinksClicked: 0,
      });
    } catch (error) {
      /*
       * Handles two subscription requests arriving
       * simultaneously for the same email address.
       */
      if (error.code === 11000) {
        const duplicateSubscriber =
          await Subscriber.findOne({
            email,
          });

        return {
          subscriber: duplicateSubscriber,
          alreadySubscribed: true,
        };
      }

      throw error;
    }
  }

  const adminEmail =
    process.env.ADMIN_EMAIL;

  if (adminEmail) {
    await sendNewsletterEmail({
      to: adminEmail,
      subject: `New Newsletter Subscription - ${subscriber.email}`,
      html: newsletterAdminTemplate(
        subscriber
      ),
    });
  } else {
    console.warn(
      "ADMIN_EMAIL is not configured. Admin notification was skipped."
    );
  }

  const clientEmail =
    await sendNewsletterEmail({
      to: subscriber.email,
      subject:
        "Thank You for Subscribing to KeyRoutes",
      html: newsletterClientTemplate(
        subscriber
      ),
    });

  if (clientEmail.success) {
    subscriber.totalEmailsSent =
      Number(
        subscriber.totalEmailsSent || 0
      ) + 1;

    subscriber.lastEmailSentAt =
      new Date();

    await subscriber.save();
  }

  return {
    subscriber,
    alreadySubscribed: false,
  };
};