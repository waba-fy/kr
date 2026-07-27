import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

import "../../styles/success-stories.css";

const SuccessCTA = () => {
  const whatsappMessage = encodeURIComponent(
    `Hi KeyRoutes,

I came across your Success Stories page and would like to discuss digital growth for our business.

We are interested in:
• Website Development
• SEO / GEO Optimisation
• Google & Meta Ads
• Lead Automation
• Analytics and Reporting

Please contact me to schedule a consultation.

Thank you.`
  );

  return (
    <section
      className="kr-success-cta"
      aria-labelledby="success-cta-title"
    >
      <div className="kr-success-cta-decoration" aria-hidden="true" />

      <div className="kr-success-stories-container">
        <div className="kr-success-cta-card">
          <span className="kr-success-cta-eyebrow">
            START YOUR SUCCESS STORY
          </span>

          <h2 id="success-cta-title">
            Ready to Build Your Next
            <strong> Growth Success Story?</strong>
          </h2>

          <p className="kr-success-cta-description">
            KeyRoutes can connect your website, landing pages,
            SEO, paid campaigns, analytics and lead workflows
            into one practical digital growth system.
          </p>

          <p className="kr-success-cta-support">
            Let us review your current setup, identify the
            opportunities and create a measurable roadmap for
            visibility, enquiries and long-term growth.
          </p>

          <div className="kr-success-cta-actions">
            <a
              href={`https://wa.me/918309436998?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="kr-success-cta-primary"
            >
              <FaWhatsapp aria-hidden="true" />
              Book a Free Consultation
              <FaArrowRight aria-hidden="true" />
            </a>

            <a
              href="/case-studies"
              className="kr-success-cta-secondary"
            >
              View Detailed Case Studies
              <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="kr-success-cta-trust">
            <span>Transparent strategy</span>
            <span>Measurable performance</span>
            <span>Long-term partnership</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCTA;