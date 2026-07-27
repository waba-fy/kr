import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";

import SEO from "../components/seo/SEO";
import { successStories } from "../data/successStoriesData";

import "../styles/case-studies.css";

const normalizeSlug = (value = "") => {
  return String(value)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^success-stories\//, "")
    .replace(/^case-studies\//, "");
};

const CaseStudies = () => {
  const caseStudies = Array.isArray(successStories)
    ? successStories.filter(
        (story) =>
          story &&
          typeof story === "object" &&
          Boolean(
            story.caseStudySlug ||
              story.slug
          )
      )
    : [];

  return (
    <main className="kr-case-studies-page">
      <SEO
        title="Real Estate Case Studies"
        description="Explore detailed KeyRoutes real estate case studies covering websites, SEO, GEO, Google Ads, Meta Ads, analytics and lead automation."
        canonical="/case-studies"
        keywords={[
          "real estate case studies",
          "digital marketing case studies",
          "Google Ads real estate case study",
          "Meta Ads real estate case study",
          "SEO case studies",
          "real estate lead generation",
          "Hyderabad real estate marketing",
        ]}
      />

      <section className="kr-case-studies-hero">
  <div className="kr-success-stories-container">
    <div className="kr-case-studies-hero-content">
      <span className="eyebrow">
        VERIFIED CLIENT RESULTS
      </span>

      <h1>
        Detailed <strong>Case Studies</strong>
      </h1>

      <p>
        Explore how KeyRoutes transforms websites,
        SEO, GEO, Google Ads, Meta Ads and automation
        into measurable business growth through
        real-world client implementations.
      </p>

      <div className="kr-case-study-hero-stats">
        <div>
          <strong>{caseStudies.length}+</strong>
          <span>Case Studies</span>
        </div>

        <div>
          <strong>1000+</strong>
          <span>Qualified Leads</span>
        </div>

        <div>
          <strong>SEO + Ads</strong>
          <span>Growth Systems</span>
        </div>

        <div>
          <strong>Live</strong>
          <span>Campaign Data</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="kr-case-study-list">
        <div className="kr-success-stories-container">
          {caseStudies.length > 0 ? (
            <div className="kr-case-study-grid">
              {caseStudies.map((story, index) => {
                const slug = normalizeSlug(
                  story.caseStudySlug ||
                    story.slug
                );

                return (
                  <article
                    className="kr-case-study-card"
                    key={
                      story.id ||
                      story.slug ||
                      story.title ||
                      index
                    }
                  >
                    <div className="kr-case-study-card-icon">
                      <FaFileAlt aria-hidden="true" />
                    </div>

                    <span className="kr-case-study-card-label">
                      DETAILED CASE STUDY
                    </span>

                    <h2>
                      {story.caseStudyTitle ||
                        `${story.title} Case Study`}
                    </h2>

                    <p>
                      {story.caseStudyDescription ||
                        story.summary ||
                        story.subtitle ||
                        story.result ||
                        "Explore the complete digital growth case study."}
                    </p>

                    <div className="kr-case-study-card-actions">
                      <Link
                        to={`/case-studies/${slug}`}
                        className="kr-case-study-view"
                        aria-label={`View full case study for ${
                          story.title ||
                          "this project"
                        }`}
                      >
                        View Full Case Study
                        <FaArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kr-case-study-empty">
              <FaFileAlt aria-hidden="true" />

              <h2>Case studies coming soon</h2>

              <p>
                Detailed case studies will appear here when
                they are added to the project data.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;