import { FaChartLine, FaFileAlt, FaDownload } from "react-icons/fa";

const ReportHero = ({
  totalReports = 0,
  featuredReports = 0,
  totalDownloads = 0,
}) => {
  return (
    <section className="kr-reports-hero">
      <div className="kr-reports-hero-bg"></div>

      <div className="kr-reviews-container">
        <div className="kr-reports-hero-content">
          <span className="kr-reviews-eyebrow">
            MARKET RESEARCH
          </span>

          <h1>
            Insights That Drive
            <br />
            <strong>Better Business Decisions</strong>
          </h1>

          <p>
            Explore KeyRoutes market reports covering industry
            trends, customer behaviour, digital marketing,
            technology, automation, and real estate insights.
            Our research is designed to help businesses make
            informed, data-driven decisions.
          </p>

          <div className="kr-reports-hero-stats">
            <div>
              <FaFileAlt />

              <span>
                <strong>{totalReports}</strong>
                Published Reports
              </span>
            </div>

            <div>
              <FaChartLine />

              <span>
                <strong>{featuredReports}</strong>
                Featured Research
              </span>
            </div>

            <div>
              <FaDownload />

              <span>
                <strong>{totalDownloads}</strong>
                Downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportHero;