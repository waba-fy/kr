import SearchBar from "../common/SearchBar";
import CategoryFilter from "../common/CategoryFilter";

const SuccessStoryFilters = ({
  search = "",
  onSearchChange,
  industry = "All",
  onIndustryChange,
  industries = [],
  year = "All",
  onYearChange,
  years = [],
  totalStories = 0,
}) => {
  const safeIndustries = Array.isArray(industries)
    ? industries.filter(Boolean)
    : [];

  const safeYears = Array.isArray(years)
    ? years.filter(Boolean)
    : [];

  return (
    <div
      className="kr-success-story-filters"
      role="search"
      aria-label="Filter success stories"
    >
      <div className="kr-success-story-filters-top">
        <div>
          <span className="kr-success-story-filter-label">
            EXPLORE CLIENT RESULTS
          </span>

          <h2>Find the right success story</h2>

          <p>
            Search by client, project, industry, location,
            service, business result or publication year.
          </p>
        </div>

        <div
          className="kr-success-story-total"
          aria-live="polite"
        >
          <strong>{totalStories}</strong>

          <span>
            {totalStories === 1
              ? "Story Found"
              : "Stories Found"}
          </span>
        </div>
      </div>

      <div className="kr-success-story-filter-controls">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search clients, projects, services, results..."
          ariaLabel="Search success stories"
        />

        <CategoryFilter
          value={industry}
          onChange={onIndustryChange}
          options={safeIndustries}
          allLabel="All Industries"
          label="Industry"
        />

        {safeYears.length > 0 && (
          <CategoryFilter
            value={year}
            onChange={onYearChange}
            options={safeYears}
            allLabel="All Years"
            label="Year"
          />
        )}
      </div>
    </div>
  );
};

export default SuccessStoryFilters;