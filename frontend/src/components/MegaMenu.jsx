import { NavLink } from "react-router-dom";
import { menuData } from "./menuData";
import "../styles/megamenu.css";

const isExternalUrl = (url = "") =>
  /^https?:\/\//i.test(url);

const MegaMenu = ({
  id,
  type,
  onItemClick,
}) => {
  const data = menuData[type];

  if (!data) {
    return null;
  }

  const handleItemClick = () => {
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  };

  return (
    <div
      id={id}
      className="mega-wrapper"
      role="region"
      aria-label={`${data.title} menu`}
    >
      <div className="mega-container">
        <div className="mega-cta-card">
          <div
            className="mega-cta-icon"
            aria-hidden="true"
          >
            {data.cta.icon}
          </div>

          <h3>{data.cta.title}</h3>

          <p>{data.cta.desc}</p>

          {isExternalUrl(data.cta.link) ? (
            <a
              href={data.cta.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mega-cta-btn"
              onClick={handleItemClick}
            >
              {data.cta.btnText}
            </a>
          ) : (
            <NavLink
              to={data.cta.link}
              className="mega-cta-btn"
              onClick={handleItemClick}
            >
              {data.cta.btnText}
            </NavLink>
          )}
        </div>

        <div className="mega-content">
          <h4>{data.title}</h4>

          <div className="mega-grid">
            {data.items.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                className="mega-item"
                onClick={handleItemClick}
              >
                <span
                  className="mega-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div className="mega-item-content">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>

                <span
                  className="mega-arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;