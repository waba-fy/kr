const SectionHeader = ({
  eyebrow = "",
  title,
  highlight = "",
  description = "",
  align = "center",
  className = "",
}) => {
  return (
    <div
      className={`kr-section-header kr-section-header-${align} ${className}`.trim()}
    >
      {eyebrow && (
        <span className="kr-section-header-eyebrow">
          {eyebrow}
        </span>
      )}

      {title && (
        <h2>
          {title}
          {highlight && (
            <>
              {" "}
              <strong>{highlight}</strong>
            </>
          )}
        </h2>
      )}

      {description && (
        <p>{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;