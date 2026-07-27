import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaHandshake,
  FaProjectDiagram,
  FaStar,
  FaUsers,
} from "react-icons/fa";

import { clientStories } from "../../data/clientStories";

const SuccessHero = () => {
  const stats = useMemo(() => {
    const validStories = Array.isArray(clientStories)
      ? clientStories.filter(
          (story) =>
            story &&
            story.hero &&
            story.partnership
        )
      : [];

    const totalStories = validStories.length;

    const featuredStories = validStories.filter(
      (story) => Boolean(story.featured)
    ).length;

    const ongoingPartnerships = validStories.filter(
      (story) =>
        story.partnership?.status
          ?.trim()
          .toLowerCase() === "ongoing"
    ).length;

    const happyClients = validStories.filter(
      (story) =>
        Number(story.clientHappiness?.rating) >= 4
    ).length;

    return {
      totalStories,
      featuredStories,
      ongoingPartnerships,
      happyClients,
    };
  }, []);

  return (
    <section
      className="kr-success-stories-hero"
      aria-labelledby="success-stories-hero-title"
    >
      <div
        className="kr-success-stories-hero-bg"
        aria-hidden="true"
      />

      <div
        className="kr-success-stories-hero-orb kr-success-stories-hero-orb-one"
        aria-hidden="true"
      />

      <div
        className="kr-success-stories-hero-orb kr-success-stories-hero-orb-two"
        aria-hidden="true"
      />

      <div className="kr-success-stories-container">
        <div className="kr-success-stories-hero-layout">
          <div className="kr-success-stories-hero-content">
            <span className="kr-success-stories-eyebrow">
              CLIENT SUCCESS STORIES
            </span>

            <h1 id="success-stories-hero-title">
              Real Partnerships.
              <br />
              <strong>Measurable Success.</strong>
            </h1>

            <p className="kr-success-stories-hero-description">
              Discover how KeyRoutes works with ambitious
              businesses to build stronger digital experiences,
              generate measurable results and create long-term
              growth partnerships.
            </p>

            <div className="kr-success-stories-hero-actions">
              <a
                href="#success-story-projects"
                className="kr-success-stories-primary-button"
              >
                Explore Success Stories
                <FaArrowRight aria-hidden="true" />
              </a>

              <Link
                to="/case-studies"
                className="kr-success-stories-secondary-button"
              >
                View Detailed Case Studies
                <FaProjectDiagram aria-hidden="true" />
              </Link>
            </div>

            <div className="kr-success-stories-hero-trust">
              <div className="kr-success-stories-hero-stars">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <FaStar
                      key={index}
                      aria-hidden="true"
                    />
                  )
                )}
              </div>

              <span>
                Built on client trust, transparent reporting
                and continuous optimisation.
              </span>
            </div>
          </div>

          <div
            className="kr-success-stories-hero-visual"
            aria-label="KeyRoutes success story highlights"
          >
            <div className="kr-success-stories-hero-visual-card">
              <span className="kr-success-stories-visual-label">
                WHAT OUR STORIES REPRESENT
              </span>

              <h2>
                Client happiness meets measurable
                performance.
              </h2>

              <div className="kr-success-stories-visual-points">
                <div>
                  <span className="kr-success-stories-visual-icon">
                    <FaHandshake aria-hidden="true" />
                  </span>

                  <div>
                    <strong>
                      Strong Partnerships
                    </strong>

                    <p>
                      Long-term relationships built through
                      trust and consistent communication.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="kr-success-stories-visual-icon">
                    <FaChartLine aria-hidden="true" />
                  </span>

                  <div>
                    <strong>
                      Visible Performance
                    </strong>

                    <p>
                      Clear campaign, lead-generation and
                      digital growth outcomes.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="kr-success-stories-visual-icon">
                    <FaUsers aria-hidden="true" />
                  </span>

                  <div>
                    <strong>
                      Happy Clients
                    </strong>

                    <p>
                      Real feedback from businesses supported
                      by KeyRoutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="kr-success-stories-hero-floating-card">
              <span>SUCCESS STORY JOURNEY</span>

              <strong>
                Before → What We Did → After
              </strong>
            </div>
          </div>
        </div>

        <div
          className="kr-success-stories-hero-stats"
          aria-label="Success story overview"
        >
          <div className="kr-success-stories-hero-stat">
            <span className="kr-success-stories-stat-icon">
              <FaProjectDiagram aria-hidden="true" />
            </span>

            <span>
              <strong>{stats.totalStories}</strong>
              Client Stories
            </span>
          </div>

          <div className="kr-success-stories-hero-stat">
            <span className="kr-success-stories-stat-icon">
              <FaHandshake aria-hidden="true" />
            </span>

            <span>
              <strong>
                {stats.ongoingPartnerships}
              </strong>
              Ongoing Partnerships
            </span>
          </div>

          <div className="kr-success-stories-hero-stat">
            <span className="kr-success-stories-stat-icon">
              <FaStar aria-hidden="true" />
            </span>

            <span>
              <strong>{stats.happyClients}</strong>
              Happy Clients
            </span>
          </div>

          <div className="kr-success-stories-hero-stat">
            <span className="kr-success-stories-stat-icon">
              <FaChartLine aria-hidden="true" />
            </span>

            <span>
              <strong>
                {stats.featuredStories}
              </strong>
              Featured Results
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessHero;