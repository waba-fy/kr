import { useMemo, useState } from "react";

import SuccessStoryFilters from "./SuccessStoryFilters";
import SuccessStoryGrid from "./SuccessStoryGrid";

import { clientStories } from "../../data/clientStories";

/* =====================================================
   HELPERS
===================================================== */

const normaliseText = (value) =>
  String(value ?? "").trim();

const getStartingYear = (value) => {
  const match = normaliseText(value).match(/\d{4}/);

  return match ? Number(match[0]) : 0;
};

const getStoryIndustry = (story) =>
  normaliseText(story?.partnership?.category) ||
  normaliseText(story?.partnership?.projectType) ||
  normaliseText(story?.hero?.subtitle) ||
  "Other";

const getStoryYear = (story) =>
  getStartingYear(
    story?.partnership?.since ||
      story?.partnership?.duration
  );

const extractText = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.flatMap((item) => {
    if (typeof item === "string") {
      const value = item.trim();

      return value ? [value] : [];
    }

    if (!item || typeof item !== "object") {
      return [];
    }

    return [
      item.title,
      item.name,
      item.label,
      item.value,
      item.description,
      item.platform,
      item.category,
      item.location,
      item.status,
      item.website,
    ]
      .map(normaliseText)
      .filter(Boolean);
  });
};

