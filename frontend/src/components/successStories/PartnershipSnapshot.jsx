import {
  FaCalendarAlt,
  FaCheckCircle,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaProjectDiagram,
} from "react-icons/fa";

const normaliseText = (value) =>
  String(value ?? "").trim();

const normaliseList = (items) => {
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

const PartnershipSnapshot = ({ story }) => {
  const partnership = story?.partnership;

  if (!partnership) {
    return null;
  }

  const projects = normaliseList(
    partnership.projects
  );

  const channels = normaliseList(
    partnership.channels
  );

  const highlights = normaliseList(
    partnership.highlights
  );

  const snapshotItems = [
    {
      label: "Partnership Since",
      value:
        normaliseText(partnership.since) ||
        normaliseText(partnership.duration),
      icon: FaCalendarAlt,
    },
    {
      label: "Project Category",
      value:
        normaliseText(partnership.category) ||
        normaliseText(
          partnership.projectType
        ),
      icon: FaLayerGroup,
    },
    {
      label: "Location",
      value:
        normaliseText(partnership.location) ||
        normaliseText(
          story?.hero?.location
        ),
      icon: FaMapMarkerAlt,
    },
    {
      label: "Projects Supported",
      value: normaliseText(
        partnership.projectsSupported
      ),
      icon: FaProjectDiagram,
    },
  ].filter((item) => item.value);

  return (
    <section
      className="kr-partnership-snapshot"
      aria-labelledby="kr-partnership-snapshot-title"
    >
      <div className="kr-success-stories-container">
        <div className="kr-partnership-snapshot-layout">
          <div className="kr-partnership-snapshot-intro">
            <span className="kr-partnership-snapshot-eyebrow">
              {partnership.eyebrow ||
                "PARTNERSHIP SNAPSHOT"}
            </span>

            <h2 id="kr-partnership-snapshot-title">
              {partnership.title ||
                "A Partnership Built for Growth"}
            </h2>

            {partnership.description && (
              <p>
                {partnership.description}
              </p>
            )}

            {partnership.status && (
              <div className="kr-partnership-status">
                <span className="kr-partnership-status-dot" />

                {partnership.status}
              </div>
            )}
          </div>

          {snapshotItems.length > 0 && (
            <div className="kr-partnership-snapshot-stats">
              {snapshotItems.map(
                ({
                  label,
                  value,
                  icon: Icon,
                }) => (
                  <article
                    className="kr-partnership-snapshot-stat"
                    key={label}
                  >
                    <span className="kr-partnership-snapshot-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <div>
                      <span className="kr-partnership-snapshot-label">
                        {label}
                      </span>

                      <strong>{value}</strong>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>

        {(projects.length > 0 ||
          channels.length > 0 ||
          highlights.length > 0) && (
          <div className="kr-partnership-snapshot-details">
            {projects.length > 0 && (
              <article className="kr-partnership-detail-card kr-partnership-projects">
                <div className="kr-partnership-detail-heading">
                  <span className="kr-partnership-detail-icon">
                    <FaProjectDiagram
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <span>Projects</span>
                    <h3>Projects Supported</h3>
                  </div>
                </div>

                <div className="kr-partnership-project-list">
                  {projects.map(
                    (project, index) => (
                      <div
                        className="kr-partnership-project-item"
                        key={`${project.title}-${index}`}
                      >
                        <FaCheckCircle
                          aria-hidden="true"
                        />

                        <div>
                          <strong>
                            {project.title}
                          </strong>

                          {project.description && (
                            <p>
                              {
                                project.description
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </article>
            )}

            {channels.length > 0 && (
              <article className="kr-partnership-detail-card">
                <div className="kr-partnership-detail-heading">
                  <span className="kr-partnership-detail-icon">
                    <FaLayerGroup
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <span>Growth Channels</span>
                    <h3>
                      Channels Used
                    </h3>
                  </div>
                </div>

                <div className="kr-partnership-channel-list">
                  {channels.map(
                    (channel, index) => (
                      <div
                        className="kr-partnership-channel-item"
                        key={`${channel.title}-${index}`}
                      >
                        <span>
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <div>
                          <strong>
                            {channel.title}
                          </strong>

                          {channel.description && (
                            <p>
                              {
                                channel.description
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </article>
            )}

            {highlights.length > 0 && (
              <article className="kr-partnership-detail-card">
                <div className="kr-partnership-detail-heading">
                  <span className="kr-partnership-detail-icon">
                    <FaCheckCircle
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <span>Partnership Value</span>
                    <h3>
                      Key Highlights
                    </h3>
                  </div>
                </div>

                <ul className="kr-partnership-highlight-list">
                  {highlights.map(
                    (highlight, index) => (
                      <li
                        key={`${highlight.title}-${index}`}
                      >
                        <FaCheckCircle
                          aria-hidden="true"
                        />

                        <div>
                          <strong>
                            {highlight.title}
                          </strong>

                          {highlight.description && (
                            <p>
                              {
                                highlight.description
                              }
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </article>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnershipSnapshot;