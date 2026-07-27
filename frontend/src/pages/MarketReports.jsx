import { useEffect, useMemo, useState } from "react";
import {
  FaTimes,
  FaFilePdf,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";

import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import {
  marketReportsCollectionSchema,
} from "../seo/reportSchema";
import {
  marketReportsBreadcrumbSchema,
} from "../seo/breadcrumbSchema";
import ReportHero from "../components/reports/ReportHero";
import ReportFilters from "../components/reports/ReportFilters";
import ReportGrid from "../components/reports/ReportGrid";
import DownloadButton from "../components/common/DownloadButton";

import { marketReports } from "../data/marketReportsData";

import "../styles/market-reports.css";

const marketReportsDescription =
  "Explore KeyRoutes market reports, industry research, digital trends, customer behaviour, technology insights and real estate intelligence.";

const MarketReports = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      marketReports
        .map((report) => report.category)
        .filter(Boolean)
    );

    return Array.from(uniqueCategories).sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  const years = useMemo(() => {
    const uniqueYears = new Set(
      marketReports
        .map((report) => String(report.year || "").trim())
        .filter(Boolean)
    );

    return Array.from(uniqueYears).sort(
      (a, b) => Number(b) - Number(a)
    );
  }, []);

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return marketReports.filter((report) => {
      const matchesCategory =
        category === "All" || report.category === category;

      const matchesYear =
        year === "All" || String(report.year) === String(year);

      if (!matchesCategory || !matchesYear) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableContent = [
        report.title,
        report.slug,
        report.category,
        report.reportType,
        report.location,
        report.market,
        report.year,
        report.quarter,
        report.subtitle,
        report.summary,
        report.description,
        report.executiveSummary,
        report.author,
        report.source,
        ...(report.topics || []),
        ...(report.highlights || []),
        ...(report.audience || []),
        ...(report.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedSearch);
    });
  }, [search, category, year]);

  const totalReports = marketReports.length;

  const featuredReports = marketReports.filter(
    (report) => report.featured
  ).length;

  
  const totalDownloads = marketReports.reduce(
    (total, report) =>
      total +
      (Array.isArray(report.downloads)
        ? report.downloads.length
        : 0),
    0
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setYear("All");
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  const formatPublishedDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsedDate);
  };

  useEffect(() => {
    if (!selectedReport) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeReport();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedReport]);

  return (
    <main className="kr-market-reports-page">
      <SEO
        title="Market Reports & Industry Insights"
        description={marketReportsDescription}
        canonical="/market-reports"
        keywords={[
          "market reports",
          "industry insights",
          "KeyRoutes research",
          "real estate reports",
          "real estate market intelligence",
          "digital marketing trends",
          "customer behaviour insights",
          "business intelligence",
          "technology insights",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          marketReportsCollectionSchema,
          marketReportsBreadcrumbSchema,
        ]}
      />

      <ReportHero
        totalReports={totalReports}
        featuredReports={featuredReports}
        totalDownloads={totalDownloads}
      />

      <section className="kr-market-reports-main">
        <div className="kr-reports-container">
          <ReportFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            year={year}
            onYearChange={setYear}
            years={years}
            totalReports={filteredReports.length}
          />

          <ReportGrid
            reports={filteredReports}
            onViewDetails={setSelectedReport}
            onReset={resetFilters}
            emptyTitle="No market reports found"
            emptyMessage="Try another keyword, category, or publication year."
          />
        </div>
      </section>

      {selectedReport && (
        <div
          className="kr-report-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeReport();
            }
          }}
        >
          <section
            className="kr-report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <button
              type="button"
              className="kr-report-modal-close"
              onClick={closeReport}
              aria-label="Close report details"
            >
              <FaTimes />
            </button>

            <header className="kr-report-modal-header">
              <div className="kr-report-modal-heading">
                <div className="kr-report-modal-labels">
                  <span className="kr-report-modal-eyebrow">
                    {selectedReport.reportType ||
                      "MARKET REPORT"}
                  </span>

                  {selectedReport.status && (
                    <span
                      className={`kr-report-status kr-report-status--${selectedReport.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {selectedReport.status}
                    </span>
                  )}
                </div>

                <h2 id="report-modal-title">
                  {selectedReport.title}
                </h2>

                {selectedReport.subtitle && (
                  <p className="kr-report-modal-subtitle">
                    {selectedReport.subtitle}
                  </p>
                )}

                {selectedReport.summary && (
                  <p className="kr-report-modal-summary">
                    {selectedReport.summary}
                  </p>
                )}
              </div>

             
            </header>

            <div className="kr-report-modal-body">
              <div className="kr-report-modal-meta">
                {selectedReport.location && (
                  <div>
                    <FaMapMarkerAlt />

                    <span>
                      <strong>Location</strong>
                      {selectedReport.location}
                    </span>
                  </div>
                )}

                {(selectedReport.quarter ||
                  selectedReport.year) && (
                  <div>
                    <FaCalendarAlt />

                    <span>
                      <strong>Reporting Period</strong>
                      {[
                        selectedReport.quarter,
                        selectedReport.year,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  </div>
                )}

                {selectedReport.pages > 0 && (
                  <div>
                    <FaFilePdf />

                    <span>
                      <strong>Document Length</strong>
                      {selectedReport.pages} pages
                    </span>
                  </div>
                )}

                {selectedReport.fileSize && (
                  <div>
                    <FaFilePdf />

                    <span>
                      <strong>File Size</strong>
                      {selectedReport.fileSize}
                    </span>
                  </div>
                )}
              </div>

              {selectedReport.executiveSummary && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    01
                  </span>

                  <div>
                    <h3>Executive Summary</h3>
                    <p>{selectedReport.executiveSummary}</p>
                  </div>
                </section>
              )}

              {selectedReport.description && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    02
                  </span>

                  <div>
                    <h3>About This Report</h3>
                    <p>{selectedReport.description}</p>
                  </div>
                </section>
              )}

              {selectedReport.keyMetrics?.length > 0 && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    03
                  </span>

                  <div>
                    <h3>Report Scope</h3>

                    <div className="kr-report-modal-kpis">
                      {selectedReport.keyMetrics.map(
                        (metric) => (
                          <article
                            key={metric.id || metric.label}
                            className="kr-report-modal-kpi"
                          >
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>

                            {metric.description && (
                              <p>{metric.description}</p>
                            )}
                          </article>
                        )
                      )}
                    </div>
                  </div>
                </section>
              )}

              {selectedReport.topics?.length > 0 && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    04
                  </span>

                  <div>
                    <h3>Topics Covered</h3>

                    <div className="kr-report-modal-tags">
                      {selectedReport.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {selectedReport.highlights?.length > 0 && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    05
                  </span>

                  <div>
                    <h3>Key Insights</h3>

                    <div className="kr-report-modal-highlights">
                      {selectedReport.highlights.map(
                        (highlight) => (
                          <p key={highlight}>
                            <FaCheckCircle />
                            <span>{highlight}</span>
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </section>
              )}

              {selectedReport.recommendations?.length >
                0 && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    06
                  </span>

                  <div>
                    <h3>Recommendations</h3>

                    <div className="kr-report-modal-recommendations">
                      {selectedReport.recommendations.map(
                        (recommendation, index) => (
                          <article
                            key={recommendation}
                            className="kr-report-recommendation"
                          >
                            <span>
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <p>{recommendation}</p>
                          </article>
                        )
                      )}
                    </div>
                  </div>
                </section>
              )}

              {selectedReport.audience?.length > 0 && (
                <section className="kr-report-modal-section">
                  <span className="kr-report-section-number">
                    07
                  </span>

                  <div>
                    <h3>Who This Report Is For</h3>

                    <div className="kr-report-modal-audience">
                      {selectedReport.audience.map((item) => (
                        <span key={item}>
                          <FaUsers />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              <div className="kr-report-modal-publishing">
                {selectedReport.author && (
                  <div>
                    <strong>Author</strong>
                    <span>{selectedReport.author}</span>
                  </div>
                )}

                {selectedReport.source && (
                  <div>
                    <strong>Source</strong>
                    <span>{selectedReport.source}</span>
                  </div>
                )}

                {selectedReport.version && (
                  <div>
                    <strong>Version</strong>
                    <span>{selectedReport.version}</span>
                  </div>
                )}

                {selectedReport.publishedDate && (
                  <div>
                    <strong>Published</strong>
                    <span>
                      {formatPublishedDate(
                        selectedReport.publishedDate
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="kr-report-modal-actions">
                {selectedReport.pdf && (
                  <DownloadButton
                    title="Download Market Report"
                    description={`${
                      selectedReport.pages || 0
                    } pages${
                      selectedReport.fileSize
                        ? ` • ${selectedReport.fileSize}`
                        : ""
                    }`}
                    href={selectedReport.pdf}
                  />
                )}

                {selectedReport.externalUrl && (
                  <a
                    href={selectedReport.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kr-report-external-link"
                  >
                    <FaExternalLinkAlt />
                    View External Source
                  </a>
                )}
              </div>

              {selectedReport.disclaimer && (
                <p className="kr-report-modal-disclaimer">
                  {selectedReport.disclaimer}
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default MarketReports;