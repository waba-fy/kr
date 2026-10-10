const nodemailer = require("nodemailer");
const SystemSetting = require("../models/SystemSetting");
const { decrypt } = require("../utils/encryption");

const getMailConfig = async () => {
  let saved = null;
  try {
    saved = await SystemSetting.findOne({ key: "email" }).select("+encryptedValue").lean();
  } catch (_error) {
    // Environment configuration remains available during database recovery.
  }
  const value = saved?.value || {};
  let password = process.env.SMTP_PASS || "";
  if (saved?.encryptedValue) {
    try { password = decrypt(saved.encryptedValue); }
    catch (error) { console.error("Unable to decrypt saved SMTP password:", error.message); }
  }
  const port = Number(value.smtpPort || process.env.SMTP_PORT || 465);
  return {
    host: value.smtpHost || process.env.SMTP_HOST,
    port,
    secure: typeof value.smtpSecure === "boolean" ? value.smtpSecure : (process.env.SMTP_SECURE === "true" || port === 465),
    user: value.smtpUser || process.env.SMTP_USER,
    password,
    fromName: value.fromName || process.env.FROM_NAME || "KeyRoutes",
    fromEmail: value.fromEmail || process.env.FROM_EMAIL || process.env.SMTP_USER,
    adminEmail: value.adminEmail || process.env.ADMIN_EMAIL,
  };
};

const createTransport = async () => {
  const config = await getMailConfig();
  return {
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.password },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    }),
    config,
  };
};

module.exports = {
  async sendMail(options) {
    const { transporter, config } = await createTransport();
    const nextOptions = { ...options };
    if (!nextOptions.from) nextOptions.from = `"${config.fromName}" <${config.fromEmail}>`;
    return transporter.sendMail(nextOptions);
  },
  async verify() {
    const { transporter } = await createTransport();
    return transporter.verify();
  },
  getMailConfig,
};
