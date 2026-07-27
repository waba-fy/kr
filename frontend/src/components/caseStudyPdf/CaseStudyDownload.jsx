import { FaDownload, FaFilePdf } from "react-icons/fa";

const CaseStudyDownload = ({ data }) => {
  if (!data) return null;

  const downloads = Array.isArray(data.downloads)
    ? data.downloads.filter(
        (item) => Boolean(item?.file?.trim())
      )
    : [];

  const mainPdf = data.pdf?.trim();

  const downloadableItems =
    downloads.length > 0
      ? downloads
      : mainPdf
        ? [
            {
              id: `${data.id || data.slug || data.title}-pdf`,
              title: `${data.title || "Project"} Case Study`,
              description:
                data.summary ||
                data.subtitle ||
                "Download the complete project case study.",
              file: mainPdf,
              fileType: "PDF",
            },
          ]
        : [];

  return (
    <section className="cs-page cs-download-page">
      <div className="cs-download-content">
        <div className="cs-download-copy">
          <span className="cs-download-eyebrow">
            CASE STUDY DOWNLOAD
          </span>

          <h2>
            Download the Complete{" "}
            <strong>Reference Report</strong>
          </h2>

          <p>
            Review the complete project overview, strategy,
            campaign performance, SEO implementation,
            lead journey, reporting framework and next
            growth opportunities.
          </p>

          <div className="cs-download-highlights">
            <span>Project Overview</span>
            <span>Paid Media Results</span>
            <span>SEO + GEO</span>
            <span>Lead Automation</span>
            <span>Technology Stack</span>
            <span>Growth Opportunities</span>
          </div>
        </div>

        
      </div>

      <div className="cs-download-footer">
        <div>
          <span>Prepared by</span>
          <strong>KeyRoutes</strong>
        </div>

        
      </div>
    </section>
  );
};

export default CaseStudyDownload;