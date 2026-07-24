import { useState } from "react";

import SEO from "../components/SEO";
import LegalLayout from "../components/legal/LegalLayout";
import ReportProblemModal from "../components/common/ReportProblemModal";

import "../styles/legal-pages.css";

const PrivacyPolicy = () => {
  const [problemModalOpen, setProblemModalOpen] =
    useState(false);

  return (
    <>
      <SEO
        title="Privacy Policy | KeyRoutes"
        description="Learn how KeyRoutes collects, uses, stores, shares and protects personal information and how you may exercise your privacy rights."
        canonical="https://keyroutes.co/privacy-policy"
      />

      <LegalLayout
        title="Privacy Policy"
        description="This policy explains how KeyRoutes handles personal information when you visit our website, contact us, apply for a role, download a report, subscribe or use our services."
        onReportProblem={() =>
          setProblemModalOpen(true)
        }
      >
        <section id="overview">
          <span className="kr-legal-section-label">
            01
          </span>

          <h2>Overview</h2>

          <p>
            KeyRoutes respects your privacy and aims to process
            personal information lawfully, fairly, transparently
            and securely.
          </p>

          <p>
            This policy applies to visitors, prospective clients,
            clients, subscribers, job applicants, partners and
            individuals who communicate with us through the
            website or related services.
          </p>
        </section>

        <section id="controller">
          <span className="kr-legal-section-label">
            02
          </span>

          <h2>Who is responsible for your data?</h2>

          <p>
            The relevant KeyRoutes or Sixedge Innovations entity
            that receives your information or provides the
            requested service is responsible for the processing
            described in this policy.
          </p>

          <p>
            Privacy enquiries may be sent to:
            <a href="mailto:hello@keyroutes.co">
              {" "}hello@keyroutes.co
            </a>.
          </p>
        </section>

        <section id="data-collected">
          <span className="kr-legal-section-label">
            03
          </span>

          <h2>Information we may collect</h2>

          <ul>
            <li>
              Identity information, such as your name.
            </li>
            <li>
              Contact information, such as email address, phone
              number and WhatsApp number.
            </li>
            <li>
              Business information, including company, project,
              role, requirements and enquiries.
            </li>
            <li>
              Recruitment information, including employment
              history, resume and job application details.
            </li>
            <li>
              Communication information, including messages,
              reviews, feedback and support requests.
            </li>
            <li>
              Technical information, including IP address, browser,
              device, operating system, timestamps, referring
              pages and website activity.
            </li>
            <li>
              Marketing preferences and newsletter subscription
              status.
            </li>
            <li>
              Campaign and analytics information, including source,
              medium, conversion events and landing-page
              interactions.
            </li>
          </ul>
        </section>

        <section id="collection">
          <span className="kr-legal-section-label">
            04
          </span>

          <h2>How information is collected</h2>

          <ul>
            <li>Directly from forms and communications.</li>
            <li>
              Automatically through cookies, logs, analytics,
              security and similar technologies.
            </li>
            <li>
              From advertising, social media and campaign
              platforms when you interact with our promotions.
            </li>
            <li>
              From business partners, referrals or public business
              sources where lawful.
            </li>
          </ul>
        </section>

        <section id="purposes">
          <span className="kr-legal-section-label">
            05
          </span>

          <h2>Why we use personal information</h2>

          <ul>
            <li>Respond to enquiries and consultation requests.</li>
            <li>
              Prepare proposals and provide requested services.
            </li>
            <li>
              Operate landing pages, campaigns, analytics and
              automation.
            </li>
            <li>
              Manage newsletter subscriptions and marketing
              preferences.
            </li>
            <li>
              Process job applications and recruitment activity.
            </li>
            <li>
              Respond to privacy, deletion, correction, content,
              security or website reports.
            </li>
            <li>
              Improve website performance, content and user
              experience.
            </li>
            <li>
              Detect fraud, abuse, security incidents and technical
              problems.
            </li>
            <li>
              Meet legal, accounting, contractual and regulatory
              obligations.
            </li>
          </ul>
        </section>

        <section id="lawful-bases">
          <span className="kr-legal-section-label">
            06
          </span>

          <h2>Legal grounds for processing</h2>

          <p>
            Depending on the activity and applicable law, we may
            process information based on:
          </p>

          <ul>
            <li>Your consent.</li>
            <li>
              Steps requested by you before entering into a
              contract.
            </li>
            <li>Performance of a contract.</li>
            <li>Compliance with a legal obligation.</li>
            <li>
              Legitimate business interests, where those interests
              are not overridden by your rights.
            </li>
            <li>
              Other lawful uses or legitimate uses permitted by
              applicable data-protection law.
            </li>
          </ul>
        </section>

        <section id="sharing">
          <span className="kr-legal-section-label">
            07
          </span>

          <h2>Who we may share information with</h2>

          <p>
            We may share necessary information with trusted
            providers that support:
          </p>

          <ul>
            <li>Website hosting and cloud infrastructure.</li>
            <li>Email, messaging and communication services.</li>
            <li>CRM, form, spreadsheet and automation systems.</li>
            <li>Analytics and tag-management platforms.</li>
            <li>Google Ads, Meta Ads and similar platforms.</li>
            <li>Recruitment and document-storage systems.</li>
            <li>Professional advisers and legal authorities.</li>
          </ul>

          <p>
            Providers are expected to process information only for
            authorized purposes and subject to appropriate
            safeguards.
          </p>
        </section>

        <section id="international">
          <span className="kr-legal-section-label">
            08
          </span>

          <h2>International transfers</h2>

          <p>
            Some service providers may process information outside
            your country. Where required, we use appropriate
            contractual, organizational or legal safeguards for
            international transfers.
          </p>
        </section>

        <section id="retention">
          <span className="kr-legal-section-label">
            09
          </span>

          <h2>How long we retain information</h2>

          <p>
            We retain information only for as long as reasonably
            required for the purpose for which it was collected,
            contractual requirements, legitimate business needs,
            dispute resolution, fraud prevention and legal
            obligations.
          </p>

          <div className="kr-legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Indicative retention</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>General enquiries</td>
                  <td>Up to 24 months</td>
                </tr>

                <tr>
                  <td>Client and contract records</td>
                  <td>
                    Contract duration plus legally required period
                  </td>
                </tr>

                <tr>
                  <td>Newsletter records</td>
                  <td>
                    Until unsubscribe or valid deletion request
                  </td>
                </tr>

                <tr>
                  <td>Career applications</td>
                  <td>
                    Normally up to 12 months unless longer retention
                    is agreed
                  </td>
                </tr>

                <tr>
                  <td>Support and privacy requests</td>
                  <td>
                    As required to resolve and document the request
                  </td>
                </tr>

                <tr>
                  <td>Security logs</td>
                  <td>
                    As reasonably required for security and fraud
                    prevention
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="security">
          <span className="kr-legal-section-label">
            10
          </span>

          <h2>Security</h2>

          <p>
            We use reasonable technical and organizational
            measures intended to protect personal information,
            including access controls, authentication, secure
            transmission, provider controls, backups and
            monitoring.
          </p>

          <p>
            No internet-based system can be guaranteed completely
            secure. You should not submit unnecessary sensitive
            information through general website forms.
          </p>
        </section>

        <section id="rights">
          <span className="kr-legal-section-label">
            11
          </span>

          <h2>Your privacy rights</h2>

          <p>
            Depending on your location and applicable law, you may
            have rights to:
          </p>

          <ul>
            <li>Request information about processing.</li>
            <li>Request access to your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion where applicable.</li>
            <li>Withdraw consent.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Request data portability where applicable.</li>
            <li>Opt out of direct marketing.</li>
            <li>
              Submit a grievance or complaint to the relevant
              authority.
            </li>
          </ul>

          <p>
            We may need to verify your identity before completing a
            request.
          </p>
        </section>

        <section id="marketing">
          <span className="kr-legal-section-label">
            12
          </span>

          <h2>Marketing communications</h2>

          <p>
            You may unsubscribe from newsletter or promotional
            emails using the unsubscribe method provided in the
            message or by contacting us.
          </p>

          <p>
            Service-related messages, responses to enquiries and
            legally required notices are not promotional
            communications.
          </p>
        </section>

        <section id="cookies">
          <span className="kr-legal-section-label">
            13
          </span>

          <h2>Cookies and analytics</h2>

          <p>
            We may use essential cookies and, subject to applicable
            consent requirements, analytics, advertising and
            preference technologies. More information is provided
            in our Cookies Policy.
          </p>
        </section>

        <section id="children">
          <span className="kr-legal-section-label">
            14
          </span>

          <h2>Children</h2>

          <p>
            The KeyRoutes website and business services are not
            intended for children. We do not knowingly seek
            personal information from children through general
            business forms.
          </p>

          <p>
            A parent or guardian who believes a child has submitted
            information may contact us to request review or
            deletion.
          </p>
        </section>

        <section id="complaints">
          <span className="kr-legal-section-label">
            15
          </span>

          <h2>Questions and complaints</h2>

          <p>
            Please contact us first so we can review and respond to
            your concern.
          </p>

          <p>
            You may also have the right to complain to the
            competent data-protection authority in your
            jurisdiction, including the Data Protection Board of
            India or the UK Information Commissioner’s Office
            where applicable.
          </p>
        </section>

        <section id="changes">
          <span className="kr-legal-section-label">
            16
          </span>

          <h2>Changes to this policy</h2>

          <p>
            We may update this policy as our website, services,
            providers or legal obligations change. Material updates
            will be reflected through a revised update date or an
            additional notice where appropriate.
          </p>
        </section>

        <section id="contact">
          <span className="kr-legal-section-label">
            17
          </span>

          <h2>Privacy contact</h2>

          <address>
            <strong>KeyRoutes Privacy Team</strong>
            <br />
            Email:{" "}
            <a href="mailto:hello@keyroutes.co">
              hello@keyroutes.co
            </a>
            <br />
            Website: keyroutes.co
          </address>
        </section>
      </LegalLayout>

      <ReportProblemModal
        isOpen={problemModalOpen}
        onClose={() =>
          setProblemModalOpen(false)
        }
      />
    </>
  );
};

export default PrivacyPolicy;