const createSearchableContent = (story) => {
  const projects = Array.isArray(
    story?.partnership?.projects
  )
    ? story.partnership.projects
    : [];

  const channels = Array.isArray(
    story?.partnership?.channels
  )
    ? story.partnership.channels
    : [];

  const partnershipHighlights = Array.isArray(
    story?.partnership?.highlights
  )
    ? story.partnership.highlights
    : [];

  const relationshipHighlights = Array.isArray(
    story?.clientHappiness?.relationshipHighlights
  )
    ? story.clientHappiness.relationshipHighlights
    : [];

  const services = Array.isArray(
    story?.servicesDelivered?.services
  )
    ? story.servicesDelivered.services
    : [];

  const performanceCards = Array.isArray(
    story?.performance?.cards
  )
    ? story.performance.cards
    : [];

  const supportingMetrics = Array.isArray(
    story?.performance?.supportingMetrics
  )
    ? story.performance.supportingMetrics
    : [];

  const platformHighlights = Array.isArray(
    story?.performance?.platformHighlights
  )
    ? story.performance.platformHighlights
    : [];

  const beforeItems = Array.isArray(
    story?.transformation?.before?.items
  )
    ? story.transformation.before.items
    : [];

  const solutionItems = Array.isArray(
    story?.transformation?.solution?.items
  )
    ? story.transformation.solution.items
    : [];

  const actionItems = Array.isArray(
    story?.transformation?.actions?.items
  )
    ? story.transformation.actions.items
    : [];

  const afterItems = Array.isArray(
    story?.transformation?.after?.items
  )
    ? story.transformation.after.items
    : [];

  const showcaseWebsites = Array.isArray(
    story?.showcase?.websites
  )
    ? story.showcase.websites
    : [];

  const whyItWorkedPoints = Array.isArray(
    story?.whyItWorked?.points
  )
    ? story.whyItWorked.points
    : [];

  const tags = Array.isArray(story?.tags)
    ? story.tags
    : [];

  return [
    story?.slug,

    /* Hero */

    story?.hero?.eyebrow,
    story?.hero?.title,
    story?.hero?.subtitle,
    story?.hero?.location,
    story?.hero?.services,
    story?.hero?.result,
    story?.hero?.description,
    story?.hero?.status,

    /* Partnership */

    story?.partnership?.eyebrow,
    story?.partnership?.title,
    story?.partnership?.description,
    story?.partnership?.category,
    story?.partnership?.projectType,
    story?.partnership?.location,
    story?.partnership?.status,
    story?.partnership?.since,
    story?.partnership?.duration,
    story?.partnership?.projectsSupported,

    ...extractText(channels),
    ...extractText(partnershipHighlights),
    ...extractText(projects),

    /* Client happiness */

    story?.clientHappiness?.eyebrow,
    story?.clientHappiness?.title,
    story?.clientHappiness?.quote,
    story?.clientHappiness?.reviewer,
    story?.clientHappiness?.designation,
    story?.clientHappiness?.company,

    ...extractText(relationshipHighlights),

    /* Services */

    story?.servicesDelivered?.eyebrow,
    story?.servicesDelivered?.title,
    story?.servicesDelivered?.description,

    ...extractText(services),

    /* Performance */

    story?.performance?.eyebrow,
    story?.performance?.title,
    story?.performance?.description,
    story?.performance?.note,

    ...extractText(performanceCards),
    ...extractText(supportingMetrics),
    ...extractText(platformHighlights),

    /* Transformation */

    story?.transformation?.eyebrow,
    story?.transformation?.title,
    story?.transformation?.description,
    story?.transformation?.before?.title,
    story?.transformation?.solution?.title,
    story?.transformation?.actions?.title,
    story?.transformation?.after?.title,
    story?.transformation?.outcome,

    ...extractText(beforeItems),
    ...extractText(solutionItems),
    ...extractText(actionItems),
    ...extractText(afterItems),

    /* Showcase */

    story?.showcase?.eyebrow,
    story?.showcase?.title,
    story?.showcase?.description,

    ...extractText(showcaseWebsites),

    /* Why it worked */

    story?.whyItWorked?.eyebrow,
    story?.whyItWorked?.title,
    story?.whyItWorked?.description,

    ...extractText(whyItWorkedPoints),

    /* CTA */

    story?.cta?.eyebrow,
    story?.cta?.title,
    story?.cta?.description,
    story?.cta?.supportingText,

    ...extractText(tags),
  ]
    .map(normaliseText)
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

/* =====================================================
   COMPONENT
===================================================== */

const ProjectGrid = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] =
    useState("All");
  const [year, setYear] =
    useState("All");

  /*
   * Validate the stories and place featured/newer
   * partnerships first.
   */
  const validStories = useMemo(() => {
    if (!Array.isArray(clientStories)) {
      return [];
    }

    return clientStories
      .filter(
        (story) =>
          story &&
          typeof story === "object" &&
          Boolean(normaliseText(story.slug)) &&
          Boolean(
            normaliseText(story.hero?.title)
          )
      )
      .sort((storyA, storyB) => {
        const featuredDifference =
          Number(Boolean(storyB.featured)) -
          Number(Boolean(storyA.featured));

        if (featuredDifference !== 0) {
          return featuredDifference;
        }

        const yearDifference =
          getStoryYear(storyB) -
          getStoryYear(storyA);

        if (yearDifference !== 0) {
          return yearDifference;
        }

        return normaliseText(
          storyA.hero?.title
        ).localeCompare(
          normaliseText(storyB.hero?.title)
        );
      });
  }, []);

  /*
   * Industry filter values.
   */
  const industries = useMemo(() => {
    const values = validStories
      .map(getStoryIndustry)
      .filter(Boolean);

    return [...new Set(values)].sort(
      (valueA, valueB) =>
        valueA.localeCompare(valueB)
    );
  }, [validStories]);

  /*
   * Partnership year filter values.
   */
  const years = useMemo(() => {
    const values = validStories
      .map(getStoryYear)
      .filter((value) => value > 0)
      .map(String);

    return [...new Set(values)].sort(
      (valueA, valueB) =>
        Number(valueB) - Number(valueA)
    );
  }, [validStories]);

  /*
   * Apply search, industry and year filters.
   */
  const filteredStories = useMemo(() => {
    const query = normaliseText(search)
      .toLowerCase();

    return validStories.filter((story) => {
      const storyIndustry =
        getStoryIndustry(story);

      const storyYear = String(
        getStoryYear(story) || ""
      );

      const matchesIndustry =
        industry === "All" ||
        storyIndustry === industry;

      const matchesYear =
        year === "All" ||
        storyYear === String(year);

      if (!matchesIndustry || !matchesYear) {
        return false;
      }

      if (!query) {
        return true;
      }

      return createSearchableContent(
        story
      ).includes(query);
    });
  }, [
    validStories,
    search,
    industry,
    year,
  ]);

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
          <span className="kr-success-section-eyebrow">
            CLIENT PARTNERSHIPS
          </span>

          <h2 id="success-story-projects-title">
            Explore Our{" "}
            <strong>Success Stories</strong>
          </h2>

          <p>
            Discover how KeyRoutes combines
            strategy, digital experiences,
            performance marketing, analytics
            and automation to create measurable
            growth and long-term client
            partnerships.
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
          onReset={resetFilters}
          emptyTitle="No success stories found"
          emptyMessage="Try another client, service, location, industry or partnership year."
        />
      </div>
    </section>
  );
};

export default ProjectGrid;