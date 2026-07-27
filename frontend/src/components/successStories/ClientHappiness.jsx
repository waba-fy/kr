import {
  FaCheckCircle,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

const normaliseText = (value) =>
  String(value ?? "").trim();

const normaliseHighlights = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (typeof item === "string") {
        return {
          title: normaliseText(item),
          description: "",
        };
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      return {
        title:
          normaliseText(item.title) ||
          normaliseText(item.name) ||
          normaliseText(item.label),

        description:
          normaliseText(item.description) ||
          normaliseText(item.value),
      };
    })
    .filter((item) => item?.title);
};

const getInitials = (value) => {
  const words = normaliseText(value)
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "KR";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const ClientHappiness = ({ story }) => {
  const clientHappiness =
    story?.clientHappiness;

  if (!clientHappiness) {
    return null;
  }

  const quote = normaliseText(
    clientHappiness.quote
  );

  const reviewer =
    normaliseText(
      clientHappiness.reviewer
    ) ||
    normaliseText(
      clientHappiness.clientName
    );

  const designation =
    normaliseText(
      clientHappiness.designation
    );

  const company =
    normaliseText(
      clientHappiness.company
    ) ||
    normaliseText(
      story?.hero?.title
    );

  const reviewerImage =
    normaliseText(
      clientHappiness.image
    ) ||
    normaliseText(
      clientHappiness.reviewerImage
    );

  const relationshipHighlights =
    normaliseHighlights(
      clientHappiness.relationshipHighlights
    );

  const ratingValue = Number(
    clientHappiness.rating
  );

  const rating =
    Number.isFinite(ratingValue) &&
    ratingValue > 0
      ? Math.min(
          Math.round(ratingValue),
          5
        )
      : 5;

  const hasContent =
    Boolean(quote) ||
    Boolean(reviewer) ||
    relationshipHighlights.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section
      className="kr-client-happiness"
      aria-labelledby="kr-client-happiness-title"
    >
      <div className="kr-success-stories-container">
        <div className="kr-client-happiness-layout">
          <div className="kr-client-happiness-intro">
            <span className="kr-client-happiness-eyebrow">
              {clientHappiness.eyebrow ||
                "HAPPY CLIENT"}
            </span>

            <h2 id="kr-client-happiness-title">
              {clientHappiness.title ||
                "A Partnership Clients Value"}
            </h2>

            {clientHappiness.description && (
              <p>
                {
                  clientHappiness.description
                }
              </p>
            )}

            {relationshipHighlights.length >
              0 && (
              <div className="kr-client-relationship-highlights">
                {relationshipHighlights.map(
                  (item, index) => (
                    <article
                      className="kr-client-relationship-item"
                      key={`${item.title}-${index}`}
                    >
                      <span className="kr-client-relationship-icon">
                        <FaCheckCircle
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        {item.description && (
                          <p>
                            {
                              item.description
                            }
                          </p>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </div>

          <article className="kr-client-testimonial-card">
            <div className="kr-client-testimonial-top">
              <span className="kr-client-quote-icon">
                <FaQuoteLeft
                  aria-hidden="true"
                />
              </span>

              <div
                className="kr-client-rating"
                aria-label={`${rating} out of 5 stars`}
              >
                {Array.from(
                  { length: 5 },
                  (_, index) => (
                    <FaStar
                      key={index}
                      aria-hidden="true"
                      className={
                        index < rating
                          ? "is-active"
                          : ""
                      }
                    />
                  )
                )}
              </div>
            </div>

            {quote && (
              <blockquote>
                “{quote}”
              </blockquote>
            )}

            <div className="kr-client-reviewer">
              <div className="kr-client-reviewer-avatar">
                {reviewerImage ? (
                  <img
                    src={reviewerImage}
                    alt={
                      reviewer ||
                      company ||
                      "Client representative"
                    }
                    loading="lazy"
                  />
                ) : (
                  <span>
                    {getInitials(
                      reviewer || company
                    )}
                  </span>
                )}
              </div>

              <div className="kr-client-reviewer-details">
                <strong>
                  {reviewer ||
                    "Client Representative"}
                </strong>

                {(designation ||
                  company) && (
                  <p>
                    {designation}

                    {designation &&
                      company &&
                      " • "}

                    {company}
                  </p>
                )}
              </div>
            </div>

            <div className="kr-client-testimonial-badge">
              <FaCheckCircle
                aria-hidden="true"
              />

              <span>
                Verified Client Partnership
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ClientHappiness;