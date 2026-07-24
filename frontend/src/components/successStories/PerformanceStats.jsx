import {
  FaChartLine,
  FaFileAlt,
  FaGlobe,
  FaProjectDiagram,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

import { successStories } from "../../data/successStoriesData";

const PerformanceStats = () => {
  const totalProjects = successStories.length;

  const featuredProjects = successStories.filter(
    (story) => story.featured
  ).length;

  const completedProjects = successStories.filter(
    (story) =>
      String(story.status || "")
        .trim()
        .toLowerCase() === "completed"
  ).length;

  const totalClients = new Set(
    successStories
      .map((story) => story.builder || story.client)
      .filter(Boolean)
  ).size;

  const liveWebsites = successStories.filter(
    (story) => Boolean(story.website?.trim())
  ).length;

  const availableCaseStudies = successStories.filter(
    (story) => Boolean(story.pdf?.trim())
  ).length;

  const totalServices = new Set(
    successStories.flatMap((story) =>
      Array.isArray(story.services)
        ? story.services.filter(Boolean)
        : []
    )
  ).size;

  const stats = [
    {
      id: "projects",
      icon: FaProjectDiagram,
      value: totalProjects,
      label: "Projects Featured",
      description:
        "Real estate projects powered by strategy, technology, marketing and automation.",
    },
    {
      id: "clients",
      icon: FaUsers,
      value: totalClients,
      label: "Clients Featured",
      description:
        "Builders and real estate brands represented across our success stories.",
    },
    {
      id: "completed",
      icon: FaTrophy,
      value: completedProjects,
      label: "Completed Projects",
      description:
        "Projects successfully delivered and marked as completed.",
    },
    {
      id: "featured",
      icon: FaChartLine,
      value: featuredProjects,
      label: "Featured Results",
      description:
        "Selected projects showcasing complete digital growth implementations.",
    },
    {
      id: "websites",
      icon: FaGlobe,
      value: liveWebsites,
      label: "Live Websites",
      description:
        "Success stories with an active project or campaign website.",
    },
    {
      id: "case-studies",
      icon: FaFileAlt,
      value: availableCaseStudies,
      label: "Case Studies",
      description:
        "Projects with downloadable case study documents available.",
    },
  ];

  return (
    <section
      className="kr-performance-stats"
      aria-labelledby="performance-stats-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            PERFORMANCE OVERVIEW
          </span>

          <h2 id="performance-stats-title">
            Growth Systems Built for{" "}
            <strong>Real Estate Brands</strong>
          </h2>

          <p>
            Our current success story library covers{" "}
            <strong>{totalServices}</strong> distinct services
            across websites, SEO, GEO, campaigns, analytics and
            automation.
          </p>
        </header>

        <div className="kr-performance-stats-grid">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="kr-performance-stat-card"
                key={item.id}
              >
                <div
                  className="kr-performance-stat-icon"
                  aria-hidden="true"
                >
                  <Icon />
                </div>

                <strong className="kr-performance-stat-value">
                  {item.value}
                </strong>

                <h3>{item.label}</h3>

                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerformanceStats;