import {
  FaStar,
  FaRegStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaPlayCircle,
  FaFilePdf,
} from "react-icons/fa";

const renderStars = (rating = 0) =>
  Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < Math.round(rating);

    return isFilled ? (
      <FaStar key={index} aria-hidden="true" />
    ) : (
      <FaRegStar key={index} aria-hidden="true" />
    );
  });

const ReviewCard = ({ review, onReadMore }) => {
  if (!review) {
    return null;
  }

  const {
    title,
    client,
    company,
    location,
    reviewer,
    rating = 0,
    logo,
    image,
    shortReview,
    review: fullReview,
    services = [],
    website,
    video,
    pdf,
  } = review;

  const reviewText = shortReview || fullReview || "";

  return (
    <article className="kr-review-card">
      <div className="kr-review-card-head">
        <div className="kr-review-brand">
          {logo ? (
            <img
              src={logo}
              alt={`${client || company || "Client"} logo`}
              className="kr-review-logo"
              loading="lazy"
            />
          ) : (
            <div className="kr-review-logo-fallback" aria-hidden="true">
              {(client || company || "K").charAt(0)}
            </div>
          )}

          <div>
            <p className="kr-review-client">
              {client || company}
            </p>

            {company && company !== client && (
              <p className="kr-review-company">
                {company}
              </p>
            )}
          </div>
        </div>

        
      </div>

      <div
        className="kr-review-rating"
        aria-label={`${rating} out of 5 stars`}
      >
        <span className="kr-review-stars">
          {renderStars(rating)}
        </span>

        <strong>{rating.toFixed(1)}</strong>
      </div>

      <h3>{title}</h3>

      <blockquote>
        “{reviewText}”
      </blockquote>

      <div className="kr-review-meta">
        {reviewer && (
          <span>{reviewer}</span>
        )}

        {location && (
          <span>
            <FaMapMarkerAlt aria-hidden="true" />
            {location}
          </span>
        )}
      </div>

      {services.length > 0 && (
        <div className="kr-review-services">
          {services.slice(0, 4).map((service) => (
            <small key={service}>
              {service}
            </small>
          ))}

          {services.length > 4 && (
            <small>
              +{services.length - 4} more
            </small>
          )}
        </div>
      )}

      <div className="kr-review-actions">
        {typeof onReadMore === "function" && (
          <button
            type="button"
            className="kr-review-read-more"
            onClick={() => onReadMore(review)}
          >
            Read Full Review
          </button>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${client || company} website`}
          >
            <FaGlobe aria-hidden="true" />
            Website
          </a>
        )}

        {video && (
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPlayCircle aria-hidden="true" />
            Video
          </a>
        )}

        {pdf && (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf aria-hidden="true" />
            PDF
          </a>
        )}
      </div>
    </article>
  );
};

export default ReviewCard;