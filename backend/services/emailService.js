const transporter = require("../config/mail");
const crypto = require("crypto");

const getPublicApiUrl = () =>
  String(process.env.BACKEND_PUBLIC_URL || "https://api.keyroutes.co").replace(/\/$/, "");

const addTracking = (html = "", trackingToken) => {
  if (!html || !trackingToken) return html;
  const baseUrl = getPublicApiUrl();
  const trackedLinks = html.replace(
    /href=(['"])(https?:\/\/[^'"]+)\1/gi,
    (_match, quote, url) => {
      if (url.includes("/api/marketing/unsubscribe/")) return _match;
      if (url.includes("/api/tracking/")) return _match;
      const tracked = `${baseUrl}/api/tracking/click/${trackingToken}?url=${encodeURIComponent(url)}`;
      return `href=${quote}${tracked}${quote}`;
    }
  );
  const pixel = `<img src="${baseUrl}/api/tracking/open/${trackingToken}.gif" width="1" height="1" alt="" style="display:block;width:1px;height:1px;opacity:0" />`;
  return trackedLinks.includes("</body>")
    ? trackedLinks.replace("</body>", `${pixel}</body>`)
    : `${trackedLinks}${pixel}`;
};

const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
  replyTo,
  cc,
  bcc,
  attachments = [],
  marketing = false,
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

  const originalHtml = html;
  const originalText = text;
  let preferenceUrl = "";
  if (marketing) {
    const preferences = require("./marketingPreferences");
    if (!await preferences.canSendMarketing(to)) { const error = new Error("Recipient is not eligible for marketing email."); error.code = "MARKETING_SUPPRESSED"; throw error; }
    preferenceUrl = await preferences.unsubscribeUrl(to);
    const footer = `<div style="text-align:center;padding:24px;font:12px Arial,sans-serif;color:#777">No spam. You can unsubscribe at any time. <a href="${preferenceUrl}">Unsubscribe from marketing emails</a></div>`;
    html = html.includes("</body>") ? html.replace("</body>", `${footer}</body>`) : html + footer;
    text += `\n\nUnsubscribe from marketing emails: ${preferenceUrl}`;
  }
  const activeMailConfig = await transporter.getMailConfig();
  const fromName = activeMailConfig.fromName;
  const fromEmail = activeMailConfig.fromEmail;

  const trackingToken = crypto.randomBytes(24).toString("hex");
  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html: addTracking(html, trackingToken),
  };

  if (preferenceUrl) mailOptions.headers = { "List-Unsubscribe": `<${preferenceUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" };
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

    if (result.rejected?.length && !result.accepted?.length) throw new Error("Recipient rejected the message.");
    await require("../models/EmailLog").create({ to, subject, html: originalHtml, text: originalText, marketing, canResend: Boolean(originalHtml) && !attachments.length, type: marketing ? "Newsletter" : "General", status: "Sent", sentAt: new Date(), messageId: result.messageId, trackingToken }).catch(() => console.error("Unable to save sent email content."));
    console.log(
      `Email sent to ${to}: ${result.messageId}`
    );

    return {
      success: true,
      messageId: result.messageId,
      accepted: result.accepted || [],
      rejected: result.rejected || [],
      response: result.response,
      trackingToken,
    };
  } catch (error) {
    console.error(
      "Email sending failed:",
      error
    );

    await require("../models/EmailLog").create({ to, subject, html: originalHtml, text: originalText, marketing, canResend: Boolean(originalHtml) && !attachments.length, type: marketing ? "Newsletter" : "General", status: "Failed", sentAt: null, trackingToken, errorMessage: String(error.message || "Email delivery failed").slice(0,3000) }).catch(() => console.error("Unable to save failed email content."));
    const serviceError = new Error(
      error.message || "Unable to send email."
    );

    serviceError.statusCode = 500;
    serviceError.trackingToken = trackingToken;
    serviceError.originalError = error;

    throw serviceError;
  }
};

module.exports = {
  sendEmail,
  getMailConfig: transporter.getMailConfig,
};
