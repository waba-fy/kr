const formatMetric = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return value;
};

const CaseStudySEO = ({ data }) => {
  if (!data) return null;

  const seoItems = Array.isArray(data.seo)
    ? data.seo.filter(Boolean)
    : [];

  const seoMetrics = data.seoMetrics || {};

  const socialPlatforms = Array.isArray(
    data.socialMedia?.platforms
  )
    ? data.socialMedia.platforms.filter(Boolean)
    : [];

  const socialServices = Array.isArray(
    data.socialMedia?.services
  )
    ? data.socialMedia.services.filter(Boolean)
    : [];

  const isSocialManaged =
    data.socialMedia?.managed === true;

  const hasSeoMetrics =
    Object.keys(seoMetrics).length > 0;

  const hasContent =
    seoItems.length > 0 ||
    hasSeoMetrics ||
    isSocialManaged;

  if (!hasContent) return null;

  return (
    <section className="cs-page cs-seo-page">
      <header className="cs-section-header">
        <span className="cs-section-number">05</span>

        <div>
          <h5>VISIBILITY SYSTEM</h5>

          <h2>
            SEO Foundations, AI Discovery and Social Presence
          </h2>

          <p className="cs-section-description">
            Technical search implementation supports current
            campaigns while building long-term organic and
            AI-search discoverability.
          </p>
        </div>
      </header>

      {hasSeoMetrics && (
        <div className="cs-seo-metric-grid">
          <div className="cs-seo-metric-card">
            <strong>
              {formatMetric(seoMetrics.keywords)}
            </strong>
            <span>Tracked Keywords</span>
            <small>Search-intent coverage</small>
          </div>

          <div className="cs-seo-metric-card">
            <strong>
              {formatMetric(seoMetrics.impressions)}
            </strong>
            <span>Organic Impressions</span>
            <small>Search visibility indicator</small>
          </div>

          <div className="cs-seo-metric-card">
            <strong>
              {formatMetric(seoMetrics.clicks)}
            </strong>
            <span>Organic Clicks</span>
            <small>Traffic from organic search</small>
          </div>

          <div className="cs-seo-metric-card">
            <strong>
              {formatMetric(seoMetrics.indexedPages)}
            </strong>
            <span>Indexed Pages</span>
            <small>Searchable content footprint</small>
          </div>

          {seoMetrics.organicLeads !== undefined && (
            <div className="cs-seo-metric-card">
              <strong>
                {formatMetric(seoMetrics.organicLeads)}
              </strong>
              <span>Organic Leads</span>
              <small>Lead indicator</small>
            </div>
          )}
        </div>
      )}

      <div className="cs-seo-content-grid">
        {seoItems.length > 0 && (
          <article className="cs-seo-content-card">
            <div className="cs-seo-card-heading">
              <span />
              <h3>SEO & GEO Implementation</h3>
            </div>

            <div className="cs-seo-check-grid">
              {seoItems.map((item, index) => (
                <p key={`${item}-${index}`}>
                  <span>✓</span>
                  {item}
                </p>
              ))}
            </div>
          </article>
        )}

        {isSocialManaged && (
          <article className="cs-seo-content-card">
            <div className="cs-seo-card-heading">
              <span />
              <h3>Social Media Management</h3>
            </div>

            {socialPlatforms.length > 0 ? (
              <div className="cs-social-block">
                <small>Platforms</small>

                <p>{socialPlatforms.join(", ")}</p>
              </div>
            ) : (
              <div className="cs-social-block">
                <small>Platforms</small>

                <p>
                  Social and digital channels aligned with
                  active paid campaigns.
                </p>
              </div>
            )}

            {socialServices.length > 0 ? (
              <div className="cs-social-block">
                <small>Services</small>

                <p>{socialServices.join(" • ")}</p>
              </div>
            ) : (
              <div className="cs-social-block">
                <small>Services</small>

                <p>
                  Campaign coordination, project visibility,
                  creative support and performance monitoring.
                </p>
              </div>
            )}

            <p className="cs-social-note">
              Social activity is coordinated with paid media
              to reinforce project recall, trust and ongoing
              visibility.
            </p>
          </article>
        )}
      </div>
    </section>
  );
};

export default CaseStudySEO;