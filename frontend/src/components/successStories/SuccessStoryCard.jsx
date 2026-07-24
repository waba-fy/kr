import {
  FaArrowRight,
  FaCalendarAlt,
  FaDownload,
  FaIndustry,
  FaMapMarkerAlt,
  FaTrophy,
} from "react-icons/fa";

const SuccessStoryCard = ({
  story,
  onViewDetails,
}) => {
  if (!story) {
    return null;
  }

  const {
    title,
    client,
    builder,
    projectName,
    category,
    projectType,
    location,
    year,
    coverImage,
    summary,
    services,
    result,
    featured,
    pdf,
  } = story;

  const displayTitle =
    title ||
    projectName ||
    client ||
    "Success Story";

  const displayClient =
    builder || client || "";

  const displayIndustry =
    category || projectType || "";

  const safeServices = Array.isArray(services)
    ? services.filter(Boolean)
    : [];

  const resultText =
    typeof result === "string"
      ? result
      : result?.value ||
        result?.label ||
        "";

  return (
    <article
      className={`kr-success-story-card ${
        featured ? "is-featured" : ""
      }`.trim()}
    >
      

      <div className="kr-success-story-content">
        <div className="kr-success-story-meta">
          {location && (
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              {location}
            </span>
          )}

          {year && (
            <span>
              <FaCalendarAlt aria-hidden="true" />
              {year}
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

        {displayClient &&
          displayClient !== displayTitle && (
            <p className="kr-success-story-client">
              {displayClient}
            </p>
          )}

        {summary && (
          <p className="kr-success-story-summary">
            {summary}
          </p>
        )}

        {resultText && (
          <div className="kr-success-story-result">
            <FaTrophy aria-hidden="true" />

            <div>
              <span>Key Result</span>
              <strong>{resultText}</strong>
            </div>
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
          {typeof onViewDetails === "function" && (
            <button
              type="button"
              className="kr-success-story-view"
              onClick={() => onViewDetails(story)}
              aria-label={`View details for ${displayTitle}`}
            >
              View Story
              <FaArrowRight aria-hidden="true" />
            </button>
          )}

          {pdf && (
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="kr-success-story-download"
              aria-label={`Open ${displayTitle} PDF`}
            >
              <FaDownload aria-hidden="true" />
              Open PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default SuccessStoryCard;