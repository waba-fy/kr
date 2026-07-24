const express = require("express");

const transporter = require("../config/mail");

const {
  reportProblemAdminTemplate,
  reportProblemClientTemplate,
} = require("../utils/emailTemplates");

const router = express.Router();

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const allowedIssueTypes = [
  "delete-my-data",
  "correct-my-data",
  "website-content",
  "privacy-concern",
  "cookies",
  "copyright",
  "technical",
  "accessibility",
  "security",
  "incorrect-information",
  "other",
];

const issueTypeLabels = {
  "delete-my-data":
    "Delete my personal data",

  "correct-my-data":
    "Correct or update my personal data",

  "website-content":
    "Content issue on the website",

  "privacy-concern":
    "Privacy or data protection concern",

  cookies:
    "Cookies or tracking concern",

  copyright:
    "Copyright or intellectual property issue",

  technical:
    "Technical problem",

  accessibility:
    "Accessibility issue",

  security:
    "Security concern",

  "incorrect-information":
    "Incorrect or misleading information",

  other:
    "Other issue",
};

const cleanText = (value = "") =>
  String(value).trim();

router.post(
  "/report-problem",
  async (req, res) => {
    try {
      const {
        name,
        email,
        issueType,
        pageUrl,
        description,
        submittedAt,
      } = req.body;

      const cleanName =
        cleanText(name);

      const cleanEmail =
        cleanText(email).toLowerCase();

      const cleanIssueType =
        cleanText(issueType);

      const cleanPageUrl =
        cleanText(pageUrl);

      const cleanDescription =
        cleanText(description);

      /* ----------------------------------
         Required fields
      ----------------------------------- */

      if (
        !cleanName ||
        !cleanEmail ||
        !cleanIssueType ||
        !cleanDescription
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name, email, issue type, and description are required.",
        });
      }

      /* ----------------------------------
         Name validation
      ----------------------------------- */

      if (cleanName.length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid name.",
        });
      }

      if (cleanName.length > 100) {
        return res.status(400).json({
          success: false,
          message:
            "Name must not exceed 100 characters.",
        });
      }

      /* ----------------------------------
         Email validation
      ----------------------------------- */

      if (!emailPattern.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address.",
        });
      }

      /* ----------------------------------
         Issue type validation
      ----------------------------------- */

      if (
        !allowedIssueTypes.includes(
          cleanIssueType
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a valid issue type.",
        });
      }

      /* ----------------------------------
         Description validation
      ----------------------------------- */

      if (
        cleanDescription.length < 15
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide at least 15 characters describing the issue.",
        });
      }

      if (
        cleanDescription.length > 5000
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Description must not exceed 5,000 characters.",
        });
      }

      /* ----------------------------------
         Optional URL validation
      ----------------------------------- */

      if (cleanPageUrl) {
        try {
          const parsedUrl =
            new URL(cleanPageUrl);

          if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
          ) {
            throw new Error(
              "Invalid URL protocol"
            );
          }
        } catch (_error) {
          return res.status(400).json({
            success: false,
            message:
              "Please provide a valid related page URL.",
          });
        }
      }

      /* ----------------------------------
         Date handling
      ----------------------------------- */

      const submittedDate =
        submittedAt
          ? new Date(submittedAt)
          : new Date();

      const validSubmittedDate =
        Number.isNaN(
          submittedDate.getTime()
        )
          ? new Date()
          : submittedDate;

      /* ----------------------------------
         Report data
      ----------------------------------- */

      const report = {
        name: cleanName,

        email: cleanEmail,

        issueType:
          issueTypeLabels[
            cleanIssueType
          ] || cleanIssueType,

        issueTypeCode:
          cleanIssueType,

        pageUrl:
          cleanPageUrl ||
          "Not provided",

        description:
          cleanDescription,

        status:
          "New",

        source:
          "Website Report a Problem Form",

        submittedAt:
          validSubmittedDate,

        createdAt:
          new Date(),
      };

      console.log(
        "Report a Problem submission:",
        report
      );

      /* ----------------------------------
         Mail configuration
      ----------------------------------- */

      const adminEmail =
        process.env.ADMIN_EMAIL ||
        process.env.SUPPORT_EMAIL ||
        "hello@keyroutes.co";

      const senderEmail =
        process.env.FROM_EMAIL ||
        process.env.SMTP_USER;

      const senderName =
        process.env.FROM_NAME ||
        process.env.COMPANY_NAME ||
        "KeyRoutes";

      if (!senderEmail) {
        console.error(
          "Report email not sent: FROM_EMAIL or SMTP_USER is missing."
        );

        return res.status(500).json({
          success: false,
          message:
            "Your report was received, but the email service is not configured correctly.",
        });
      }

      /* ----------------------------------
         Generate email HTML
      ----------------------------------- */

      const adminHtml =
        reportProblemAdminTemplate(
          report
        );

      const customerHtml =
        reportProblemClientTemplate(
          report
        );

      /* ----------------------------------
         Mail options
      ----------------------------------- */

      const adminMailOptions = {
        from: {
          name:
            `${senderName} Support`,

          address:
            senderEmail,
        },

        to:
          adminEmail,

        replyTo:
          cleanEmail,

        subject:
          `New website problem reported: ${report.issueType}`,

        html:
          adminHtml,
      };

      const customerMailOptions = {
        from: {
          name:
            `${senderName} Support`,

          address:
            senderEmail,
        },

        to:
          cleanEmail,

        replyTo:
          adminEmail,

        subject:
          "We received your report | KeyRoutes",

        html:
          customerHtml,
      };

      /* ----------------------------------
         Send both emails
      ----------------------------------- */

      const emailResults =
        await Promise.allSettled([
          transporter.sendMail(
            adminMailOptions
          ),

          transporter.sendMail(
            customerMailOptions
          ),
        ]);

      const [
        adminEmailResult,
        customerEmailResult,
      ] = emailResults;

      const adminEmailSent =
        adminEmailResult.status ===
        "fulfilled";

      const customerEmailSent =
        customerEmailResult.status ===
        "fulfilled";

      if (!adminEmailSent) {
        console.error(
          "Admin report email failed:",
          adminEmailResult.reason
        );
      }

      if (!customerEmailSent) {
        console.error(
          "Customer confirmation email failed:",
          customerEmailResult.reason
        );
      }

      if (
        !adminEmailSent &&
        !customerEmailSent
      ) {
        return res.status(500).json({
          success: false,
          message:
            "Your report was received, but confirmation emails could not be sent. Please contact hello@keyroutes.co.",
        });
      }

      return res.status(201).json({
        success: true,

        message:
          "Thank you. Your report has been submitted successfully.",

        emailStatus: {
          admin:
            adminEmailSent,

          customer:
            customerEmailSent,
        },
      });
    } catch (error) {
      console.error(
        "Report problem submission error:",
        {
          message:
            error.message,

          stack:
            error.stack,

          code:
            error.code,

          command:
            error.command,
        }
      );

      return res.status(500).json({
        success: false,

        message:
          process.env.NODE_ENV ===
          "production"
            ? "Unable to submit your report right now. Please try again or email hello@keyroutes.co."
            : error.message ||
              "Unable to submit your report right now.",
      });
    }
  }
);

module.exports = router;