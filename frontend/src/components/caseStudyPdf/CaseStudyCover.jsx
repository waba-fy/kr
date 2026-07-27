const 
CaseStudyCover = ({ data }) => {
  if (!data) return null;

  const cover = data.cover || {};

  const metrics = Array.isArray(cover.metrics)
    ? cover.metrics.filter(Boolean)
    : [];

  const formattedSnapshot = cover.snapshotDate
    ? new Date(cover.snapshotDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Latest available data";

  return (
    <section className="cs-page cs-cover">
      <div className="cs-cover-main">
        

        <div className="cs-cover-status-row">
          {cover.status && (
            <span className="cs-status cs-status-primary">
              {cover.status}
            </span>
          )}

          {cover.projectStatus && (
            <span className="cs-status cs-status-secondary">
              {cover.projectStatus}
            </span>
          )}
        </div>

        <div className="cs-cover-content">
          <p className="cs-cover-eyebrow">
            DIGITAL GROWTH & PERFORMANCE
          </p>

          <h1>
            {cover.title || "Case Study"}
          </h1>

          <h2>
            {cover.subtitle ||
              "Digital Growth & Performance Case Study"}
          </h2>

          <p className="cs-cover-description">
            {cover.description ||
              "A detailed digital growth case study."}
          </p>
        </div>

        <div className="cs-cover-meta">
          <p>
            <strong>
              Prepared by {cover.preparedBy || "KeyRoutes"}
            </strong>
          </p>

          <p>
            Campaign snapshot: {formattedSnapshot}
          </p>
        </div>

        {metrics.length > 0 && (
          <div className="cs-cover-metrics">
            {metrics.map((item, index) => (
              <div
                className="cs-cover-metric"
                key={`${item.label}-${index}`}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="cs-cover-performance">
        <div className="cs-cover-performance-line" />

        {metrics.length > 0 && (
          <div className="cs-cover-performance-values">
            {metrics.slice(0, 2).map((item, index) => (
              <div
                key={`${item.label}-${index}`}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {cover.coverImage ? (
          <div className="cs-cover-chart">
            <img
              src={cover.coverImage}
              alt={`${cover.title || "Case study"} cover`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "14px",
              }}
            />
          </div>
        ) : (
          <div
            className="cs-cover-chart"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 260 180"
              role="presentation"
            >
              <path
                className="cs-cover-chart-axis"
                d="M20 155 H240"
              />

              <path
                className="cs-cover-chart-path"
                d="
                  M25 145
                  C45 100, 65 75, 90 100
                  C115 125, 125 155, 150 110
                  C170 75, 180 120, 195 75
                  C210 55, 220 70, 235 25
                "
              />
            </svg>
          </div>
        )}
      </aside>
    </section>
  );
};

export default CaseStudyCover;