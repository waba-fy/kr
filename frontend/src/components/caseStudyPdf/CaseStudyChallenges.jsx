const CaseStudyChallenges = ({ data }) => {
  if (!data) return null;

  const business = data.businessChallenge || {};

  const problems = Array.isArray(business.problems)
    ? business.problems.filter(Boolean)
    : [];

  const objectives = Array.isArray(business.objectives)
    ? business.objectives.filter(Boolean)
    : [];

  const strategy = Array.isArray(business.strategy)
    ? business.strategy.filter(Boolean)
    : [];

  const execution = Array.isArray(business.execution)
    ? business.execution.filter(Boolean)
    : [];

  const hasContent =
    business.currentSituation ||
    business.impact ||
    problems.length > 0 ||
    objectives.length > 0 ||
    strategy.length > 0 ||
    execution.length > 0;

  if (!hasContent) return null;

  return (
    <section className="cs-page cs-challenges-page">
      <header className="cs-section-header">
        <span className="cs-section-number">
          03
        </span>

        <div>
          <h5>
            {business.eyebrow ||
              "BUSINESS CHALLENGES"}
          </h5>

          <h2>
            {business.title ||
              "Business Challenges"}
          </h2>
        </div>
      </header>

      {/* Current situation */}

      {business.currentSituation && (
        <div className="cs-current-situation">
          <span className="cs-content-label">
            CURRENT SITUATION
          </span>

          <p>{business.currentSituation}</p>
        </div>
      )}

      {/* Business impact */}

      {business.impact && (
        <div className="cs-business-impact">
          <span className="cs-content-label">
            BUSINESS IMPACT
          </span>

          <p>{business.impact}</p>
        </div>
      )}

      {/* Business problems */}

      {problems.length > 0 && (
        <div className="cs-problems-section">
          <div className="cs-subsection-heading">
            <div>
              <span>THE REAL PROBLEMS</span>

              <h3>
                Challenges Affecting Growth
              </h3>
            </div>
          </div>

          <div className="cs-challenges-layout">
            {problems.map((problem, index) => (
              <article
                className="cs-challenge-card"
                key={
                  problem.title ||
                  `problem-${index}`
                }
              >
                <span className="cs-challenge-index">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <h3>
                  {typeof problem === "string"
                    ? problem
                    : problem.title}
                </h3>

                {typeof problem === "object" &&
                  problem.description && (
                    <p>
                      {problem.description}
                    </p>
                  )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Objectives */}

      {objectives.length > 0 && (
        <div className="cs-objectives-section">
          <div className="cs-subsection-heading">
            <div>
              <span>CLIENT OBJECTIVES</span>

              <h3>
                What the Client Needed to Achieve
              </h3>
            </div>
          </div>

          <div className="cs-challenge-card">
            <ul className="cs-list">
              {objectives.map(
                (objective, index) => (
                  <li
                    key={`objective-${index}`}
                  >
                    {typeof objective === "string"
                      ? objective
                      : objective.title ||
                        objective.description}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {/* KeyRoutes strategy */}

      {strategy.length > 0 && (
        <div className="cs-strategy-section">
          <div className="cs-subsection-heading">
            <div>
              <span>KEYROUTES STRATEGY</span>

              <h3>
                How We Planned the Solution
              </h3>
            </div>
          </div>

          <div className="cs-strategy-grid">
            {strategy.map((item, index) => (
              <article
                className="cs-strategy-card"
                key={
                  item.title ||
                  `strategy-${index}`
                }
              >
                <span className="cs-strategy-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <h4>
                  {typeof item === "string"
                    ? item
                    : item.title}
                </h4>

                {typeof item === "object" &&
                  item.description && (
                    <p>{item.description}</p>
                  )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Execution */}

      {execution.length > 0 && (
        <div className="cs-execution-section">
          <div className="cs-subsection-heading">
            <div>
              <span>EXECUTION</span>

              <h3>
                How the Strategy Was Implemented
              </h3>
            </div>
          </div>

          <div className="cs-execution-timeline">
            {execution.map((step, index) => (
              <div
                className="cs-execution-card"
                key={
                  step.phase ||
                  step.title ||
                  `execution-${index}`
                }
              >
                <div className="cs-execution-phase">
                  {step.phase ||
                    String(index + 1).padStart(
                      2,
                      "0"
                    )}
                </div>

                <div className="cs-execution-content">
                  <h4>
                    {step.title ||
                      `Execution Step ${
                        index + 1
                      }`}
                  </h4>

                  {step.description && (
                    <p>{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudyChallenges;