import SuccessStoryCard from "./SuccessStoryCard";
import EmptyState from "../common/EmptyState";

const SuccessStoryGrid = ({
  stories = [],
  onViewDetails,
  onReset,
  emptyTitle = "No success stories found",
  emptyMessage = "Try another keyword or choose a different category.",
}) => {
  const validStories = Array.isArray(stories)
    ? stories.filter(Boolean)
    : [];

  if (validStories.length === 0) {
    return (
      <div className="kr-success-story-grid">
        <div className="kr-success-story-grid-empty">
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
            buttonText={onReset ? "Clear Filters" : ""}
            onButtonClick={onReset}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="kr-success-story-grid"
      aria-live="polite"
    >
      {validStories.map((story) => (
        <SuccessStoryCard
          key={story.id || story.slug || story.title}
          story={story}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default SuccessStoryGrid;