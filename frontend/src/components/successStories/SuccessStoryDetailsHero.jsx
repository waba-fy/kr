import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const SuccessStoryDetailsHero = ({ story }) => {
  if (!story) {
    return null;
  }

  const hero = story.hero || {};

  const partnership =
    story.partnership || {};

  const metrics = Array.isArray(
    story.performance?.cards
  )
    ? story.performance.cards
    : [];

  return (
    <section className="kr-success-story-details-hero">
      <div className="kr-success-stories-container">
        <div className="kr-success-story-details-layout">
          <div className="kr-success-story-details-content">
            <span className="kr-success-story-details-eyebrow">
              {hero.eyebrow ||
                "CLIENT SUCCESS STORY"}
            </span>

            <h1>{hero.title}</h1>

            <div className="kr-success-story-details-meta">
              {hero.subtitle && (
                <span>{hero.subtitle}</span>
              )}

              {hero.location && (
                <span>
                  <FaMapMarkerAlt />
                  {hero.location}
                </span>
              )}
            </div>

            {hero.services && (
              <div className="kr-success-story-details-services">
                {hero.services}
              </div>
            )}

            {hero.description && (
              <p className="kr-success-story-details-description">
                {hero.description}
              </p>
            )}

            <div className="kr-success-story-details-actions">
              {story.showcase?.websites?.[0]
                ?.website && (
                <a
                  href={
                    story.showcase
                      .websites[0].website
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kr-success-story-primary-btn"
                >
                  Visit Website
                  <FaExternalLinkAlt />
                </a>
              )}

              <Link
                to={`/case-studies/${
                  story.relatedCaseStudy ||
                  story.slug
                }`}
                className="kr-success-story-secondary-btn"
              >
                Detailed Case Study
                <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="kr-success-story-details-preview">
            {hero.coverImage && (
              <img
                src={hero.coverImage}
                alt={hero.title}
              />
            )}
          </div>
        </div>

        {metrics.length > 0 && (
          <div className="kr-success-story-details-metrics">
            {metrics.map((metric) => (
              <div
                key={metric.label}
              >
                <strong>
                  {metric.value}
                </strong>

                <span>
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoryDetailsHero;