import { useMemo } from "react";
import {
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaFilter,
  FaGoogle,
  FaMoneyBillWave,
  FaSyncAlt,
  FaUsers,
} from "react-icons/fa";

import EmptyState from "../common/EmptyState";
import { successStories } from "../../data/successStoriesData";

const CampaignResults = () => {
  const campaignProjects = useMemo(() => {
    return successStories
      .filter((story) => {
        const leads = Number(story.campaign?.leads || 0);
        const qualifiedLeads = Number(
          story.campaign?.qualifiedLeads || 0
        );

        return (
          Boolean(story.metrics?.googleAds) ||
          Boolean(story.metrics?.metaAds) ||
          leads > 0 ||
          qualifiedLeads > 0
        );
      })
      .map((story) => ({
        id: story.id || story.slug || story.title,
        title: story.title || "Campaign Project",
        location: story.location || "",
        featured: Boolean(story.featured),
        services: Array.isArray(story.services)
          ? story.services.filter(Boolean)
          : [],
        campaign: story.campaign || {},
        campaigns: story.campaigns || {},
        projectStatus:
        story.projectStatus ||
        story.projects?.[0]?.status ||
        "",
              googleAds: Boolean(story.metrics?.googleAds),
        metaAds: Boolean(story.metrics?.metaAds),
      }));
  }, []);

  const toNumber = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const cleaned = value.replace(/[₹,\s]/g, "");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
};

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(
    Math.round(toNumber(value))
  );

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(toNumber(value));

  const totals = useMemo(() => {
  return campaignProjects.reduce(
    (summary, project) => {
      const googleSpend = toNumber(
        project.campaigns?.googleAds?.spend
      );

      const metaSpend = toNumber(
        project.campaigns?.metaAds?.spend
      );

      const platformSpend = googleSpend + metaSpend;

      /*
        Use campaign.adSpend only as a fallback when no
        platform-specific spend is available.
      */
      const fallbackSpend =
        platformSpend === 0
          ? toNumber(project.campaign?.adSpend)
          : 0;

      return {
        leads:
          summary.leads +
          toNumber(project.campaign?.leads),

        qualifiedLeads:
          summary.qualifiedLeads +
          toNumber(project.campaign?.qualifiedLeads),

        totalSpend:
          summary.totalSpend +
          platformSpend +
          fallbackSpend,

        googleAdsProjects:
          summary.googleAdsProjects +
          (project.googleAds ? 1 : 0),

        metaAdsProjects:
          summary.metaAdsProjects +
          (project.metaAds ? 1 : 0),
      };
    },
    {
      leads: 0,
      qualifiedLeads: 0,
      totalSpend: 0,
      googleAdsProjects: 0,
      metaAdsProjects: 0,
    }
  );
}, [campaignProjects]);

    const averageCpl =
      totals.leads > 0
        ? totals.totalSpend / totals.leads
        : 0;

  const hasMetricValue = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return false;
    }

    return (
      String(value).trim().toLowerCase() !==
      "to be updated"
    );
  };

  const campaignServices = [
    "Google Ads",
    "Meta Ads",
    "Landing Pages",
    "Analytics",
    "Lead Automation",
  ];

  return (
    <section
      className="kr-campaign-results"
      aria-labelledby="campaign-results-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            CAMPAIGN RESULTS
          </span>

          <h2 id="campaign-results-title">
            Performance Marketing Built for{" "}
            <strong>Qualified Enquiries</strong>
          </h2>

          <p>
            Explore campaign systems combining Google Ads,
            Meta Ads, landing pages, analytics and lead
            workflows across KeyRoutes success stories.
          </p>
        </header>

        {campaignProjects.length > 0 ? (
          <>
           <div className="kr-campaign-summary">
  <article>
    <FaUsers aria-hidden="true" />

    <div>
      <strong>{formatNumber(totals.leads)}</strong>
      <span>Total Leads</span>
    </div>
    
  </article>

  <article>
    <FaFilter aria-hidden="true" />

    <div>
      <strong>
        {formatNumber(totals.qualifiedLeads)}
      </strong>
      <span>Qualified Leads</span>
    </div>
  </article>

  <article>
    <FaMoneyBillWave aria-hidden="true" />

    <div>
      <strong>
        {formatCurrency(totals.totalSpend)}
      </strong>
      <span>Total Ad Spend</span>
    </div>
  </article>

  <article>
    <FaChartLine aria-hidden="true" />

    <div>
      <strong>
        {averageCpl > 0
          ? formatCurrency(averageCpl)
          : "—"}
      </strong>

      <span>Average Cost Per Lead</span>
    </div>
  </article>
</div>
<div className="kr-campaign-report-status">
  <div>
    <FaGoogle aria-hidden="true" />

    <span>
      <strong>
        {totals.googleAdsProjects} Active Google Ads Accounts
      </strong>
      Search and conversion campaigns
    </span>
  </div>

  <div>
    <FaBullhorn aria-hidden="true" />

    <span>
      <strong>
        {totals.metaAdsProjects} Active Meta Ads Accounts
      </strong>
      Lead, reach and engagement campaigns
    </span>
  </div>

  <div className="is-live">
    <FaClock aria-hidden="true" />

    <span>
      <strong>Campaigns are still generating results</strong>
      Performance will continue changing
    </span>
  </div>

  <div>
    <FaSyncAlt aria-hidden="true" />

    <span>
      <strong>Performance data updated every quarter</strong>
      Latest verified reporting cycle
    </span>
  </div>
</div>

            <div className="kr-campaign-results-grid">
              {campaignProjects.map((project) => {
                const visibleServices =
                  project.services.filter((service) =>
                    campaignServices.includes(service)
                  );

                return (
                  <article
                    className={`kr-campaign-result-card ${
                      project.featured
                        ? "is-featured"
                        : ""
                    }`.trim()}
                    key={project.id}
                  >
                    <div className="kr-campaign-result-header">
                      <div>
                        <span>
                          PAID CAMPAIGN SYSTEM
                        </span>

                        <h3>{project.title}</h3>

                        {project.location && (
                          <p>{project.location}</p>
                        )}
                      </div>

                      <div className="kr-campaign-badges">
                        <span className="kr-campaign-live">
                          🟢
                        </span>

                        {project.projectStatus && (
                          <span
                            className={`kr-campaign-status ${project.projectStatus
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {project.projectStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    {(project.googleAds ||
                      project.metaAds) && (
                      <div className="kr-campaign-platforms">
                        {project.googleAds && (
                          <span>
                            <FaCheckCircle
                              aria-hidden="true"
                            />
                            Google Ads
                          </span>
                        )}

                        {project.metaAds && (
                          <span>
                            <FaCheckCircle
                              aria-hidden="true"
                            />
                            Meta Ads
                          </span>
                        )}
                      </div>
                    )}

                    <div className="kr-campaign-metrics">
                      <div>
                        <FaUsers aria-hidden="true" />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.campaign.leads
                            )
                              ? project.campaign.leads
                              : "—"}
                          </strong>

                          Leads
                        </span>
                      </div>

                      <div>
                        <FaFilter aria-hidden="true" />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.campaign
                                .qualifiedLeads
                            )
                              ? project.campaign
                                  .qualifiedLeads
                              : "—"}
                          </strong>

                          Qualified Leads
                        </span>
                      </div>

                      <div>
                        <FaMoneyBillWave
                          aria-hidden="true"
                        />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.campaign
                                .costPerLead
                            )
                              ? project.campaign
                                  .costPerLead
                              : "—"}
                          </strong>

                          Cost Per Lead
                        </span>
                      </div>

                      <div>
                        <FaChartLine
                          aria-hidden="true"
                        />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.campaign
                                .conversionRate
                            )
                              ? project.campaign
                                  .conversionRate
                              : "—"}
                          </strong>

                          Conversion Rate
                        </span>
                      </div>
                    </div>

                    {visibleServices.length > 0 && (
                      <div className="kr-campaign-services">
                        {visibleServices.map((service) => (
                          <span key={service}>
                            {service}
                          </span>
                        ))}
                      </div>
                    )}

                    {hasMetricValue(
                      project.campaign.adSpend
                    ) && (
                      <div className="kr-campaign-spend">
                        <span>Campaign Spend</span>

                        <strong>
                          {project.campaign.adSpend}
                        </strong>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="kr-success-empty">
            <EmptyState
              title="Campaign results coming soon"
              message="Projects with Google Ads, Meta Ads or campaign performance data will appear here after results are added to the success story data."
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignResults;