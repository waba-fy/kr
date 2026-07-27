import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

import EmptyState from "../common/EmptyState";

const normaliseText = (value) =>
  String(value ?? "").trim();

const WebsiteShowcase = ({ story }) => {
  if (!story) {
    return null;
  }

 
  const websites = Array.isArray(story?.projects)
    ? story.projects.filter(Boolean)
    : Array.isArray(story?.showcase?.websites)
      ? story.showcase.websites.filter(Boolean)
      : [];

  const serviceNames = Array.isArray(
    story?.servicesDelivered?.services
  )
    ? story.servicesDelivered.services
        .map((service) => {
          if (typeof service === "string") {
            return normaliseText(service);
          }

          if (!service || typeof service !== "object") {
            return "";
          }

          return (
            normaliseText(service.title) ||
            normaliseText(service.name) ||
            normaliseText(service.label)
          );
        })
        .filter(Boolean)
    : Array.isArray(story?.services)
      ? story.services
          .map(normaliseText)
          .filter(Boolean)
      : [];

  const mainCoverImage =
    normaliseText(story?.coverImage) ||
    normaliseText(story?.showcase?.coverImage);

  const mainWebsite =
    normaliseText(story?.website) ||
    normaliseText(
      story?.showcase?.websites?.[0]?.website
    );

  const mainTitle =
    normaliseText(story?.hero?.title) ||
    "Client Website";

  const sectionEyebrow =
    normaliseText(story?.showcase?.eyebrow) ||
    "WEBSITE SHOWCASE";

  const sectionTitle =
    normaliseText(story?.showcase?.title) ||
    "Digital Experiences Built for Growth";

  const sectionDescription =
    normaliseText(story?.showcase?.description);

  const hasContent =
    Boolean(mainCoverImage) ||
    websites.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section
      className="kr-website-showcase"
      aria-labelledby="website-showcase-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="kr-success-section-eyebrow">
            {sectionEyebrow}
          </span>

          <h2 id="website-showcase-title">
            {sectionTitle}
          </h2>

          {sectionDescription && (
            <p>{sectionDescription}</p>
          )}
        </header>

        {/* =================================================
            MAIN CLIENT COVER IMAGE
        ================================================= */}

        {mainCoverImage && (
          <article className="kr-website-showcase-main">
            <div className="kr-website-showcase-main-preview">
              <img
                src={mainCoverImage}
                alt={`${mainTitle} main website showcase`}
                loading="lazy"
              />

              <span className="kr-website-showcase-main-badge">
                Featured Digital Experience
              </span>
            </div>

            <div className="kr-website-showcase-main-content">
              <div>
                <span className="kr-website-showcase-main-label">
                  MAIN CLIENT EXPERIENCE
                </span>

                <h3>{mainTitle}</h3>

                {sectionDescription && (
                  <p>{sectionDescription}</p>
                )}
              </div>

              {mainWebsite && (
                <div className="kr-website-showcase-main-actions">
                  <a
                    href={mainWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kr-website-showcase-primary"
                  >
                    Visit Main Website
                    <FaArrowRight aria-hidden="true" />
                  </a>

                  <a
                    href={mainWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kr-website-showcase-icon"
                    aria-label={`Open ${mainTitle} website`}
                  >
                    <FaExternalLinkAlt
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}
            </div>
          </article>
        )}

        {/* =================================================
            PROJECT-WISE WEBSITE CARDS
        ================================================= */}

        {websites.length > 0 ? (
          <div className="kr-website-showcase-grid">
            {websites.map((item, index) => {
              const projectName =
                normaliseText(item?.name) ||
                normaliseText(item?.title) ||
                `${mainTitle} Project`;

              const projectImage =
                normaliseText(item?.coverImage) ||
                normaliseText(item?.image) ||
                mainCoverImage;

              const projectWebsite =
                normaliseText(item?.website);

              const projectStatus =
                normaliseText(item?.status);

              const projectLocation =
                normaliseText(item?.location);

              const projectCategory =
                normaliseText(item?.category);

              return (
                <article
                  className="kr-website-showcase-card"
                  key={
                    item?.id ||
                    `${story?.slug || "story"}-${index}`
                  }
                >
                  <div className="kr-website-showcase-preview">
                    {projectImage ? (
                      <img
                        src={projectImage}
                        alt={`${projectName} website preview`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="kr-website-showcase-fallback">
                        <FaGlobe aria-hidden="true" />
                        <span>
                          Website Preview
                        </span>
                      </div>
                    )}

                    {projectCategory && (
                      <span className="kr-website-showcase-category">
                        {projectCategory}
                      </span>
                    )}
                  </div>

                  <div className="kr-website-showcase-content">
                    {projectLocation && (
                      <div className="kr-website-showcase-meta">
                        <span>
                          <FaMapMarkerAlt
                            aria-hidden="true"
                          />

                          {projectLocation}
                        </span>
                      </div>
                    )}

                    <h3>{projectName}</h3>

                    {projectStatus && (
                      <span className="kr-website-showcase-status">
                        {projectStatus}
                      </span>
                    )}

                    {serviceNames.length > 0 && (
                      <div className="kr-website-showcase-services">
                        {serviceNames
                          .slice(0, 6)
                          .map((service, serviceIndex) => (
                            <span
                              key={`${service}-${serviceIndex}`}
                            >
                              {service}
                            </span>
                          ))}
                      </div>
                    )}

                    {projectWebsite && (
                      <div className="kr-website-showcase-actions">
                        <a
                          href={projectWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="kr-website-showcase-primary"
                        >
                          Visit Website
                          <FaArrowRight
                            aria-hidden="true"
                          />
                        </a>

                        <a
                          href={projectWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="kr-website-showcase-icon"
                          aria-label={`Open ${projectName} website`}
                        >
                          <FaExternalLinkAlt
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          !mainCoverImage && (
            <div className="kr-success-empty">
              <EmptyState
                title="Website showcase coming soon"
                message="Website visuals will appear here when they are added."
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default WebsiteShowcase;