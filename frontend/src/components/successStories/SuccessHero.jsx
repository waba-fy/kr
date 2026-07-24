import { useMemo } from "react";
import {
  FaChartLine,
  FaGlobe,
  FaProjectDiagram,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

import { successStories } from "../../data/successStoriesData";

const SuccessHero = () => {
  const stats = useMemo(() => {
    const validStories = Array.isArray(successStories)
      ? successStories.filter(Boolean)
      : [];

    const totalProjects = validStories.length;

    const featuredProjects = validStories.filter(
      (story) => Boolean(story.featured)
    ).length;

    const totalClients = new Set(
      validStories
        .map((story) => story.builder || story.client)
        .filter((value) => Boolean(value?.trim()))
    ).size;

    const liveWebsites = validStories.filter(
      (story) => Boolean(story.website?.trim())
    ).length;

    return {
      totalProjects,
      featuredProjects,
      totalClients,
      liveWebsites,
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

      <div className="kr-success-stories-container">
        <div className="kr-success-stories-hero-content">
          <span className="kr-success-stories-eyebrow">
            REAL ESTATE SUCCESS STORIES
          </span>

          <h1 id="success-stories-hero-title">
            Growth Systems Built for
            <br />
            <strong>Real Estate Brands</strong>
          </h1>

          <p>
            Explore how KeyRoutes combines project websites,
            landing pages, SEO, GEO optimization, paid campaigns,
            analytics and lead automation to build complete digital
            growth systems for builders and real estate projects.
          </p>

          <div className="kr-success-stories-hero-actions">
            <a
              href="#success-story-projects"
              className="kr-success-stories-primary-button"
            >
              Explore Projects
              <FaProjectDiagram aria-hidden="true" />
            </a>

            <a
              href="#success-story-downloads"
              className="kr-success-stories-secondary-button"
            >
              View Case Studies
              <FaTrophy aria-hidden="true" />
            </a>
          </div>

          <div
            className="kr-success-stories-hero-stats"
            aria-label="Success story overview"
          >
            <div>
              <FaProjectDiagram aria-hidden="true" />

              <span>
                <strong>{stats.totalProjects}</strong>
                Success Stories
              </span>
            </div>

            <div>
              <FaUsers aria-hidden="true" />

              <span>
                <strong>{stats.totalClients}</strong>
                Clients Featured
              </span>
            </div>

            <div>
              <FaChartLine aria-hidden="true" />

              <span>
                <strong>{stats.featuredProjects}</strong>
                Featured Results
              </span>
            </div>

            <div>
              <FaGlobe aria-hidden="true" />

              <span>
                <strong>{stats.liveWebsites}</strong>
                Live Websites
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessHero;