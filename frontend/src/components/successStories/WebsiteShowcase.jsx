import { useMemo } from "react";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

import EmptyState from "../common/EmptyState";
import { successStories } from "../../data/successStoriesData";

const WebsiteShowcase = () => {
  const websites = useMemo(() => {
    return successStories
      .filter((story) => Boolean(story.website?.trim()))
      .map((story) => ({
        id: story.id || story.slug || story.title,
        title: story.title || "Project Website",
        builder: story.builder || story.client || "",
        category: story.category || story.projectType || "",
        location: story.location || "",
        website: story.website,
        image:
          story.gallery?.find(Boolean) ||
          story.coverImage ||
          story.logo ||
          "",
        result: story.result || "",
        services: Array.isArray(story.services)
          ? story.services.filter(Boolean)
          : [],
        featured: Boolean(story.featured),
      }));
  }, []);

  return (
    <section
      className="kr-website-showcase"
      aria-labelledby="website-showcase-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            WEBSITE SHOWCASE
          </span>

          <h2 id="website-showcase-title">
            Digital Experiences Built for{" "}
            <strong>Real Estate Projects</strong>
          </h2>

          <p>
            Explore live project websites and landing experiences
            created to improve visibility, buyer engagement,
            campaign performance and lead generation.
          </p>
        </header>

        {websites.length > 0 ? (
          <div className="kr-website-showcase-grid">
            {websites.map((item) => (
              <article
                className={`kr-website-showcase-card ${
                  item.featured ? "is-featured" : ""
                }`.trim()}
                key={item.id}
              >
                <div className="kr-website-showcase-preview">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.title} website preview`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="kr-website-showcase-fallback">
                      <FaGlobe aria-hidden="true" />
                      <span>Website Preview</span>
                    </div>
                  )}

                 

                  {item.category && (
                    <span className="kr-website-showcase-category">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="kr-website-showcase-content">
                  {(item.location || item.builder) && (
                    <div className="kr-website-showcase-meta">
                      {item.location && (
                        <span>
                          <FaMapMarkerAlt aria-hidden="true" />
                          {item.location}
                        </span>
                      )}

                      {item.builder && (
                        <span>{item.builder}</span>
                      )}
                    </div>
                  )}

                  <h3>{item.title}</h3>

                  {item.result && (
                    <p className="kr-website-showcase-result">
                      {item.result}
                    </p>
                  )}

                  {item.services.length > 0 && (
                    <div className="kr-website-showcase-services">
                      {item.services
                        .slice(0, 4)
                        .map((service) => (
                          <span key={service}>
                            {service}
                          </span>
                        ))}

                      {item.services.length > 4 && (
                        <span>
                          +{item.services.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="kr-website-showcase-actions">
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kr-website-showcase-primary"
                      aria-label={`Visit ${item.title} website`}
                    >
                      Visit Website
                      <FaArrowRight aria-hidden="true" />
                    </a>

                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kr-website-showcase-icon"
                      aria-label={`Open ${item.title} website in a new tab`}
                      title="Open in new tab"
                    >
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="kr-success-empty">
            <EmptyState
              title="Website showcase coming soon"
              message="Live project websites will appear here after website links are added to the success story data."
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default WebsiteShowcase;