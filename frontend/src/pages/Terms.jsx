import { useState } from "react";

import SEO from "../components/SEO";
import LegalLayout from "../components/legal/LegalLayout";
import ReportProblemModal from "../components/common/ReportProblemModal";

import "../styles/legal-pages.css";

const Terms = () => {
  const [problemModalOpen, setProblemModalOpen] =
    useState(false);

  return (
    <>
      <SEO
        title="Terms & Conditions | KeyRoutes"
        description="Read the terms governing your access to and use of the KeyRoutes website, services, reports, consultations and digital products."
        canonical="https://keyroutes.co/terms"
      />

      <LegalLayout
        title="Terms & Conditions"
        description="These terms govern your use of the KeyRoutes website, services, reports, digital resources, consultation forms and related online features."
        onReportProblem={() =>
          setProblemModalOpen(true)
        }
      >
        <section id="acceptance">
          <span className="kr-legal-section-label">
            01
          </span>

          <h2>Acceptance of these terms</h2>

          <p>
            By accessing or using the KeyRoutes website,
            submitting a form, downloading a report, requesting a
            consultation, subscribing to communications or using
            any related service, you agree to these Terms &
            Conditions.
          </p>

          <p>
            If you do not agree with these terms, you should not
            use the website or submit information through it.
          </p>
        </section>

        <section id="about">
          <span className="kr-legal-section-label">
            02
          </span>

          <h2>About KeyRoutes</h2>

          <p>
            KeyRoutes provides strategy, marketing, technology,
            automation, research, analytics and related digital
            services. KeyRoutes is presented as a product by
            Sixedge Innovations.
          </p>

          <p>
            References to “KeyRoutes”, “we”, “us” or “our” in
            these terms refer to the operator of the KeyRoutes
            website and the relevant contracting entity providing
            the requested service.
          </p>
        </section>

        <section id="permitted-use">
          <span className="kr-legal-section-label">
            03
          </span>

          <h2>Permitted use</h2>

          <p>You may use this website only for lawful purposes.</p>

          <ul>
            <li>
              You must provide accurate information when
              submitting forms.
            </li>
            <li>
              You must not interfere with the website’s operation,
              security or availability.
            </li>
            <li>
              You must not attempt unauthorized access to systems,
              accounts, data or administrative areas.
            </li>
            <li>
              You must not submit malicious code, spam, fraudulent
              information or unlawful material.
            </li>
            <li>
              You must not scrape, reproduce or systematically
              extract website content without authorization.
            </li>
          </ul>
        </section>

        <section id="services">
          <span className="kr-legal-section-label">
            04
          </span>

          <h2>Services and proposals</h2>

          <p>
            Website descriptions, case studies, reports,
            estimates, consultation information and service pages
            are provided for general information. They do not
            constitute a binding offer unless confirmed through a
            separate written proposal, statement of work,
            contract or order.
          </p>

          <p>
            Scope, pricing, timelines, deliverables, payment terms
            and responsibilities for professional services will
            be governed by the applicable written agreement.
          </p>
        </section>

        <section id="reports">
          <span className="kr-legal-section-label">
            05
          </span>

          <h2>Reports, case studies and market information</h2>

          <p>
            Market reports, case studies, performance snapshots,
            campaign metrics, commentary and recommendations are
            provided for general informational and reference
            purposes.
          </p>

          <p>
            They do not constitute legal, financial, tax,
            valuation, investment or property-purchase advice.
            Historical campaign results do not guarantee future
            results.
          </p>

          <p>
            Market conditions, platform data, advertising costs,
            inventory, prices and performance metrics may change
            after publication.
          </p>
        </section>

        <section id="accounts-forms">
          <span className="kr-legal-section-label">
            06
          </span>

          <h2>Forms and submissions</h2>

          <p>
            You are responsible for ensuring that information
            submitted through consultation, careers, newsletter,
            review, feedback and problem-reporting forms is
            accurate and does not infringe another person’s
            rights.
          </p>

          <p>
            Do not submit passwords, payment-card information,
            government identification details, confidential trade
            secrets or unnecessary sensitive personal
            information through general website forms.
          </p>
        </section>

        <section id="intellectual-property">
          <span className="kr-legal-section-label">
            07
          </span>

          <h2>Intellectual property</h2>

          <p>
            Unless otherwise stated, the KeyRoutes name, branding,
            website design, copy, reports, graphics, case studies,
            presentations, software, templates, processes and
            original content are owned by or licensed to
            KeyRoutes or Sixedge Innovations.
          </p>

          <p>
            You may view and download publicly available resources
            for personal or internal business reference. You may
            not sell, republish, modify, distribute, remove
            attribution from or commercially exploit them without
            written permission.
          </p>
        </section>

        <section id="third-party">
          <span className="kr-legal-section-label">
            08
          </span>

          <h2>Third-party services and links</h2>

          <p>
            The website may link to third-party platforms,
            websites, social networks, advertising services,
            analytics tools, messaging providers, payment
            services or external sources.
          </p>

          <p>
            KeyRoutes does not control third-party services and is
            not responsible for their availability, content,
            security, privacy practices or terms.
          </p>
        </section>

        <section id="availability">
          <span className="kr-legal-section-label">
            09
          </span>

          <h2>Website availability</h2>

          <p>
            We aim to maintain a secure and reliable website, but
            we do not guarantee uninterrupted or error-free
            access. We may update, suspend, withdraw or restrict
            any website feature for maintenance, security,
            compliance or operational reasons.
          </p>
        </section>

        <section id="disclaimers">
          <span className="kr-legal-section-label">
            10
          </span>

          <h2>Disclaimers</h2>

          <p>
            The website and its publicly available content are
            provided on an “as available” basis. To the extent
            permitted by applicable law, we do not make implied
            warranties regarding uninterrupted availability,
            merchantability, fitness for a particular purpose or
            non-infringement.
          </p>
        </section>

        <section id="liability">
          <span className="kr-legal-section-label">
            11
          </span>

          <h2>Limitation of liability</h2>

          <p>
            To the extent permitted by applicable law, KeyRoutes
            and Sixedge Innovations will not be liable for
            indirect, incidental, special or consequential loss
            arising from the use of, or inability to use, the
            website or publicly available resources.
          </p>

          <p>
            Nothing in these terms excludes liability that cannot
            lawfully be excluded, including liability for fraud or
            any other liability protected by mandatory law.
          </p>
        </section>

        <section id="indemnity">
          <span className="kr-legal-section-label">
            12
          </span>

          <h2>Your responsibility</h2>

          <p>
            You are responsible for losses, claims or expenses
            arising from your unlawful use of the website, breach
            of these terms, infringement of third-party rights or
            submission of unlawful content.
          </p>
        </section>

        <section id="privacy">
          <span className="kr-legal-section-label">
            13
          </span>

          <h2>Privacy and cookies</h2>

          <p>
            Our handling of personal information is explained in
            the Privacy Policy. Our use of cookies and similar
            technologies is explained in the Cookies Policy.
          </p>
        </section>

        <section id="changes">
          <span className="kr-legal-section-label">
            14
          </span>

          <h2>Changes to these terms</h2>

          <p>
            We may update these terms to reflect changes in our
            services, website, legal requirements or business
            practices. Updated terms will be published on this
            page with a revised “Last updated” date.
          </p>
        </section>

        <section id="law">
          <span className="kr-legal-section-label">
            15
          </span>

          <h2>Governing law and disputes</h2>

          <p>
            Unless a separate written agreement specifies
            otherwise, these terms are governed by the laws
            applicable to the KeyRoutes operating entity handling
            the relevant service.
          </p>

          <p>
            Where legally permitted, disputes connected with
            services supplied from India will be subject to the
            competent courts in Hyderabad, Telangana. Mandatory
            consumer rights and jurisdictional protections remain
            unaffected.
          </p>
        </section>

        <section id="contact">
          <span className="kr-legal-section-label">
            16
          </span>

          <h2>Contact</h2>

          <p>
            Questions about these terms may be sent to:
          </p>

          <address>
            <strong>KeyRoutes</strong>
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

export default Terms;