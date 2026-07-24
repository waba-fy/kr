import { useEffect, useMemo, useState } from "react";
import {
  FaTimes,
  FaStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPlayCircle,
  FaFilePdf,
} from "react-icons/fa";

import SEO from "../components/SEO";
import ReviewHero from "../components/reviews/ReviewHero";
import ReviewFilters from "../components/reviews/ReviewFilters";
import ReviewGrid from "../components/reviews/ReviewGrid";

import { reviews } from "../data/reviewsData";

import "../styles/reviews.css";

const Reviews = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      reviews
        .map((review) => review.category)
        .filter(Boolean)
    );

    return Array.from(uniqueCategories).sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  const filteredReviews = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesCategory =
        category === "All" ||
        review.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableContent = [
        review.title,
        review.client,
        review.company,
        review.location,
        review.category,
        review.projectType,
        review.reviewer,
        review.review,
        review.shortReview,
        ...(review.services || []),
        ...(review.highlights || []),
        ...(review.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedSearch);
    });
  }, [search, category]);

  const totalReviews = reviews.length;

  const featuredCount = reviews.filter(
    (review) => review.featured
  ).length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (total, review) =>
            total + Number(review.rating || 0),
          0
        ) / totalReviews
      : 0;

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };

  const openReview = (review) => {
    setSelectedReview(review);
  };

  const closeReview = () => {
    setSelectedReview(null);
  };

  useEffect(() => {
    if (!selectedReview) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeReview();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedReview]);

  return (
    <main className="kr-reviews-page">
      <SEO
        title="Client Reviews & Feedback | KeyRoutes"
        description="Read reviews and feedback from businesses that partnered with KeyRoutes for strategy, website development, SEO, advertising, CRM and automation."
        keywords="KeyRoutes reviews, client feedback, digital marketing testimonials, website development reviews, SEO agency reviews, automation services feedback"
        canonical="https://keyroutes.co/reviews"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "KeyRoutes Client Reviews and Feedback",
          url: "https://keyroutes.co/reviews",
          description:
            "Client reviews and feedback for KeyRoutes strategy, marketing, technology and automation services.",
        }}
      />

      <ReviewHero
        totalReviews={totalReviews}
        averageRating={averageRating}
        featuredCount={featuredCount}
      />

      <section className="kr-reviews-main">
        <div className="kr-reviews-container">
          <ReviewFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            totalReviews={filteredReviews.length}
          />

          <ReviewGrid
            reviews={filteredReviews}
            onReadMore={openReview}
            emptyTitle="No reviews found"
            emptyMessage="Try another keyword or choose a different category."
          />

          {filteredReviews.length === 0 && (
            <div className="kr-reviews-reset-wrap">
              <button
                type="button"
                className="kr-reviews-reset-button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedReview && (
        <div
          className="kr-review-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeReview();
            }
          }}
        >
          <section
            className="kr-review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <button
              type="button"
              className="kr-review-modal-close"
              onClick={closeReview}
              aria-label="Close full review"
            >
              <FaTimes />
            </button>

            <div className="kr-review-modal-header">
              <div className="kr-review-modal-brand">
                {selectedReview.logo ? (
                  <img
                    src={selectedReview.logo}
                    alt={`${
                      selectedReview.client ||
                      selectedReview.company
                    } logo`}
                  />
                ) : (
                  <div className="kr-review-modal-logo-fallback">
                    {(
                      selectedReview.client ||
                      selectedReview.company ||
                      "K"
                    ).charAt(0)}
                  </div>
                )}

                <div>
                  <span>CLIENT REVIEW</span>

                  <h2 id="review-modal-title">
                    {selectedReview.title}
                  </h2>

                  <p>
                    {selectedReview.client ||
                      selectedReview.company}
                  </p>
                </div>
              </div>

              <div
                className="kr-review-modal-rating"
                aria-label={`${selectedReview.rating || 0} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index <
                      Math.round(
                        Number(selectedReview.rating || 0)
                      )
                        ? "is-active"
                        : ""
                    }
                  />
                ))}

                <strong>
                  {Number(
                    selectedReview.rating || 0
                  ).toFixed(1)}
                </strong>
              </div>
            </div>

            <div className="kr-review-modal-body">
              {selectedReview.image && (
                <img
                  src={selectedReview.image}
                  alt={`${
                    selectedReview.client ||
                    selectedReview.company
                  } testimonial`}
                  className="kr-review-modal-image"
                />
              )}

              <blockquote>
                “{selectedReview.review}”
              </blockquote>

              <div className="kr-review-modal-details">
                {selectedReview.reviewer && (
                  <div>
                    <strong>Reviewer</strong>
                    <span>{selectedReview.reviewer}</span>
                  </div>
                )}

                {selectedReview.company && (
                  <div>
                    <strong>Company</strong>
                    <span>{selectedReview.company}</span>
                  </div>
                )}

                {selectedReview.location && (
                  <div>
                    <strong>Location</strong>
                    <span>
                      <FaMapMarkerAlt />
                      {selectedReview.location}
                    </span>
                  </div>
                )}

                {selectedReview.projectType && (
                  <div>
                    <strong>Project Type</strong>
                    <span>{selectedReview.projectType}</span>
                  </div>
                )}

                {selectedReview.year && (
                  <div>
                    <strong>Year</strong>
                    <span>{selectedReview.year}</span>
                  </div>
                )}
              </div>

              {selectedReview.services?.length > 0 && (
                <div className="kr-review-modal-section">
                  <h3>Services Delivered</h3>

                  <div className="kr-review-modal-tags">
                    {selectedReview.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedReview.highlights?.length > 0 && (
                <div className="kr-review-modal-section">
                  <h3>Project Highlights</h3>

                  <div className="kr-review-modal-highlights">
                    {selectedReview.highlights.map(
                      (highlight) => (
                        <p key={highlight}>
                          <FaCheckCircle />
                          {highlight}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="kr-review-modal-actions">
                {selectedReview.website && (
                  <a
                    href={selectedReview.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                    Visit Website
                  </a>
                )}

                {selectedReview.video && (
                  <a
                    href={selectedReview.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPlayCircle />
                    Watch Video
                  </a>
                )}

                {selectedReview.pdf && (
                  <a
                    href={selectedReview.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFilePdf />
                    Open PDF
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Reviews;