const formatNumber = (value) => {
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

const formatCurrency = (
  value,
  currency = "INR"
) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (
  value,
  total
) => {
  if (
    typeof value !== "number" ||
    typeof total !== "number" ||
    total <= 0
  ) {
    return "—";
  }

  return `${(
    (value / total) *
    100
  ).toFixed(2)}%`;
};

const calculateCost = (
  spend,
  results
) => {
  if (
    typeof spend !== "number" ||
    typeof results !== "number" ||
    results <= 0
  ) {
    return null;
  }

  return spend / results;
};

const formatSnapshotDate = (value) => {
  if (!value) {
    return "Latest available snapshot";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const hasCampaignData = (campaign) => {
  if (
    !campaign ||
    typeof campaign !== "object"
  ) {
    return false;
  }

  return [
    campaign.clicks,
    campaign.linkClicks,
    campaign.impressions,
    campaign.reach,
    campaign.spend,
    campaign.conversions,
    campaign.leads,
    campaign.results,
    campaign.messagingConversations,
    campaign.profileVisits,
    campaign.followers,
  ].some(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== ""
  );
};

const MetricCard = ({
  value,
  label,
  description,
  featured = false,
}) => {
  return (
    <div
      className={`cs-performance-metric ${
        featured
          ? "cs-performance-metric-featured"
          : ""
      }`}
    >
      <strong>{value}</strong>

      <span>{label}</span>

      {description && (
        <small>{description}</small>
      )}
    </div>
  );
};

const EfficiencyRow = ({
  label,
  value,
}) => {
  return (
    <div className="cs-efficiency-row">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
};

const CaseStudyPerformance = ({ data }) => {
  if (!data) return null;

  const paidMedia =
    data.paidMedia || {};

  const combined =
    paidMedia.combined || {};

  const google =
    paidMedia.googleAds || {};

  const meta =
    paidMedia.metaAds || {};

  const resultsSummary = Array.isArray(
    paidMedia.resultsSummary
  )
    ? paidMedia.resultsSummary.filter(Boolean)
    : [];

  const metaCampaigns = Array.isArray(
    meta.campaigns
  )
    ? meta.campaigns.filter(Boolean)
    : [];

  const metaHighlights = Array.isArray(
    meta.highlights
  )
    ? meta.highlights.filter(Boolean)
    : [];

  const metaResultTypes = Array.isArray(
    meta.resultTypes
  )
    ? meta.resultTypes.filter(Boolean)
    : [];

  const hasGoogle =
    google.active !== false &&
    hasCampaignData(google);

  const hasMeta =
    meta.active !== false &&
    (
      hasCampaignData(meta) ||
      metaCampaigns.length > 0 ||
      metaResultTypes.length > 0 ||
      metaHighlights.length > 0
    );

  const hasCombined =
    combined.leads !== undefined ||
    combined.qualifiedLeads !== undefined ||
    combined.adSpend !== undefined ||
    combined.costPerLead !== undefined;

  const hasContent =
    paidMedia.title ||
    paidMedia.introduction ||
    paidMedia.businessOutcome ||
    resultsSummary.length > 0 ||
    hasCombined ||
    hasGoogle ||
    hasMeta;

  if (!hasContent) return null;

  const combinedCurrency =
    combined.currency || "INR";

  const qualifiedLeadRate =
    combined.qualifiedLeadRate ||
    formatPercentage(
      combined.qualifiedLeads,
      combined.leads
    );

  /* Google calculations */

  const googleConversions =
    google.conversions ??
    google.leads ??
    null;

  const googleCtr =
    google.ctr ||
    formatPercentage(
      google.clicks,
      google.impressions
    );

  const googleConversionRate =
    google.conversionRate ||
    formatPercentage(
      googleConversions,
      google.clicks
    );

  const googleAverageCpc =
    google.averageCpc ??
    calculateCost(
      google.spend,
      google.clicks
    );

  const googleCostPerConversion =
    google.costPerConversion ??
    calculateCost(
      google.spend,
      googleConversions
    );

  /* Meta calculations */

  const metaResults =
    meta.results ??
    meta.leads ??
    meta.messagingConversations ??
    meta.profileVisits ??
    meta.followers ??
    null;

  const metaCostPerResult =
    meta.costPerResult ??
    calculateCost(
      meta.spend,
      metaResults
    );

  const metaResultLabel =
    meta.resultLabel ||
    meta.primaryResultType ||
    (
      meta.leads !== undefined
        ? "Lead Form Results"
        : meta.messagingConversations !==
            undefined
          ? "Messaging Conversations"
          : meta.profileVisits !== undefined
            ? "Profile Visits"
            : meta.followers !== undefined
              ? "Followers or Likes"
              : "Meta Results"
    );

  const snapshotDate =
    paidMedia.snapshotDate ||
    google.snapshotDate ||
    meta.snapshotDate;

  const formattedSnapshot =
    formatSnapshotDate(snapshotDate);

  return (
    <section className="cs-page cs-performance-page">
      <header className="cs-page-heading">
        <div>
          <span className="cs-section-number">
            05
          </span>

          <div>
            <h5>PERFORMANCE RESULTS</h5>

            <h2>
              {paidMedia.title ||
                "Paid Media Performance"}
            </h2>
          </div>
        </div>

        <p>
          {paidMedia.introduction ||
            `Verified Google and Meta campaign performance captured on ${formattedSnapshot}.`}
        </p>
      </header>

      {/* ==================================================
          RESULTS SUMMARY
      ================================================== */}

      {resultsSummary.length > 0 && (
        <div className="cs-results-summary">
          <div className="cs-subsection-heading">
            <div>
              <span>RESULTS SUMMARY</span>

              <h3>
                What Changed After Execution
              </h3>
            </div>

            <small>
              Snapshot: {formattedSnapshot}
            </small>
          </div>

          <div className="cs-results-summary-grid">
            {resultsSummary.map(
              (result, index) => {
                const isString =
                  typeof result === "string";

                const title = isString
                  ? result
                  : result.title;

                const description = isString
                  ? null
                  : result.description;

                return (
                  <article
                    className="cs-result-summary-card"
                    key={
                      title ||
                      `result-${index}`
                    }
                  >
                    <span className="cs-result-summary-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      <h4>
                        {title ||
                          "Campaign Result"}
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
      )}

      {/* ==================================================
          GOOGLE ADS
      ================================================== */}

      {hasGoogle && (
        <div className="cs-platform-panel cs-google-panel">
          <div className="cs-platform-header">
            <div>
              <span className="cs-platform-badge">
                GOOGLE ADS
              </span>

              <h3>
                High-Intent Search Performance
              </h3>

              <p>
                Google campaigns were used to
                capture active property searches
                and convert high-intent visitors
                into measurable enquiries.
              </p>
            </div>

            <div className="cs-platform-status">
              <span />
              Active
            </div>
          </div>

          <div className="cs-performance-grid cs-platform-metrics">
            <MetricCard
              value={formatNumber(
                google.clicks
              )}
              label="Clicks"
              description="Search traffic generated"
              featured
            />

            <MetricCard
              value={formatNumber(
                google.impressions
              )}
              label="Impressions"
              description="Search visibility delivered"
            />

            <MetricCard
              value={formatNumber(
                googleConversions
              )}
              label="Conversions"
              description="Tracked campaign actions"
            />

            <MetricCard
              value={googleCtr}
              label="CTR"
              description="Click-through rate"
            />

            <MetricCard
              value={formatCurrency(
                googleAverageCpc,
                google.currency || "INR"
              )}
              label="Average CPC"
              description="Average cost per search click"
            />
          </div>

          <div className="cs-performance-details">
            <div className="cs-spend-card">
              <span>
                SPEND & CONVERSION
              </span>

              <div className="cs-spend-value">
                <small>
                  Google Ads Spend
                </small>

                <strong>
                  {formatCurrency(
                    google.spend,
                    google.currency || "INR"
                  )}
                </strong>
              </div>

              <div className="cs-spend-value">
                <small>
                  Cost / Conversion
                </small>

                <strong>
                  {formatCurrency(
                    googleCostPerConversion,
                    google.currency || "INR"
                  )}
                </strong>
              </div>
            </div>

            <div className="cs-efficiency-card">
              <span>
                CAMPAIGN EFFICIENCY
              </span>

              <EfficiencyRow
                label="Click-through rate"
                value={googleCtr}
              />

              <EfficiencyRow
                label="Conversion rate"
                value={
                  googleConversionRate
                }
              />

              <EfficiencyRow
                label="Qualified lead rate"
                value={
                  qualifiedLeadRate
                }
              />
            </div>
          </div>

          {google.note && (
            <p className="cs-platform-note">
              {google.note}
            </p>
          )}
        </div>
      )}

      {/* ==================================================
          META ADS
      ================================================== */}

      {hasMeta && (
        <div className="cs-platform-panel cs-meta-panel">
          <div className="cs-platform-header">
            <div>
              <span className="cs-platform-badge">
                META ADS
              </span>

              <h3>
                Awareness, Engagement and Lead
                Generation Performance
              </h3>

              <p>
                Meta campaigns supported project
                discovery, lead generation,
                website traffic, profile visits
                and social engagement across
                multiple campaign objectives.
              </p>
            </div>

            <div className="cs-platform-status">
              <span />
              Active
            </div>
          </div>

          {/* Portfolio-level Meta metrics */}

          {(metaResults !== null ||
            meta.totalCampaigns !== undefined ||
            meta.impressions !== undefined ||
            meta.reach !== undefined ||
            meta.spend !== undefined ||
            meta.totalSpend !== undefined) && (
            <div className="cs-performance-grid cs-meta-metrics">
              {metaResults !== null && (
                <MetricCard
                  value={formatNumber(
                    metaResults
                  )}
                  label={metaResultLabel}
                  description="Primary Meta campaign result"
                  featured
                />
              )}

              {meta.totalCampaigns !==
                undefined && (
                <MetricCard
                  value={formatNumber(
                    meta.totalCampaigns
                  )}
                  label="Campaigns Analysed"
                  description="Campaigns included in the portfolio review"
                  featured={
                    metaResults === null
                  }
                />
              )}

              {meta.impressions !==
                undefined && (
                <MetricCard
                  value={formatNumber(
                    meta.impressions
                  )}
                  label="Impressions"
                  description="Total advertisement impressions"
                />
              )}

              {meta.reach !== undefined && (
                <MetricCard
                  value={formatNumber(
                    meta.reach
                  )}
                  label="Reach"
                  description="Unique audience reached"
                />
              )}

              {(meta.spend !== undefined ||
                meta.totalSpend !==
                  undefined) && (
                <MetricCard
                  value={formatCurrency(
                    meta.spend ??
                      meta.totalSpend,
                    meta.currency || "INR"
                  )}
                  label="Meta Ad Spend"
                  description="Verified Meta campaign investment"
                />
              )}

              {metaCostPerResult !== null && (
                <MetricCard
                  value={formatCurrency(
                    metaCostPerResult,
                    meta.currency || "INR"
                  )}
                  label={
                    meta.costLabel ||
                    "Cost / Result"
                  }
                  description="Average cost for the primary result"
                />
              )}
            </div>
          )}

          {/* Campaign objectives */}

          {metaResultTypes.length > 0 && (
            <div className="cs-meta-details">
              <div className="cs-result-types">
                <span>
                  CAMPAIGN OBJECTIVES
                </span>

                <div>
                  {metaResultTypes.map(
                    (item, index) => (
                      <small
                        key={`${item}-${index}`}
                      >
                        {item}
                      </small>
                    )
                  )}
                </div>
              </div>

              {metaHighlights.length > 0 && (
                <div className="cs-result-types">
                  <span>
                    PORTFOLIO HIGHLIGHTS
                  </span>

                  <div>
                    {metaHighlights.map(
                      (item, index) => (
                        <small
                          key={`${item}-${index}`}
                        >
                          {item}
                        </small>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Individual Meta campaigns */}

          {metaCampaigns.length > 0 && (
            <div className="cs-meta-campaigns">
              <div className="cs-subsection-heading">
                <div>
                  <span>
                    CAMPAIGN BREAKDOWN
                  </span>

                  <h3>
                    Selected Meta Campaign Results
                  </h3>
                </div>

                <small>
                  {metaCampaigns.length} campaigns
                </small>
              </div>

              <div className="cs-meta-campaign-grid">
                {metaCampaigns.map(
                  (campaign, index) => {
                    const currency =
                      campaign.currency ||
                      meta.currency ||
                      "INR";

                    return (
                      <article
                        className="cs-meta-campaign-card"
                        key={
                          campaign.id ||
                          campaign.name ||
                          `meta-campaign-${index}`
                        }
                      >
                        <div className="cs-meta-campaign-header">
                          <span>
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <div>
                            <h4>
                              {campaign.name ||
                                "Meta Campaign"}
                            </h4>

                            {campaign.objective && (
                              <small>
                                {
                                  campaign.objective
                                }
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="cs-meta-campaign-metrics">
                          {campaign.results !==
                            undefined && (
                            <div>
                              <span>Results</span>

                              <strong>
                                {formatNumber(
                                  campaign.results
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.costPerResult !==
                            undefined && (
                            <div>
                              <span>
                                Cost / Result
                              </span>

                              <strong>
                                {formatCurrency(
                                  campaign.costPerResult,
                                  currency
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.spend !==
                            undefined && (
                            <div>
                              <span>Spend</span>

                              <strong>
                                {formatCurrency(
                                  campaign.spend,
                                  currency
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.impressions !==
                            undefined && (
                            <div>
                              <span>
                                Impressions
                              </span>

                              <strong>
                                {formatNumber(
                                  campaign.impressions
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.reach !==
                            undefined && (
                            <div>
                              <span>Reach</span>

                              <strong>
                                {formatNumber(
                                  campaign.reach
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.linkClicks !==
                            undefined && (
                            <div>
                              <span>
                                Link Clicks
                              </span>

                              <strong>
                                {formatNumber(
                                  campaign.linkClicks
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.frequency !==
                            undefined && (
                            <div>
                              <span>
                                Frequency
                              </span>

                              <strong>
                                {formatNumber(
                                  campaign.frequency
                                )}
                              </strong>
                            </div>
                          )}

                          {campaign.cpm !==
                            undefined && (
                            <div>
                              <span>CPM</span>

                              <strong>
                                {formatCurrency(
                                  campaign.cpm,
                                  currency
                                )}
                              </strong>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {meta.note && (
            <p className="cs-platform-note">
              {meta.note}
            </p>
          )}
        </div>
      )}

      {/* ==================================================
          BUSINESS OUTCOME
      ================================================== */}

      {paidMedia.businessOutcome && (
        <div className="cs-business-outcome">
          <span>BUSINESS OUTCOME</span>

          <h3>
            What the Results Meant for the
            Client
          </h3>

          <p>
            {paidMedia.businessOutcome}
          </p>
        </div>
      )}

      {/* ==================================================
          REPORTING NOTE
      ================================================== */}

      <div className="cs-reporting-note">
        <strong>
          Reporting note:
        </strong>

        <p>
          Google and Meta performance is
          displayed separately because each
          platform uses different campaign
          objectives, attribution settings and
          result definitions. Awareness,
          engagement, link-click and lead-form
          results should not be combined as one
          identical conversion type.
        </p>
      </div>
    </section>
  );
};

export default CaseStudyPerformance;