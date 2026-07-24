import { useMemo } from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaCircle,
  FaEye,
  FaFileAlt,
  FaMousePointer,
  FaSearch,
} from "react-icons/fa";

import EmptyState from "../common/EmptyState";
import { successStories } from "../../data/successStoriesData";

const EMPTY_METRIC_VALUES = [
  "",
  "—",
  "-",
  "n/a",
  "na",
  "not available",
  "to be updated",
  "coming soon",
];

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const hasMetricValue = (value) => {
  if (value === undefined || value === null) {
    return false;
  }

  return !EMPTY_METRIC_VALUES.includes(normalizeText(value));
};

const toNumber = (value) => {
  if (!hasMetricValue(value)) {
    return 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const cleanedValue = String(value)
    .replace(/,/g, "")
    .replace(/[₹$€£%+]/g, "")
    .trim();

  const parsedValue = Number(cleanedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(toNumber(value));

const createStatusClass = (status) =>
  String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isLiveEngagement = (story) => {
  const status = normalizeText(
    story.engagementStatus ||
      story.status ||
      story.campaignStatus
  );

  return [
    "ongoing",
    "active",
    "live",
    "in progress",
    "still generating",
    "still generating results",
  ].includes(status);
};

const getProjectStatus = (story) => {
  if (story.projectStatus) {
    return story.projectStatus;
  }

  if (story.propertyStatus) {
    return story.propertyStatus;
  }

  if (Array.isArray(story.projects)) {
    const statuses = story.projects
      .map(
        (project) =>
          project.projectStatus ||
          project.propertyStatus ||
          ""
      )
      .filter(Boolean);

    const uniqueStatuses = [...new Set(statuses)];

    if (uniqueStatuses.length === 1) {
      return uniqueStatuses[0];
    }

    if (uniqueStatuses.length > 1) {
      return "Multiple Project Stages";
    }
  }

  return "";
};

const hasSeoMetrics = (metrics = {}) => {
  const supportedMetrics = [
    metrics.keywords,
    metrics.impressions,
    metrics.clicks,
    metrics.indexedPages,
    metrics.organicLeads,
  ];

  return supportedMetrics.some(hasMetricValue);
};

const SeoGeoResults = () => {
  const seoProjects = useMemo(() => {
    return successStories
      .filter((story) => {
        const seoItems = Array.isArray(story.seo)
          ? story.seo.filter(Boolean)
          : [];

        const geoItems = Array.isArray(story.geo)
          ? story.geo.filter(Boolean)
          : [];

        return (
          Boolean(story.metrics?.seo) ||
          Boolean(story.metrics?.geo) ||
          seoItems.length > 0 ||
          geoItems.length > 0 ||
          hasSeoMetrics(story.seoMetrics)
        );
      })
      .map((story) => {
        const seoItems = Array.isArray(story.seo)
          ? story.seo.filter(Boolean)
          : [];

        const geoItems = Array.isArray(story.geo)
          ? story.geo.filter(Boolean)
          : [];

        return {
          id:
            story.id ||
            story.slug ||
            story.title,

          title:
            story.title ||
            story.projectName ||
            story.client ||
            "SEO & GEO Project",

          client:
            story.client ||
            story.builder ||
            story.title ||
            "",

          location: story.location || "",

          featured: Boolean(story.featured),

          liveCampaign: isLiveEngagement(story),

          projectStatus: getProjectStatus(story),

          seoItems: [...seoItems, ...geoItems],

          metrics: story.seoMetrics || {},
        };
      });
  }, []);

  const totals = useMemo(() => {
    return seoProjects.reduce(
      (summary, project) => {
        summary.keywords += toNumber(
          project.metrics.keywords
        );

        summary.indexedPages += toNumber(
          project.metrics.indexedPages
        );

        summary.organicLeads += toNumber(
          project.metrics.organicLeads
        );

        return summary;
      },
      {
        keywords: 0,
        indexedPages: 0,
        organicLeads: 0,
      }
    );
  }, [seoProjects]);

  return (
    <section
      className="kr-seo-geo-results"
      aria-labelledby="seo-geo-results-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            SEO &amp; GEO RESULTS
          </span>

          <h2 id="seo-geo-results-title">
            Search Visibility Built for{" "}
            <strong>
              Google and AI Discovery
            </strong>
          </h2>

          <p>
            Explore the SEO, GEO and technical search
            foundations implemented across KeyRoutes success
            stories.
          </p>
        </header>

        {seoProjects.length > 0 ? (
          <>
            <div className="kr-seo-geo-summary">
              <article>
                <FaSearch aria-hidden="true" />

                <div>
                  <strong>
                    {formatNumber(totals.keywords)}
                  </strong>

                  <span>Tracked Keywords</span>
                </div>
              </article>

              <article>
                <FaFileAlt aria-hidden="true" />

                <div>
                  <strong>
                    {formatNumber(totals.indexedPages)}
                  </strong>

                  <span>Indexed Pages</span>
                </div>
              </article>

              <article>
                <FaChartLine aria-hidden="true" />

                <div>
                  <strong>
                    {formatNumber(totals.organicLeads)}
                  </strong>

                  <span>Organic Leads</span>
                </div>
              </article>
            </div>

            <div className="kr-seo-geo-grid">
              {seoProjects.map((project) => {
                const projectStatusClass =
                  createStatusClass(
                    project.projectStatus
                  );

                return (
                  <article
                    className={`kr-seo-geo-card ${
                      project.featured
                        ? "is-featured"
                        : ""
                    }`.trim()}
                    key={project.id}
                  >
                    <div className="kr-seo-geo-card-header">
                      <div className="kr-seo-geo-card-heading">
                        <span>
                          SEO + GEO IMPLEMENTATION
                        </span>

                        <h3>{project.title}</h3>

                        {project.location && (
                          <p>{project.location}</p>
                        )}
                      </div>

                      <div className="kr-seo-geo-badges">
                        
                        {project.liveCampaign && (
                          
                          <span className="kr-seo-geo-live">
                            
                            Counting..
                           
                          </span>
                          
                        )}

                       
                      </div>
                    </div>

                    <div className="kr-seo-geo-card-metrics">
                      <div>
                        <FaSearch aria-hidden="true" />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.metrics.keywords
                            )
                              ? project.metrics.keywords
                              : "—"}
                          </strong>

                          Keywords
                        </span>
                      </div>

                      <div>
                        <FaEye aria-hidden="true" />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.metrics
                                .impressions
                            )
                              ? project.metrics
                                  .impressions
                              : "—"}
                          </strong>

                          Impressions
                        </span>
                      </div>

                      <div>
                        <FaMousePointer
                          aria-hidden="true"
                        />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.metrics.clicks
                            )
                              ? project.metrics.clicks
                              : "—"}
                          </strong>

                          Clicks
                        </span>
                      </div>

                      <div>
                        <FaFileAlt aria-hidden="true" />

                        <span>
                          <strong>
                            {hasMetricValue(
                              project.metrics
                                .indexedPages
                            )
                              ? project.metrics
                                  .indexedPages
                              : "—"}
                          </strong>

                          Indexed Pages
                        </span>
                      </div>
                    </div>

                    {project.seoItems.length > 0 && (
                      <div className="kr-seo-geo-checklist">
                        {project.seoItems.map(
                          (item, index) => (
                            <p
                              key={`${project.id}-${item}-${index}`}
                            >
                              <FaCheckCircle
                                aria-hidden="true"
                              />

                              <span>{item}</span>
                            </p>
                          )
                        )}
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
              title="SEO and GEO results coming soon"
              message="Projects with SEO, GEO or search performance data will appear here after they are added to the success story data."
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoGeoResults;