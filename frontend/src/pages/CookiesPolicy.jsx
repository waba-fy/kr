import { useState } from "react";

import SEO from "../components/SEO";
import LegalLayout from "../components/legal/LegalLayout";
import ReportProblemModal from "../components/common/ReportProblemModal";

import "../styles/legal-pages.css";

const CookiesPolicy = () => {
  const [problemModalOpen, setProblemModalOpen] =
    useState(false);

  return (
    <>
      <SEO
        title="Cookies Policy | KeyRoutes"
        description="Learn how KeyRoutes uses cookies and similar technologies and how you can manage your preferences."
        canonical="https://keyroutes.co/cookies-policy"
      />

      <LegalLayout
        title="Cookies Policy"
        description="This policy explains how KeyRoutes uses cookies, tags, pixels, browser storage and similar technologies on its website."
        onReportProblem={() =>
          setProblemModalOpen(true)
        }
      >
        <section id="cookies-overview">
          <span className="kr-legal-section-label">
            01
          </span>

          <h2>What are cookies?</h2>

          <p>
            Cookies are small files or pieces of information placed
            on or accessed from your browser or device when you
            visit a website.
          </p>

          <p>
            Similar technologies include pixels, scripts, tags,
            local storage, software development kits, device
            identifiers and conversion-tracking technologies.
          </p>
        </section>

        <section id="why">
          <span className="kr-legal-section-label">
            02
          </span>

          <h2>Why we use these technologies</h2>

          <ul>
            <li>Operate and secure the website.</li>
            <li>Remember settings and preferences.</li>
            <li>Understand website traffic and performance.</li>
            <li>Measure form submissions and campaign results.</li>
            <li>Improve content and user experience.</li>
            <li>
              Support advertising, attribution and remarketing
              where permitted.
            </li>
          </ul>
        </section>

        <section id="categories">
          <span className="kr-legal-section-label">
            03
          </span>

          <h2>Cookie categories</h2>

          <div className="kr-cookie-category-grid">
            <article>
              <span>01</span>
              <h3>Strictly necessary</h3>
              <p>
                Required for core functions, security, routing,
                form operation, consent preferences and website
                availability.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Preferences</h3>
              <p>
                Remember language, display, consent and other user
                choices.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Analytics</h3>
              <p>
                Help us understand visits, interactions,
                performance and errors.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Advertising</h3>
              <p>
                Support campaign measurement, conversion
                attribution, audience creation and remarketing.
              </p>
            </article>
          </div>
        </section>

        <section id="technologies">
          <span className="kr-legal-section-label">
            04
          </span>

          <h2>Services that may use cookies</h2>

          <p>
            Depending on the website configuration and your
            preferences, technologies may be associated with:
          </p>

          <ul>
            <li>Google Analytics 4.</li>
            <li>Google Tag Manager.</li>
            <li>Google Ads conversion tracking.</li>
            <li>Meta Pixel or Meta advertising tools.</li>
            <li>Embedded videos or social content.</li>
            <li>Website hosting and security providers.</li>
            <li>Form, CRM, chat or automation services.</li>
          </ul>

          <p>
            The actual services enabled should be reflected in your
            cookie-consent manager and periodically audited.
          </p>
        </section>

        <section id="consent">
          <span className="kr-legal-section-label">
            05
          </span>

          <h2>Consent</h2>

          <p>
            Strictly necessary technologies may operate without
            optional consent where permitted because they are
            required to provide the website or a feature requested
            by you.
          </p>

          <p>
            Analytics, advertising and other non-essential
            technologies should be activated only in accordance
            with applicable consent requirements.
          </p>

          <p>
            Rejecting optional cookies should not prevent access to
            the basic website, although some personalization or
            embedded functionality may be unavailable.
          </p>
        </section>

        <section id="manage">
          <span className="kr-legal-section-label">
            06
          </span>

          <h2>Managing your preferences</h2>

          <p>You can manage cookies through:</p>

          <ul>
            <li>The KeyRoutes cookie preference panel.</li>
            <li>Your browser privacy and cookie settings.</li>
            <li>Device advertising settings.</li>
            <li>
              Controls provided by Google, Meta and other relevant
              platforms.
            </li>
          </ul>

          <p>
            Clearing browser storage may remove saved preferences,
            causing the cookie banner to appear again.
          </p>
        </section>

        <section id="browser">
          <span className="kr-legal-section-label">
            07
          </span>

          <h2>Browser controls</h2>

          <p>
            Most browsers allow you to block, restrict or delete
            cookies. Browser settings vary, so consult your
            browser’s official help documentation.
          </p>

          <p>
            Blocking all cookies may affect form functionality,
            login states, security features or preference storage.
          </p>
        </section>

        <section id="retention">
          <span className="kr-legal-section-label">
            08
          </span>

          <h2>Cookie duration</h2>

          <p>
            Session cookies expire when the browser session ends.
            Persistent cookies remain for a defined duration or
            until deleted.
          </p>

          <p>
            Cookie durations should be configured according to
            purpose, platform settings and data-minimization
            principles.
          </p>
        </section>

        <section id="third-party">
          <span className="kr-legal-section-label">
            09
          </span>

          <h2>Third-party technologies</h2>

          <p>
            Third-party providers may receive information from
            their technologies and process it under their own
            policies. KeyRoutes does not control every aspect of
            third-party processing.
          </p>

          <p>
            You should review the relevant provider’s privacy and
            cookie information before enabling optional categories.
          </p>
        </section>

        <section id="changes">
          <span className="kr-legal-section-label">
            10
          </span>

          <h2>Changes to this policy</h2>

          <p>
            We may update this policy when technologies, providers,
            consent tools or legal requirements change. The latest
            version will be published on this page.
          </p>
        </section>

        <section id="contact">
          <span className="kr-legal-section-label">
            11
          </span>

          <h2>Cookie questions</h2>

          <p>
            Contact us to ask about cookies, withdraw consent or
            report a tracking concern:
          </p>

          <address>
            <strong>KeyRoutes</strong>
            <br />
            Email:{" "}
            <a href="mailto:hello@keyroutes.co">
              hello@keyroutes.co
            </a>
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

export default CookiesPolicy;