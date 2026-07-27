import {
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

const normaliseText = (value) =>
  String(value ?? "").trim();

const normalisePoints = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      if (typeof item === "string") {
        const title = normaliseText(item);

        if (!title) return null;

        return {
          id: `${title}-${index}`,
          title,
          description: "",
        };
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const title =
        normaliseText(item.title) ||
        normaliseText(item.label) ||
        normaliseText(item.name);

      if (!title) return null;

      return {
        id: item.id || `${title}-${index}`,
        title,
        description:
          normaliseText(item.description) ||
          normaliseText(item.value),
      };
    })
    .filter(Boolean);
};

const WhyItWorked = ({ story }) => {
  const section = story?.whyItWorked;

  if (!section) {
    return null;
  }

  const points = normalisePoints(
    section.points
  );

  if (
    points.length === 0 &&
    !section.description
  ) {
    return null;
  }

  return (
    <section
      className="kr-why-it-worked"
      aria-labelledby="kr-why-it-worked-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-why-it-worked-header">
          <span className="kr-why-it-worked-eyebrow">
            {section.eyebrow ||
              "WHY IT WORKED"}
          </span>

          <h2 id="kr-why-it-worked-title">
            {section.title ||
              "Why This Partnership Worked"}
          </h2>

          {section.description && (
            <p>{section.description}</p>
          )}
        </header>

        <div className="kr-why-it-worked-grid">
          {points.map((point, index) => (
            <article
              key={point.id}
              className="kr-why-it-worked-card"
            >
              <div className="kr-why-it-worked-top">
                <span className="kr-why-it-worked-number">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

                <span className="kr-why-it-worked-icon">
                  <FaLightbulb />
                </span>
              </div>

              <h3>{point.title}</h3>

              {point.description && (
                <p>{point.description}</p>
              )}

              <div className="kr-why-it-worked-footer">
                <FaCheckCircle />

                <span>
                  KeyRoutes Growth Principle
                </span>

                <FaArrowRight />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItWorked;