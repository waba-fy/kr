import { FaFolderOpen } from "react-icons/fa";

const EmptyState = ({
  title = "No Results Found",
  message = "There are no matching items to display.",
  buttonText = "",
  onButtonClick,
}) => {
  return (
    <div className="kr-empty-state">
      <div className="kr-empty-icon">
        <FaFolderOpen />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {buttonText && (
        <button
          type="button"
          className="kr-empty-button"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;