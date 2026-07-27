import { Link } from "react-router-dom";

const CaseStudyCTA = ({ data }) => {
  if (!data) return null;

  const cta = data.callToAction || {};
  const primaryAction = cta.primaryAction || {};
  const secondaryAction = cta.secondaryAction || {};
  const contact = cta.contact || {};

  const hasContact =
    contact.phone ||
    contact.whatsapp ||
    contact.email;

  const hasContent =
    cta.title ||
    cta.description ||
    cta.supportingText ||
    primaryAction.label ||
    secondaryAction.label ||
    hasContact;

  if (!hasContent) return null;

  const isExternalLink = (href = "") =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  const renderAction = (
    action,
    className
  ) => {
    if (!action?.label || !action?.href) {
      return null;
    }

    if (isExternalLink(action.href)) {
      return (
        <a
          href={action.href}
          className={className}
          target={
            action.href.startsWith("http")
              ? "_blank"
              : undefined
          }
          rel={
            action.href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
        >
          {action.label}
        </a>
      );
    }

    return (
      <Link
        to={action.href}
        className={className}
      >
        {action.label}
      </Link>
    );
  };

  return (
    <section className="cs-page cs-cta-page">
      <div className="cs-cta-panel">
        <div className="cs-cta-content">
          <span className="cs-cta-eyebrow">
            {cta.eyebrow ||
              "BUILD YOUR SUCCESS STORY"}
          </span>

          <h2>
            {cta.title ||
              "Ready to Build a More Measurable Growth System?"}
          </h2>

          {cta.description && (
            <p className="cs-cta-description">
              {cta.description}
            </p>
          )}

          {cta.supportingText && (
            <p className="cs-cta-supporting-text">
              {cta.supportingText}
            </p>
          )}

          <div className="cs-cta-actions">
            {renderAction(
              primaryAction,
              "cs-cta-primary"
            )}

            {renderAction(
              secondaryAction,
              "cs-cta-secondary"
            )}
          </div>
        </div>

        {hasContact && (
          <aside className="cs-cta-contact">
            <span className="cs-content-label">
              START A CONVERSATION
            </span>

            <h3>
              Speak With the KeyRoutes Team
            </h3>

            <p>
              Share your current challenges,
              growth goals and campaign setup.
              We’ll help identify the next
              practical steps.
            </p>

            <div className="cs-cta-contact-list">
              {contact.phone && (
                <a
                  href={
                    contact.phoneHref ||
                    `tel:${String(
                      contact.phone
                    ).replace(
                      /[^+\d]/g,
                      ""
                    )}`
                  }
                  className="cs-cta-contact-item"
                >
                  <small>Call</small>

                  <strong>
                    {contact.phone}
                  </strong>
                </a>
              )}

              {contact.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-cta-contact-item"
                >
                  <small>WhatsApp</small>

                  <strong>
                    Start a conversation
                  </strong>
                </a>
              )}

              {contact.email && (
                <a
                  href={
                    contact.emailHref ||
                    `mailto:${contact.email}`
                  }
                  className="cs-cta-contact-item"
                >
                  <small>Email</small>

                  <strong>
                    {contact.email}
                  </strong>
                </a>
              )}
            </div>
          </aside>
        )}
      </div>

      <div className="cs-cta-footer">
        <div>
          <span>KEYROUTES</span>

          <p>
            Digital growth systems built around
            visibility, performance, analytics
            and lead automation.
          </p>
        </div>

        <Link
          to="/case-studies"
          className="cs-cta-footer-link"
        >
          Explore More Case Studies
        </Link>
      </div>
    </section>
  );
};

export default CaseStudyCTA;