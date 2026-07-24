import { useMemo, useState } from "react";

import SuccessStoryFilters from "./SuccessStoryFilters";
import SuccessStoryGrid from "./SuccessStoryGrid";

import { successStories } from "../../data/successStoriesData";

const ProjectGrid = ({ onViewDetails }) => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [year, setYear] = useState("All");

  const validStories = useMemo(() => {
    return Array.isArray(successStories)
      ? successStories.filter(Boolean)
      : [];
  }, []);

  const industries = useMemo(() => {
    const values = validStories
      .map((story) => story.category || story.projectType)
      .filter((value) => Boolean(value?.trim()));

    return [...new Set(values)].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [validStories]);

  const years = useMemo(() => {
    const values = validStories
      .map((story) => String(story.year || "").trim())
      .filter(Boolean);

    return [...new Set(values)].sort(
      (a, b) => Number(b) - Number(a)
    );
  }, [validStories]);

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return validStories.filter((story) => {
      const storyIndustry =
        story.category || story.projectType || "";

      const matchesIndustry =
        industry === "All" ||
        storyIndustry === industry;

      const matchesYear =
        year === "All" ||
        String(story.year || "") === String(year);

      if (!matchesIndustry || !matchesYear) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableContent = [
        story.title,
        story.client,
        story.builder,
        story.category,
        story.projectType,
        story.location,
        story.year,
        story.status,
        story.subtitle,
        story.result,
        story.summary,
        story.description,
        story.overview,
        ...(Array.isArray(story.services)
          ? story.services
          : []),
        ...(Array.isArray(story.challenges)
          ? story.challenges
          : []),
        ...(Array.isArray(story.strategy)
          ? story.strategy
          : []),
        ...(Array.isArray(story.seo)
          ? story.seo
          : []),
        ...(Array.isArray(story.automation)
          ? story.automation
          : []),
        ...(Array.isArray(story.technologies)
          ? story.technologies
          : []),
        ...(Array.isArray(story.tags)
          ? story.tags
          : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(query);
    });
  }, [validStories, search, industry, year]);

  const resetFilters = () => {
    setSearch("");
    setIndustry("All");
    setYear("All");
  };

  return (
    <section
      id="success-story-projects"
      className="kr-success-stories-projects"
      aria-labelledby="success-story-projects-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="eyebrow">
            FEATURED PROJECTS
          </span>

          <h2 id="success-story-projects-title">
            Explore Our{" "}
            <strong>Success Stories</strong>
          </h2>

          <p>
            Discover how KeyRoutes combines websites, SEO,
            GEO, campaigns, analytics and automation to build
            measurable growth systems for real estate brands.
          </p>
        </header>

        <SuccessStoryFilters
          search={search}
          onSearchChange={setSearch}
          industry={industry}
          onIndustryChange={setIndustry}
          industries={industries}
          year={year}
          onYearChange={setYear}
          years={years}
          totalStories={filteredStories.length}
        />

        <SuccessStoryGrid
          stories={filteredStories}
          onViewDetails={onViewDetails}
          onReset={resetFilters}
          emptyTitle="No success stories found"
          emptyMessage="Try another project, service, location, category or year."
        />
      </div>
    </section>
  );
};

export default ProjectGrid;