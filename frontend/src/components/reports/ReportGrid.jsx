import ReportCard from "./ReportCard";

const ReportGrid = ({
  reports = [],
  onViewDetails,
  onReset,
  emptyTitle = "No reports found",
  emptyMessage = "Try adjusting your search or filters.",
}) => {
  if (!reports.length) {
    return (
      <section className="kr-report-empty-state">
        <span className="kr-report-empty-label">
          NO RESULTS
        </span>

        <h2>{emptyTitle}</h2>
        <p>{emptyMessage}</p>

        {onReset && (
          <button
            type="button"
            className="kr-report-reset-button"
            onClick={onReset}
          >
            Reset filters
          </button>
        )}
      </section>
    );
  }

  return (
    <div className="kr-report-grid">
      {reports.map((report) => (
        <ReportCard
          key={report.id || report.slug}
          report={report}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ReportGrid;