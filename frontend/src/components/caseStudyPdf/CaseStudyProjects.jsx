const CaseStudyProjects = ({ data }) => {
  if (!data) return null;

  const clientProject = data.clientProject || {};

  const projects = Array.isArray(
    clientProject.projects
  )
    ? clientProject.projects.filter(Boolean)
    : [];

  const services = Array.isArray(
    clientProject.services
  )
    ? clientProject.services.filter(Boolean)
    : [];

  if (
    projects.length === 0 &&
    services.length === 0
  ) {
    return null;
  }

  return (
    <section className="cs-page cs-light cs-projects-page">
      <header className="cs-section-header">
        <span className="cs-section-number">
          02
        </span>

        <div>
          <h5>CLIENT & PROJECT</h5>

          <h2>
            {projects.length > 1
              ? `${projects.length} Projects Supported`
              : "Project at a Glance"}
          </h2>

          <p className="cs-section-description">
            {projects.length > 1
              ? "Each project is supported through dedicated positioning, landing pages and campaign journeys."
              : "A focused overview of the client, project and services delivered."}
          </p>
        </div>
      </header>

      {projects.length > 0 && (
        <div className="cs-project-grid">
          {projects.map((project, index) => (
            <article
              className="cs-project-card"
              key={
                project.id ||
                `${project.name}-${index}`
              }
            >
              <div className="cs-project-card-top">
                <span className="cs-project-index">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                {project.status && (
                  <span className="cs-project-status">
                    {project.status}
                  </span>
                )}
              </div>

              <div className="cs-project-card-content">
                <h3>
                  {project.name || "Project"}
                </h3>

                {project.location && (
                  <p>{project.location}</p>
                )}

                {project.website ? (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Landing Page
                  </a>
                ) : (
                  <span className="cs-project-link-disabled">
                    Landing page not added
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {services.length > 0 && (
        <div className="cs-project-services">
          <h3>Services Delivered</h3>

          <div className="cs-tags cs-service-tags">
            {services.map((service, index) => (
              <span
                key={`${service}-${index}`}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudyProjects;