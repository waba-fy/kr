import {
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaFilter,
  FaGoogle,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const normaliseText = (value) =>
  String(value ?? "").trim();

const getServiceNames = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
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
    .filter(Boolean);
};

const PerformanceHighlights = ({ story }) => {
  const performance = story?.performance;

  if (!performance) {
    return null;
  }

  const metrics = Array.isArray(performance.cards)
    ? performance.cards.filter(Boolean)
    : [];

  const supportingMetrics = Array.isArray(
    performance.supportingMetrics
  )
    ? performance.supportingMetrics.filter(Boolean)
    : [];

  const platforms = Array.isArray(
    performance.platformHighlights
  )
    ? performance.platformHighlights.filter(Boolean)
    : [];

  const services = getServiceNames(
    story?.servicesDelivered?.services
  );

  const hasContent =
    metrics.length > 0 ||
    supportingMetrics.length > 0 ||
    platforms.length > 0;

  if (!hasContent) {
    return null;
  }

  const clientTitle =
    normaliseText(story?.hero?.title) ||
    "Client Success Story";

  const subtitle = normaliseText(
    story?.hero?.subtitle
  );

  const location =
    normaliseText(story?.hero?.location) ||
    normaliseText(story?.partnership?.location);

  const status =
    normaliseText(story?.partnership?.status) ||
    normaliseText(story?.hero?.status);

  const eyebrow =
    normaliseText(performance.eyebrow) ||
    "PERFORMANCE HIGHLIGHTS";

  const heading =
    normaliseText(performance.title) ||
    "Results That Created Visible Growth";

  const description = normaliseText(
    performance.description
  );

  const note = normaliseText(
    performance.note
  );

  return (
    <section
      className="kr-performance-highlights"
      aria-labelledby="performance-highlights-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="kr-success-section-eyebrow">
            {eyebrow}
          </span>

          <h2 id="performance-highlights-title">
            {heading}
          </h2>

          {description && (
            <p>{description}</p>
          )}
        </header>

        <article
          className={`kr-performance-story-card ${
            story?.featured ? "is-featured" : ""
          }`.trim()}
        >
          <div className="kr-performance-story-header">
            <div>
              <span className="kr-performance-story-label">
                CLIENT PERFORMANCE
              </span>

              <h3>{clientTitle}</h3>

              {(subtitle || location) && (
                <p>
                  {[subtitle, location]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              )}
            </div>

            {status && (
              <span className="kr-performance-story-status">
                {status}
              </span>
            )}
          </div>

          {metrics.length > 0 && (
            <div className="kr-performance-card-metrics">
              {metrics.map((metric, index) => {
                const metricLabel =
                  normaliseText(metric?.label) ||
                  "Performance Metric";

                const metricValue =
                  normaliseText(metric?.value) ||
                  "—";

                const metricDescription =
                  normaliseText(
                    metric?.description
                  );

                return (
                  <div
                    className="kr-performance-card-metric"
                    key={`${
                      story?.slug || clientTitle
                    }-metric-${index}`}
                  >
                    <span className="kr-performance-metric-icon">
                      {index === 0 && (
                        <FaUsers aria-hidden="true" />
                      )}

                      {index === 1 && (
                        <FaFilter aria-hidden="true" />
                      )}

                      {index === 2 && (
                        <FaChartLine
                          aria-hidden="true"
                        />
                      )}

                      {index >= 3 && (
                        <FaMoneyBillWave
                          aria-hidden="true"
                        />
                      )}
                    </span>

                    <div>
                      <strong>{metricValue}</strong>

                      <span>{metricLabel}</span>

                      {metricDescription && (
                        <p>{metricDescription}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {supportingMetrics.length > 0 && (
            <div className="kr-performance-supporting-metrics">
              {supportingMetrics.map(
                (metric, index) => (
                  <div
                    key={`${
                      story?.slug || clientTitle
                    }-support-${index}`}
                  >
                    <strong>
                      {normaliseText(
                        metric?.value
                      ) || "—"}
                    </strong>

                    <span>
                      {normaliseText(
                        metric?.label
                      ) || "Supporting Metric"}
                    </span>

                    {metric?.description && (
                      <p>
                        {metric.description}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {platforms.length > 0 && (
            <div className="kr-performance-platforms">
              {platforms.map(
                (platform, index) => {
                  const platformName =
                    normaliseText(
                      platform?.platform
                    ) ||
                    normaliseText(
                      platform?.title
                    ) ||
                    "Marketing Platform";

                  const isGoogle =
                    platformName
                      .toLowerCase()
                      .includes("google");

                  return (
                    <div
                      key={`${
                        story?.slug ||
                        clientTitle
                      }-platform-${index}`}
                    >
                      <span className="kr-performance-platform-icon">
                        {isGoogle ? (
                          <FaGoogle
                            aria-hidden="true"
                          />
                        ) : (
                          <FaBullhorn
                            aria-hidden="true"
                          />
                        )}
                      </span>

                      <div>
                        <strong>
                          {platformName}
                        </strong>

                        {platform?.description && (
                          <p>
                            {
                              platform.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {services.length > 0 && (
            <div className="kr-performance-services">
              {services
                .slice(0, 6)
                .map((service, index) => (
                  <span
                    key={`${service}-${index}`}
                  >
                    <FaCheckCircle
                      aria-hidden="true"
                    />

                    {service}
                  </span>
                ))}
            </div>
          )}

          {note && (
            <p className="kr-performance-note">
              {note}
            </p>
          )}
        </article>
      </div>
    </section>
  );
};

export default PerformanceHighlights;