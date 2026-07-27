const CaseStudyAutomation = ({ data }) => {
  if (!data) return null;

  const journey = data.customerJourney || {};

  const stages = Array.isArray(journey.stages)
    ? journey.stages.filter(Boolean)
    : [];

  const seoGeo = journey.seoGeo || {};
  const seoMetrics = seoGeo.metrics || {};

  const seoImplementation = Array.isArray(
    seoGeo.implementation
  )
    ? seoGeo.implementation.filter(Boolean)
    : [];

  const automation = journey.automation || {};

  const workflows = Array.isArray(
    automation.workflows
  )
    ? automation.workflows.filter(Boolean)
    : [];

  const measurement = journey.measurement || {};

  const measurementTools = Array.isArray(
    measurement.tools
  )
    ? measurement.tools.filter(Boolean)
    : [];

  const trackedActions = Array.isArray(
    measurement.trackedActions
  )
    ? measurement.trackedActions.filter(Boolean)
    : [];

  const hasContent =
    journey.title ||
    journey.description ||
    stages.length > 0 ||
    seoImplementation.length > 0 ||
    workflows.length > 0 ||
    measurementTools.length > 0 ||
    trackedActions.length > 0;

  if (!hasContent) return null;

  const formatMetric = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    if (typeof value === "number") {
      return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
      }).format(value);
    }

    return value;
  };

  return (
    <section className="cs-page cs-automation-page">
      <header className="cs-page-heading">
        <div>
          <span className="cs-section-number">
            06
          </span>

          <div>
            <h5>
              {journey.eyebrow ||
                "CUSTOMER JOURNEY"}
            </h5>

            <h2>
              {journey.title ||
                "From Discovery to Sales Follow-Up"}
            </h2>
          </div>
        </div>

        {journey.description && (
          <p>{journey.description}</p>
        )}
      </header>

      {/* Customer journey stages */}

      {stages.length > 0 && (
        <div className="cs-journey-section">
          <div className="cs-subsection-heading">
            <div>
              <span>
                COMPLETE CUSTOMER JOURNEY
              </span>

              <h3>
                How Prospective Customers Moved
                Through the System
              </h3>
            </div>

            <small>
              {stages.length} journey stages
            </small>
          </div>

          <div className="cs-journey-timeline">
            {stages.map((stage, index) => {
              const channels = Array.isArray(
                stage.channels
              )
                ? stage.channels.filter(Boolean)
                : [];

              return (
                <article
                  className="cs-journey-card"
                  key={
                    stage.step ||
                    stage.title ||
                    `journey-${index}`
                  }
                >
                  <div className="cs-journey-step">
                    {stage.step ||
                      String(index + 1).padStart(
                        2,
                        "0"
                      )}
                  </div>

                  <div className="cs-journey-content">
                    <h4>
                      {stage.title ||
                        `Journey Stage ${
                          index + 1
                        }`}
                    </h4>

                    {stage.description && (
                      <p>{stage.description}</p>
                    )}

                    {channels.length > 0 && (
                      <div className="cs-journey-channels">
                        {channels.map(
                          (channel, channelIndex) => (
                            <span
                              key={`${channel}-${channelIndex}`}
                            >
                              {typeof channel ===
                              "string"
                                ? channel
                                : channel.name ||
                                  channel.title}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SEO and GEO */}

      {(seoGeo.title ||
        seoImplementation.length > 0 ||
        Object.keys(seoMetrics).length >
          0) && (
        <div className="cs-seo-journey-section">
          <div className="cs-subsection-heading">
            <div>
              <span>
                SEO & GEO DISCOVERABILITY
              </span>

              <h3>
                {seoGeo.title ||
                  "How Customers Found the Business"}
              </h3>
            </div>
          </div>

          {Object.keys(seoMetrics).length >
            0 && (
            <div className="cs-seo-metrics-grid">
              {seoMetrics.keywords !==
                undefined && (
                <div className="cs-seo-metric">
                  <strong>
                    {formatMetric(
                      seoMetrics.keywords
                    )}
                  </strong>

                  <span>Keywords</span>
                </div>
              )}

              {seoMetrics.impressions !==
                undefined && (
                <div className="cs-seo-metric">
                  <strong>
                    {formatMetric(
                      seoMetrics.impressions
                    )}
                  </strong>

                  <span>Impressions</span>
                </div>
              )}

              {seoMetrics.clicks !==
                undefined && (
                <div className="cs-seo-metric">
                  <strong>
                    {formatMetric(
                      seoMetrics.clicks
                    )}
                  </strong>

                  <span>Organic Clicks</span>
                </div>
              )}

              {seoMetrics.indexedPages !==
                undefined && (
                <div className="cs-seo-metric">
                  <strong>
                    {formatMetric(
                      seoMetrics.indexedPages
                    )}
                  </strong>

                  <span>Indexed Pages</span>
                </div>
              )}

              {seoMetrics.organicLeads !==
                undefined && (
                <div className="cs-seo-metric">
                  <strong>
                    {formatMetric(
                      seoMetrics.organicLeads
                    )}
                  </strong>

                  <span>Organic Leads</span>
                </div>
              )}
            </div>
          )}

          {seoImplementation.length > 0 && (
            <div className="cs-seo-implementation">
              <span className="cs-content-label">
                IMPLEMENTATION
              </span>

              <div className="cs-tags">
                {seoImplementation.map(
                  (item, index) => (
                    <span
                      key={`seo-${index}`}
                    >
                      {typeof item === "string"
                        ? item
                        : item.title ||
                          item.name}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Automation */}

      {(automation.title ||
        workflows.length > 0) && (
        <div className="cs-automation-section">
          <div className="cs-subsection-heading">
            <div>
              <span>
                LEAD AUTOMATION
              </span>

              <h3>
                {automation.title ||
                  "How Leads Reached the Sales Team"}
              </h3>
            </div>
          </div>

          {workflows.length > 0 && (
            <div className="cs-automation-flow">
              {workflows.map(
                (workflow, index) => (
                  <div
                    className="cs-automation-step"
                    key={`workflow-${index}`}
                  >
                    <span className="cs-automation-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <strong>
                      {typeof workflow ===
                      "string"
                        ? workflow
                        : workflow.title ||
                          workflow.name}
                    </strong>

                    {typeof workflow ===
                      "object" &&
                      workflow.description && (
                        <small>
                          {workflow.description}
                        </small>
                      )}

                    {index <
                      workflows.length - 1 && (
                      <span className="cs-automation-arrow">
                        →
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* Measurement */}

      {(measurement.title ||
        measurementTools.length > 0 ||
        trackedActions.length > 0) && (
        <div className="cs-measurement-section">
          <div className="cs-subsection-heading">
            <div>
              <span>
                MEASUREMENT & ATTRIBUTION
              </span>

              <h3>
                {measurement.title ||
                  "How Performance Was Measured"}
              </h3>
            </div>
          </div>

          <div className="cs-measurement-layout">
            {measurementTools.length > 0 && (
              <div className="cs-measurement-card">
                <span className="cs-content-label">
                  TOOLS USED
                </span>

                <div className="cs-measurement-tools">
                  {measurementTools.map(
                    (tool, index) => (
                      <span
                        key={`tool-${index}`}
                      >
                        {typeof tool ===
                        "string"
                          ? tool
                          : tool.name ||
                            tool.title}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {trackedActions.length > 0 && (
              <div className="cs-measurement-card">
                <span className="cs-content-label">
                  ACTIONS TRACKED
                </span>

                <ul className="cs-list">
                  {trackedActions.map(
                    (action, index) => (
                      <li
                        key={`action-${index}`}
                      >
                        {typeof action ===
                        "string"
                          ? action
                          : action.title ||
                            action.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="cs-customer-journey-summary">
        <span>
          CONNECTED GROWTH SYSTEM
        </span>

        <h3>
          Every Step Was Designed to Support
          Better Lead Visibility
        </h3>

        <p>
          The customer journey connected discovery,
          campaign traffic, landing-page engagement,
          lead capture, attribution, reporting and
          sales follow-up instead of treating each
          activity as a separate marketing task.
        </p>
      </div>
    </section>
  );
};

export default CaseStudyAutomation;