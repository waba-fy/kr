import SearchBar from "../common/SearchBar";
import CategoryFilter from "../common/CategoryFilter";

const ReviewFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  totalReviews = 0,
}) => {
  return (
    <section className="kr-review-filters">
      <div className="kr-review-filters-top">
        <div>
          <span className="kr-review-filter-label">
            SEARCH REVIEWS
          </span>

          <h2>
            Client Reviews & Feedback
          </h2>

          <p>
            Browse reviews from our clients across
            strategy, websites, SEO, automation,
            CRM and digital marketing.
          </p>
        </div>

        <div className="kr-review-total">
          <strong>{totalReviews}</strong>
          <span>
            Review{totalReviews !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="kr-review-filter-controls">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search client, company or service..."
        />

        <CategoryFilter
          value={category}
          onChange={onCategoryChange}
          options={categories}
          allLabel="All Categories"
        />
      </div>
    </section>
  );
};

export default ReviewFilters;