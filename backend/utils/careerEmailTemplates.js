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

const careerAdminTemplate = (application) => {
  const rows = [
    ["Application ID", application._id],
    ["Name", application.name],
    ["Email", application.email],
    ["Phone", application.phone],
    ["Role", application.role],
    ["Message", application.message || "Not provided"],
    ["Resume", application.resumeOriginalName],
    ["Status", application.status || "New"],
    ["Source", application.source || "Website Careers Page"],
    ["Page URL", application.pageUrl || "Not available"],
    ["Submitted At", formatDate(application.createdAt)],
  ];

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
        <div style="padding:28px 14px;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
            <div style="padding:30px;background:#111111;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
                ${escapeHtml(companyName.toUpperCase())} CAREER ALERT
              </div>

              <h1 style="margin:10px 0 8px;font-size:27px;line-height:1.25;">
                New career application
              </h1>

              <p style="margin:0;color:#d5d5d5;line-height:1.7;">
                A candidate has submitted an application through the careers page.
              </p>
            </div>

            <div style="padding:28px;">
              <div style="display:inline-block;padding:7px 12px;background:#fff1f1;color:#e10600;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:20px;">
                ${escapeHtml(application.status || "New")}
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
                  Resume attached
                </strong>

                <span style="color:#606060;line-height:1.6;">
                  The candidate's resume is attached to this email for review.
                </span>
              </div>
            </div>

            <div style="padding:18px 28px;background:#fafafa;color:#777777;font-size:12px;text-align:center;">
              ${escapeHtml(companyName)} Careers Application System
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const careerClientTemplate = (application) => `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#202020;">
      <div style="padding:28px 14px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
          <div style="padding:34px 28px;background:#111111;color:#ffffff;text-align:center;">
            <div style="font-size:12px;letter-spacing:2px;color:#ff514c;font-weight:700;">
              ${escapeHtml(companyName.toUpperCase())}
            </div>

            <h1 style="margin:12px 0 8px;font-size:28px;line-height:1.25;">
              Thank you, ${escapeHtml(application.name)}
            </h1>

            <p style="margin:0;color:#d5d5d5;line-height:1.7;">
              Your career application has been received successfully.
            </p>
          </div>

          <div style="padding:30px;">
            <p style="margin:0 0 16px;line-height:1.75;">
              Hi ${escapeHtml(application.name)},
            </p>

            <p style="margin:0 0 18px;line-height:1.75;color:#505050;">
              Thank you for applying to
              <strong style="color:#111111;">${escapeHtml(companyName)}</strong>.
              Our team will review your profile for the role of
              <strong style="color:#111111;">${escapeHtml(
                application.role
              )}</strong>.
            </p>

            <div style="margin:24px 0;padding:20px;background:#fff5f5;border:1px solid #ffd7d7;border-radius:14px;">
              <div style="font-weight:700;color:#111111;margin-bottom:12px;">
                Your application details
              </div>

              <div style="line-height:1.8;color:#555555;">
                <strong>Name:</strong>
                ${escapeHtml(application.name)}
                <br />

                <strong>Email:</strong>
                ${escapeHtml(application.email)}
                <br />

                <strong>Phone:</strong>
                ${escapeHtml(application.phone)}
                <br />

                <strong>Role:</strong>
                ${escapeHtml(application.role)}
                <br />

                <strong>Resume:</strong>
                ${escapeHtml(application.resumeOriginalName)}
              </div>
            </div>

            <div style="margin:24px 0;">
              <div style="font-size:18px;font-weight:700;color:#111111;margin-bottom:12px;">
                What happens next?
              </div>

              <div style="line-height:1.9;color:#555555;">
                1. Our team reviews your resume and application.<br />
                2. Suitable profiles are shortlisted for the next stage.<br />
                3. We will contact you if your experience matches an available opportunity.
              </div>
            </div>

            <div style="text-align:center;margin-top:28px;">
              <a
                href="${escapeHtml(websiteUrl)}/careers"
                style="display:inline-block;background:#e10600;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;"
              >
                Visit ${escapeHtml(companyName)} Careers
              </a>
            </div>

            <p style="margin:30px 0 0;line-height:1.7;color:#555555;">
              Regards,<br />
              <strong style="color:#111111;">Team ${escapeHtml(
                companyName
              )}</strong>
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

module.exports = {
  careerAdminTemplate,
  careerClientTemplate,
};