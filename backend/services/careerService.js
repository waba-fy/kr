const fs = require("fs");
const path = require("path");

const CareerApplication = require("../models/CareerApplication");

const emailService = require("./emailService");
const emailLogService = require("./emailLogService");

const {
  careerAdminTemplate,
  careerClientTemplate,
} = require("../utils/careerEmailTemplates");

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

      // Use General until "Career" is added
      // to the EmailLog model enum.
      type: "General",

      status,
      errorMessage,
    });
  } catch (error) {
    console.error(
      "Career email log error:",
      error.message
    );
  }
};

const sendCareerEmail = async ({
  to,
  subject,
  html,
  replyTo,
  attachments = [],
}) => {
  try {
    const result = await emailService.sendEmail({
      to,
      subject,
      html,
      replyTo,
      attachments,
    });

    console.log(
      `Career email sent to ${to}:`,
      result.messageId
    );

    await createEmailLog({
      to,
      subject,
      status: "Sent",
    });

    return {
      success: true,
      messageId: result.messageId,
      accepted: result.accepted || [],
      rejected: result.rejected || [],
    };
  } catch (error) {
    const errorMessage =
      error.originalError?.message ||
      error.message ||
      "Unknown email error";

    console.error(
      `Career email failed for ${to}:`,
      errorMessage
    );

    await createEmailLog({
      to,
      subject,
      status: "Failed",
      errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
};

exports.createCareerApplication = async (
  data,
  file,
  req
) => {
  if (!file) {
    const error = new Error(
      "Please upload your CV or resume."
    );

    error.statusCode = 400;
    throw error;
  }

  const absoluteResumePath = path.resolve(
    file.path
  );

  if (!fs.existsSync(absoluteResumePath)) {
    const error = new Error(
      "Uploaded resume file could not be found."
    );

    error.statusCode = 500;
    throw error;
  }

  let application;

  try {
    application =
      await CareerApplication.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        message: data.message || "",

        resumeOriginalName:
          file.originalname,

        resumeStoredName:
          file.filename,

        resumePath:
          file.path.replace(/\\/g, "/"),

        resumeMimeType:
          file.mimetype,

        resumeSize:
          file.size,

        status: "New",

        source:
          data.source ||
          "Website Careers Page",

        pageUrl:
          data.pageUrl ||
          req?.headers?.referer ||
          "",

        ipAddress:
          getClientIp(req),

        userAgent:
          req?.headers?.["user-agent"] ||
          "",
      });
  } catch (error) {
    /*
     * Remove the uploaded file if MongoDB
     * validation or creation fails.
     */
    try {
      if (fs.existsSync(absoluteResumePath)) {
        fs.unlinkSync(absoluteResumePath);
      }
    } catch (fileError) {
      console.error(
        "Unable to remove failed resume upload:",
        fileError.message
      );
    }

    throw error;
  }

  const adminEmail =
    process.env.ADMIN_EMAIL;

  const adminSubject =
    `New Career Application - ${application.name} - ${application.role}`;

  const clientSubject =
    `We Received Your Application - ${
      process.env.COMPANY_NAME || "KeyRoutes"
    }`;

  let adminEmailResult = {
    success: false,
    error:
      "ADMIN_EMAIL is not configured.",
  };

  /*
   * Send application email to admin
   * with the resume attached.
   */
  if (adminEmail) {
    adminEmailResult =
      await sendCareerEmail({
        to: adminEmail,
        subject: adminSubject,
        html: careerAdminTemplate(
          application
        ),
        replyTo: application.email,
        attachments: [
          {
            filename:
              application.resumeOriginalName,

            path:
              absoluteResumePath,

            contentType:
              application.resumeMimeType,
          },
        ],
      });
  } else {
    console.error(
      "ADMIN_EMAIL is not configured. Career admin email skipped."
    );
  }

  /*
   * Send confirmation email to candidate.
   * Resume is not attached to this email.
   */
  const clientEmailResult =
    await sendCareerEmail({
      to: application.email,
      subject: clientSubject,
      html: careerClientTemplate(
        application
      ),
      replyTo:
        process.env.FROM_EMAIL ||
        process.env.SMTP_USER,
    });

  return {
    application,
    emailDelivery: {
      admin: adminEmailResult,
      candidate: clientEmailResult,
    },
  };
};