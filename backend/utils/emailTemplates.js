const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));

const companyName =
  process.env.COMPANY_NAME || "KeyRoutes";

const websiteUrl =
  process.env.WEBSITE_URL || "https://keyroutes.co";

/* =====================================================
   CONSULTATION EMAILS
===================================================== */

const consultationAdminTemplate = (lead) => {
  const rows = [
    ["Lead ID", lead._id],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.fullPhone],
    ["Company / Project", lead.company || "Not provided"],
    ["Requirement", lead.service],
    ["Message", lead.message || "Not provided"],
    ["Source", lead.source],
    ["Page URL", lead.pageUrl || "Not available"],
    ["Status", lead.status],
    ["Submitted At", formatDate(lead.createdAt)],
  ];

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:30px;background:#111111;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                KEYROUTES LEAD ALERT
              </div>

              <h1 style="margin:10px 0 8px;font-size:27px;line-height:1.25;">
                New consultation enquiry
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                A new visitor has requested a free consultation through the website.
              </p>
            </div>

            <div style="padding:28px;">
              <div style="display:inline-block;padding:7px 12px;background:#fff1f1;color:#e10600;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:20px;">
                ${escapeHtml(lead.status)}
              </div>

              <table role="presentation" style="width:100%;border-collapse:collapse;">
                ${rows
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="width:34%;padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;font-weight:700;color:#111111;">
                          ${escapeHtml(label)}
                        </td>

                        <td style="padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;color:#555555;word-break:break-word;">
                          ${escapeHtml(value)}
                        </td>
                      </tr>
                    `
                  )
                  .join("")}
              </table>

              <div style="margin-top:24px;padding:18px;background:#fafafa;border-left:4px solid #e10600;border-radius:10px;">
                <strong style="display:block;margin-bottom:6px;color:#111111;">
                  Recommended next action
                </strong>

                <span style="color:#606060;line-height:1.6;">
                  Contact the lead, understand the requirement and update the lead status in the KeyRoutes admin dashboard.
                </span>
              </div>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              KeyRoutes Website Consultation System
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const consultationClientTemplate = (lead) => `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
      <div style="padding:28px 14px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
          <div style="padding:34px 28px;background:#111111;color:#ffffff;text-align:center;">
            <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
              KEYROUTES
            </div>

            <h1 style="margin:12px 0 8px;font-size:28px;line-height:1.25;">
              Thank you, ${escapeHtml(lead.name)}
            </h1>

            <p style="margin:0;color:#d5d5d5;line-height:1.7;">
              Your consultation request has been received successfully.
            </p>
          </div>

          <div style="padding:30px;">
            <p style="margin:0 0 16px;line-height:1.75;">
              Hi ${escapeHtml(lead.name)},
            </p>

            <p style="margin:0 0 18px;line-height:1.75;color:#505050;">
              Thank you for contacting
              <strong style="color:#111111;">KeyRoutes</strong>.
              Our team will review your requirement for
              <strong style="color:#111111;">${escapeHtml(
                lead.service
              )}</strong>
              and contact you shortly.
            </p>

            <div style="margin:24px 0;padding:20px;background:#fff5f5;border:1px solid #ffd7d7;border-radius:14px;">
              <div style="font-weight:700;color:#111111;margin-bottom:12px;">
                Your submitted details
              </div>

              <div style="line-height:1.8;color:#555555;">
                <strong>Name:</strong>
                ${escapeHtml(lead.name)}
                <br />

                <strong>Phone:</strong>
                ${escapeHtml(lead.fullPhone)}
                <br />

                <strong>Company / Project:</strong>
                ${escapeHtml(
                  lead.company || "Not provided"
                )}
                <br />

                <strong>Requirement:</strong>
                ${escapeHtml(lead.service)}
              </div>
            </div>

            <div style="margin:24px 0;">
              <div style="font-size:18px;font-weight:700;color:#111111;margin-bottom:12px;">
                What happens next?
              </div>

              <div style="line-height:1.9;color:#555555;">
                1. Our team reviews your requirement.<br />
                2. We identify the most suitable strategy or solution.<br />
                3. A KeyRoutes representative contacts you for the next discussion.
              </div>
            </div>

            <div style="text-align:center;margin-top:28px;">
              <a
                href="https://wa.me/918309436998"
                style="display:inline-block;background:#e10600;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;"
              >
                Contact KeyRoutes on WhatsApp
              </a>
            </div>

            <p style="margin:30px 0 0;line-height:1.7;color:#555555;">
              Regards,<br />
              <strong style="color:#111111;">
                Team KeyRoutes
              </strong>
            </p>
          </div>

          <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
            Strategy • Marketing • Technology • Automation
          </div>
        </div>
      </div>
    </body>
  </html>
`;

/* =====================================================
   NEWSLETTER EMAILS
===================================================== */

const newsletterAdminTemplate = (subscriber) => {
  const rows = [
    ["Subscriber ID", subscriber._id || "Not available"],
    ["Name", subscriber.name || "Not provided"],
    ["Email", subscriber.email],
    ["Source", subscriber.source || "Website Footer"],
    ["Page URL", subscriber.pageUrl || "Not available"],
    ["Status", subscriber.status || "active"],
    [
      "Subscribed At",
      formatDate(subscriber.createdAt || new Date()),
    ],
  ];

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:30px;background:#111111;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                KEYROUTES SUBSCRIBER ALERT
              </div>

              <h1 style="margin:10px 0 8px;font-size:27px;line-height:1.25;">
                New newsletter subscription
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                A visitor has subscribed to receive updates from the KeyRoutes website.
              </p>
            </div>

            <div style="padding:28px;">
              <div style="display:inline-block;padding:7px 12px;background:#f0fdf4;color:#15803d;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:20px;">
                ${escapeHtml(
                  subscriber.status || "active"
                )}
              </div>

              <table role="presentation" style="width:100%;border-collapse:collapse;">
                ${rows
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="width:34%;padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;font-weight:700;color:#111111;">
                          ${escapeHtml(label)}
                        </td>

                        <td style="padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;color:#555555;word-break:break-word;">
                          ${escapeHtml(value)}
                        </td>
                      </tr>
                    `
                  )
                  .join("")}
              </table>

              <div style="margin-top:24px;padding:18px;background:#fafafa;border-left:4px solid #e10600;border-radius:10px;">
                <strong style="display:block;margin-bottom:6px;color:#111111;">
                  Subscription recorded
                </strong>

                <span style="color:#606060;line-height:1.6;">
                  This email address has been added to the KeyRoutes newsletter subscriber list.
                </span>
              </div>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              KeyRoutes Newsletter Subscription System
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const newsletterClientTemplate = (subscriber) => {
  const subscriberName = subscriber.name
    ? escapeHtml(subscriber.name)
    : "there";

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:34px 28px;background:#111111;color:#ffffff;text-align:center;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                KEYROUTES
              </div>

              <h1 style="margin:12px 0 8px;font-size:28px;line-height:1.25;">
                Thank you for subscribing
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                You're now connected to the latest updates from KeyRoutes.
              </p>
            </div>

            <div style="padding:30px;">
              <p style="margin:0 0 16px;line-height:1.75;">
                Hi ${subscriberName},
              </p>

              <p style="margin:0 0 18px;line-height:1.75;color:#505050;">
                Thank you for subscribing to the
                <strong style="color:#111111;">
                  KeyRoutes newsletter
                </strong>.
                We'll share useful business insights, service updates, product news
                and practical growth strategies with you.
              </p>

              <div style="margin:24px 0;padding:20px;background:#fff5f5;border:1px solid #ffd7d7;border-radius:14px;">
                <div style="font-weight:700;color:#111111;margin-bottom:12px;">
                  Subscription details
                </div>

                <div style="line-height:1.8;color:#555555;">
                  <strong>Email:</strong>
                  ${escapeHtml(subscriber.email)}
                  <br />

                  <strong>Subscribed:</strong>
                  ${escapeHtml(
                    formatDate(
                      subscriber.createdAt ||
                        new Date()
                    )
                  )}
                </div>
              </div>

              <div style="margin:24px 0;">
                <div style="font-size:18px;font-weight:700;color:#111111;margin-bottom:12px;">
                  What you'll receive
                </div>

                <div style="line-height:1.9;color:#555555;">
                  1. Business and growth insights.<br />
                  2. Marketing and technology updates.<br />
                  3. New products and service announcements.<br />
                  4. KeyRoutes success stories and practical resources.
                </div>
              </div>

              <div style="text-align:center;margin-top:28px;">
                <a
                  href="${escapeHtml(websiteUrl)}"
                  style="display:inline-block;background:#e10600;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;"
                >
                  Visit KeyRoutes
                </a>
              </div>

              <p style="margin:30px 0 0;line-height:1.7;color:#555555;">
                Regards,<br />
                <strong style="color:#111111;">
                  Team KeyRoutes
                </strong>
              </p>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              Strategy • Marketing • Technology • Automation
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

/* =====================================================
   REPORT A PROBLEM EMAILS
===================================================== */

const reportProblemAdminTemplate = (report) => {
  const rows = [
    ["Report ID", report._id || "Not available"],
    ["Name", report.name],
    ["Email", report.email],
    ["Issue Type", report.issueType],
    [
      "Related Page",
      report.pageUrl || "Not provided",
    ],
    ["Status", report.status || "New"],
    [
      "Source",
      report.source ||
        "Website Report a Problem Form",
    ],
    [
      "Submitted At",
      formatDate(
        report.createdAt ||
          report.submittedAt ||
          new Date()
      ),
    ],
  ];

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:30px;background:#111111;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                ${escapeHtml(
                  companyName.toUpperCase()
                )} SUPPORT ALERT
              </div>

              <h1 style="margin:10px 0 8px;font-size:27px;line-height:1.25;">
                New website problem reported
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                A visitor has submitted a website, privacy, content or data-related concern.
              </p>
            </div>

            <div style="padding:28px;">
              <div style="display:inline-block;padding:7px 12px;background:#fff1f1;color:#e10600;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:20px;">
                ${escapeHtml(
                  report.status || "New"
                )}
              </div>

              <table role="presentation" style="width:100%;border-collapse:collapse;">
                ${rows
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="width:34%;padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;font-weight:700;color:#111111;">
                          ${escapeHtml(label)}
                        </td>

                        <td style="padding:13px 10px;border-bottom:1px solid #eeeeee;vertical-align:top;color:#555555;word-break:break-word;">
                          ${escapeHtml(value)}
                        </td>
                      </tr>
                    `
                  )
                  .join("")}
              </table>

              <div style="margin-top:24px;padding:18px;background:#fff5f5;border:1px solid #ffd7d7;border-left:4px solid #e10600;border-radius:10px;">
                <strong style="display:block;margin-bottom:8px;color:#111111;">
                  Report description
                </strong>

                <div style="color:#606060;line-height:1.7;white-space:pre-wrap;word-break:break-word;">
                  ${escapeHtml(report.description)}
                </div>
              </div>

              <div style="margin-top:24px;padding:18px;background:#fafafa;border-left:4px solid #e10600;border-radius:10px;">
                <strong style="display:block;margin-bottom:6px;color:#111111;">
                  Recommended next action
                </strong>

                <span style="color:#606060;line-height:1.6;">
                  Review the report, verify the related page or data request, contact the visitor if clarification is required, and update the report status.
                </span>
              </div>

              <div style="margin-top:24px;text-align:center;">
                <a
                  href="mailto:${escapeHtml(
                    report.email
                  )}"
                  style="display:inline-block;background:#e10600;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;"
                >
                  Reply to Reporter
                </a>
              </div>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              ${escapeHtml(
                companyName
              )} Website Support System
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const reportProblemClientTemplate = (report) => {
  const submittedDate = formatDate(
    report.createdAt ||
      report.submittedAt ||
      new Date()
  );

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:34px 28px;background:#111111;color:#ffffff;text-align:center;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                ${escapeHtml(
                  companyName.toUpperCase()
                )}
              </div>

              <h1 style="margin:12px 0 8px;font-size:28px;line-height:1.25;">
                We received your report
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                Thank you for helping us keep the KeyRoutes website accurate, safe and accessible.
              </p>
            </div>

            <div style="padding:30px;">
              <p style="margin:0 0 16px;line-height:1.75;">
                Hi ${escapeHtml(report.name)},
              </p>

              <p style="margin:0 0 18px;line-height:1.75;color:#505050;">
                Thank you for contacting
                <strong style="color:#111111;">
                  ${escapeHtml(companyName)}
                </strong>.
                Your report has been received successfully and will be reviewed by our support team.
              </p>

              <div style="margin:24px 0;padding:20px;background:#fff5f5;border:1px solid #ffd7d7;border-radius:14px;">
                <div style="font-weight:700;color:#111111;margin-bottom:12px;">
                  Your report details
                </div>

                <div style="line-height:1.8;color:#555555;">
                  <strong>Issue type:</strong>
                  ${escapeHtml(report.issueType)}
                  <br />

                  <strong>Related page:</strong>
                  ${escapeHtml(
                    report.pageUrl ||
                      "Not provided"
                  )}
                  <br />

                  <strong>Submitted:</strong>
                  ${escapeHtml(submittedDate)}
                  <br />

                  ${
                    report._id
                      ? `
                        <strong>Reference ID:</strong>
                        ${escapeHtml(report._id)}
                      `
                      : ""
                  }
                </div>
              </div>

              <div style="margin:24px 0;padding:18px;background:#fafafa;border-left:4px solid #e10600;border-radius:10px;">
                <strong style="display:block;margin-bottom:8px;color:#111111;">
                  Your description
                </strong>

                <div style="color:#606060;line-height:1.7;white-space:pre-wrap;word-break:break-word;">
                  ${escapeHtml(report.description)}
                </div>
              </div>

              <div style="margin:24px 0;">
                <div style="font-size:18px;font-weight:700;color:#111111;margin-bottom:12px;">
                  What happens next?
                </div>

                <div style="line-height:1.9;color:#555555;">
                  1. Our team reviews the issue and related page.<br />
                  2. We verify the requested correction, deletion or support action.<br />
                  3. We contact you if additional information is required.<br />
                  4. Appropriate action is taken based on the nature of the report.
                </div>
              </div>

              <p style="margin:24px 0;line-height:1.75;color:#505050;">
                For urgent questions or additional information, email us at
                <a
                  href="mailto:hello@keyroutes.co"
                  style="color:#e10600;font-weight:700;text-decoration:none;"
                >
                  hello@keyroutes.co
                </a>.
              </p>

              <div style="text-align:center;margin-top:28px;">
                <a
                  href="${escapeHtml(websiteUrl)}"
                  style="display:inline-block;background:#e10600;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;"
                >
                  Visit ${escapeHtml(companyName)}
                </a>
              </div>

              <p style="margin:30px 0 0;line-height:1.7;color:#555555;">
                Regards,<br />
                <strong style="color:#111111;">
                  Team ${escapeHtml(companyName)}
                </strong>
              </p>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              Strategy • Marketing • Technology • Automation
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
  consultationAdminTemplate,
  consultationClientTemplate,
  newsletterAdminTemplate,
  newsletterClientTemplate,
  reportProblemAdminTemplate,
  reportProblemClientTemplate,
};