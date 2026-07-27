import {
  FaArrowDown,
  FaCheckCircle,
  FaChartLine,
  FaExclamationCircle,
  FaTools,
} from "react-icons/fa";

const normaliseItems = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      return String(
        item?.title ||
          item?.label ||
          item?.description ||
          ""
      ).trim();
    })
    .filter(Boolean);
};

const Transformation = ({ story }) => {
  const transformation = story?.transformation;

  if (!transformation) {
    return null;
  }

  const beforeItems = normaliseItems(
    transformation?.before?.items ||
      transformation?.before
  );

  const solutionItems = normaliseItems(
    transformation?.solution?.items ||
      transformation?.actions?.items ||
      transformation?.solution ||
      transformation?.actions
  );

  const afterItems = normaliseItems(
    transformation?.after?.items ||
      transformation?.after
  );

  const hasContent =
    beforeItems.length > 0 ||
    solutionItems.length > 0 ||
    afterItems.length > 0;

  if (!hasContent) {
    return null;
  }

  const title =
    story?.hero?.title ||
    "Client Success Story";

  const subtitle =
    story?.hero?.subtitle || "";

  const location =
    story?.hero?.location ||
    story?.partnership?.location ||
    "";

  const logo =
    story?.hero?.logo || "";

  const eyebrow =
    transformation?.eyebrow ||
    "THE TRANSFORMATION";

  const heading =
    transformation?.title ||
    "From Challenge to Measurable Growth";

  const description =
    transformation?.description || "";

  const beforeTitle =
    transformation?.before?.title ||
    "Before KeyRoutes";

  const solutionTitle =
    transformation?.solution?.title ||
    transformation?.actions?.title ||
    "What KeyRoutes Did";

  const afterTitle =
    transformation?.after?.title ||
    "After the Partnership";

  const outcome =
    transformation?.outcome || "";

  return (
    <section
      className="kr-transformation"
      aria-labelledby="transformation-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-success-section-header">
          <span className="kr-success-section-eyebrow">
            {eyebrow}
          </span>

          <h2 id="transformation-title">
            {heading}
          </h2>

          {description && (
            <p>{description}</p>
          )}
        </header>

        <div className="kr-transformation-grid">
          <article
            className={`kr-transformation-card ${
              story?.featured
                ? "is-featured"
                : ""
            }`.trim()}
          >
            <header className="kr-transformation-card-header">
              <div className="kr-transformation-client">
                {logo && (
                  <div className="kr-transformation-logo">
                    <img
                      src={logo}
                      alt={`${title} logo`}
                      loading="lazy"
                    />
                  </div>
                )}

                <div>
                  <span>{eyebrow}</span>

                  <h3>{title}</h3>

                  {(subtitle || location) && (
                    <p>
                      {[subtitle, location]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="kr-transformation-heading">
                <h4>{heading}</h4>

                {description && (
                  <p>{description}</p>
                )}
              </div>
            </header>

            <div className="kr-transformation-flow">
              {beforeItems.length > 0 && (
                <section className="kr-transformation-stage is-before">
                  <div className="kr-transformation-stage-heading">
                    <span className="kr-transformation-stage-icon">
                      <FaExclamationCircle
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <small>BEFORE</small>
                      <h5>{beforeTitle}</h5>
                    </div>
                  </div>

                  <div className="kr-transformation-items">
                    {beforeItems.map(
                      (item, index) => (
                        <p
                          key={`${story?.slug}-before-${index}`}
                        >
                          <span aria-hidden="true">
                            ×
                          </span>

                          {item}
                        </p>
                      )
                    )}
                  </div>
                </section>
              )}

              {beforeItems.length > 0 &&
                solutionItems.length > 0 && (
                  <div
                    className="kr-transformation-arrow"
                    aria-hidden="true"
                  >
                    <FaArrowDown />
                  </div>
                )}

              {solutionItems.length > 0 && (
                <section className="kr-transformation-stage is-solution">
                  <div className="kr-transformation-stage-heading">
                    <span className="kr-transformation-stage-icon">
                      <FaTools
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <small>
                        KEYROUTES ACTION
                      </small>

                      <h5>
                        {solutionTitle}
                      </h5>
                    </div>
                  </div>

                  <div className="kr-transformation-items">
                    {solutionItems.map(
                      (item, index) => (
                        <p
                          key={`${story?.slug}-solution-${index}`}
                        >
                          <FaCheckCircle
                            aria-hidden="true"
                          />

                          {item}
                        </p>
                      )
                    )}
                  </div>
                </section>
              )}

              {solutionItems.length > 0 &&
                afterItems.length > 0 && (
                  <div
                    className="kr-transformation-arrow"
                    aria-hidden="true"
                  >
                    <FaArrowDown />
                  </div>
                )}

              {afterItems.length > 0 && (
                <section className="kr-transformation-stage is-after">
                  <div className="kr-transformation-stage-heading">
                    <span className="kr-transformation-stage-icon">
                      <FaChartLine
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <small>AFTER</small>
                      <h5>{afterTitle}</h5>
                    </div>
                  </div>

                  <div className="kr-transformation-items">
                    {afterItems.map(
                      (item, index) => (
                        <p
                          key={`${story?.slug}-after-${index}`}
                        >
                          <FaCheckCircle
                            aria-hidden="true"
                          />

                          {item}
                        </p>
                      )
                    )}
                  </div>
                </section>
              )}
            </div>

            {outcome && (
              <div className="kr-transformation-outcome">
                <span>BUSINESS OUTCOME</span>
                <p>{outcome}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default Transformation;