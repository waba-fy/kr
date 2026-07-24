const transporter = require("../config/mail");

const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
  replyTo,
  cc,
  bcc,
  attachments = [],
}) => {
  if (!to) {
    const error = new Error("Email recipient is required.");
    error.statusCode = 500;
    throw error;
  }

  if (!subject) {
    const error = new Error("Email subject is required.");
    error.statusCode = 500;
    throw error;
  }

  const fromName =
    process.env.FROM_NAME || "KeyRoutes";

  const fromEmail =
    process.env.FROM_EMAIL ||
    process.env.SMTP_USER;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
  };

  if (text) {
    mailOptions.text = text;
  }

  if (replyTo) {
    mailOptions.replyTo = replyTo;
  }

  if (cc) {
    mailOptions.cc = cc;
  }

  if (bcc) {
    mailOptions.bcc = bcc;
  }

  if (
    Array.isArray(attachments) &&
    attachments.length > 0
  ) {
    mailOptions.attachments = attachments;
  }

  try {
    const result =
      await transporter.sendMail(mailOptions);

    console.log(
      `Email sent to ${to}: ${result.messageId}`
    );

    return {
      success: true,
      messageId: result.messageId,
      accepted: result.accepted || [],
      rejected: result.rejected || [],
      response: result.response,
    };
  } catch (error) {
    console.error(
      "Email sending failed:",
      error
    );

    const serviceError = new Error(
      error.message || "Unable to send email."
    );

    serviceError.statusCode = 500;
    serviceError.originalError = error;

    throw serviceError;
  }
};

module.exports = {
  sendEmail,
};