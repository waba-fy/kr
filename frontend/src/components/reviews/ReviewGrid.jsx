import ReviewCard from "./ReviewCard";
import EmptyState from "../common/EmptyState";

const ReviewGrid = ({
  reviews = [],
  onReadMore,
  emptyTitle = "No reviews found",
  emptyMessage = "Try changing your search or filter options.",
}) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="kr-review-grid">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};

export default ReviewGrid;