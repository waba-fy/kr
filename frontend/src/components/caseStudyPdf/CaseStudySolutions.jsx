const CaseStudySolutions = ({ data }) => {
  if (!data) return null;

  const section = data.solutionsDelivered || {};

  const solutions = Array.isArray(section.solutions)
    ? section.solutions.filter(Boolean)
    : [];

  const technologyStack = Array.isArray(
    section.technologyStack
  )
    ? section.technologyStack.filter(Boolean)
    : [];

  const hasContent =
    section.title ||
    section.description ||
    solutions.length > 0 ||
    technologyStack.length > 0;

  if (!hasContent) return null;

  const groupedSolutions = solutions.reduce(
    (groups, solution) => {
      const category =
        typeof solution === "object" &&
        solution.category
          ? solution.category
          : "Other Solutions";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(solution);

      return groups;
    },
    {}
  );

  const solutionGroups = Object.entries(
    groupedSolutions
  );

  return (
    <section className="cs-page cs-solutions-page">
      <header className="cs-page-heading">
        <div>
          <span className="cs-section-number">
            04
          </span>

          <div>
            <h5>
              {section.eyebrow ||
                "WHAT KEYROUTES DELIVERED"}
            </h5>

            <h2>
              {section.title ||
                "Solutions Delivered"}
            </h2>
          </div>
        </div>

        {section.description && (
          <p>{section.description}</p>
        )}
      </header>

      {solutions.length > 0 && (
        <div className="cs-solutions-content">
          <div className="cs-solutions-intro">
            <span className="cs-content-label">
              CONNECTED DELIVERY SYSTEM
            </span>

            <h3>
              From Digital Visibility to Lead
              Management
            </h3>

            <p>
              The solution combined the key digital
              touchpoints required to attract,
              convert, track and support prospective
              customers throughout their journey.
            </p>
          </div>

          <div className="cs-solutions-list">
            {solutionGroups.map(
              (
                [category, categorySolutions],
                groupIndex
              ) => (
                <div
                  className="cs-solution-group"
                  key={category}
                >
                  <div className="cs-solution-group-heading">
                    <span>
                      {String(
                        groupIndex + 1
                      ).padStart(2, "0")}
                    </span>

                    <h3>{category}</h3>
                  </div>

                  <div className="cs-solution-group-items">
                    {categorySolutions.map(
                      (solution, index) => {
                        const isString =
                          typeof solution ===
                          "string";

                        const title = isString
                          ? solution
                          : solution.title;

                        const description =
                          isString
                            ? null
                            : solution.description;

                        return (
                          <article
                            className="cs-solution-item"
                            key={
                              title ||
                              `${category}-${index}`
                            }
                          >
                            <div className="cs-solution-icon">
                              <span>✓</span>
                            </div>

                            <div className="cs-solution-item-content">
                              <span className="cs-solution-category">
                                {category}
                              </span>

                              <h4>
                                {title ||
                                  "Digital Solution"}
                              </h4>

                              {description && (
                                <p>
                                  {description}
                                </p>
                              )}
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {technologyStack.length > 0 && (
        <div className="cs-technology-section">
          <div className="cs-subsection-heading">
            <div>
              <span>
                TECHNOLOGY & PLATFORM STACK
              </span>

              <h3>
                Tools Supporting the Growth System
              </h3>
            </div>

            <small>
              {technologyStack.length} platforms
            </small>
          </div>

          <div className="cs-technology-grid">
            {technologyStack.map(
              (technology, index) => (
                <div
                  className="cs-technology-item"
                  key={`${technology}-${index}`}
                >
                  <span className="cs-technology-index">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {typeof technology ===
                    "string"
                      ? technology
                      : technology.name ||
                        technology.title}
                  </strong>

                  {typeof technology ===
                    "object" &&
                    technology.description && (
                      <small>
                        {technology.description}
                      </small>
                    )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="cs-solutions-summary">
        <div className="cs-solutions-summary-icon">
          KR
        </div>

        <div>
          <span>
            KEYROUTES DELIVERY APPROACH
          </span>

          <h3>
            One Connected System Instead of
            Separate Marketing Activities
          </h3>

          <p>
            The individual services were designed
            to work together as one growth system,
            connecting visibility, advertising,
            landing experiences, analytics,
            reporting and lead follow-up.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySolutions;