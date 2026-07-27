import {
  FaArrowRight,
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaCode,
  FaCog,
  FaEnvelope,
  FaGlobe,
  FaLayerGroup,
  FaSearch,
} from "react-icons/fa";

const normaliseText = (value) =>
  String(value ?? "").trim();

const getServiceIcon = (service = {}) => {
  const searchableText = [
    service.title,
    service.name,
    service.label,
    service.category,
    service.description,
  ]
    .map(normaliseText)
    .join(" ")
    .toLowerCase();

  if (
    searchableText.includes("website") ||
    searchableText.includes("development") ||
    searchableText.includes("landing page")
  ) {
    return FaCode;
  }

  if (
    searchableText.includes("google") ||
    searchableText.includes("meta") ||
    searchableText.includes("campaign") ||
    searchableText.includes("advertising") ||
    searchableText.includes("ads")
  ) {
    return FaBullhorn;
  }

  if (
    searchableText.includes("seo") ||
    searchableText.includes("search")
  ) {
    return FaSearch;
  }

  if (
    searchableText.includes("analytics") ||
    searchableText.includes("tracking") ||
    searchableText.includes("reporting")
  ) {
    return FaChartLine;
  }

  if (
    searchableText.includes("automation") ||
    searchableText.includes("crm") ||
    searchableText.includes("workflow")
  ) {
    return FaCog;
  }

  if (
    searchableText.includes("email") ||
    searchableText.includes("communication")
  ) {
    return FaEnvelope;
  }

  if (
    searchableText.includes("digital") ||
    searchableText.includes("online")
  ) {
    return FaGlobe;
  }

  return FaLayerGroup;
};

const normaliseServices = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      if (typeof item === "string") {
        const title = normaliseText(item);

        if (!title) {
          return null;
        }

        return {
          id: `${title}-${index}`,
          title,
          description: "",
          category: "",
          highlights: [],
          icon: getServiceIcon({
            title,
          }),
        };
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const title =
        normaliseText(item.title) ||
        normaliseText(item.name) ||
        normaliseText(item.label);

      if (!title) {
        return null;
      }

      const rawHighlights =
        item.highlights ||
        item.points ||
        item.items ||
        item.features;

      const highlights = Array.isArray(
        rawHighlights
      )
        ? rawHighlights
            .map((highlight) => {
              if (
                typeof highlight ===
                "string"
              ) {
                return normaliseText(
                  highlight
                );
              }

              if (
                !highlight ||
                typeof highlight !==
                  "object"
              ) {
                return "";
              }

              return (
                normaliseText(
                  highlight.title
                ) ||
                normaliseText(
                  highlight.label
                ) ||
                normaliseText(
                  highlight.description
                )
              );
            })
            .filter(Boolean)
        : [];

      return {
        id:
          item.id ||
          `${title}-${index}`,

        title,

        description:
          normaliseText(
            item.description
          ) ||
          normaliseText(item.value),

        category:
          normaliseText(item.category),

        highlights,

        icon: getServiceIcon(item),
      };
    })
    .filter(Boolean);
};

const ServicesDelivered = ({ story }) => {
  const servicesDelivered =
    story?.servicesDelivered;

  if (!servicesDelivered) {
    return null;
  }

  const services = normaliseServices(
    servicesDelivered.services
  );

  const sectionTitle =
    normaliseText(
      servicesDelivered.title
    ) ||
    "What KeyRoutes Delivered";

  const sectionDescription =
    normaliseText(
      servicesDelivered.description
    );

  const eyebrow =
    normaliseText(
      servicesDelivered.eyebrow
    ) ||
    "WHAT WE DELIVERED";

  const supportingText =
    normaliseText(
      servicesDelivered.supportingText
    ) ||
    normaliseText(
      servicesDelivered.note
    );

  if (
    services.length === 0 &&
    !sectionDescription
  ) {
    return null;
  }

  return (
    <section
      className="kr-services-delivered"
      aria-labelledby="kr-services-delivered-title"
    >
      <div className="kr-success-stories-container">
        <header className="kr-services-delivered-header">
          <div className="kr-services-delivered-heading">
            <span className="kr-services-delivered-eyebrow">
              {eyebrow}
            </span>

            <h2 id="kr-services-delivered-title">
              {sectionTitle}
            </h2>
          </div>

          {sectionDescription && (
            <p>
              {sectionDescription}
            </p>
          )}
        </header>

        {services.length > 0 && (
          <div className="kr-services-delivered-grid">
            {services.map(
              (service, index) => {
                const Icon =
                  service.icon;

                return (
                  <article
                    className="kr-service-delivered-card"
                    key={service.id}
                  >
                    <div className="kr-service-delivered-card-top">
                      <span className="kr-service-delivered-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="kr-service-delivered-icon">
                        <Icon
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {service.category && (
                      <span className="kr-service-delivered-category">
                        {service.category}
                      </span>
                    )}

                    <h3>
                      {service.title}
                    </h3>

                    {service.description && (
                      <p>
                        {
                          service.description
                        }
                      </p>
                    )}

                    {service.highlights
                      .length > 0 && (
                      <ul className="kr-service-delivered-highlights">
                        {service.highlights.map(
                          (
                            highlight,
                            highlightIndex
                          ) => (
                            <li
                              key={`${service.id}-${highlightIndex}`}
                            >
                              <FaCheckCircle
                                aria-hidden="true"
                              />

                              <span>
                                {
                                  highlight
                                }
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    )}

                    <div className="kr-service-delivered-card-footer">
                      <span>
                        KeyRoutes Service
                      </span>

                      <FaArrowRight
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}

        {supportingText && (
          <div className="kr-services-delivered-note">
            <span>
              Integrated Delivery
            </span>

            <p>{supportingText}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesDelivered;