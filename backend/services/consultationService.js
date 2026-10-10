const ConsultationLead = require("../models/ConsultationLead");

const emailService = require("./emailService");
const emailLogService = require("./emailLogService");

const {
  consultationAdminTemplate,
  consultationClientTemplate,
} = require("../utils/emailTemplates");

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
  messageId = "",
  trackingToken,
}) => {
  try {
    await emailLogService.createLog({
      to,
      subject,
      type: "Consultation",
      status,
      errorMessage,
      messageId,
      trackingToken,
    });
  } catch (error) {
    console.error(
      "Consultation email log error:",
      error.message
    );
  }
};

const sendConsultationEmail = async ({
  to,
  subject,
  html,
  replyTo,
}) => {
  try {
    const result = await emailService.sendEmail({
      to,
      subject,
      html,
      replyTo,
    });

    console.log(
      `Consultation email sent to ${to}:`,
      result.messageId
    );

    await createEmailLog({
      to,
      subject,
      status: "Sent",
      messageId: result.messageId,
      trackingToken: result.trackingToken,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    const errorMessage =
      error.originalError?.message ||
      error.message ||
      "Unknown email error";

    console.error(
      `Consultation email failed for ${to}:`,
      errorMessage
    );

    await createEmailLog({
      to,
      subject,
      status: "Failed",
      trackingToken: error.trackingToken,
      errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
};

exports.createConsultation = async (data, req) => {
  const consultation =
    await ConsultationLead.create({
      ...data,

      fullPhone:
        data.fullPhone ||
        `${data.countryCode || "+91"}${data.phone}`,

      status: "New",

      source:
        data.source ||
        "Website Consultation Popup",

      pageUrl:
        data.pageUrl ||
        req?.headers?.referer ||
        "",

      ipAddress: getClientIp(req),

      userAgent:
        req?.headers?.["user-agent"] ||
        "",
    });

  const adminSubject =
    `New Consultation Request - ${consultation.name}`;

  const clientSubject =
    "Thank You for Contacting KeyRoutes";

  const mailConfig = await emailService.getMailConfig();
  let adminEmailResult = {
    success: false,
    error: "ADMIN_EMAIL is not configured.",
  };

  if (mailConfig.adminEmail) {
    adminEmailResult =
      await sendConsultationEmail({
        to: mailConfig.adminEmail,
        subject: adminSubject,
        html: consultationAdminTemplate(
          consultation
        ),
        replyTo: consultation.email,
      });
  } else {
    console.error(
      "ADMIN_EMAIL is not configured."
    );
  }

  const clientEmailResult =
    await sendConsultationEmail({
      to: consultation.email,
      subject: clientSubject,
      html: consultationClientTemplate(
        consultation
      ),
      replyTo:
        mailConfig.fromEmail,
    });

  return {
    consultation,
    emailDelivery: {
      admin: adminEmailResult,
      customer: clientEmailResult,
    },
  };
};
