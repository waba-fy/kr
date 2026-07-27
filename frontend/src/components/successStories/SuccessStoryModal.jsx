import {
  FaCalendarAlt,
  FaCheckCircle,
  FaDownload,
  FaExternalLinkAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";

import DownloadButton from "../common/DownloadButton";

const SuccessStoryModal = ({
  story,
  onClose,
}) => {
  if (!story) {
    return null;
  }

  const displayTitle =
    story.title ||
    story.projectName ||
    story.client ||
    "Success Story";

  return (
    <div
      className="kr-success-story-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        className="kr-success-story-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-story-modal-title"
      >
        <button
          type="button"
          className="kr-success-story-modal-close"
          onClick={onClose}
          aria-label="Close success story"
        >
          <FaTimes />
        </button>

        <div className="kr-success-story-modal-header">
          <div className="kr-success-story-modal-heading">
            <span>
              {story.projectType ||
                story.category ||
                "SUCCESS STORY"}
            </span>

            <h2 id="success-story-modal-title">
              {displayTitle}
            </h2>

            {story.subtitle && <p>{story.subtitle}</p>}

            <div className="kr-success-story-modal-header-meta">
              {story.location && (
                <span>
                  <FaMapMarkerAlt />
                  {story.location}
                </span>
              )}

              {story.year && (
                <span>
                  <FaCalendarAlt />
                  {story.year}
                </span>
              )}

              {story.status && (
                <span>
                  <FaCheckCircle />
                  {story.status}
                </span>
              )}
            </div>
          </div>
          
       </div>

        <div className="kr-success-story-modal-body">
          {story.result && (
            <div className="kr-success-story-modal-result">
              <FaTrophy />

              <div>
                <span>Key Result</span>
                <strong>{story.result}</strong>
              </div>
            </div>
          )}

          {story.overview && (
            <div className="kr-success-story-modal-section">
              <h3>
                {story.overviewTitle || "Project Overview"}
              </h3>

              <p>{story.overview}</p>
            </div>
          )}

          {story.kpis?.length > 0 && (
            <div className="kr-success-story-modal-kpis">
              {story.kpis.map((item, index) => (
                <div
                  className="kr-success-story-modal-kpi"
                  key={`${item.label}-${index}`}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {story.services?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>Services Delivered</h3>

              <div className="kr-success-story-modal-tags">
                {story.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>
          )}

          {story.challenges?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>Challenges</h3>

              <div className="kr-success-story-modal-list">
                {story.challenges.map((item) => (
                  <p key={item}>
                    <FaTimes />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {story.strategy?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>KeyRoutes Strategy</h3>

              <div className="kr-success-story-modal-steps">
                {story.strategy.map((item, index) => (
                  <div key={item}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {story.seo?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>SEO & GEO Implementation</h3>

              <div className="kr-success-story-modal-checks">
                {story.seo.map((item) => (
                  <p key={item}>
                    <FaCheckCircle />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {story.automation?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>Automation Workflow</h3>

              <div className="kr-success-story-modal-tags">
                {story.automation.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          )}

          {story.funnel?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>Growth Funnel</h3>

              <div className="kr-success-story-modal-funnel">
                {story.funnel.map((item, index) => (
                  <div key={item}>
                    <span>{index + 1}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {story.technologies?.length > 0 && (
            <div className="kr-success-story-modal-section">
              <h3>Technology Stack</h3>

              <div className="kr-success-story-modal-tags">
                {story.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          )}

          <div className="kr-success-story-modal-actions">
            {story.pdf && (
              <DownloadButton
                title="Download Full Story"
                description={story.subtitle || story.result}
                href={story.pdf}
              />
            )}

            <div className="kr-success-story-modal-links">
              {story.website && (
                <a
                  href={story.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe />
                  Visit Website
                </a>
              )}

              {story.externalUrl && (
                <a
                  href={story.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  External Source
                </a>
              )}

              {story.pdf && (
                <a
                  href={story.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                  Open PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryModal;