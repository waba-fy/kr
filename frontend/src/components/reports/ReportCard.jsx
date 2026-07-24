import {
  FaArrowRight,
  FaCalendarAlt,
  FaDownload,
  FaFilePdf,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ReportCard = ({
  report,
  onViewDetails,
}) => {
  if (!report) {
    return null;
  }

  const {
    title,
    summary,
    category,
    location,
    year,
    quarter,
    publishedDate,
    pdf,
    fileSize,
    pages,
    featured,
  } = report;

  const formattedDate = publishedDate
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(publishedDate))
    : "";

  return (
    <article
      className={`kr-report-card ${
        featured ? "is-featured" : ""
      }`.trim()}
    >
      <div className="kr-report-card-header">
        
        {category && (
          <span className="kr-report-category-badge">
            {category}
          </span>
        )}
      </div>

      <div className="kr-report-card-content">
        <div className="kr-report-card-meta">
          {location && (
            <span>
              <FaMapMarkerAlt />
              {location}
            </span>
          )}

          {(quarter || year) && (
            <span>
              <FaCalendarAlt />
              {[quarter, year].filter(Boolean).join(" ")}
            </span>
          )}
        </div>

        <h3>{title}</h3>

        {summary && <p>{summary}</p>}

        <div className="kr-report-file-meta">
          {pages > 0 && (
            <span>{pages} pages</span>
          )}

          {fileSize && (
            <span>{fileSize}</span>
          )}

          {formattedDate && (
            <span>Published {formattedDate}</span>
          )}
        </div>

        <div className="kr-report-card-actions">
          {typeof onViewDetails === "function" && (
            <button
              type="button"
              className="kr-report-details-button"
              onClick={() => onViewDetails(report)}
              aria-label={`View details for ${title}`}
            >
              View Details
              <FaArrowRight />
            </button>
          )}

          {pdf && (
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="kr-report-download-button"
              aria-label={`Open ${title} PDF`}
            >
              <FaDownload />
              Open PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReportCard;