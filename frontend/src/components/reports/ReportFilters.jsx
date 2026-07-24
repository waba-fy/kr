import SearchBar from "../common/SearchBar";
import CategoryFilter from "../common/CategoryFilter";

const ReportFilters = ({
  search = "",
  onSearchChange,
  category = "All",
  onCategoryChange,
  categories = [],
  year = "All",
  onYearChange,
  years = [],
  totalReports = 0,
}) => {
  return (
    <section className="kr-report-filters">
      <div className="kr-report-filters-top">
        <div>
          <span className="kr-report-filter-label">
            BROWSE RESEARCH
          </span>

          <h2>Find the right market report</h2>

          <p>
            Search by report title, location, topic, category,
            quarter, or year to quickly find relevant research.
          </p>
        </div>

        <div className="kr-report-total">
          <strong>{totalReports}</strong>

          <span>
            {totalReports === 1
              ? "Report Found"
              : "Reports Found"}
          </span>
        </div>
      </div>

      <div className="kr-report-filter-controls">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search reports, locations, topics..."
          ariaLabel="Search market reports"
        />

        <CategoryFilter
          value={category}
          onChange={onCategoryChange}
          options={categories}
          allLabel="All Categories"
          label="Category"
        />

        {years.length > 0 && (
          <CategoryFilter
            value={year}
            onChange={onYearChange}
            options={years}
            allLabel="All Years"
            label="Year"
          />
        )}
      </div>
    </section>
  );
};

export default ReportFilters;