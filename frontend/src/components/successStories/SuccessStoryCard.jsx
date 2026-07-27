import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaIndustry,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const normalizeSlug = (value = "") =>
  String(value)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^success-stories\//, "")
    .replace(/^case-studies\//, "");

const getServiceName = (service) => {
  if (typeof service === "string") {
    return service;
  }

  return service?.title || "";
};

const SuccessStoryCard = ({ story }) => {
  if (!story || typeof story !== "object") {
    return null;
  }

  const hero = story.hero || {};
  const partnership = story.partnership || {};
  const performance = story.performance || {};
  const clientHappiness = story.clientHappiness || {};
  const servicesDelivered = story.servicesDelivered || {};

  const displayTitle =
    hero.title || "Client Success Story";

  const displayIndustry =
    partnership.category ||
    partnership.projectType ||
    hero.subtitle ||
    "";

  const displayLocation =
    hero.location ||
    partnership.location ||
    "";

  const displayYear =
    partnership.duration ||
    partnership.since ||
    "";

  const displayStatus =
    partnership.status ||
    hero.status ||
    "";

  const displayImage =
    hero.coverImage ||
    hero.logo ||
    "";

  const displaySummary =
    hero.description ||
    partnership.description ||
    "";

  const resultText =
    hero.result ||
    performance.title ||
    "";

  const safeServices = Array.isArray(
    servicesDelivered.services
  )
    ? servicesDelivered.services
        .map(getServiceName)
        .filter(Boolean)
    : [];

  const metrics = Array.isArray(
    performance.cards
  )
    ? performance.cards.filter(Boolean)
    : [];

  const normalizedSlug =
    normalizeSlug(story.slug);

  const rating = Number(
    clientHappiness.rating || 0
  );

  return (
    <article
      className={`kr-success-story-card ${
        story.featured ? "is-featured" : ""
      }`.trim()}
    >
      <div className="kr-success-story-image">
        {displayImage ? (
          <img
            src={displayImage}
            alt={`${displayTitle} success story`}
            loading="lazy"
          />
        ) : (
          <div className="kr-success-story-image-fallback">
            <FaChartLine aria-hidden="true" />
            <span>Client Success Story</span>
          </div>
        )}

        <div
          className="kr-success-story-image-overlay"
          aria-hidden="true"
        />

       

        {displayStatus && (
          <span className="kr-success-story-status">
            {displayStatus}
          </span>
        )}
      </div>

      <div className="kr-success-story-content">
        <div className="kr-success-story-meta">
          {displayLocation && (
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              {displayLocation}
            </span>
          )}

          {displayYear && (
            <span>
              <FaCalendarAlt aria-hidden="true" />
              {displayYear}
            </span>
          )}

          {displayIndustry && (
            <span>
              <FaIndustry aria-hidden="true" />
              {displayIndustry}
            </span>
          )}
        </div>

        <h3>{displayTitle}</h3>

        {hero.subtitle && (
          <p className="kr-success-story-client">
            {hero.subtitle}
          </p>
        )}

        {displaySummary && (
          <p className="kr-success-story-summary">
            {displaySummary}
          </p>
        )}

        {resultText && (
          <div className="kr-success-story-result">
            <FaChartLine aria-hidden="true" />

            <div>
              <span>Partnership Result</span>
              <strong>{resultText}</strong>
            </div>
          </div>
        )}

        {metrics.length > 0 && (
          <div className="kr-success-story-metrics">
            {metrics
              .slice(0, 4)
              .map((metric, index) => (
                <div
                  key={`${story.id}-metric-${index}`}
                >
                  <strong>
                    {metric?.value || "—"}
                  </strong>

                  <span>
                    {metric?.label ||
                      "Performance Result"}
                  </span>
                </div>
              ))}
          </div>
        )}

        {rating > 0 && (
          <div
            className="kr-success-story-rating"
            aria-label={`${rating} out of 5 client rating`}
          >
            <div>
              {Array.from({
                length: Math.min(rating, 5),
              }).map((_, index) => (
                <FaStar
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>

            <span>
              Client partnership satisfaction
            </span>
          </div>
        )}

        {safeServices.length > 0 && (
          <div className="kr-success-story-services">
            {safeServices
              .slice(0, 4)
              .map((service) => (
                <span key={service}>
                  {service}
                </span>
              ))}

            {safeServices.length > 4 && (
              <span>
                +{safeServices.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="kr-success-story-actions">
          <Link
            to={`/success-stories/${normalizedSlug}`}
            className="kr-success-story-view"
            aria-label={`View success story for ${displayTitle}`}
          >
            View Success Story
            <FaArrowRight aria-hidden="true" />
          </Link>

          <Link
            to={`/case-studies/${
              story.relatedCaseStudy ||
              normalizedSlug
            }`}
            className="kr-success-story-case-study"
            aria-label={`View detailed case study for ${displayTitle}`}
          >
            Detailed Case Study
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SuccessStoryCard;