import { FaQuoteLeft, FaStar, FaUsers } from "react-icons/fa";

const ReviewHero = ({
  totalReviews = 0,
  averageRating = 5,
  featuredCount = 0,
}) => {
  return (
    <section className="kr-reviews-hero">
      <div className="kr-reviews-hero-bg" />

      <div className="kr-reviews-container">
        <div className="kr-reviews-hero-content">
          <span className="kr-reviews-eyebrow">
            REVIEWS &amp; FEEDBACK
          </span>

          <h1>
            Trusted by Businesses That Chose the{" "}
            <strong>Right Route for Growth.</strong>
          </h1>

          <p>
            Read what our clients say about working with KeyRoutes across
            strategy, websites, SEO, campaigns, CRM and automation.
          </p>

          <div className="kr-reviews-hero-stats">
            <div>
              <FaUsers aria-hidden="true" />

              <span>
                <strong>{totalReviews}</strong>
                Client Reviews
              </span>
            </div>

            <div>
              <FaStar aria-hidden="true" />

              <span>
                <strong>
                  {Number(averageRating || 0).toFixed(1)}
                </strong>
                Average Rating
              </span>
            </div>

            <div>
              <FaQuoteLeft aria-hidden="true" />

              <span>
                <strong>{featuredCount}</strong>
                Featured Stories
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewHero;