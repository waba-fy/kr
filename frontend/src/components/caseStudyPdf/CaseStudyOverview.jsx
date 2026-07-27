const CaseStudyOverview = ({ data }) => {
  if (!data) return null;

  const summary = data.executiveSummary || {};
  const project = data.clientProject || {};

  const highlights = Array.isArray(summary.highlights)
    ? summary.highlights.filter(Boolean)
    : [];

  return (
    <section className="cs-page cs-overview-page">
      <header className="cs-section-header">
        <span className="cs-section-number">
          01
        </span>

        <div>
          <h5>EXECUTIVE SUMMARY</h5>

          <h2>
            {summary.title ||
              "Executive Summary"}
          </h2>
        </div>
      </header>

      <div className="cs-overview-layout">
        <div className="cs-overview-copy">
          <p>
            {summary.description ||
              "No executive summary available."}
          </p>

          <div className="cs-project-profile">
            <div>
              <small>Client</small>

              <strong>
                {project.client || "—"}
              </strong>
            </div>

            <div>
              <small>Builder</small>

              <strong>
                {project.builder || "—"}
              </strong>
            </div>

            <div>
              <small>Category</small>

              <strong>
                {project.category || "—"}
              </strong>
            </div>

            <div>
              <small>Project Type</small>

              <strong>
                {project.projectType || "—"}
              </strong>
            </div>

            <div>
              <small>Location</small>

              <strong>
                {project.location || "—"}
              </strong>
            </div>

            <div>
              <small>Engagement</small>

              <strong>
                {project.engagement || "—"}
              </strong>
            </div>

            <div>
              <small>Status</small>

              <strong>
                {project.status || "—"}
              </strong>
            </div>

            {summary.result && (
              <div>
                <small>Outcome</small>

                <strong>
                  {summary.result}
                </strong>
              </div>
            )}
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="cs-kpi-grid">
            {highlights.map((item, index) => (
              <div
                className="cs-kpi"
                key={`${item.label}-${index}`}
              >
                <h3>{item.value}</h3>

                <p>{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudyOverview;