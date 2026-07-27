const formatCapturedDate = (value) => {
  if (!value) return "Latest available snapshot";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CaseStudyEvidence = ({ data }) => {
  if (!data) return null;

  const evidence = data.evidence || {};

  const items = Array.isArray(evidence.items)
    ? evidence.items.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.image
      )
    : [];

  const reportingNotes = Array.isArray(
    evidence.reportingNotes
  )
    ? evidence.reportingNotes.filter(Boolean)
    : [];

  const keyLearnings = Array.isArray(
    evidence.keyLearnings
  )
    ? evidence.keyLearnings.filter(Boolean)
    : [];

  const hasContent =
    evidence.title ||
    evidence.description ||
    items.length > 0 ||
    reportingNotes.length > 0 ||
    keyLearnings.length > 0;

  if (!hasContent) return null;

  return (
    <section className="cs-page cs-evidence-page">
      <header className="cs-section-header">
        <span className="cs-section-number">
          07
        </span>

        <div>
          <h5>
            {evidence.eyebrow ||
              "WEBSITE EVIDENCE"}
          </h5>

          <h2>
            {evidence.title ||
              "Landing Pages and Digital Experiences"}
          </h2>

          <p className="cs-section-description">
            {evidence.description ||
              "A selection of the websites and landing pages developed to support project visibility, campaign alignment and lead generation."}
          </p>
        </div>
      </header>

      {/* Website and landing-page images */}

      {items.length > 0 && (
        <div className="cs-evidence-grid">
          {items.map((item, index) => (
            <article
              className="cs-evidence-card"
              key={
                item.id ||
                item.title ||
                `website-evidence-${index}`
              }
            >
              <div className="cs-evidence-image-wrap">
                <img
                  src={item.image}
                  alt={
                    item.title ||
                    `${item.platform || "Website"} preview`
                  }
                  loading="lazy"
                />
              </div>

              <div className="cs-evidence-content">
                <span className="cs-evidence-platform">
                  {item.platform ||
                    "Landing Page"}
                </span>

                {item.capturedOn && (
                  <small>
                    Captured:{" "}
                    {formatCapturedDate(
                      item.capturedOn
                    )}
                  </small>
                )}

                <h3>
                  {item.title ||
                    "Website Experience"}
                </h3>

                <p>
                  {item.note ||
                    "A focused digital experience created to present the project clearly and support enquiry generation."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Reporting notes */}

      {reportingNotes.length > 0 && (
        <div className="cs-reporting-summary">
          <div className="cs-reporting-summary-heading">
            <span />

            <h3>Reporting Notes</h3>
          </div>

          <div className="cs-reporting-summary-grid">
            {reportingNotes.map(
              (note, index) => (
                <div
                  key={`reporting-note-${index}`}
                >
                  <small>
                    Note{" "}
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </small>

                  <p>
                    {typeof note === "string"
                      ? note
                      : note.description ||
                        note.title}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Key learnings */}

      {keyLearnings.length > 0 && (
        <div className="cs-key-learnings">
          <div className="cs-subsection-heading">
            <div>
              <span>KEY LEARNINGS</span>

              <h3>
                What We Learned From the
                Engagement
              </h3>
            </div>

            <small>
              {keyLearnings.length} insights
            </small>
          </div>

          <div className="cs-key-learnings-grid">
            {keyLearnings.map(
              (learning, index) => {
                const isString =
                  typeof learning === "string";

                const title = isString
                  ? learning
                  : learning.title;

                const description = isString
                  ? null
                  : learning.description;

                return (
                  <article
                    className="cs-learning-card"
                    key={
                      title ||
                      `learning-${index}`
                    }
                  >
                    <span className="cs-learning-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      <h4>
                        {title ||
                          "Key Learning"}
                      </h4>

                      {description && (
                        <p>
                          {description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      )}

      <div className="cs-important-note">
        <strong>
          Important reporting note
        </strong>

        <p>
          The website previews shown above document
          the digital experiences delivered during
          the engagement. Campaign and lead outcomes
          may also depend on pricing, inventory,
          buyer intent, market conditions and sales
          follow-up performance.
        </p>
      </div>
    </section>
  );
};

export default CaseStudyEvidence;