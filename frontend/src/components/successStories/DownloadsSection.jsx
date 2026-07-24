import { useMemo } from "react";
import { FaFilePdf } from "react-icons/fa";

import DownloadButton from "../common/DownloadButton";
import { successStories } from "../../data/successStoriesData";

const DownloadsSection = () => {
  const downloads = useMemo(() => {
    const stories = Array.isArray(successStories)
      ? successStories.filter(Boolean)
      : [];

    return stories.flatMap((story) => {
      const storyDownloads = Array.isArray(story.downloads)
        ? story.downloads.filter(Boolean)
        : [];

      const additionalDownloads = storyDownloads
        .filter((item) => Boolean(item?.file?.trim()))
        .map((item, index) => ({
          id:
            item.id ||
            `${story.id || story.slug || story.title}-${index}`,
          storyTitle: story.title || "Success Story",
          title: item.title || "Project Document",
          description:
            item.description ||
            `${item.title || "Project document"} for ${
              story.title || "this project"
            }.`,
          href: item.file,
          fileType: item.fileType || "PDF",
        }));

      const mainPdf = story.pdf?.trim();

      const mainCaseStudy = mainPdf
        ? {
            id: `${
              story.id || story.slug || story.title
            }-case-study`,
            storyTitle: story.title || "Success Story",
            title: `${story.title || "Project"} Case Study`,
            description:
              story.subtitle ||
              story.summary ||
              story.result ||
              "Download the complete project case study.",
            href: mainPdf,
            fileType: "PDF",
          }
        : null;

      const mainPdfAlreadyIncluded =
        mainPdf &&
        additionalDownloads.some(
          (item) => item.href === mainPdf
        );

      if (!mainCaseStudy || mainPdfAlreadyIncluded) {
        return additionalDownloads;
      }

      return [mainCaseStudy, ...additionalDownloads];
    });
  }, []);

  return (
    <section
      id="success-story-downloads"
      className="kr-success-downloads"
      aria-labelledby="success-story-downloads-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            REPORTS & DOWNLOADS
          </span>

          <h2 id="success-story-downloads-title">
            Download Detailed{" "}
            <strong>Case Studies</strong>
          </h2>

          <p>
            Explore project overviews, SEO reports, landing-page
            audits and complete success-story documents.
          </p>
        </header>

        {downloads.length > 0 ? (
          <div className="kr-success-downloads-grid">
            {downloads.map((item) => (
              <article
                className="kr-success-download-item"
                key={item.id}
              >
                <div className="kr-success-download-heading">
                  <span
                    className="kr-success-download-icon"
                    aria-hidden="true"
                  >
                    <FaFilePdf />
                  </span>

                  <div>
                    <small>{item.storyTitle}</small>
                    <span>{item.fileType}</span>
                  </div>
                </div>

                <DownloadButton
                  title={item.title}
                  description={item.description}
                  href={item.href}
                />
              </article>
            ))}
          </div>
        ) : (
          <div className="kr-success-downloads-empty">
            <FaFilePdf aria-hidden="true" />

            <h3>Downloads coming soon</h3>

            <p>
              Project reports and complete case-study PDFs will
              appear here when files are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadsSection;