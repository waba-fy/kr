const nodemailer = require("nodemailer");

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "FROM_EMAIL",
  "ADMIN_EMAIL",
];

const missing = requiredEnv.filter(
  (key) => !process.env[key]
);

if (missing.length) {
  console.warn(
    `⚠ Missing environment variables: ${missing.join(", ")}`
  );
}

const smtpPort = Number(process.env.SMTP_PORT || 465);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,

  // Port 465 = SSL
  // Port 587 = STARTTLS
  secure:
    process.env.SMTP_SECURE === "true" ||
    smtpPort === 465,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

/*
|--------------------------------------------------------------------------
| Verify SMTP Connection
|--------------------------------------------------------------------------
*/

(async () => {
  try {
    await transporter.verify();

    console.log("✓ SMTP connected successfully");
  } catch (error) {
    console.error(
      "✗ SMTP connection failed:",
      error.message
    );
  }
})();

module.exports = transporter;